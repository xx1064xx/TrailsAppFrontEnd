import React, { useState } from 'react';
import {  useNavigate } from "react-router-dom";
import '../styles/LoginRegister.css'

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  email: string;
  jwt: string;
  expiresAt: string;
}

function LoginForm() {

  let navigate = useNavigate();

  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage(null); 

    try {
      const response = await fetch('https://localhost:7052/api/Users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = (await response.json()) as LoginResponse;

      localStorage.setItem('jwt-token', data.jwt);
      
      console.log(data);

      return navigate("/Trails");

    } catch (error: any) {
      if (error.response) {
        
        setErrorMessage(error.response.data.message || 'Login failed'); 
      } else {
        setErrorMessage('Network error'); 
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='contentCard'>
      <div className='loginDiv'>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Passwort:</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <a href="/register">noch keinen Account?</a>
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        {isLoading && <div className="loading">Loading...</div>}
        </div>
      <div className='theOtherDiv'>

      </div>
      
    </div>
  );
};

export default LoginForm;