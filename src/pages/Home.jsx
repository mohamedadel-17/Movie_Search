import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import { searchMovies } from '../services/omdb';

export default function Home() {
  const [query, setQuery] = useState('Batman');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    performSearch(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function performSearch(nextQuery) {
    setError('');
    if (!nextQuery) return;
    setLoading(true);
    try {
      const { movies: results } = await searchMovies(nextQuery);
      setMovies(results);
      setQuery(nextQuery);
    } catch (err) {
      setMovies([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1 className="app-title">Movie Search</h1>
      <SearchBar initialQuery={query} onSearch={performSearch} />
      {loading && <p className="status">Loading...</p>}
      {error && <p className="status error">{error}</p>}
      {!loading && !error && <MovieList movies={movies} />}
    </div>
  );
}


