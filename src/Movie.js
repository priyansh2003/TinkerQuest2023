import React from 'react';

const Movie = ({ title, tags, releaseDate }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p>Tags: {tags.join(', ')}</p>
      <p>Release Date: {releaseDate}</p>
    </div>
  );
};

export default Movie;
