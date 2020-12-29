/**** Weather text ****/
/* If coords are saved in local storage, call getWeather. */
/* else get coords info from navigator. */
/* In getWeather function, 
   1. use fetch method, get weather data from openweathermap API.
   2. show temp and location info in [class=js-weather]. */

const API_KEY = "1ce15a32671c504dc79b7506d9b7752d"
const COORDS_LS = "coords"

const weather = document.querySelector(".js-weather")

function showWeather(temparature, location) {
    const weatherTxt = `${temparature}˚, @${location}`
    weather.innerText = weatherTxt;
}

function setCoordsToLS(val) {
    localStorage.setItem(COORDS_LS, val);
}

function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const temp = json.main.temp
        const loc = json.name
        showWeather(temp, loc)
    })
}

function handleWeatherSuccess(pos) {
    const coords = pos.coords;

    const latitude = coords.latitude
    const longitude = coords.longitude;

    // getWeather
    getWeather(latitude, longitude)

    const coordsObj = {
        latitude,
        longitude
    }

    // save to local storage
    setCoordsToLS(JSON.stringify(coordsObj))
}

function handleWeatherError() {
    console.error(" Cannot access to current position.")
}

function getCoords() {
    const geoData = navigator.geolocation
    geoData.getCurrentPosition(handleWeatherSuccess, handleWeatherError)
}

function init() {
    const coords = localStorage.getItem(COORDS_LS)
    if(coords === null) {
        getCoords()
    } else {
        const parsedCoords = JSON.parse(coords)
        getWeather(parsedCoords.latitude, parsedCoords.longitude)
    }
}

init()