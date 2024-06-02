import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import { useEffect, useState } from 'react';
import { getMovieParams } from '../../apiServise/movies';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';
import LoadMoreBtn from '../../components/LoadMoreBtn/LoadMoreBtn';
import css from './MoviesPage.module.css'

export default function MoviesPage() {
    const [params, setParams] = useSearchParams();
      const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  

    const handleSubmit = (e )=> {
      e.preventDefault();
      if (e.target.search.value.trim()==='') {            
        toast.error('Enter your query!');
        setParams({})
            return;
        }
        setParams({
            query:e.target.search.value.trim().toLowerCase(),
        });
      e.target.reset();
      setPage(1);
      setMovies([]);
    }
    
    useEffect(() => {
    const asyncWrapper = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const results = await getMovieParams(params,page);
        setMovies(prevState => {
          return [...prevState, ...results.results];
        });
        setTotal(results.total_pages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
    }, [params,page]);
  
  const handleLoadMore = () => {
     setPage(page + 1); 
  }

    
    return (
        <section className={css.container}>
            <form className={css.form} onSubmit={handleSubmit}>
                <input className={css.input} type="text" name='search' />
                <button className={css.btn}>Search</button>
        </form>
        <Toaster/>
        {movies.length > 0 ? <MovieList movies={movies} />:<p>No movies for this request...</p>}
        {movies.length > 0 && total > page && <LoadMoreBtn onClick={handleLoadMore} />}
            {isLoading && <Loader/>}
            {isError && <p>No data to display... Try again...</p>}
        </section>
    )
}