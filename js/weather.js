const APIKey = 'VRSBCrFmeqc4zuKz8NWNisFuU4DbkmRU'
const baseUrl = 'http://dataservice.accuweather.com/'
const getCityUrl = cityName =>
`${baseUrl}locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`

const getWeatherUrl = cityKey => 
  `${baseUrl}currentconditions/v1/${cityKey}?apikey=${APIKey}&language=pt-br` 

const fetchUrl = async url => {
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error('Não foi possivel carregar os dados')
    }
   
    return response.json()
  } catch ({name, message}) {
    alert(`${name}: ${message}`)
  }
}

const getCityData = cityName => fetchUrl(getCityUrl(cityName))

const getCityWeather = async cityKey => fetchUrl(getWeatherUrl(cityKey))
