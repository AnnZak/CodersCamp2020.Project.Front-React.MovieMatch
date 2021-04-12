import React from 'react';
import { useParams } from "react-router-dom";
import Topbar from '../../components/layout/topbar/topbar';
import MovieCard from '../../components/layout/movieCard/movieCard';

interface ParamTypes {
    movieid: string;
}

function MovieDetails() {

    const { movieid } = useParams<ParamTypes>();

    return (
        <div className="movie-details">
            <Topbar />
            <MovieCard movieId={movieid} />
        </div>
    );
}

export default MovieDetails;
