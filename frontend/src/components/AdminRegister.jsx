import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import AdminNavigation from './AdminNavigation';
const AdminRegister = () => {
  const [formData, setFormData] = useState({
    secret_key: '',
    username: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage('');
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/admin/admin-register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setFormData({ secret_key: '', username: '', email: '', password: '' });

        setTimeout(() => {
          navigate('/admin/dashboard'); 
        }, 1000); 
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <>
    <AdminNavigation/>
    <div style={{ maxWidth: '400px', margin: '5rem auto',textAlign:'center' }}>
      <h2>Admin Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="secret_key"
          placeholder="Secret Key"
          value={formData.secret_key}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
      <br/>
      <h4>Already Registered? <a href='/admin-login'>Login here</a></h4>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </>
  );
};

export default AdminRegister;
