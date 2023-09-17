import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchReviewsMovieById } from 'api';
import { Loader } from 'components/Loader/Loader';
import toast from 'react-hot-toast';
import { ReviewsItem } from 'components/ReviewsItem/ReviewsItem';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movieId) return;
    async function fetchReviews() {
      try {
        setLoading(true);
        const fetchedReviews = await fetchReviewsMovieById(movieId);
        setReviews(fetchedReviews);
      } catch (error) {
        toast.error('Something went wrong, please try again!');
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [movieId]);

  return (
    <>
      {loading && <Loader />}
      {!loading && reviews.length > 0 && <ReviewsItem reviews={reviews} />}
      {!loading && !reviews.length && (
        <p>We don't have any reviews for this movie</p>
      )}
    </>
  );
}
