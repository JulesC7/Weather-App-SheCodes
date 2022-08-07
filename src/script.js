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

function weatherForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let forecastHTML = "";
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="card week-weather" style="width: 10%">
        <div class="card-body">
          <h5 class="card-title">${day}</h5>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            fill="currentColor"
            class="bi bi-cloud-drizzle"
            viewBox="0 0 16 16"
          >
            <path
              d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm-3.5 1.5a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm6 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm.747-8.498a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973zM8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4.002 4.002 0 0 1 8.5 2z"
            />
          </svg>
          <h6 class="week-weather-temperature">19°C</h6>
        </div>
      </div>`;
  });
  forecastElement.innerHTML = forecastHTML;
}

//searching weather for typing city
function weatherOfTypingCity(response) {
  console.log(response.data);
  document.getElementById(
    "searching-city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.getElementById("weather-description").innerHTML =
    response.data.weather[0].description;
  celsiusTemperature = response.data.main.temp;
  document.getElementById("actual-temp").innerHTML =
    Math.round(celsiusTemperature);
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
  tempCel.classList.add("active");
  tempFah.classList.remove("active");
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
  //document.querySelector("#search-engine").value = ""; (it works too)
  document.getElementById("search-engine").value = "";
  document.getElementById(
    "searching-city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.getElementById("weather-description").innerHTML =
    response.data.weather[0].description;
  document.getElementById("actual-temp").innerHTML =
    Math.round(celsiusTemperature);
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
  tempCel.classList.add("active");
  tempFah.classList.remove("active");
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
  document.getElementById("actual-temp").innerHTML =
    Math.round(celsiusTemperature);
  tempCel.classList.add("active");
  tempFah.classList.remove("active");
}

function tempFahrenheit() {
  document.getElementById("actual-temp").innerHTML = Math.round(
    (celsiusTemperature * 9) / 5 + 32
  );
  tempCel.classList.remove("active");
  tempFah.classList.add("active");
}

let celsiusTemperature = null;

let tempCel = document.querySelector("#celsius-link");
tempCel.addEventListener("click", tempCelsius);

let tempFah = document.querySelector("#fahrenheit-link");
tempFah.addEventListener("click", tempFahrenheit);
//end choosing between Celsius and Fahrenheit

cityWeather("Kyiv");
weatherForecast();
