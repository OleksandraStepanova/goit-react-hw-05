import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom"
import { getMovie} from "../../apiServise/movies";
import Loader from "../../components/Loader/Loader";
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import { GoBackBtn } from "../../components/GoBackBtn/GoBackBtn";
import css from './MovieDetailsPage.module.css'

export default function MovieDetailsPage() {
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
        const results = await getMovie(movieId);
          setMovie(results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
  }, [movieId]);
    return (
        <div className={css.container}>
            <GoBackBtn/>
            {movie && <MovieInfo movie={movie} />}
            {isLoading && <Loader/>}
            {isError && <p>No data to display... Try again...</p>}
            <h3>Additional information</h3>
            <ul className={css.wrapper}>
                <li className={css.item}>
                    <NavLink to="cast">Cast</NavLink>
                </li>
                <li className={css.item}>
                    <NavLink to="reviews">Reviews</NavLink>
                </li>
            </ul>
            <Outlet />
        </div>
    )
}