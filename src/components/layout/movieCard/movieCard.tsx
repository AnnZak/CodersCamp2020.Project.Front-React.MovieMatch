import React from 'react';
import './movieCard.scss';
import moviedefault from '../../../assets/images/moviedefault.jpg';

function MovieCard() {

    const movie = JSON.parse(
        `{ "Title": "The Witcher", "Year": "2019–", "Runtime": "60 min", "Genre": "Action, Adventure, Fantasy, Mystery", "Director": "Tomek Baginski", "Actors": "Henry Cavill, Freya Allan, Yasen Atour, Basil Eidenbenz", "Plot": "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.", "Country": "Poland, USA, Hungary", "Awards": "7 nominations.", "Poster": "https://m.media-amazon.com/images/M/MV5BOGE4MmVjMDgtMzIzYy00NjEwLWJlODMtMDI1MGY2ZDlhMzE2XkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_SX300.jpg", "imdbRating": "8.2", "imdbID": "tt5180504" }`
    );

    return (
        <div className="container">
            <div className="mv-details-container">
                <h1 className="mv-title">{movie.Title}</h1>
                <div className="mv-numbers">
                    <p className="mv-year">{movie.Year}</p>
                    <p className="mv-country">{movie.Country}</p>
                    <p className="mv-rating">{movie.imdbRating}/10</p>
                    <p className="mv-runtime">{movie.Runtime}</p>
                </div>
                <img className="mv-poster" src={movie.Poster === "N/A" || !movie.Poster ? moviedefault : movie.Poster} alt="Movie Poster"></img>
                <div className="mv-info">
                    <p className="mv-genre"><span className="mv-inline-header">Genre | </span>{movie.Genre}</p>
                    <ul className="mv-awards"><span className="mv-inline-header">Awards | </span>{movie.Awards}</ul>
                    <p className="mv-director"><span className="mv-inline-header">Director | </span>{movie.Director}</p>
                    <ul className="mv-actors"><span className="mv-inline-header">Actors | </span>{movie.Actors}</ul>
                    <p className="mv-plot">{movie.Plot}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
