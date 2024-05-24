import React, { useState } from 'react';
import '../styles/LoginRegister.css'

interface LoginCredentials {
  username: string;
  password: string;
}

function LoginForm() {
 
  return (
    <div className='fullDiv'>
      <h2>Login</h2>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            
          />
        </div>
        <div>
          <label>Passwort:</label>
          <input
            type="password"
            name="password"

          />
        </div>
        <div>
        <a href="/register">noch keinen Account?</a>
        <button type="submit">Login</button>
        </div>
        
      </form>
    </div>
  );
};

export default LoginForm;