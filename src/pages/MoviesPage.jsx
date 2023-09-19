import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { Loader } from 'components/Loader/Loader';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { fetchMoviesByQuery } from 'api';
import { MoviesList } from 'components/MoviesList/MoviesList';

export default function MoviesPage() {
  const [query, setQuery] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadmore] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryParam = query.get('query') ?? '';
  const buttonRef = useRef();

  const handleSubmit = evt => {
    evt.preventDefault();
    const value = evt.target.elements.query.value.trim();

    if (!value) {
      toast.error('Please enter a non-empty search query');
    } else {
      setQuery({ query: value });
      if (value !== query.get('query')) {
        setMovies([]);
        setPage(1);
      }
    }
    evt.target.reset();
  };

  useEffect(() => {
    if (!queryParam) {
      setMovies([]);
      setPage(1);
      return;
    }
    const controller = new AbortController();

    async function getMovies() {
      try {
        setLoading(true);
        const newQuery = query.get('query');
        const { results, total_pages } = await fetchMoviesByQuery(
          newQuery,
          page,
          controller.signal
        );
        if (!results.length) {
          toast.error(
            'Sorry, there are no movies matching your search query. Please try again.'
          );
        } else {
          setMovies([...movies, ...results]);
          setLoadmore(page < total_pages);
        }
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          toast.error('Something went wrong, please try again!');
        }
      } finally {
        setLoading(false);
      }
    }
    getMovies();

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, queryParam]);

  const handleLoadMore = () => {
    scrollToButtonMore();
    setPage(page + 1);
  };

  const scrollToButtonMore = () => {
    setTimeout(() => {
      buttonRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {!loading && movies.length > 0 && <MoviesList movies={movies} />}
      {!loading && movies.length > 0 && loadMore && (
        <button ref={buttonRef} onClick={() => handleLoadMore()}>
          Load more
        </button>
      )}
    </>
  );
}
