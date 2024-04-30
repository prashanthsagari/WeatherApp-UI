import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { AuthenticationContext } from './AuthenticationContext';

export default function Header() {
  const authenticationContext = useContext(AuthenticationContext);
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
              {authenticationContext.val === false ? (
                <Link className='m-3' to='/login'>
                  Login
                </Link>
              ) : (
                <Link
                  className='m-3'
                  to='/login'
                  onClick={authenticationContext.val === false}
                >
                  Logout
                </Link>
              )}
              {/* <Link className='m-3' to='/dashboard'>
                Dashboard
              </Link>
              <Link className='m-3' to='/add'>
                Person
              </Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
