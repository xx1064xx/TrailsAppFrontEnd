import React, { useEffect, useState } from 'react';

interface WeatherData {
    date: string
    temperatureC: string
    summary: string
  }

function WeatherTable() {
 
    const [weatherData, setWeatherData] = useState([] as WeatherData[]);

    let isInitial = true;

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            fetchData();
        }

        async function fetchData() {
            try {
            const response = await fetch('https://localhost:7052/WeatherForecast');
            const data = (await response.json()) as WeatherData[];
            setWeatherData(data);
            } catch (error) {
            console.error('Error fetching the weather data:', error);
            isInitial = true;
            }

        }
    }, [ ]);


  return (
    <div className='extendedContentDiv'>
      <div className='bigContentCard'>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Temperature (°C)</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {weatherData.map((item) => (
              <tr key={item.date}>
                <td>{item.date}</td>
                <td>{item.temperatureC}</td>
                <td>{item.summary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
  );
};

export default WeatherTable;