import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMovieById } from '../services/omdb';

export default function MovieDetails() {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      setError('');
      setLoading(true);
      try {
        const data = await getMovieById(imdbID);
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [imdbID]);

  if (loading) return <div className="container"><p className="status">Loading...</p></div>;
  if (error) return <div className="container"><p className="status error">{error}</p></div>;
  if (!movie) return <div className="container"><p className="status">Movie not found.</p></div>;

  const ratings = Array.isArray(movie.Ratings) ? movie.Ratings : [];

  return (
    <div className="container">
      <Link to="/" className="back">← Back</Link>
      <div className="details">
        <div className="details-poster">
          {movie.Poster && movie.Poster !== 'N/A' ? (
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
          ) : (
            <div className="poster placeholder">No Image</div>
          )}
        </div>
        <div className="details-info">
          <h2>{movie.Title} ({movie.Year})</h2>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
          <p><strong>Rated:</strong> {movie.Rated}</p>
          <p><strong>Released:</strong> {movie.Released}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          {ratings.length > 0 && (
            <div className="ratings">
              <strong>Ratings:</strong>
              <ul>
                {ratings.map((r) => (
                  <li key={r.Source}>{r.Source}: {r.Value}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


