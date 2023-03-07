import React, { useState, useEffect } from "react";
import "./App.css";
import Movie from "./Movie";
import Chart from "./Chart";

function App(props) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${props.apiKey}&sort_by=popularity.desc`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching data. Please try again.");
        setLoading(false);
      });
  }, [props.apiKey]);

  useEffect(() => {
    const genres = {};
    const releases = {};
    movies.forEach((movie) => {
      movie.genre_ids.forEach((genreId) => {
        if (genres[genreId]) {
          genres[genreId]++;
        } else {
          genres[genreId] = 1;
        }
      });
      const releaseYear = new Date(movie.release_date).getFullYear();
      if (releases[releaseYear]) {
        releases[releaseYear]++;
      } else {
        releases[releaseYear] = 1;
      }
    });
    setChartData({
      genres: Object.entries(genres).map(([id, value]) => ({
        id,
        label: id,
        value,
      })),
      releases: Object.entries(releases).map(([year, value]) => ({
        year,
        label: year.toString(),
        value,
      })),
    });
  }, [movies]);

  const handleSort = (order) => {
    const sortedMovies = [...movies];
    sortedMovies.sort((a, b) =>
      order === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
    setMovies(sortedMovies);
  };

  return (
    <div className="App">
      <h1 className="header">Movie Sorter</h1>
      <div className="sort-container">
        <button onClick={() => handleSort("asc")}>Sort A-Z</button>
        <button onClick={() => handleSort("desc")}>Sort Z-A</button>
      </div>
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      <div className="movie-container">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="chart-container">
        <Chart data={chartData.genres} title="Movie Genres" />
        <Chart data={chartData.releases} title="Movie Releases by Year" />
      </div>
    </div>
  );
}

export default App;
