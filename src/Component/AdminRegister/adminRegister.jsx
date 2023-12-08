import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import './adminRegister.css';
const AdminRegistrationForm = () => {
  const navigate= useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Creating an object with admin data
    const adminData = {
      email,
      password,
    };

    // Storing admin data in localStorage
    localStorage.setItem('AdminData', JSON.stringify(adminData));

    // Clearing the form fields after submission
    setEmail('');
    setPassword('');
    alert('Registration Successful Please Login.');
    window.location.reload();
    
    
  };

  return (
    <div className="cart">
      <h3>Register Here</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="cart-item">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="cart-item">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button className='btn' type="submit">Register</button>
      </form>
    </div>
  );
};

export default AdminRegistrationForm;
