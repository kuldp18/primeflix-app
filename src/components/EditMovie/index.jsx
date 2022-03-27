import React, { useState, useEffect } from 'react';
import './EditMovie.css';
import Header from '../Header';
import { isAuthenticated } from '../../helpers/auth';
import { API } from '../../backend';

const EditMovie = ({ match }) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');

  const token = isAuthenticated();

  const handleSubmit = (e) => {
    e.preventDefault();
    editMovie(match.params.movieId);
  };

  const editMovie = async (movieId) => {
    try {
      const response = await fetch(`${API}/updateMovie/${movieId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify({ title, genre }),
      });
      const data = await response.json();
      setTitle('');
      setGenre('');
    } catch (error) {
      console.log(error);
    }
  };

  const preloadMovie = async (movieId) => {
    try {
      const response = await fetch(`${API}/getMovie/${movieId}`, {
        headers: {
          token,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const { title, genre } = data;
      setTitle(title);
      setGenre(genre);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    preloadMovie(match.params.movieId);
  }, []);

  return (
    <>
      <Header />
      <form className="edit-movie-form" onSubmit={handleSubmit}>
        <h1 style={{ color: 'white', marginTop: '10px' }}>Edit Movie</h1>
        <input
          type="text"
          placeholder="Title"
          required
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Genre"
          required
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </>
  );
};

export default EditMovie;
