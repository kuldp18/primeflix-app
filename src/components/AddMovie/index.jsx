import React, { useState } from 'react';
import './AddMovie.css';
import Header from '../Header';
import { isAuthenticated } from '../../helpers/auth';
import { API } from '../../backend';

const AddMovie = () => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');

  const token = isAuthenticated();

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovie(title, genre, token);
  };
  const addMovie = async (title, genre, token) => {
    try {
      const response = await fetch(`${API}/addMovie`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token,
        },
        body: JSON.stringify({ title, genre }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <form className="add-movie-form" onSubmit={handleSubmit}>
        <h1 style={{ color: 'white', marginTop: '10px' }}>Add Movie</h1>
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

export default AddMovie;
