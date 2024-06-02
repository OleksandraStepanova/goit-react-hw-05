import { Link, useLocation } from "react-router-dom";

import css from './MovieList.module.css'
import { useRef } from "react";

export default function MovieList({ movies }) {
    const location = useLocation();
    const movieRef = useRef();

        if (movieRef.current!==undefined) {
        const height = movieRef.current.getBoundingClientRect().height;
        scrollBy({
            top: height,
            behavior: 'smooth',
        });
        }
    return (<ul ref={movieRef} className={css.list}>
        {movies.map(movie => <li key={movie.id} className={css.item}>
            <Link to={`/movies/${movie.id}`} state={location}>{movie.title}</Link>
        </li>)}
    </ul>)
}