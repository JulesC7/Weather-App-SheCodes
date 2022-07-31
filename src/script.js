let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let time = now.getHours();
let hours = 0;
if (time < 10) {
  hours = `0${time}`;
} else {
  hours = time;
}

let minute = now.getMinutes();
let minutes = 0;
if (minute < 10) {
  minutes = `0${minute}`;
} else {
  minutes = minute;
}
let day = `${days[now.getDay()]} ${hours}:${minutes}`;
document.getElementById("day").innerHTML = day;

//searching weather for typing city
function weatherOfTypingCity(response) {
  console.log(response.data);
  document.getElementById(
    "searching-city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.getElementById("weather-description").innerHTML =
    response.data.weather[0].description;
  document.getElementById("actual-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.getElementById("wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.getElementById(
    "humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.getElementById("feels-like").innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}°C`;
  document
    .getElementById("icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .getElementById("icon")
    .setAttribute("alt", response.data.weather[0].description);
}

function cityWeather(city) {
  let apiKey = "7aec51ba2bbd8ce99d79cfa13f7ae381";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${url}&appid=${apiKey}`).then(weatherOfTypingCity);
}

function searchForm(event) {
  event.preventDefault();
  let search = document.querySelector("#search-engine");
  let city = search.value;
  cityWeather(city);
}
let search = document.querySelector("#search-bar");
search.addEventListener("submit", searchForm);
//end searching weather for typing city

//looking for current location
function weatherCurrentPosition(response) {
  console.log(response);
  document.getElementById(
    "searching-city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.getElementById("weather-description").innerHTML =
    response.data.weather[0].description;
  document.getElementById("actual-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.getElementById("wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.getElementById(
    "humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.getElementById("feels-like").innerHTML = `Feels like ${Math.round(
    response.data.main.feels_like
  )}°C`;
  document
    .getElementById("icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .getElementById("icon")
    .setAttribute("alt", response.data.weather[0].description);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

function currentPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  console.log(lat, lon);
  let apiKey = "7aec51ba2bbd8ce99d79cfa13f7ae381";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${url}&appid=${apiKey}`).then(weatherCurrentPosition);
}

let currentCity = document.querySelector("#current-city");
currentCity.addEventListener("click", getCurrentPosition);
//end looking for current location

//choosing between Celsius and Fahrenheit
function tempCelsius() {
  document.getElementById("actual-temp").innerHTML = 17;
  document.getElementById("celsius-link").style = "color:#931199";
  document.getElementById("fahrenheit-link").style = "color: #212529";
}
let tempCel = document.querySelector("#celsius-link");
tempCel.addEventListener("click", tempCelsius);

function tempFahrenheit() {
  document.getElementById("actual-temp").innerHTML = 63;
  document.getElementById("fahrenheit-link").style = "color: #931199";
  document.getElementById("celsius-link").style = "color:#212529";
}
let tempFah = document.querySelector("#fahrenheit-link");
tempFah.addEventListener("click", tempFahrenheit);
//end choosing between Celsius and Fahrenheit

cityWeather("Kyiv");
