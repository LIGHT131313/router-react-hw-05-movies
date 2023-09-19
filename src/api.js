import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDMwYjQ0ZDBkZGU0MzZmMjgxNjA1NzlmMjhhOGM5NiIsInN1YiI6IjY1MDMyMjEzNjNhYWQyMDExYjIyOGQ2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bWe4OqTehckpJsIT26iNvSj0D7paLl-Uoy-hCaLkzXg';

const params = new URLSearchParams({
  language: 'en-US',
});

export const fetchTrendingMovies = async option => {
  const resp = await axios(`/trending/all/day?${params}`, {
    signal: option,
  });
  return resp.data.results;
};

export const fetchMovieById = async (id, option) => {
  const resp = await axios(`/movie/${id}?${params}`, {
    signal: option,
  });
  return resp.data;
};

export const fetchCastMovieById = async (id, option) => {
  const resp = await axios(`/movie/${id}/credits?${params}`, {
    signal: option,
  });
  return resp.data.cast;
};

export const fetchReviewsMovieById = async (id, option) => {
  const resp = await axios(`/movie/${id}/reviews?${params}`, {
    signal: option,
  });
  return resp.data.results;
};

export const fetchMoviesByQuery = async (query, page, option) => {
  const resp = await axios(`/search/movie?query=${query}&page=${page}`, {
    signal: option,
  });
  return resp.data;
};
