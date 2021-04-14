import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

import './Dashboard.scss';
import Topbar from '../../components/layout/topbar/topbar';
import MovieBriefCard from '../../components/layout/movieBriefCard/movieBriefCard';
import { showCollection, getUserCollection, getMovieDetails, clearState, movieSelector, removeFromLiked, searchMovies, addToLiked } from '../../features/Movie/MovieSlice';
import { userSelector } from '../../features/User/UserSlice';
import { MovieDetailsResponse } from '../../features/Movie/ts/movieTypes';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface ParamTypes {
    userid: string;
}

function Dashboard() {

    const displayedInitialState = {
        movie: {
            imdbId: "",
            Title: "",
            imdbRating: "",
            Runtime: "",
            Year: "",
            Country: "",
            Genre: "",
            Director: "",
            Actors: "",
            Awards: "",
            Plot: "",
            Poster: "",
        },
        watched: false
    }

    const [collectionMovies, setCollectionMovies] = useState<{ movie: MovieDetailsResponse, watched: boolean }[]>([displayedInitialState]);
    const [collectionErrMessage, setCollectionErrMessage] = useState("");

    const [suggestErrMessage, setSuggestErrMessage] = useState("");
    const [suggestedMovies, setSuggestedMovies] = useState<{ movie: MovieDetailsResponse, watched?: boolean }[]>([displayedInitialState]);

    const dispatch = useAppDispatch();
    const { _id } = useAppSelector(userSelector);
    const { searchedMovies } = useAppSelector(movieSelector);

    const searchBy = "Today";
    useEffect(() => {
        setSuggestedMovies([displayedInitialState]);
        setSuggestErrMessage("");

        if (searchBy) dispatch(searchMovies(searchBy)).then(unwrapResult).then(originalResult => {
            if (!searchedMovies) setSuggestErrMessage("Couldn't load suggestions.")
            dispatch(clearState());
            for (const movie of originalResult) {
                dispatch(getUserCollection(_id));
                dispatch(clearState());
                dispatch(getMovieDetails(movie.imdbID)).then(unwrapResult).then(originalResult => {
                    dispatch(clearState());
                    setSuggestedMovies(state => [...state, { movie: originalResult }]);
                }).catch(e => { setSuggestErrMessage("Couldn't load suggestions.") });
            }
        }).catch(e => { setSuggestErrMessage("Couldn't load suggestions.") });

    }, [searchBy]);

    useEffect(() => {
        setCollectionMovies([displayedInitialState]);
        setCollectionErrMessage("");

        dispatch(showCollection(_id)).then(unwrapResult).then(originalResult => {
            dispatch(clearState());
            for (const movie of originalResult) {
                dispatch(getUserCollection(_id));
                dispatch(clearState());
                dispatch(getMovieDetails(movie.imdbId)).then(unwrapResult).then(originalResult => {
                    dispatch(clearState());
                    setCollectionMovies(state => [...state, { movie: originalResult, watched: movie.watched }]);
                }).catch(e => { setCollectionErrMessage("No movies in collection") });
            }
        }).catch(e => { setCollectionErrMessage("No movies in collection") });
    }, []);

    return (
        <div>
            <Topbar />
            <div className="dashboard__container-outer">
                <div className="dashboard__container-inner">

                    <h1 className="db__header x">New things to watch...</h1>
                    <div className="db__movies-container">
                        {suggestErrMessage !== "" ?
                            <div className="searched__error-container">
                                <h2 className="db__error-message">{suggestErrMessage}</h2>
                            </div> :
                            suggestedMovies.slice(0, 6).map((element) =>
                                element.movie.Title && <MovieBriefCard el={element as { movie: MovieDetailsResponse }} />
                            )
                        }
                    </div>

                    <h1 className="db__header">In your collection...</h1>
                    <div className="db__movies-container">
                        {collectionErrMessage !== "" ?
                            <div className="collection__error-container">
                                <h2 className="db__error-message">{collectionErrMessage}</h2>
                            </div> :
                            collectionMovies.slice(0, 6).map((element) =>
                                element.movie.Title && <MovieBriefCard el={element as { movie: MovieDetailsResponse, watched: boolean }} />
                            )
                        }
                    </div>
                    <button className="db__link-see-more">
                        <Link to={`/collection/${_id}`}><p>Go to collection <i className="fas fa-long-arrow-alt-right"></i></p></Link>
                    </button>

                </div>
            </div>
        </div >
    );
}

export default Dashboard;