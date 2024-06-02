import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../apiServise/movies";
import css from './MovieReviews.module.css'
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

export default function MovieReviews() {
        const {
        movieId,
    } = useParams();
    const reviewRef = useRef();

 const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState([]);
    const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const asyncWrapper = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const results = await getMovieReviews(movieId, page);
        setMovie(results.results);
        setTotal(results.total_pages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
  }, [movieId, page]);
    
    if (reviewRef.current!==undefined) {
        const height = reviewRef.current.getBoundingClientRect().height;
        scrollBy({
            top: height,
            behavior: 'smooth',
        });
  }
    
  const handleLoadMore = () => {
     setPage(page + 1); 
  }

    return (
        <div className={css.container} ref={reviewRef}>
            {movie.length>0 ? <ul className={css.list}>{movie.map(review => <li ref={reviewRef} className={css.item} key={review.id}>
                <h2>Author: {review.author}</h2>
                <p>{review.content}</p>
            </li>)}</ul> : <p>We don`t have any reviews for this movie.</p>}
         {movie.length > 0 && total > page && <LoadMoreBtn onClick={handleLoadMore} />}
            {isLoading && <Loader/>}
            {isError && <p>No data to display... Try again...</p>}
        </div>
    )
}