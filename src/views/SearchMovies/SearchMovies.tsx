import './SearchMovies.scss';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Topbar from '../../components/layout/topbar/topbar';
import { useAppSelector } from '../../app/hooks';
import { movieSelector } from '../../features/Movie/MovieSlice';
import moviedefault from '../../assets/images/moviedefault.jpg';
import { useAppDispatch } from '../../app/hooks';
import { searchMovies } from '../../features/Movie/MovieSlice';

function SearchMovies({ location }) {

    const dispatch = useAppDispatch();
    const { searchedMovies } = useAppSelector(movieSelector);

    useEffect(() => {
        const searchBy = location.search.replace("?title=", "").replace("%20", "+");
        dispatch(searchMovies(searchBy));
    }, []);

    function handleToggleWatched() {

    }

    return (
        <div>
            <Topbar />
            <div className="container-searched-movies">
                <div className="movie-cards-container">
                    {searchedMovies && searchedMovies[0].Title ?
                        searchedMovies.map((movie) => (
                            <div className="movie-card">
                                { (movie.Poster && movie.Poster !== "N/A") &&
                                    <Link to={`movies/${movie.imdbID}`}><img className="movie-poster" src={movie.Poster} alt="movie poster" /></Link>
                                }
                                { (movie.Poster === "N/A") &&
                                    <img className="movie-poster" src={moviedefault} alt="default movie poster" style={{ opacity: 0.5 }} />
                                }
                                { movie.Title &&
                                    <Link to={`movies/${movie.imdbID}`}><h2 className="movie-title">{movie.Title}</h2></Link>
                                }
                                <div className="movie-actions-icons">
                                    <button onClick={() => { handleToggleWatched() }}><i className="fas fa-border-all"></i></button>
                                    <button onClick={() => { handleToggleWatched() }}><i className="fas fa-border-all"></i></button>
                                </div>
                            </div>
                        )) :
                        <h2>Search movie by title...</h2>
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchMovies;