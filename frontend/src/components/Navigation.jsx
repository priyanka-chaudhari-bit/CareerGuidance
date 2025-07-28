import React, { useState,useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import '../App.css'
function Navigation() {
  const { user, logout, authToken } = useContext(AuthContext);
  console.log("User from context of navigation:", user);
  const isLoggedIn = !!authToken;
  return (
    <>
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">CareerGuide</Navbar.Brand>
          <Nav className="ms-auto">
            {/* <Nav.Link as={Link} to="/admin-login">Login</Nav.Link>
            <Nav.Link as={Link} to="/admin-register">Sign Up</Nav.Link> */}
            <Nav.Link as={Link} to="/admin-register" className="nav-link-custom">Admin Panel</Nav.Link>
            {!isLoggedIn && (
            <>
              <Nav.Link as={Link} to="/user-login" className="nav-link-custom">Login</Nav.Link>
              <Nav.Link as={Link} to="/user-register" className="nav-link-custom">Sign Up</Nav.Link>
            </>
            )}
          </Nav>
          {isLoggedIn && (
            <>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="welcome-text">
            Welcome &nbsp;<strong><a href='/user-profile' style={{ textDecoration: 'none', color: '#9932cc' }}>{user?.name || user?.anon_username}</a></strong>
          </Navbar.Text>
          <Nav>
            {/* <Nav.Link as={Link} to="/admin-register">Logout</Nav.Link> */}
            <button onClick={logout} style={{ backgroundColor: '#dc3545', color: 'white',  border: 'none',  padding: '8px 12px', marginLeft: '30px', borderRadius: '4px',  cursor: 'pointer'  }} type="submit">Logout</button>
          </Nav>
        </Navbar.Collapse>
        </>
        )}
        </Container>
      </Navbar>
    </>
  )
}

export default Navigation
