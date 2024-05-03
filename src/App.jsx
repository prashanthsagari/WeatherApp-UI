import { useEffect, useState } from 'react';
import Header from './components/Header';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

import UserRegistrationForm from './components/Registration/UserRegistrationForm';
import Footer from './components/Footer/Footer';
import Weather from './components/Weather/Weather';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Testing from './components/Testing/Testing';
import Bookmark from './components/Bookmark/Bookmark';
import Contact from './components/ContactUs/Contact';

function App() {
  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem('isLoggedIn'));
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState();

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/dashboard'
            element={isLoggedIn == 'true' ? <Dashboard /> : <Login />}
          />
          <Route
            path='/weather'
            element={isLoggedIn == 'true' ? <Weather /> : <Login />}
          />
          <Route
            path='/favorites'
            element={isLoggedIn == 'true' ? <Bookmark /> : <Login />}
          />
          <Route path='/add' element={<UserRegistrationForm />} />
          <Route path='/logout' element={<Login />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/test' element={<Testing />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
        <div className='m-5'>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
