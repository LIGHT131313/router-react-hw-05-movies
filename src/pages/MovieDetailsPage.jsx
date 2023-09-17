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
    async function fetchMovie() {
      try {
        setError(false);
        setLoading(true);
        const fetchedMovie = await fetchMovieById(movieId);
        setMovie(fetchedMovie);
      } catch (error) {
        setError(true);
        toast.error('Something went wrong, please try again!');
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [movieId]);
  return (
    <>
      {loading && <Loader />}
      {!loading && !error && <MovieDetailsItem movie={movie} />}
    </>
  );
}
