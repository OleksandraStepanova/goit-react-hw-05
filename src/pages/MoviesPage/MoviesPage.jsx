import { useSearchParams } from 'react-router-dom';
import css from './MoviesPage.module.css'
import MovieList from '../../components/MovieList/MovieList';
import { useEffect, useState } from 'react';
import { getMovieParams} from '../../apiServise/movies';
import Loader from '../../components/Loader/Loader';

export default function MoviesPage() {
    const [params, setParams] = useSearchParams();
      const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);

    const handleSubmit = (e )=> {
        e.preventDefault();
        setParams({
            query:e.target.search.value.trim().toLowerCase(),
        });
        e.target.reset();        
    }
    
    useEffect(() => {
    const asyncWrapper = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const results = await getMovieParams(params);
          setMovies(results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
    }, [params]);
    
    return (
        <section className={css.container}>
            <form className={css.form} onSubmit={handleSubmit}>
                <input className={css.input} type="text" name='search' />
                <button className={css.btn}>Search</button>
            </form>
            {movies.length > 0 && <MovieList movies={movies} />}
            {isLoading && <Loader/>}
            {isError && <p>No data to display... Try again...</p>}
        </section>
    )
}