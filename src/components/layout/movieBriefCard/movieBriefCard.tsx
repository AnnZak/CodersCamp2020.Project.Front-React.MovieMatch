import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import moviedefault from '../../../assets/images/moviedefault.jpg';
import './movieBriefCard.scss';
import { removeFromLiked, addToLiked, movieSelector } from '../../../features/Movie/MovieSlice';
import { MovieDetailsResponse } from '../../../features/Movie/ts/movieTypes';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

function MovieBriefCard({ el }: { el: { movie: MovieDetailsResponse, watched: boolean } }) {

    const [heartClass, setHeartClass] = useState("heart-collection");

    const { userMovieCollection } = useAppSelector(movieSelector);

    useEffect(() => {
        const liked = userMovieCollection.some(element => element.imdbId === el.movie.imdbId);
        setHeartClass((state) => {
            if (liked) return "heart-collection liked";
            else return "heart-collection";
        });
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

    return (
        <div className="collection-movie-card">
            {(el.movie.Poster && el.movie.Poster !== "N/A") ?
                <Link to={`/movies/${el.movie.imdbId}`}>
                    <img className="collection-movie-poster" src={el.movie.Poster} alt="movie poster" />
                </Link>

                : <Link to={`/movies/${el.movie.imdbId}`}>
                    <img className="collection-movie-poster" src={moviedefault} alt="default movie poster" style={{ opacity: 0.5 }} />
                </Link>
            }
            {el.movie.Title &&
                <div className="collection-movie-actions-icons">
                    <Link to={`/movies/${el.movie.imdbId}`}>
                        <h2 className="collection-movie-title">{el.movie.Title}</h2>
                    </Link>
                    <button className={heartClass} onClick={() => { handleToggleLiked(el.movie.imdbId) }}>
                        <i className="fas fa-heart"></i>
                    </button>
                    {el.watched ?
                        <button><i className="fas fa-eye"></i></button> :
                        <button><i className="far fa-eye"></i></button>
                    }
                </div>
            }
        </div>
    );
}

export default MovieBriefCard;