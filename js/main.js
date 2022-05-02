let weatherKey = config.weatherKey
let unsplashKey = config.unsplashKey

// Create form variable
const form = document.querySelector('#cityDataForm')

form.addEventListener('submit', (event)=> {
    event.preventDefault();
    let cityName = document.querySelector('#cityName').value
    
    loadData(cityName)
    console.log(cityName) 
})


// Create a function to create each element
const loadData = async (cityName) => {
    clearData()
    const weatherList = await getData(cityName)
    const cityPicture = await getPicData(cityName)

    showWeather(cityPicture.urls.regular, cityPicture.user.name, weatherList.name, weatherList.main.temp, weatherList.weather[0].main, weatherList.main.humidity, 
                                        weatherList.main.temp_min, weatherList.main.temp_max)
}


// Clear the data
const clearData = () => {
    document.querySelector(DOM_Elements.weather).innerHTML = '';
}


// Get the city weather data
const getData = async (cityName) => {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${weatherKey}`)
    console.log(response.data)
    return response.data
}


// // Get the city photo data
const getPicData = async (cityName) => {
    let response = await axios.get(`https://api.unsplash.com/photos/random?query=${cityName}&orientation=landscape&client_id=${unsplashKey}`)
    console.log(response.data)
    return response.data
}

// Create a constant to hold DOM Elements 
const DOM_Elements = {
    weather: '.weather-list',
}


// Show Weather List HTML
const showWeather = (picture, photographer, city, temp, forecast, humidity, tempMin, tempMax) => {

    const html = 
        `<div id="boxOne">
            <h1 class="weather-city-title">${city}</h1>
            <img id="image" src="${picture}" alt="Picture of ${city}">
            <p id="photoCred" >Photo Credit: ${photographer} on <a href="https://unsplash.com">Unsplash</a>
            <div id="text-block">
                <p class="section-group-item">TEMPERATURE: ${temp} °F</p>
                <p class="section-group-item">HIGH: ${tempMax} °F</p>
                <p class="section-group-item">LOW: ${tempMin}°F</p>
                <p class="section-group-item">FORECAST: ${forecast}</p>
                <p class="section-group-item">HUMIDITY: ${humidity}%</p>
            </div>
        </div>`

    // Paste list item on document 
    document.querySelector(DOM_Elements.weather).insertAdjacentHTML('beforeend', html)
}
