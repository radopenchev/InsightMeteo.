//hero
document.addEventListener("mousemove", (e) => {
  Object.assign(document.documentElement, {
    style: `
    --move-x:${(e.clientX - window.innerWidth / 2) * 0.01}deg;
    --move-y:${(e.clientY - window.innerHeight / 2) * 0.01}deg;
    `,
  });
});


document.addEventListener("DOMContentLoaded", function() {
  var button = document.querySelector('.button-start');
  
  var section = document.getElementById('services');

  button.addEventListener('click', function(event) {
    event.preventDefault();

    var offset = section.offsetTop;

    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  });
});



// Translating the page
let isEnglish = true;

function translatePage() {
    const translateButton = document.querySelector('.translate');
    const motoText = document.querySelector('.hero-content-p');
    const testimonials = document.querySelectorAll('.testimonial-content');

    if (isEnglish) {
        document.querySelector('.footer-bottom').textContent = '© 2024 InsightMeteo | Designed by Danail Danailov & Radostin Penchev';
        motoText.textContent = 'FORECASTING CLARITY, WEATHER WISDOM';
        document.querySelector('#services .section-title').textContent = 'Services';
        document.querySelector('#services .advantage').textContent = 'Explore the benefits of our weather forecasting project';
        document.querySelector('#testimonials .section-title').textContent = 'Testimonials';
        document.querySelector('#demo .section-title').textContent = 'Check the weather now';
        document.querySelector('#signup .section-title').textContent = 'Unlock the Full Potential of InsightMeteo';
        document.querySelector('#signup .signup-description').textContent = 'Stay ahead of the weather with accurate forecasts. Sign up now to access exclusive features and personalized updates!';
        document.querySelector('#signup .button-signup').textContent = 'SIGN In';
        document.querySelectorAll('.service-item h2')[0].textContent = 'Accurate Forecasts';
        document.querySelectorAll('.service-item h2')[1].textContent = 'Global Coverage';
        document.querySelectorAll('.service-item h2')[2].textContent = 'Real-time Updates';
        document.querySelectorAll('.service-item p')[0].textContent = 'Our forecasts are generated using advanced algorithms and data analysis techniques. Expect precise and reliable weather predictions tailored to your needs.';
        document.querySelectorAll('.service-item p')[1].textContent = 'Our weather forecasts provide coverage for locations worldwide, ensuring you stay informed about weather conditions wherever you are.';
        document.querySelectorAll('.service-item p')[2].textContent = 'Stay up-to-date with real-time weather updates, including wind speed, direction, and other relevant information.';

        testimonials[0].textContent = '"I\'ve been using InsightMetio for my daily weather forecasts, and I\'m impressed by its accuracy and user-friendly interface. Highly recommended!" - John Doe';
        testimonials[1].textContent = '"InsightMetio has become my go-to weather app. It provides detailed forecasts and updates, helping me plan my outdoor activities effectively." - Jane Smith';

        translateButton.textContent = 'BG';
    } else {
        document.querySelector('.footer-bottom').textContent = '© 2024 InsightMeteo | Дизайн от Данаил Данаилов и Радостин Пенчев';
        motoText.textContent = 'Предвиждане на яснота, метеорологична мъдрост';
        document.querySelector('#services .section-title').textContent = 'Услуги';
        document.querySelector('#services .advantage').textContent = 'Разгледайте ползите от нашия проект за прогнозиране на времето';
        document.querySelector('#testimonials .section-title').textContent = 'Препоръки';
        document.querySelector('#demo .section-title').textContent = 'Проверете времето сега';
        document.querySelector('#signup .section-title').textContent = 'Отключете пълния потенциал на InsightMetio';
        document.querySelector('#signup .signup-description').textContent = 'Изпреварете времето с точни прогнози. Регистрирайте се сега, за да получавате ексклузивни функции и персонализирани актуализации!';
        document.querySelector('#signup .button-signup').textContent = 'Вход';

        document.querySelectorAll('.service-item h2')[0].textContent = 'Точни прогнози';
        document.querySelectorAll('.service-item h2')[1].textContent = 'Глобално покритие';
        document.querySelectorAll('.service-item h2')[2].textContent = 'Актуализации в реално време';
        document.querySelectorAll('.service-item p')[0].textContent = 'Нашите прогнози се генерират с помощта на напреднали алгоритми и техники за анализ на данни. Очаквайте точни и надеждни прогнози за времето, пригодени към вашите нужди.';
        document.querySelectorAll('.service-item p')[1].textContent = 'Нашите прогнози за времето осигуряват покритие за местоположения по целия свят, гарантирайки, че сте информирани за метеорологичните условия навсякъде, където сте.';
        document.querySelectorAll('.service-item p')[2].textContent = 'Бъдете в крак с актуалните прогнози за времето, включително скоростта на вятъра, посоката и друга съответна информация.';

        testimonials[0].textContent = '"Използвам InsightMeteo за моите ежедневни прогнози за времето и съм впечатлен от неговата точност и потребителски интерфейс. Наистина препоръчително!" - Джон Доу';
        testimonials[1].textContent = '"InsightMeteo стана моето предпочитано приложение за времето. То осигурява детайлни прогнози и актуализации, които ми помагат да планирам ефективно своите открити дейности." - Джейн Смит';

        translateButton.textContent = 'EN';
    }

    changeFontFamily();

    isEnglish = !isEnglish;
}

function changeFontFamily() {
    const bodyFontEnglish = "kamerik-3d, Arial, sans-serif";
    const bodyFontBulgarian = "merriweather-italic-3d,  Arial, sans-serif";

    document.body.style.fontFamily = isEnglish ? bodyFontEnglish : bodyFontBulgarian;
}

translatePage();



// demo function
function getWeather() {
  const apiKey = 'c625fb186b4e4f2298d2bc46b84bede1';
  const city = document.getElementById('city').value.trim();
  const weatherInfoContainer = document.getElementById('weather-info');

  weatherInfoContainer.innerHTML = '';

  if (city === '') {
    weatherInfoContainer.innerHTML = '<p>Please enter a city name.</p>';
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const { name, sys, weather, main } = data;

      const country = sys.country;
      const description = weather[0].description;
      const temperature = Math.round(main.temp);
      const feelsLike = Math.round(main.feels_like);
      const humidity = main.humidity;

      const weatherInfoHTML = `
        <h3>${name}, ${country}</h3>
        <p>Weather: ${description}</p>
        <p>Temperature: ${temperature}°C</p>
        <p>Feels like: ${feelsLike}°C</p>
      `;

      localStorage.setItem('lastSearchedCity', city);

      weatherInfoContainer.innerHTML = weatherInfoHTML;
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      weatherInfoContainer.innerHTML = 'Enter a valid city.</p>';
    });
}

window.onload = function() {
  const lastSearchedCity = localStorage.getItem('lastSearchedCity');
  if (lastSearchedCity) {
    document.getElementById('city').value = lastSearchedCity;
    getWeather();
  }
};

