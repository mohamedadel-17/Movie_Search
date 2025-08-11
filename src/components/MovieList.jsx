import MovieCard from './MovieCard';

export default function MovieList({ movies }) {
  if (!movies || movies.length === 0) {
    return <p className="empty">No movies found. Try a different search.</p>;
  }
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />)
      )}
    </div>
  );
}


