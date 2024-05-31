import { useState, useEffect, FormEvent } from 'react'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import IndexPage from './pages';
import TrailsPage from './pages/trails';
import UserPage from './pages/user';



function App() {

  

  

  return (
    <>
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<IndexPage/>}/>
        <Route path='/Trails' element={<TrailsPage/>}/>
        <Route path='/Login' element={<LoginPage/>}/>
        <Route path='/Register' element={<RegisterPage/>}/>
        <Route path='/User' element={<UserPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}



export default App
