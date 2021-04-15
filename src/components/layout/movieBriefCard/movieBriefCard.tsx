import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import moviedefault from '../../../assets/images/moviedefault.jpg';
import './movieBriefCard.scss';
import { removeFromLiked, addToLiked, toggleWatched, movieSelector } from '../../../features/Movie/MovieSlice';
import { MovieDetailsResponse } from '../../../features/Movie/ts/movieTypes';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

function MovieBriefCard({ el }: { el: { movie: MovieDetailsResponse, watched?: boolean } }) {

    const [heartClass, setHeartClass] = useState("heart-collection");
    const [eye, setEye] = useState(false);

    const { userMovieCollection } = useAppSelector(movieSelector);

    useEffect(() => {
        const liked = userMovieCollection.some(element => element.imdbId === el.movie.imdbId);
        setHeartClass((state) => {
            if (liked) return "heart-collection liked";
            else return "heart-collection";
        });
        if (el.watched === true) setEye(true);
        if (el.watched === false) setEye(false);
    }, [userMovieCollection]);

    const dispatch = useAppDispatch();

    function handleToggleLiked(movieId: string) {
        const toggle = async () => {
            const liked = await dispatch(addToLiked(movieId));
            if (liked.payload === movieId) {
                setHeartClass('heart-collection liked');
            }
            if (liked.payload !== movieId) {
                await dispatch(removeFromLiked(movieId));
                setHeartClass('heart-collection');
            }
        }
        toggle();
    }

    function handleToggleWatched(movieId: string) {
        const toggle = async () => {
            const watched = await dispatch(toggleWatched(movieId));
            if (watched.payload === "Watched changed to: true") {
                setEye(true);
            }
            if (watched.payload?.message === "Watched changed to: false") {
                setEye(false);
            }
        }
        toggle();
    }

    return (
        <div className="movie-brief-card__container">
            {(el.movie.Poster && el.movie.Poster !== "N/A") ?
                <Link to={`/movies/${el.movie.imdbId}`}>
                    <img className="movie-brief-card__poster" src={el.movie.Poster} alt="movie poster" />
                </Link> :
                <Link to={`/movies/${el.movie.imdbId}`}>
                    <img className="movie-brief-card__poster" src={moviedefault} alt="default movie poster" style={{ opacity: 0.5 }} />
                </Link>
            }
            <Link to={`/movies/${el.movie.imdbId}`}>
                <h2 className="movie-brief-card__title">{el.movie.Title}</h2>
            </Link>
            {el.movie.Title &&
                <div className="movie-brief-card__action-icons">
                    <button className={heartClass} onClick={() => { handleToggleLiked(el.movie.imdbId) }}>
                        <i className="fas fa-heart"></i>
                    </button>
                    {/* {!eye ?
                        <button className="watched-movie" onClick={() => { handleToggleWatched(el.movie.imdbId) }}><i className="fas fa-eye"></i></button> :
                        <button className="watched-movie" onClick={() => { handleToggleWatched(el.movie.imdbId) }}><i className="far fa-eye"></i></button>
                    } */}
                </div>
            }
        </div>
    );
}

export default MovieBriefCard;