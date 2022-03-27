import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
const Header = () => {
  return (
    <header className="header">
      <h1 className="title">
        <Link to="/">Primeflix</Link>
      </h1>
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
