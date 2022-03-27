import React, { useState } from 'react';
import Header from '../Header';
import './Register.css';
import { API } from '../../backend';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(name, email, password);
  };

  const registerUser = async (name, email, password) => {
    try {
      const response = await fetch(`${API}/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      console.log(data);
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <form className="register-form" onSubmit={handleSubmit}>
        <h1 style={{ color: 'white', fontSize: '2.8rem' }}>Register</h1>
        <input
          type="text"
          placeholder="Name"
          required
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </>
  );
};

export default Register;
