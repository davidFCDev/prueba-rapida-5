import "./App.css";
import { Movies } from "./components/Movies";
import { useSearch } from "./hooks/useSearch";
import { useCallback, useRef, useState } from "react";
import { searchMovies } from "./services/movies";

function App() {
  const { search, updateSearch } = useSearch();
  const [movies, setMovies] = useState(search);
  const previousSearch = useRef(search);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return;
    try {
      previousSearch.current = search;
      const newMovies = await searchMovies({ search });
      setMovies(newMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name="query"
            value={search}
            placeholder="Avengers, matrix..."
          />
          <button>Search</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>{loading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
    </div>
  );
}

export default App;
