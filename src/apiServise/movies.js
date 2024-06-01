import axios from "axios";

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNmJmMDQ1ODc2M2FjOTdiOTZjMmE0NzY5MGQ4YzA0MSIsInN1YiI6IjY2NTVhNGM5MjcyZWQ0NmYzYjIxMjY1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l4q4u4av6BD2298V3S146O8N2tkDiMhLUXl1dtVI8To';
axios.defaults.baseURL = 'https://api.themoviedb.org/';

axios.defaults.headers.common['Authorization'] = TOKEN;

axios.defaults.params = {
    orientation: 'landscape',
    per_page: 20,
}

export const getPhotos = async () => {
  const { data} = await axios.get(`search/movie?query=include_adult=false&language=en-US`);
  return data;
};