import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

interface RegisterCredentials {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

interface RegisterResponse {
  email: string;
  jwt: string;
  expiresAt: string;
}

function RegisterForm() {
 
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState<RegisterCredentials>({
    email: '',
    firstname: '',
    lastname: '',
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
      const response = await fetch('https://localhost:7052/api/Users/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = (await response.json()) as RegisterResponse;

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
    <div>
      <h2>Register</h2>
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
          <label>First Name:</label>
          <input
            type="text"
            name="firstname" 
            value={credentials.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={credentials.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <a href="/Login">zum Login</a>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      {isLoading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default RegisterForm;