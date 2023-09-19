import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMovieById } from 'api';
import { Loader } from 'components/Loader/Loader';
import toast from 'react-hot-toast';
import { MovieDetailsItem } from 'components/MovieDetailsItem/MovieDetailsItem';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    const controller = new AbortController();

    async function fetchMovie() {
      try {
        setError(false);
        setLoading(true);
        const fetchedMovie = await fetchMovieById(movieId, controller.signal);
        setMovie(fetchedMovie);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          setError(true);
          toast.error('Something went wrong, please try again!');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();

    return () => {
      controller.abort();
    };
  }, [movieId]);
  return (
    <>
      {loading && <Loader />}
      {!loading && !error && <MovieDetailsItem movie={movie} />}
    </>
  );
}
