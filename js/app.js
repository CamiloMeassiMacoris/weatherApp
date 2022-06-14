const cityForm = document.querySelector('[data-js="change-location"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer = document
  .querySelector('[data-js="city-temperature"]')
const cityCard = document.querySelector('[data-js="city-card"]')
let timeImg =  document.querySelector('[data-js="time"]')
const timeIconContainer = document.querySelector('[data-js="time-icon"]')
const timeICon = WeatherIcon => `<img src="./src/icons/${WeatherIcon}.svg"></img>`

const getRequests = async (cityName) => {
  localStorage.setItem('city', cityName)
  let city= ''
  if (localStorage.length !== 0) {
     city = cityName
  }
  const cityExist = city || cityName
  const [{ Key, LocalizedName }] = await getCityData(cityExist)
  const [{ WeatherText, Temperature, IsDayTime, WeatherIcon}] = await getCityWeather(Key)

  return [{ Key, LocalizedName }, { WeatherText, Temperature, IsDayTime, WeatherIcon}]
}

const showWeatherContainer = () => {
  if (cityCard.classList.contains('d-none')) {
    cityCard.classList.remove('d-none')
  }
}

const addWeatherCityContents = async cityName => {
  const [{ Key, LocalizedName}, 
    { IsDayTime, Temperature, WeatherText, WeatherIcon} ] = 
  await getRequests(cityName)

  timeImg.src = IsDayTime ?'./src/day.svg' :'./src/night.svg'
  timeIconContainer.innerHTML = timeICon(WeatherIcon)
  cityNameContainer.textContent = LocalizedName
  cityWeatherContainer.textContent = WeatherText
  cityTemperatureContainer.textContent = Temperature.Metric.Value
  
  showWeatherContainer() 
}

const showLocalSorageCity = () => {
  if (localStorage.length !== 0) {
    addWeatherCityContents(localStorage.getItem('city'))
  }
}

cityForm.addEventListener('submit', event => {
  event.preventDefault()
  
  const inputValue = event.target.city.value
  
  addWeatherCityContents(inputValue)

  cityForm.reset()
})

showLocalSorageCity()