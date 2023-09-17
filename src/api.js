import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDMwYjQ0ZDBkZGU0MzZmMjgxNjA1NzlmMjhhOGM5NiIsInN1YiI6IjY1MDMyMjEzNjNhYWQyMDExYjIyOGQ2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bWe4OqTehckpJsIT26iNvSj0D7paLl-Uoy-hCaLkzXg';

const params = new URLSearchParams({
  language: 'en-US',
});

export const fetchTrendingMovies = async () => {
  const resp = await axios(`/trending/all/day?${params}`);
  return resp.data.results;
};

export const fetchMovieById = async id => {
  const resp = await axios(`/movie/${id}?${params}`);
  return resp.data;
};

export const fetchCastMovieById = async id => {
  const resp = await axios(`/movie/${id}/credits?${params}`);
  return resp.data.cast;
};

export const fetchReviewsMovieById = async id => {
  const resp = await axios(`/movie/${id}/reviews?${params}`);
  return resp.data.results;
};

export const fetchMoviesByQuery = async (query, page) => {
  const resp = await axios(`/search/movie?query=${query}&page=${page}`);
  return resp.data;
};
