import React, { useState, useEffect } from 'react';
import Header from '../Header';
import { API } from '../../backend';
import { isAuthenticated } from '../../helpers/auth';
import { v4 as uuidv4 } from 'uuid';
import './Movies.css';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Movies = () => {
  const token = isAuthenticated();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getMovies();
  }, []);

  const handleDelete = async (movieId) => {
    try {
      const response = await fetch(`${API}/deleteMovie/${movieId}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          token,
        },
      });
      const deletedMovie = await response.json();
      setSuccess(true);
      setMovies(movies.filter((movie) => movie._id !== deletedMovie._id));
    } catch (error) {
      setSuccess(false);
      setError(true);
      console.log(error);
    }
  };

  const getMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/getMovies`, {
        headers: {
          token,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setMovies(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const successMessage = () => {
    if (success) {
      return <p className="message success-message">Movie deleted!</p>;
    }
  };
  const errorMessage = () => {
    if (error) {
      return (
        <p className="message error-message">Movie could not be deleted!</p>
      );
    }
  };
  return (
    <>
      <Header />

      <div className="movies-container">
        {successMessage()}
        {errorMessage()}
        {loading
          ? 'Loading movies....'
          : movies.map((movie) => {
              return (
                <div className="movie" key={uuidv4()}>
                  <h1 className="movie-title">
                    {movie.title} <span className="genre">({movie.genre})</span>
                  </h1>

                  <Link to={`/edit/movie/${movie._id}`}>
                    <MdModeEditOutline className="edit-icon icon" />
                  </Link>
                  <MdDelete
                    className="delete-icon icon"
                    onClick={() => handleDelete(movie._id)}
                  />
                </div>
              );
            })}
      </div>
    </>
  );
};

export default Movies;
