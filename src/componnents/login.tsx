import React, { useState } from 'react';

interface LoginCredentials {
  username: string;
  password: string;
}

function LoginForm() {
 
  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"

          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;