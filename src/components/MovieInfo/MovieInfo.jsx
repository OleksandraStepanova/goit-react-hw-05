import css from './MovieInfo.module.css'

export default function MovieInfo({ movie }) {  

    return (
        <div className={css.container}>
            <img className={css.image} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <div className={css.wrapper}>
                <h1>{movie.title}</h1>
                <div>
                    <h2>Overview:</h2>
                    <p>{movie.overview}</p>
                </div>
                <div>
                    <h2>Genres:</h2>
                    <p>{movie.genres!==undefined&&movie.genres.map(ganre => ganre.name).join(', ')}</p>
                </div>
            </div>
        </div>
    )
}