import React, { useState, useEffect } from 'react';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortField, setSortField] = useState('title');

  // Fetch movies from API and update state
  useEffect(() => {
    const API_KEY = 'YOUR_API_KEY';
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=478fb814a18ca7955130a57160959e96`;

    fetch(url)
      .then(response => response.json())
      .then(data => setMovies(data.results))
      .catch(error => console.log(error));
  }, []);

   const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Sort movies by title or release date when sort order or field changes
  useEffect(() => {
    const sortedMovies = [...movies].sort((a, b) => {
      const x = a[sortField].toLowerCase();
      const y = b[sortField].toLowerCase();

      if (sortOrder === 'asc') {
        return x < y ? -1 : 1;
      } else {
        return x > y ? -1 : 1;
      }
    });

    setMovies(sortedMovies);
  }, [sortOrder, sortField]);

  // Handle sort field and order change events
  const handleSortFieldChange = (event) => {
    setSortField(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div>
      <h2>Popular Movies</h2>
      <div>
        <label htmlFor="sortField">Sort by:</label>
        <select id="sortField" value={sortField} onChange={handleSortFieldChange}>
          <option value="title">Title</option>
          <option value="release_date">Release Date</option>
        </select>
      </div>
      <div>
        <label htmlFor="sortOrder">Sort order:</label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {movies.map(movie => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.release_date}</p>
          <p>{movie.overview}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
