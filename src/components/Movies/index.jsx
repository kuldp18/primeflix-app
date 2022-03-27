import React, { useState, useEffect } from 'react';
import Header from '../Header';
import { API } from '../../backend';
import { isAuthenticated } from '../../helpers/auth';
import { v4 as uuidv4 } from 'uuid';
import './Movies.css';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';

const Movies = () => {
  const token = isAuthenticated();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

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
      console.log(deletedMovie);
      setMovies(movies.filter((movie) => movie._id !== deletedMovie._id));
    } catch (error) {
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
  return (
    <>
      <Header />

      <div className="movies-container">
        {loading
          ? 'Loading movies....'
          : movies.map((movie) => {
              return (
                <div className="movie" key={uuidv4()}>
                  <h1 className="movie-title">
                    {movie.title} <span className="genre">({movie.genre})</span>
                  </h1>

                  <MdModeEditOutline className="edit-icon icon" />
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
