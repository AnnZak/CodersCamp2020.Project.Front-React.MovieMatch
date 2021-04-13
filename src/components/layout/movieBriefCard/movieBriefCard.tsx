import './movieBriefCard.scss';
import { useState, useEffect } from 'react';
import { MovieDetailsResponse } from '../../../features/Movie/ts/movieTypes';
import moviedefault from '../../../assets/images/moviedefault.jpg';
import { useAppDispatch } from '../../../app/hooks';
import { removeFromLiked, addToLiked } from '../../../features/Movie/MovieSlice';

function MovieBriefCard(props: { movie: MovieDetailsResponse }) {

    const [heartClass, setHeartClass] = useState('heart-collection');
    // useEffect(() => {
    //     setHeartClass('heart-collection');
    // }, []);

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
            {(props.movie.Poster && props.movie.Poster !== "N/A") ?
                <img className="collection-movie-poster" src={props.movie.Poster} alt="movie poster" />
                : <img className="collection-movie-poster" src={moviedefault} alt="default movie poster" style={{ opacity: 0.5 }} />
            }
            {props.movie.Title &&
                <div className="collection-movie-actions-icons">
                    <h2 className="collection-movie-title">{props.movie.Title}</h2>
                    <button className={heartClass} onClick={() => { handleToggleLiked(props.movie.imdbId) }}><i className="fas fa-heart"></i></button>
                </div>
            }
        </div>
    );
}

export default MovieBriefCard;