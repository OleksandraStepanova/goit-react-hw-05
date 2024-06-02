import { Suspense, lazy } from "react";
import Navigation from "../Navigation/Navigation";
import css from './App.module.css'
import { Route, Routes } from "react-router-dom";
import MovieCast from "../MovieCast/MovieCast";
import MovieReviews from "../MovieReviews/MovieReviews";

const NotFoundPage = lazy(() =>
  import('../../pages/NotFoundPage/NotFoundPage')
);
const HomePage = lazy(() =>
  import('../../pages/HomePage/HomePage')
);
const MoviesPage = lazy(() =>
import('../../pages/MoviesPage/MoviesPage')
);
const MovieDetailsPage = lazy(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage')
);


export default function App() {
  
  return (
    <div>
      <header className={css.header}>
        <Navigation />
      </header>
      <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast/>}/>
            <Route path="reviews" element={<MovieReviews/>} />
          </Route>
          <Route path="*" element={<NotFoundPage/>} />
       </Routes>
      </Suspense>
    </div>
  )
}
