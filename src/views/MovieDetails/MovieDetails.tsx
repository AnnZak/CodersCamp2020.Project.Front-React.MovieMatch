import React from 'react';
import { useParams } from "react-router-dom";
import Topbar from '../../components/layout/topbar/topbar';
import MovieDetailsCard from '../../components/layout/movieDetailsCard/movieDetailsCard';

interface ParamTypes {
    movieid: string;
}

function MovieDetails() {

    const { movieid } = useParams<ParamTypes>();

    return (
        <div className="movie-details">
            <Topbar />
            <MovieDetailsCard movieId={movieid} />
        </div>
    );
}

export default MovieDetails;
