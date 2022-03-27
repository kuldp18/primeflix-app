import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { isAuthenticated } from '../../helpers/auth';
const Header = () => {
  return (
    <header className="header">
      <h1 className="title">
        <Link to="/">Primeflix</Link>
      </h1>
      <ul>
        <li>{isAuthenticated() ? '' : <Link to="/register">Register</Link>}</li>
        <li>
          {isAuthenticated() ? (
            <Link to="/user/dashboard">Dashboard</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </header>
  );
};

export default Header;
