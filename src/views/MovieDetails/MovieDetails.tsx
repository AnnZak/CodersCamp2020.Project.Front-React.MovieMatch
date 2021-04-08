import React from 'react';
import Topbar from '../../components/layout/topbar/topbar';
import MovieCard from '../../components/layout/movieCard/movieCard';

function MovieDetails() {

    return (
        <div className="movie-details">
            <Topbar />
            <MovieCard />
        </div>
    );
}

export default MovieDetails;
