import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import './MovieCollection.scss';
import Topbar from '../../components/layout/topbar/topbar';
import MovieBriefCard from '../../components/layout/movieBriefCard/movieBriefCard';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getMovieDetails, movieSelector } from '../../features/Movie/MovieSlice';
import { MovieDetailsResponse } from '../../features/Movie/ts/movieTypes';
import { showCollection, getUserCollection } from '../../features/Movie/MovieSlice';
import { clearState, userSelector } from '../../features/User/UserSlice';

interface ParamTypes {
    userid: string;
}

function MovieCollection() {

    const { userid } = useParams<ParamTypes>();

    const [displayedMovies, setDisplayedMovies] = useState<MovieDetailsResponse[]>([]);

    const dispatch = useAppDispatch();
    const { movieCollection, movieDetails, isSuccess } = useAppSelector(movieSelector);
    // const { _id } = useAppSelector(userSelector);

    useEffect(() => {
        setDisplayedMovies([]);
        const getCollection = async () => {
            // await dispatch(getUserCollection(_id));
            // dispatch(clearState());
            await dispatch(showCollection(userid));
            dispatch(clearState());
            // for (const movie of movieCollection) {
            //     await dispatch(getMovieDetails(movie.imdbId));
            //     dispatch(clearState());
            // }
        }
        getCollection();
    }, []);

    useEffect(() => {
        const getMoviesInfo = () => {
            for (const movie of movieCollection) {
                dispatch(getMovieDetails(movie.imdbId));
                dispatch(clearState());
            }
        }
        if (isSuccess) getMoviesInfo();
    }, [movieCollection]);

    useEffect(() => {
        if (isSuccess) setDisplayedMovies(state => [...state, movieDetails]);
    }, [movieDetails]);

    return (
        <div>
            <Topbar />
            <div className="container-collection-movies">
                {displayedMovies !== [] &&
                    <div className="collection-movie-cards-container">
                        {displayedMovies.map((mv) =>
                            <MovieBriefCard movie={mv} />
                        )}
                    </div>
                }
            </div>
        </div>
    );
}

export default MovieCollection;