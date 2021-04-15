import React, { useEffect, useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';

import './SearchMovies.scss';
import Topbar from '../../components/layout/topbar/topbar';
import MovieBriefCard from '../../components/layout/movieBriefCard/movieBriefCard';
import { userSelector } from '../../features/User/UserSlice';
import { movieSelector, searchMovies, getUserCollection, getMovieDetails, clearState } from '../../features/Movie/MovieSlice';
import { MovieDetailsResponse } from '../../features/Movie/ts/movieTypes';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

function SearchMovies(props: { location?: { search?: string } }) {

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

    const [errMessage, setErrMessage] = useState("");
    const [displayedMovies, setDisplayedMovies] = useState<{ movie: MovieDetailsResponse, watched?: boolean }[]>([displayedInitialState]);

    const dispatch = useAppDispatch();
    const { _id } = useAppSelector(userSelector);
    const { searchedMovies } = useAppSelector(movieSelector);

    const searchBy = props.location?.search?.replace("?title=", "").replace("%20", "+");
    useEffect(() => {
        setDisplayedMovies([displayedInitialState]);
        setErrMessage("");

        if (searchBy) dispatch(searchMovies(searchBy)).then(unwrapResult).then(originalResult => {
            if (!searchedMovies) setErrMessage("No movies found. Try searching different title.")
            dispatch(clearState());
            for (const movie of originalResult) {
                dispatch(getUserCollection(_id));
                dispatch(clearState());
                dispatch(getMovieDetails(movie.imdbID)).then(unwrapResult).then(originalResult => {
                    dispatch(clearState());
                    setDisplayedMovies(state => [...state, { movie: originalResult }]);
                }).catch(e => { setErrMessage("No movies found. Try searching different title.") });
            }
        }).catch(e => { setErrMessage("No movies found. Try searching different title.") });

    }, [searchBy]);

    return (
        <div>
            <Topbar />
            <div className="searched-movies-container">
                <div className="searched-movie-cards-container">
                    {errMessage !== "" ?
                        <div className="searched__error-container">
                            <h1>{errMessage}</h1>
                        </div> :
                        displayedMovies.map((element) =>
                            element.movie.Title && <MovieBriefCard key={`mvbreifcard${element.movie.imdbId}`} el={element as { movie: MovieDetailsResponse }} />
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchMovies;
