import './SearchMovies.scss';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import Topbar from '../../components/layout/topbar/topbar';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { movieSelector, removeFromLiked, searchMovies, addToLiked } from '../../features/Movie/MovieSlice';
import moviedefault from '../../assets/images/moviedefault.jpg';

function SearchMovies(props: { location?: { search?: string } }) {

    const dispatch = useAppDispatch();
    const { searchedMovies } = useAppSelector(movieSelector);

    useEffect(() => {
        const searchBy = props.location?.search?.replace("?title=", "").replace("%20", "+");
        if (searchBy) dispatch(searchMovies(searchBy));
    }, []);

    function handleToggleLiked(movieId: string) {
        const toggle = async () => {
            const liked = await dispatch(addToLiked(movieId));
            if (liked.payload !== movieId) {
                await dispatch(removeFromLiked(movieId));
            }
        }
        toggle();
    }

    return (
        <div>
            <Topbar />
            <div className="searched-movies-container">
                <div className="searched-movie-cards-container">
                    {searchedMovies && searchedMovies[0].Title ?
                        searchedMovies.map((movie) => (
                            <div className="searched-movie-card">
                                { (movie.Poster && movie.Poster !== "N/A") &&
                                    <Link to={`movies/${movie.imdbID}`}><img className="searched-movie-poster" src={movie.Poster} alt="movie poster" /></Link>
                                }
                                { (movie.Poster === "N/A") &&
                                    <img className="searched-movie-poster" src={moviedefault} alt="default movie poster" style={{ opacity: 0.5 }} />
                                }
                                { movie.Title &&
                                    <div className="searched-movie-actions-icons">
                                        <Link to={`movies/${movie.imdbID}`}><h2 className="searched-movie-title">{movie.Title}</h2></Link>
                                        <button className="heart-collection liked" onClick={() => { handleToggleLiked(movie.imdbID) }}><i className="fas fa-heart"></i></button>
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
