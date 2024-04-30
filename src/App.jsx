import { useState } from 'react';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

import UserRegistrationForm from './components/Registration/UserRegistrationForm';
import Footer from './components/Footer/Footer';
import Weather from './components/Weather/Weather';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/logout' element={<Login />} />
          <Route path='/weather' element={<Weather />} />
          <Route path='/add' element={<UserRegistrationForm />} />
        </Routes>
        <div className='m-5'>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
