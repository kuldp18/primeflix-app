import React, { useState } from 'react';
import Header from '../Header';
import { API } from '../../backend';
import './Login.css';
import { isAuthenticated, authenticate } from '../../helpers/auth';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [didRedirect, setDidRedirect] = useState(false);
  const user = isAuthenticated();
  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };

  const loginUser = async (email, password) => {
    try {
      const response = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      const accessToken = data.data.accessToken;
      authenticate(accessToken, () => {
        setEmail('');
        setPassword('');
        setDidRedirect(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const performRedirect = () => {
    if (didRedirect) {
      return <Redirect to="/user/dashboard" />;
    }
    if (isAuthenticated()) {
      return <Redirect to="/user/dashboard" />;
    }
  };
  return (
    <>
      <Header />
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 style={{ color: 'white', fontSize: '2.8rem' }}>Login</h1>
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
      {performRedirect()}
    </>
  );
};

export default Login;
