const formCity = document.querySelector('[data-js="form-city"]')
const imageTimeContainer = document.querySelector('[data-js="image-time"]')
const nameCityContainer = document.querySelector('[data-js="name-city"]')
const weatherContainer = document.querySelector('[data-js="weather"]')
const temperatureContainer = document.querySelector('[data-js="temperature"]')
const weatherIconImage = document.querySelector('[data-js="weather-icon"]')
const weatherInfosArea = document.querySelector('[data-js="weather-infos-area"]')

const showAreaInfos = () => {
    if (weatherInfosArea.classList.contains('none')) {
        weatherInfosArea.classList.remove('none')
    }
}

const getInfoWeather = async inputValue => {
    const [{ Key, LocalizedName }] = await fetchData(getUrlCity(inputValue))
    const [{ WeatherText, IsDayTime, Temperature, WeatherIcon }] = await
        fetchData(getWeatherUrl(Key))

    imageTimeContainer.src = IsDayTime ? './src/sun.png' : './src/half-moon.png'
    nameCityContainer.textContent = LocalizedName
    weatherContainer.textContent = WeatherText
    temperatureContainer.textContent = `${Temperature.Metric.Value}° C`
    weatherIconImage.src = `./src/icons/${WeatherIcon}.svg`

    showAreaInfos()
}

const showLocalStorageCity = () => {
    const city = localStorage.getItem('city')

    if (city) {
        getInfoWeather(city)
    }
}

formCity.addEventListener('submit', event => {
    event.preventDefault()

    const inputValue = event.target.city.value.trim()
    getInfoWeather(inputValue)

    localStorage.setItem('city', inputValue)
    
    formCity.reset()
})

showLocalStorageCity()