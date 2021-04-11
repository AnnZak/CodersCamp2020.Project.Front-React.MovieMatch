import './SearchMovies.scss';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Topbar from '../../components/layout/topbar/topbar';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { movieSelector } from '../../features/Movie/MovieSlice';
import moviedefault from '../../assets/images/moviedefault.jpg';
import { searchMovies, toggleLiked } from '../../features/Movie/MovieSlice';

function SearchMovies(props: { location?: { search?: string } }) {

    const dispatch = useAppDispatch();
    const { searchedMovies } = useAppSelector(movieSelector);

    useEffect(() => {
        const searchBy = props.location?.search?.replace("?title=", "").replace("%20", "+");
        if (searchBy) dispatch(searchMovies(searchBy));
    }, []);

    function handleToggleLiked(movieId: string) {
        dispatch(toggleLiked(movieId));
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
                                    <div className="movie-actions-icons">
                                        <Link to={`movies/${movie.imdbID}`}><h2 className="movie-title">{movie.Title}</h2></Link>
                                        <button onClick={() => { handleToggleLiked(movie.imdbID) }}><i className="fas fa-heart"></i></button>
                                        {/* <button onClick={() => { handleToggleWatched() }}><i className="far fa-eye"></i></button> */}
                                    </div>
                                }
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