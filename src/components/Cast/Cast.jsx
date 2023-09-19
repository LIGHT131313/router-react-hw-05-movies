import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchCastMovieById } from 'api';
import { Loader } from 'components/Loader/Loader';
import toast from 'react-hot-toast';
import { CastItem } from 'components/CastItem/CastItem';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    const controller = new AbortController();

    async function fetchCast() {
      try {
        setLoading(true);
        const fetchedCast = await fetchCastMovieById(
          movieId,
          controller.signal
        );
        setCast(fetchedCast);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          toast.error('Something went wrong, please try again!');
        }
      } finally {
        setLoading(false);
      }
    }
    fetchCast();

    return () => {
      controller.abort();
    };
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {!loading && cast.length > 0 && <CastItem cast={cast} />}
      {!loading && !cast.length && <p>We don't have cast for this movie</p>}
    </>
  );
}
