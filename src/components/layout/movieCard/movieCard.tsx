import React, { useEffect } from 'react';
import './movieCard.scss';
import moviedefault from '../../../assets/images/moviedefault.jpg';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { movieSelector, getMovieDetails } from '../../../features/Movie/MovieSlice';

function MovieCard(props: { movieId: string }) {

    const dispatch = useAppDispatch();
    const { movieDetails } = useAppSelector(movieSelector);

    useEffect(() => {
        dispatch(getMovieDetails(props.movieId));
    }, []);

    return (
        <div className="container">
            <div className="mv-details-container">
                <h1 className="mv-title">{movieDetails.Title}</h1>
                <div className="mv-numbers">
                    <p className="mv-year">{movieDetails.Year}</p>
                    <p className="mv-country">{movieDetails.Country}</p>
                    <p className="mv-rating">{movieDetails.imdbRating}/10</p>
                    <p className="mv-runtime">{movieDetails.Runtime}</p>
                </div>
                {(movieDetails.Poster && movieDetails.Poster !== "N/A") &&
                    <img className="movie-poster" src={movieDetails.Poster} alt="movie poster" />
                }
                {(movieDetails.Poster === "N/A") &&
                    <img className="movie-poster" src={moviedefault} alt="default movie poster" style={{ opacity: 0.5 }} />
                }
                <div className="mv-info">
                    <p className="mv-genre"><span className="mv-inline-header">Genre | </span>{movieDetails.Genre}</p>
                    <ul className="mv-awards"><span className="mv-inline-header">Awards | </span>{movieDetails.Awards}</ul>
                    <p className="mv-director"><span className="mv-inline-header">Director | </span>{movieDetails.Director}</p>
                    <ul className="mv-actors"><span className="mv-inline-header">Actors | </span>{movieDetails.Actors}</ul>
                    <p className="mv-plot">{movieDetails.Plot}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
