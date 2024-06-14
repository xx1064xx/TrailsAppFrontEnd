import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

interface RegisterCredentials {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  passwordRepeat: string;
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
    passwordRepeat: '',
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
    <div className='contentCard contentAligner'>
      <div className='loginDiv'>
      <h2>Register</h2>
      <form className='loginRegisterForm' onSubmit={handleSubmit}>
        <div className='inputDiv'>
          <input className='loginInput'
            type="email"
            name="email"
            placeholder='Email'
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='inputDiv'>
          <input className='loginInput'
            type="text"
            name="firstname" 
            placeholder='First Name'
            value={credentials.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className='inputDiv'>
          <input className='loginInput'
            type="text"
            name="lastname"
            placeholder='Last Name'
            value={credentials.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div className='inputDiv'>
          <input className='loginInput'
            type="password"
            name="password"
            placeholder='Password'
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className='inputDiv'>
          <input className='loginInput'
            type="password"
            name="passwordRepeat"
            placeholder='Repeat Password'
            value={credentials.passwordRepeat}
            onChange={handleChange}
            required
          />
        </div>
        <div className='inputDiv'>
          <button className='submitButton normalFont' type="submit" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>
        <div>
          <a className='tinyFont' href="/Login">zum Login</a>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      {isLoading && <div className="loading">Loading...</div>}
      </div>
      <div className='theOtherDiv'>
        <h1 className='white'>Trail Tales</h1>
        <img src='../TrailTalesWhite.svg'></img>
      </div>
    </div>
      
  );
};

export default RegisterForm;