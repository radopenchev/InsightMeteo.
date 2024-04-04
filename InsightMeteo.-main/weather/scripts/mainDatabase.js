import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, set, ref, update, onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
apiKey: "AIzaSyC1Qnqjetogw6QtyUOhl0l_18Vl1X2eiAo",
authDomain: "weather-36ae6.firebaseapp.com",
databaseURL: "https://weather-36ae6-default-rtdb.firebaseio.com",
projectId: "weather-36ae6",
storageBucket: "weather-36ae6.appspot.com",
messagingSenderId: "522097498531",
appId: "1:522097498531:web:b29655894ba5739135e216"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

function updateSearchCity(uid, city) {
update(ref(database, 'users/' + uid), {
  last_searched_city: city
}).then(() => {
  console.log('Search city updated successfully');
}).catch(error => {
  console.error('Error updating search city:', error);
});
}

function retrieveSearchCity(uid) {
console.log('Retrieve search city function called');

const userRef = ref(database, 'users/' + uid);
onValue(userRef, (snapshot) => {
  const userData = snapshot.val();
  if (userData && userData.last_searched_city) {
    const lastSearchedCity = userData.last_searched_city;
    document.getElementById('city').value = lastSearchedCity;
    getWeather(); 
  } else {
    const lastSearchedCity = localStorage.getItem('lastSearchedCity');
    if (lastSearchedCity) {
      document.getElementById('city').value = lastSearchedCity;
      getWeather(); 
    }
  }
});
}

function checkAndRetrieveSearchCity() {
const user = auth.currentUser;
if (user) {
  retrieveSearchCity(user.uid);
} else {
  //suobshtenie
}
}

function displaySavedSearch() {
const user = auth.currentUser;
if (user) {
  retrieveSearchCity(user.uid);
} else {
 // code for local storage
}
}

window.onload = () => {
console.log('Window loaded');
checkAndRetrieveSearchCity();
};

const authState = onAuthStateChanged(auth, (user) => {
if (user) {
  console.log('User logged in');
  checkAndRetrieveSearchCity();
} else {
  console.log('No user logged in');
}
});

window.addEventListener('load', displaySavedSearch);

function getWeather() {
console.log('getWeather function called'); 
const apiKey = 'c625fb186b4e4f2298d2bc46b84bede1';
const city = document.getElementById('city').value;

if (!city) {
    alert('Please enter a city');
    return;
}

localStorage.setItem('lastSearchedCity', city);

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
        displayWeather(data);
        toggleTextVisibility();
        const user = auth.currentUser;
        if (user) {
            updateSearchCity(user.uid, city);
        }
        document.getElementById('weather-container').classList.remove('hidden');
        document.getElementById('five-day-forecast').classList.remove('hidden'); 
        document.getElementById('forecast-navigation').classList.remove('hidden'); 
    })
    .catch(error => {
        console.error('Error fetching current weather data:', error);
        alert('Error fetching current weather data. Please try again.');
    });

fetch(forecastUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch hourly forecast data');
        }
        return response.json();
    })
    .then(data => {
        displayHourlyForecast(data.list);
        display5DayForecast(data.list);
    })
    .catch(error => {
        console.error('Error fetching hourly forecast data:', error);
        alert('Error fetching hourly forecast data. Please try again.');
    });
}



function toggleTextVisibility() {
const textElement = document.querySelector('.moto');
const weatherContainer = document.getElementById('weather-container');
const forecastContainer = document.getElementById('five-day-forecast');

if (weatherContainer.style.display !== 'none' || forecastContainer.style.display !== 'none') {
    textElement.style.display = 'none';
} else {
    textElement.style.display = 'block';
}
}


function handleKeyPress(event) {
    if (event.keyCode === 13) {
        getWeather();
    }
}
const cityInput = document.getElementById('city');
cityInput.addEventListener('keypress', handleKeyPress);

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

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

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

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

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

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}

const signOutButton = document.getElementById("sign-out-button");

signOutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        alert('User logged out');
        window.location.href = "index.html";
    }).catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
    });
});