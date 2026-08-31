//change the temperature and city name in the UI
function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(temperature);

    let cityElement = document.querySelector("#cityName");
    cityElement.innerHTML = response.data.city;   
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
//search for a default city when the page loads
searchCity("Paris");