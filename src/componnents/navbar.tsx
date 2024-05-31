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
        <li><a href="/Trails">Trails</a></li>
      </ul>
      <div>
        <a href="/User">Account</a>
      </div>
    </nav>
  );
}

export default Navbar;