const API_BASE_URL = 'https://www.omdbapi.com/';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'thewdb';

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Network error: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export async function searchMovies(query, page = 1) {
  const url = `${API_BASE_URL}?apikey=${API_KEY}&type=movie&s=${encodeURIComponent(
    query,
  )}&page=${page}`;
  const data = await fetchJson(url);
  if (data.Response === 'False') {
    // OMDb uses Response False with Error message
    const errorMessage = data.Error || 'Unknown error from OMDb';
    throw new Error(errorMessage);
  }
  return {
    movies: data.Search || [],
    totalResults: Number(data.totalResults || 0),
  };
}

export async function getMovieById(imdbID) {
  const url = `${API_BASE_URL}?apikey=${API_KEY}&i=${encodeURIComponent(imdbID)}&plot=full`;
  const data = await fetchJson(url);
  if (data.Response === 'False') {
    const errorMessage = data.Error || 'Movie not found';
    throw new Error(errorMessage);
  }
  return data;
}


