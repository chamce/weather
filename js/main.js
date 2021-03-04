// creating constants to reference html elements

const zip = document.querySelector('#zip-code');
const button = document.querySelector('#get-weather');
const city = document.querySelector('#city');
const kelvin = document.querySelector('#K');
const fahrenheit = document.querySelector('#F');
const celsius = document.querySelector('#C');
const condition = document.querySelector('#condition');
const other = document.querySelector('#other-info');
let url;

// function called after getting json data

function displayResults(json) {
    // display city name
    city.textContent = json.name;
    // display kelvin
    kelvin.textContent = Math.round(json.main.temp) + ' K';
    // convert kelvin to fahrenheit
    fahrenheit.textContent = Math.round((json.main.temp - 273.15) * 9 / 5 + 32) + ' F';
    // convert fahrenheit to celsius
    celsius.textContent = Math.round(json.main.temp - 273.15) + ' C';
    // display weather condition
    condition.textContent = json.weather[0].description[0].toUpperCase() + json.weather[0].description.substring(1);
    // display weather condition icon
    other.src = 'https://openweathermap.org/img/wn/' + json.weather[0].icon + '@2x.png';
}

// function called when get weather button clicked

button.onclick = function () {
    // if zip code is 5 digits long
    if (zip.value.length === 5) {
        // url = base + zip + key
        url = 'https://api.openweathermap.org/data/2.5/weather?zip=' + zip.value + '&appid=5aeb4f9ca45cdcec678e56d2e11b08f7';
        // fetch url
        fetch(url).then(function (result) {
            // if url bad
            if (!result.ok) {
                // tell user zip code is invalid
                zip.value = '';
                zip.placeholder = 'Invalid zip code!';
            } else {
                // zip code was valid
                zip.placeholder = 'Zip code';
                return result.json();
            }
        // display results
        }).then(function (json) {
            displayResults(json);
        });
    // zip code is not correct length
    } else {
        zip.value = '';
        zip.placeholder = 'Invalid zip code!';
    }
}