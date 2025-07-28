import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/UserLogin.css';
import Navigation from './Navigation';

function UserLogin() {
    const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://127.0.0.1:8000/students/user-login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        // Save access, refresh, and user to AuthContext
        login(data.access, data.refresh, data.user);
        navigate('/user-dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };
  return (
    <>
    <Navigation/>
      <div className="login-container">
      <h2>User Login</h2>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>

        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">Login</button>
      </form><br/>
      
    </div>
    <h5>New to CareerGuide? <a href='/user-register'>Register here</a></h5>
    </>
  )
}

export default UserLogin
