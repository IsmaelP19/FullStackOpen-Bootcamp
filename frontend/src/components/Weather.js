import React, {useState, useEffect} from "react"
import axios from "axios"

const Weather = ({capital}) => {
  const api_key = process.env.REACT_APP_WEATHER_API_KEY
  const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
  const [weather, setWeather] = useState([])
  const hook = () => {
    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
      })
  }
  useEffect(hook)

  if (weather.length === 0) {
    return (
      <div>
        Loading...
      </div>
    )
  } else {
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <div><b>temperature:</b> {weather.current.temperature} Celsius</div>
        <img src={weather.current.weather_icons[0]} alt="weather" />
        <div><b>wind:</b> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
      </div>
    )
  }

}

export default Weather