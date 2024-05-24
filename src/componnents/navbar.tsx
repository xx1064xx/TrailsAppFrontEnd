import React from 'react';
import '../styles/navbar.css';


function Navbar() {
  return (
    <nav>
      <a href="/">
        <img src="/TrailTales.svg" alt="TrailTales Logo"/>
      </a>
      <h1>Trail Tales</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;