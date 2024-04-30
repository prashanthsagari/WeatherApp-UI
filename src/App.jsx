import { useState } from 'react';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Weather from './components/Weather';
import Footer from './components/Footer';
import UserRegistrationForm from './components/UserRegistrationForm';

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
        <div className='mt-5'>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
