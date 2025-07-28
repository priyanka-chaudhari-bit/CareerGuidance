import React, { useState,useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { AdminAuthContext } from '../context/AdminAuthContext';
import '../styles/AdminNavigation.css'
function AdminNavigation() {
  const { login, logout, access_admin,admin_username } = useContext(AdminAuthContext);

  const isLoggedIn = !!access_admin;
  console.log("isloggedin", isLoggedIn)

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">CareerGuide</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/user-register" className="nav-link-custom">Student Panel</Nav.Link>
            {!isLoggedIn && (
            <>
              <Nav.Link as={Link} to="/admin-login" className="nav-link-custom">Login</Nav.Link>
              <Nav.Link as={Link} to="/admin-register" className="nav-link-custom">Sign Up</Nav.Link>
            </>
            )}
          </Nav>
          {isLoggedIn && (
            <>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="welcome-text">
            Welcome &nbsp;<strong>{admin_username}</strong>
          </Navbar.Text>
          <Nav>
           
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

export default AdminNavigation
