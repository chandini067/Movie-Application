import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Check from './Check';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null);   // State for error handling

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const res = await fetch('https://raw.githubusercontent.com/erik-sytnyk/movies-list/master/db.json');

        if (!res.ok) { // Check for HTTP errors (e.g., 404, 500)
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setMovies(data.movies); // Correctly access the 'movies' array from the JSON
        console.log('Loaded movies:', data.movies); // Log the array, not the whole object
      } catch (err) {
        console.error('Failed to load movies:', err);
        setError(err); // Store the error
      } finally {
        setLoading(false); // Set loading to false after fetch completes (success or failure)
      }
    };

    fetchMovies();
  }, []); // Empty dependency array means this runs once on component mount

  // Conditional rendering for loading, error, and no movies found
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-xl">Loading movies...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-900 text-red-500 flex items-center justify-center">
        <p className="text-xl">Error loading movies: {error.message}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* <Check/> */}
      <div className="bg-gradient-to-br from-gray-800 to-black p-6">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-8">
            {/* Ensure hero.png is in your public folder or adjust path */}
            <img src="./hero.png" alt="Hero Banner" className="mx-auto w-48 h-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Find <span className="text-indigo-400">movies</span> you will enjoy without hassle
            </h1>
          </header>

          {/* This Search component will likely filter the 'movies' state.
              You'll need to implement the filtering logic inside this App component
              or pass 'movies' and 'setMovies' to the Search component if it handles filtering internally.
              For now, it just passes searchTerm and setSearchTerm.
          */}
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {/* 🎬 Movie List Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">🎬 Movie Collection</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {movies.length > 0 ? ( // Check if movies array has data
                movies.map((movie) => (
                  <div
                    key={movie.id} // Use movie.id as the key, assuming it's unique
                    className="bg-gray-800 p-4 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={movie.posterUrl} // Corrected property name from db.json
                      alt={movie.title}
                      className="rounded-lg mb-4 w-full h-72 object-cover"
                    />
                    <h3 className="text-lg font-semibold">{movie.title}</h3> {/* Corrected property name */}
                    <p className="text-sm text-gray-400 mt-1">
                      <span className="font-medium text-white">Genres:</span> {movie.genres ? movie.genres.join(', ') : 'N/A'} {/* Corrected property name & handle undefined */}
                    </p>
                    {/* The db.json data does NOT have 'vote_average', 'vote_count', 'release_date', or 'overview'
                        If you need these, you would need to use a different API (e.g., TMDb API).
                        I've removed these lines as they would cause 'undefined' errors with this specific JSON.
                    */}
                  </div>
                ))
              ) : (
                <p className="col-span-full text-center text-gray-400">No movies found.</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default App;