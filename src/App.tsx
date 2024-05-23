import { useState, useEffect } from 'react'
import axios from 'axios'; // for making API calls

import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://localhost:7052/WeatherForecast');
      console.log(response.data);
      setWeatherData(response.data);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Weather Forecast</h1>
    </>
  );
}

export default App
