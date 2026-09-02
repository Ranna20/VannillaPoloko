//change the weather data on the UI when the api call is successful
function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(temperature);

    let cityElement = document.querySelector("#cityName");
    cityElement.innerHTML = response.data.city;  

    let descriptionElement = document.querySelector("#weather-description");
    descriptionElement.innerHTML = response.data.condition.description;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.temperature.humidity;
    
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${response.data.wind.speed} km/h`;

    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    timeElement.innerHTML = formatDate(date);

    let iconElement = document.querySelector("#weather-icon");
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" " />`;
    console.log(response.data);

    getForecast(response.data.city);
}

function formatDate(date) {
    let day = date.getDay()
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return `${days[day]}, ${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}

//make api call and update the UI only search for a city
function searchCity(city) {
  let apikey = "c9o83a4fd3bf05dt29b93022d8402160";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

//change city name when user submits the form
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}
function getForecast(city) {
  let apiKey = "c9o83a4fd3bf05dt29b93022d8402160";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayforecast);
}
//forecast data
function displayforecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function(day, index) {
    if (index < 5) {
      forecastHtml = forecastHtml + `
        <div class="weather-app-forecast-day">
          <div class="weather-app-forecast-date">${formatDay(day.time)}</div>
          <div class="weather-app-forecast-icon">
            <img src="${day.condition.icon_url}" alt="${day.condition.description}" width="80" />
          </div>
          <div class="weather-app-forecast-temperatures">
            <div class="weather-app-forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}º</strong>
            </div>
            <div class="weather-app-forecast-temperature">${Math.round(day.temperature.minimum)}º</div>
          </div>
        </div>
      </div>
    `;
  }});
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);


//search for a default city when the page loads
searchCity("Gaborone");
displayforecast();