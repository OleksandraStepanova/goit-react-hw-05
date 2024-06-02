import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../apiServise/movies";
import Loader from "../Loader/Loader";
import css from './MovieCast.module.css'

export default function MovieCast() {
    const {
        movieId,
    } = useParams();
    const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
    const [movie, setMovie] = useState([]);

  useEffect(() => {
    const asyncWrapper = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const results = await getMovieCredits(movieId);
          setMovie(results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
  }, [movieId]);
    
     const castRef = useRef();
   
    if (castRef.current!==undefined) {
        const height = castRef.current.getBoundingClientRect().height;
        scrollBy({
            top: height,
            behavior: 'smooth',
        });
        }

    return (
        <div className={css.container}>
            {movie.cast !== undefined && <ul className={css.list}>{movie.cast.map(actor => <li ref={castRef} className={css.item} key={actor.id}>
                <img className={css.image} src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
                <h2>{actor.name}</h2>
                <h3>Character: { actor.character}</h3>
            </li>)}</ul>}
            {isLoading && <Loader/>}
            {isError && <p>No data to display... Try again...</p>}
        </div>
    )
}