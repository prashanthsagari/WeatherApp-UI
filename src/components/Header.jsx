import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState('false');

  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem('isLoggedIn'));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    setIsLoggedIn('false');
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.clear();
    window.history.go(-(window.history.length - 1));
    alert('logged out.');
  };

  return (
    <div>
      <Navbar expand='lg' className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand href='/'>Weather App</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              {/* <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Login</Nav.Link>
              <Nav.Link href="#link">Dashboard</Nav.Link> */}
              <Link className='m-3 text-decoration-none' to='/'>
                Home
              </Link>

              {isLoggedIn === 'true' ? (
                ''
              ) : (
                <Link className='m-3 text-decoration-none' to='/add'>
                  Register User
                </Link>
              )}

              {isLoggedIn === 'true' ? (
                <Link className='m-3 text-decoration-none' to='/dashboard'>
                  Dashboard
                </Link>
              ) : (
                ''
              )}

              {isLoggedIn === 'true' ? (
                <Link className='m-3 text-decoration-none' to='/weather'>
                  Get Weather
                </Link>
              ) : (
                ''
              )}

              {isLoggedIn === 'true' ? (
                <Link className='m-3 text-decoration-none' to='/favorites'>
                  Favorites
                </Link>
              ) : (
                ''
              )}

              <Link className='m-3 text-decoration-none' to='/contact'>
                Contact Us
              </Link>

              {isLoggedIn == 'true' ? (
                <Link
                  className='m-3 text-decoration-none'
                  to='/login'
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              ) : (
                <Link className='m-3 text-decoration-none' to='/login'>
                  Login
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
