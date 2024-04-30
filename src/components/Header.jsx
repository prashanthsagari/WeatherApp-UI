import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState('false');
  //
  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem('isLoggedIn'));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setIsLoggedIn('false');
    sessionStorage.setItem('isLoggedIn', 'false');
    // sessionStorage.clear();
    alert('logged out.');
    // window.location.replace('/login');
  };

  return (
    <div>
      <Navbar expand='lg' className='bg-body-tertiary'>
        <Container>
          <Navbar.Brand href='#home'>Weather App</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              {/* <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Login</Nav.Link>
              <Nav.Link href="#link">Dashboard</Nav.Link> */}
              <Link className='m-3' to='/'>
                Home
              </Link>

              {isLoggedIn === 'false' ? (
                <Link className='m-3' to='/add'>
                  Register User
                </Link>
              ) : (
                ''
              )}

              {isLoggedIn === 'true' ? (
                <Link className='m-3' to='/dashboard'>
                  Dashboard
                </Link>
              ) : (
                ''
              )}

              {isLoggedIn === 'true' ? (
                <Link className='m-3' to='/weather'>
                  Get Weather
                </Link>
              ) : (
                ''
              )}

              {isLoggedIn == 'false' ? (
                <Link className='m-3' to='/login'>
                  Login
                </Link>
              ) : (
                <Link className='m-3' to='/login' onClick={handleLogout}>
                  Logout
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
