import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const { Title, Year, Poster, imdbID } = movie;
  const isPosterValid = Poster && Poster !== 'N/A';
  return (
    <Link to={`/movie/${imdbID}`} className="movie-card">
      <div className="poster-wrap">
        {isPosterValid ? (
          <img className="poster" src={Poster} alt={`${Title} poster`} loading="lazy" />
        ) : (
          <div className="poster placeholder">No Image</div>
        )}
      </div>
      <div className="movie-meta">
        <h3 className="movie-title">{Title}</h3>
        <p className="movie-year">{Year}</p>
      </div>
    </Link>
  );
}


