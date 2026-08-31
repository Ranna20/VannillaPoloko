//change city name when user submits the form
function handleSearchFormSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let cityName = document.querySelector("#cityName");
  cityName.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchFormSubmit);