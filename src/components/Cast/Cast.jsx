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
    async function fetchCast() {
      try {
        setLoading(true);
        const fetchedCast = await fetchCastMovieById(movieId);
        setCast(fetchedCast);
      } catch (error) {
        toast.error('Something went wrong, please try again!');
      } finally {
        setLoading(false);
      }
    }

    fetchCast();
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {!loading && cast.length > 0 && <CastItem cast={cast} />}
      {!loading && !cast.length && <p>We don't have cast for this movie</p>}
    </>
  );
}
