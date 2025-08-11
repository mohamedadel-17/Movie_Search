import { useState } from 'react';

export default function SearchBar({ initialQuery = '', onSearch }) {
  const [query, setQuery] = useState(initialQuery);

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  }

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        aria-label="Search movies"
        className="search-input"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
}


