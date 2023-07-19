import "./App.css";
import { Movies } from "./components/Movies";
import responseMovies from "./mocks/with-results.json";
import { useSearch } from "./hooks/useSearch";
import { useState } from "react";

function App() {
  const { search, updateSearch, error } = useSearch();
  const [movies, setMovies] = useState([]);
  

  const handleSubmit = (event) => {
    updateSearch(event.target.value);
    event.preventDefault();
  };

  const handleChange = (event) => {
    updateSearch(event.target.value);
    console.log(search);
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

      <main>
        <Movies movies={mappedMovies} />
      </main>
    </div>
  );
}

export default App;
