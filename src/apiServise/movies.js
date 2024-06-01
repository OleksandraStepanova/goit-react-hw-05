import axios from "axios";


axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const options = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmJmMDQ1ODc2M2FjOTdiOTZjMmE0NzY5MGQ4YzA0MSIsInN1YiI6IjY2NTVhNGM5MjcyZWQ0NmYzYjIxMjY1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l4q4u4av6BD2298V3S146O8N2tkDiMhLUXl1dtVI8To'
  }
};

axios.defaults.params = {
    orientation: 'landscape',
    per_page: 20,
}

export const getMovies = async () => {
  const { data } = await axios.get(`trending/movie/day?language=en-US`, options);
  return data.results;
};

export const getMovie = async (id) => {
  const { data } = await axios.get(`movie/${id}?language=en-US`, options);
  return data;
};
