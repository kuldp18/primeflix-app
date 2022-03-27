import React, { useState, useEffect } from 'react';
import Header from '../Header';
import { API } from '../../backend';
import { isAuthenticated } from '../../helpers/auth';
import { v4 as uuidv4 } from 'uuid';
import './Movies.css';

const Movies = () => {
  const token = isAuthenticated();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMovies();
  }, []);

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
                  <h1>{movie.title}</h1>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default Movies;
