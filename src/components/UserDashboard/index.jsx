import React from 'react';
import Header from '../Header';
import { Link } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  return (
    <>
      <Header />
      <div className="user-dashboard">
        <h1 style={{ textAlign: 'center', padding: '1rem' }}>
          Welcome to Dashboard
        </h1>
        <div>
          <ul className="movies">
            <li className="movie-link btn">
              <Link to="/movies">Movies</Link>
            </li>
            <li className="movie-link btn">
              <Link to="/add/movie">Add New Movie</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
