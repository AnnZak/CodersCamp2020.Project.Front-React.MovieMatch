import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import './MovieCollection.scss';
import Topbar from '../../components/layout/topbar/topbar';
import MovieBriefCard from '../../components/layout/movieBriefCard/movieBriefCard';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getMovieDetails, movieSelector } from '../../features/Movie/MovieSlice';
import { MovieDetailsResponse } from '../../features/Movie/ts/movieTypes';
import { showCollection } from '../../features/Movie/MovieSlice';

interface ParamTypes {
    userid: string;
}

function MovieCollection() {

    const { userid } = useParams<ParamTypes>();

    const [userMovieCollection, setUserMovieCollection] = useState<MovieDetailsResponse[]>([]);

    const dispatch = useAppDispatch();
    const { movieCollection, movieDetails, isSuccess } = useAppSelector(movieSelector);

    useEffect(() => {
        const getCollection = async () => {
            await dispatch(showCollection(userid));
        }
        getCollection();
    }, []);

    useEffect(() => {
        const getMoviesInfo = () => {
            for (const movie of movieCollection) {
                dispatch(getMovieDetails(movie.imdbId));
            }
        }
        if (isSuccess) getMoviesInfo();
    }, [movieCollection]);

    useEffect(() => {
        if (isSuccess) setUserMovieCollection(state => [...state, movieDetails])
    }, [movieDetails]);

    return (
        <div>
            <Topbar />
            <div className="container-collection-movies">
                <div className="collection-movie-cards-container">
                    {userMovieCollection.map((mv) =>
                        <MovieBriefCard movie={mv} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default MovieCollection;