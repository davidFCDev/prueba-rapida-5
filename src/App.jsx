import { useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import responseMovies from "./mocks/with-results.json";
import { useEffect } from "react";
import { useRef } from "react";

function App() {
  const movies = responseMovies.Search;
  const [query, setQuery] = useState([]);
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  const mappedMovies = movies.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster,
  }));

  const handleSubmit = (event) => {
    setQuery(event.target.value);
    event.preventDefault();
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
    console.log(query);
  };

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = query === "";
      return;
    }
    
    if (query === "") {
      setError("No se puede buscar una película vacía");
      return;
    }

    if (query.length < 3) {
      setError("La búsqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [query]);

  return (
    <div className="page">
      <header>
        <h1>Buscador de películas</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name="query"
            value={query}
            placeholder="Avengers, matrix..."
          />
          <button>Search</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>
        <Movies movies={mappedMovies} />
      </main>
    </div>
  );
}

export default App;
