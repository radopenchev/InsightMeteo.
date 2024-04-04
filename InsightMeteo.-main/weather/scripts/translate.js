let isEnglish = true;

function translatePage() {
    const translateButton = document.querySelector('.translate');
    const motoText = document.querySelector('.moto');
    
    if (isEnglish) {
        document.getElementById('home-link').textContent = 'Начало';
        document.getElementById('about-link').textContent = 'Контакт';
        document.getElementById('sign-out-button').textContent = 'Изход';
        document.querySelector('.footer-content p').textContent = '© 2024 InsightMeteo. Всички права са запазени.';
        motoText.textContent = 'Вижте прогнозата за времето за всеки град на света като използвата търсачката.';
        translateButton.textContent = 'EN';
        translateWeatherToBulgarian();
    } else {
        document.getElementById('home-link').textContent = 'Home';
        document.getElementById('about-link').textContent = 'Contact';
        document.getElementById('sign-out-button').textContent = 'Sign out';
        document.querySelector('.footer-content p').textContent = '© 2024 InsightMeteo. All rights reserved.';
        motoText.textContent = 'See the forecast for any city in world by using the search bar.';
        translateButton.textContent = 'BG';
        translateWeatherToEnglish();
    }
    isEnglish = !isEnglish;
}

function translateWeatherToBulgarian() {
    const weatherInfoDiv = document.getElementById('weather-info');
    const fivedayforecast = document.getElementById('five-day-forecast');
    weatherInfoDiv.innerHTML = weatherInfoDiv.innerHTML
        .replace('Humidity:', 'Влажност:')
        .replace('Wind Speed:', 'Скорост на вятъра:')
        .replace('overcast clouds', 'облачно небе')
        .replace('clear sky', 'ясно небе')
        .replace('few clouds', 'малки облаци')
        .replace('scattered clouds', 'разпръснати облаци')
        .replace('broken clouds', 'разкъсани облаци')
        .replace('shower rain', 'лек дъжд')
        .replace('light rain', 'лек дъжд')
        .replace('moderate  rain', 'умерен дъжд')
        .replace('moderate', 'умерен')
        .replace('rain', 'дъжд')
        .replace('thunderstorm', 'буря')
        .replace('snow', 'сняг')
        .replace('mist', 'мъгла');


    fivedayforecast.innerHTML = fivedayforecast.innerHTML
    .replace('Monday','Понеделник' )
    .replace('Tuesday', 'Вторник')
    .replace('Wednesday','Сряда' )
    .replace('Thursday', 'Четвъртък')
    .replace('Friday', 'Пътък')
    .replace('Saturday','Събота' )
    .replace('Sunday', 'Неделя');

}

function translateWeatherToEnglish() {
    const weatherInfoDiv = document.getElementById('weather-info');
    const fivedayforecast = document.getElementById('five-day-forecast');
    weatherInfoDiv.innerHTML = weatherInfoDiv.innerHTML
        .replace('Влажност:', 'Humidity:')
        .replace('Скорост на вятъра:', 'Wind Speed:')
        .replace('облачно небе', 'overcast clouds')
        .replace('ясно небе', 'clear sky')
        .replace('малки облаци', 'few clouds')
        .replace('разпръснати облаци', 'scattered clouds')
        .replace('разкъсани облаци', 'broken clouds')
        .replace('лек дъжд', 'shower rain')
        .replace('лек дъжд', 'light rain')
        .replace('умерен дъжд', 'moderate rain')
        .replace('умерен', 'moderate')
        .replace('дъжд', 'rain')
        .replace('буря', 'thunderstorm')
        .replace('сняг', 'snow')
        .replace('мъгла', 'mist');

        fivedayforecast.innerHTML = fivedayforecast.innerHTML
        .replace('Понеделник', 'Monday')
        .replace('Вторник', 'Tuesday')
        .replace('Сряда', 'Wednesday')
        .replace('Четвъртък', 'Thursday')
        .replace('Петък', 'Friday')
        .replace('Събота', 'Saturday')
        .replace('Неделя', 'Sunday');
       
}

