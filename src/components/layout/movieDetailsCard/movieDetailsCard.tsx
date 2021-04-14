import React, { useState, useEffect } from 'react';

import moviedefault from '../../../assets/images/moviedefault.jpg';
import './movieDetailsCard.scss';
import { removeFromLiked, addToLiked, movieSelector, getMovieDetails } from '../../../features/Movie/MovieSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

function MovieDetailsCard(props: { movieId: string }) {

    const [heartClass, setHeartClass] = useState("heart-collection");

    const dispatch = useAppDispatch();
    const { userMovieCollection, movieDetails } = useAppSelector(movieSelector);

    useEffect(() => {
        dispatch(getMovieDetails(props.movieId));
    }, []);

    useEffect(() => {
        const liked = userMovieCollection.some(element => element.imdbId === movieDetails.imdbId);
        setHeartClass((state) => {
            if (liked) return "heart-collection liked";
            else return "heart-collection";
        });
    }, [userMovieCollection]);

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
        <div className="movie-card-container">
            {movieDetails.Title &&
                <div className="mv-details-container">
                    <h1 className="mv-title">{movieDetails.Title}</h1>
                    <div className="mv-numbers">
                        <p className="mv-year">{movieDetails.Year}</p>
                        <p className="mv-country">{movieDetails.Country}</p>
                        <p className="mv-rating">{movieDetails.imdbRating}/10</p>
                        <p className="mv-runtime">{movieDetails.Runtime}</p>
                        <button className={heartClass} onClick={() => { handleToggleLiked(movieDetails.imdbId) }}>
                            <i className="fas fa-heart"></i>
                        </button>
                    </div>
                    {(movieDetails.Poster && movieDetails.Poster !== "N/A") &&
                        <img className="mv-poster" src={movieDetails.Poster} alt="movie poster" />
                    }
                    {(movieDetails.Poster === "N/A") &&
                        <img className="mv-poster" src={moviedefault} alt="default movie poster" style={{ opacity: 0.5 }} />
                    }
                    <div className="mv-info">
                        <p className="mv-genre"><span className="mv-inline-header">Genre | </span>{movieDetails.Genre}</p>
                        <ul className="mv-awards"><span className="mv-inline-header">Awards | </span>{movieDetails.Awards}</ul>
                        <p className="mv-director"><span className="mv-inline-header">Director | </span>{movieDetails.Director}</p>
                        <ul className="mv-actors"><span className="mv-inline-header">Actors | </span>{movieDetails.Actors}</ul>
                        <p className="mv-plot">{movieDetails.Plot}</p>
                    </div>
                </div>
            }
            {movieDetails.Title === "" &&
                <h2>To show movie details, choose movie</h2>
            }
        </div>
    );
}

export default MovieDetailsCard;
