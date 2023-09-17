import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from 'api';
import { Loader } from 'components/Loader/Loader';
import toast from 'react-hot-toast';
import { MoviesList } from 'components/MoviesList/MoviesList';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        setLoading(true);
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        toast.error('Something went wrong, please try again!');
      } finally {
        setLoading(false);
      }
    }

    getMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {loading && <Loader />}
      {!loading && movies.length > 0 && <MoviesList movies={movies} />}
    </div>
  );
}
