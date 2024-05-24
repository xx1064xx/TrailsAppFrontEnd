import React, { useState } from 'react';

function RegisterForm() {
 
  return (
    <div>
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
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"

          />
        </div>
        <button type="submit">Registrieren</button>
      </form>
    </div>
  );
};

export default RegisterForm;