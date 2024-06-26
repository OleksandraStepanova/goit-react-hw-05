import axios from "axios";


axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const options = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmJmMDQ1ODc2M2FjOTdiOTZjMmE0NzY5MGQ4YzA0MSIsInN1YiI6IjY2NTVhNGM5MjcyZWQ0NmYzYjIxMjY1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l4q4u4av6BD2298V3S146O8N2tkDiMhLUXl1dtVI8To'
  }
};

axios.defaults.params = {
    orientation: 'landscape',
}

export const getMovies = async () => {
  const { data } = await axios.get(`trending/movie/day?language=en-US`, options);
  return data.results;
};

export const getMovie = async (id) => {
  const { data } = await axios.get(`movie/${id}?language=en-US`, options);
  return data;
};
export const getMovieCredits = async (id) => {
  const { data } = await axios.get(`movie/${id}/credits?language=en-US`, options);
  return data;
};
export const getMovieReviews = async (id, page) => {
  const { data } = await axios.get(`movie/${id}/reviews?language=en-US&page=${page}`, options);
  return data;
};
export const getMovieParams = async (query, page) => {
  const { data } = await axios.get(`search/movie?${query}&include_adult=false&language=en-US&page=${page}`, options);
  return data;
};