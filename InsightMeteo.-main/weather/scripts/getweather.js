function getWeather() {
    const apiKey = 'c625fb186b4e4f2298d2bc46b84bede1';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            toggleTextVisibility(); 
            document.getElementById('forecast-navigation').classList.remove('hidden');
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            display5DayForecast(data.list);
            displayHourlyForecastModal(data.list);
        })
        .catch(error => {
            console.error('Error fetching 5-day forecast data:', error);
            alert('Error fetching 5-day forecast data. Please try again.');
        });

    var weatherContainer = document.getElementById("weather-container");
    weatherContainer.classList.remove("hidden");

    var weatherContainer = document.getElementById("five-day-forecast");
    weatherContainer.classList.remove("hidden");
}

function display5DayForecast(forecastData) {
    const fiveDayForecastDiv = document.getElementById('five-day-forecast');
    fiveDayForecastDiv.innerHTML = '';

    const groupedForecast = groupForecastByDay(forecastData);

    let currentDayIndex = 0;
    const days = Object.keys(groupedForecast);
    displayForecastForDay(groupedForecast[days[currentDayIndex]], days[currentDayIndex]);

    document.getElementById('prev-day-btn').addEventListener('click', () => {
        currentDayIndex = (currentDayIndex - 1 + days.length) % days.length;
        displayForecastForDay(groupedForecast[days[currentDayIndex]], days[currentDayIndex]);
    });

    document.getElementById('next-day-btn').addEventListener('click', () => {
        currentDayIndex = (currentDayIndex + 1) % days.length;
        displayForecastForDay(groupedForecast[days[currentDayIndex]], days[currentDayIndex]);
    });
}

function displayForecastForDay(dayForecast, day) {
    const fiveDayForecastDiv = document.getElementById('five-day-forecast');
    fiveDayForecastDiv.innerHTML = '';

    const date = new Date(dayForecast[0].dt * 1000);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', options).replace(/\//g, '.');

    const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);

    const dayHeading = document.createElement('h2');
    dayHeading.textContent = `${weekday} ${formattedDate}`;
    fiveDayForecastDiv.appendChild(dayHeading);

    dayForecast.forEach(item => {
        const date = new Date(item.dt * 1000);
        const hour = date.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        const forecastItemHtml = `
            <div class="forecast-item">
                <p>${hour}:00</p>
                <img src="${iconUrl}" alt="Weather Icon">
                <p>${temperature}°C</p>
            </div>
        `;
        fiveDayForecastDiv.innerHTML += forecastItemHtml;
    });
}



function groupForecastByDay(forecastData) {
    const groupedForecast = {};

    forecastData.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });

        if (groupedForecast.hasOwnProperty(day)) {
            groupedForecast[day].push(item);
        } else {
            groupedForecast[day] = [item];
        }
    });

    return groupedForecast;
}

function displayHourlyForecastModal(hourlyData) {
    const hourlyForecastModal = document.getElementById('hourly-forecast-modal');
    const hourlyForecastContainer = document.getElementById('hourly-forecast-container');
    hourlyForecastContainer.innerHTML = '';

    hourlyForecastModal.addEventListener('click', () => {
        hourlyForecastContainer.innerHTML = '';

        const next24Hours = hourlyData.slice(0, 8);
        next24Hours.forEach(item => {
            const dateTime = new Date(item.dt * 1000);
            const hour = dateTime.getHours();
            const temperature = Math.round(item.main.temp - 273.15);
            const iconCode = item.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
            const hourlyItemHtml = `
                <div class="hourly-item">
                    <span>${hour}:00</span>
                    <img src="${iconUrl}" alt="Hourly Weather Icon">
                    <span>${temperature}°C</span>
                </div>
            `;
            hourlyForecastContainer.innerHTML += hourlyItemHtml;
        });

        hourlyForecastModal.style.display = 'block';
    });

    document.querySelector('.close').addEventListener('click', () => {
        hourlyForecastModal.style.display = 'none';
    });

    window.addEventListener('click', event => {
        if (event.target === hourlyForecastModal) {
            hourlyForecastModal.style.display = 'none';
        }
    });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        const temperatureHTML = `<p>${temperature}°C</p>`;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
    }
}

function toggleTextVisibility() {
    const textElement = document.querySelector('.moto');
    const weatherContainer = document.getElementById('weather-container');

    if (weatherContainer.classList.contains('hidden')) {
        textElement.style.display = 'block';
    } else {
        textElement.style.display = 'none';
    }
}

function handleKeyPress(event) {
    if (event.keyCode === 13) {
        getWeather();
    }
}
const cityInput = document.getElementById('city');
cityInput.addEventListener('keypress', handleKeyPress);
