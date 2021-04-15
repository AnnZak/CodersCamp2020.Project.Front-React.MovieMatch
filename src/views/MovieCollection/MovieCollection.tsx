import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

import './MovieCollection.scss';
import Topbar from '../../components/layout/topbar/topbar';
import MovieBriefCard from '../../components/layout/movieBriefCard/movieBriefCard';
import { showCollection, getMovieDetails, clearState } from '../../features/Movie/MovieSlice';
import { getFriendById } from '../../features/Friends/api';
import { userSelector } from '../../features/User';
import { MovieDetailsResponse } from '../../features/Movie/ts/movieTypes';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface ParamTypes {
    userid: string;
}

function MovieCollection() {

    const { userid } = useParams<ParamTypes>();

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

    const [collectionOwner, setCollectionOwner] = useState("");
    const [displayedMovies, setDisplayedMovies] = useState<{ movie: MovieDetailsResponse, watched: boolean }[]>([displayedInitialState]);
    const [errMessage, setErrMessage] = useState("");

    const dispatch = useAppDispatch();
    const { _id } = useAppSelector(userSelector);

    useEffect(() => {

        const getName = async () => {
            try {
                const res = await getFriendById(`${userid}`);
                setCollectionOwner((state) => { return ` ${res.data.displayedName}` });
            } catch (error) {
                setErrMessage(` Unidentified User`);
            }
            if (userid !== _id) {
            } else setCollectionOwner(" You");
        }

        setDisplayedMovies([displayedInitialState]);
        setErrMessage("");
        setCollectionOwner("");

        getName();

        dispatch(showCollection(userid)).then(unwrapResult).then(originalResult => {
            dispatch(clearState());
            for (const movie of originalResult) {
                dispatch(clearState());
                dispatch(getMovieDetails(movie.imdbId)).then(unwrapResult).then(originalResult => {
                    dispatch(clearState());
                    setDisplayedMovies(state => [...state, { movie: originalResult, watched: movie.watched }]);
                }).catch(e => {
                    setErrMessage((state) => {
                        if (userid === _id) return "No movies in collection";
                        else return "You don't have access to this collection";
                    });
                });
            }
        }).catch(e => {
            setErrMessage((state) => {
                if (userid === _id) return "No movies in collection";
                else return "You don't have access to this collection";
            });
        });
    }, [userid]);

    return (
        <div>
            <Topbar />
            <div className="collection__container-outer">
                <div className="container-collection-movies">
                    {errMessage === "" && <h1 className="collection__main-header">Movies liked by<span className="collection__owner">{collectionOwner}</span></h1>}
                    <div className="collection-movie-cards-container">
                        {errMessage !== "" ?
                            <div className="collection__error-container">
                                <h1>{errMessage}</h1>
                            </div> :
                            displayedMovies.map((element, index) =>
                                element.movie.Title && <MovieBriefCard key={`keymc${element.movie.imdbId}`} el={element as { movie: MovieDetailsResponse, watched: boolean }} />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieCollection;