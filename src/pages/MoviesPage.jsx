import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
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

  const handleSubmit = evt => {
    evt.preventDefault();
    const value = evt.target.elements.query.value.trim();

    if (!value) {
      toast.error('Please enter a non-empty search query');
    } else {
      setQuery({ query: value });
      // setQuery(`${Date.now()}/${value}`);
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
      return;
    }
    async function getMovies() {
      try {
        setLoading(true);
        const newQuery = query.get('query');
        const { results, total_pages } = await fetchMoviesByQuery(
          newQuery,
          page
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
        toast.error('Something went wrong, please try again!');
      } finally {
        setLoading(false);
      }
    }

    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, queryParam]);

  const handleLoadMore = () => setPage(page + 1);

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {!loading && movies.length > 0 && <MoviesList movies={movies} />}
      {movies.length > 0 && loadMore && !loading && (
        <button onClick={() => handleLoadMore()}>Load more</button>
      )}
    </>
  );
}
