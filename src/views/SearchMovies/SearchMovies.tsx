import './SearchMovies.scss';
import Topbar from '../../components/layout/topbar/topbar';
import { useAppSelector } from '../../app/hooks';
import { movieSelector } from '../../features/Movie/MovieSlice';
import moviedefault from '../../assets/images/moviedefault.jpg';

function SearchFriends() {

    const { searchedMovies } = useAppSelector(
        movieSelector
    );

    return (
        <div>
            <Topbar />
            <div className="container-searched-movies">
                <div className="movie-cards-container">

                    {searchedMovies && searchedMovies.map((movie) =>
                    (
                        <div className="movie-card">
                            {movie.Poster && movie.Poster !== "N/A" ?
                                <img className="movie-poster" src={movie.Poster} alt="movie poster" /> :
                                <img className="movie-poster" src={moviedefault} alt="movie poster" style={{ opacity: 0.5 }} />
                            }
                            <h2 className="movie-title">{movie.Title}</h2>
                        </div>
                    )
                    )}

                </div>
            </div>
        </div>
    );
}

export default SearchFriends;