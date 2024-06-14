import { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({lat, lng}) => {
 
  const [weather, setWeather] = useState(null)
  const baseURL = 'https://api.open-meteo.com/v1/forecast?'
  useEffect(() => { 
    axios.get(`${baseURL}latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m`)
      .then(response => {
        setWeather(response.data)
      })
  }
  , [lat,lng])
  console.log('weather:', weather)
  if (weather === null) return (<div>loading...</div>)
  return (
    <div>
      <p><strong>temperature:</strong> {weather.current.temperature_2m} °C</p>
      <p><strong>wind:</strong> {weather.current.wind_speed_10m} km/h</p>
    </div>
  )
}

export default Weather