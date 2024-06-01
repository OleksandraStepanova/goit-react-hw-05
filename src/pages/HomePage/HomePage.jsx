import { useState } from 'react';
import MovieList from '../../components/MovieList/MovieList'
import css from './HomePage.module.css'
import { useEffect } from 'react';
import { getMovies } from '../../apiServise/movies';
import Loader from '../../components/Loader/Loader';

export default function HomePage() {

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const asyncWrapper = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const results = await getMovies();
          setMovies(results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
  }, []);
    return (
        <section className={css.container}>
            <h1>Trending today</h1>
            {movies.length > 0 && <MovieList movies={movies} />}
            {isLoading && <Loader/>}
            {isError && <p>No data to display... Try again...</p>}
        </section>
    )
}