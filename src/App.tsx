import { useState, useEffect, FormEvent } from 'react'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import IndexPage from './pages';

interface WeatherData {
  date: string
  temperatureC: string
  summary: string
}



function App() {
  /*
  const [weatherData, setWeatherData] = useState([] as WeatherData[]);


  let isInitial = true;

  
  useEffect(() => {

    if (isInitial) {
      async function fetchData() {
        try {
          const response = await fetch('https://localhost:7052/WeatherForecast');
          const data = (await response.json()) as WeatherData[];
          setWeatherData(data);
        } catch (error) {
          console.error('Error fetching the weather data:', error);
        }
      }
  
      fetchData();

      isInitial = false;
    }

  }, []);
*/
  /*
  async function postUser() {
    const user: User = { firstname, lastname, email, password };

    try {
      const response = await fetch('https://localhost:7052/api/Users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      console.log("bis da anne gahts");

      if (response.ok) {
        console.log('User registered successfully!');
        
      } else {
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error registering the user:', error);
    }
  }
*/


/*

{weatherData.map((element, index) => (
            <tr key={index}>
              <td>{element.date}</td>
              <td>{element.temperatureC}</td>
              <td>{element.summary}</td>
            </tr>
          ))}

          */

  return (
    <>
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<IndexPage/>}/>
        <Route path='/Login' element={<LoginPage/>}/>
        <Route path='/Register' element={<RegisterPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}



export default App
