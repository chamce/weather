// creating constants to reference html elements

const zip = document.querySelector('#zip-code');
const button = document.querySelector('#get-weather');
const city = document.querySelector('#city');
const kelvin = document.querySelector('#K');
const fahrenheit = document.querySelector('#F');
const celsius = document.querySelector('#C');
const condition = document.querySelector('#condition');
const other = document.querySelector('#other-info');
const base = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const key = '&appid=5aeb4f9ca45cdcec678e56d2e11b08f7';
let url;

function displayResults(json) {
    city.textContent = json.name;
    kelvin.textContent = Math.round(json.main.temp) + ' K';
    fahrenheit.textContent = Math.round((json.main.temp - 273.15) * 9 / 5 + 32) + ' F';
    celsius.textContent = Math.round(json.main.temp - 273.15) + ' C';
    condition.textContent = json.weather[0].description[0].toUpperCase() + json.weather[0].description.substring(1);
}

// function called when get weather button clicked

button.onclick = function () {
    if (zip.value.length === 5) {
        url = base + zip.value + key;

        fetch(url).then(function (result) {
            return result.json();
        }).then(function (json) {
            displayResults(json);
        });
    }
}