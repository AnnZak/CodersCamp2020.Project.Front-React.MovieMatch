import './movieBriefCard.scss';
import { MovieDetailsResponse } from '../../../features/Movie/ts/movieTypes';
import moviedefault from '../../../assets/images/moviedefault.jpg';

function MovieBriefCard(props: { movie: MovieDetailsResponse }) {

    return (
        <div className="collection-movie-card">
            {(props.movie.Poster && props.movie.Poster !== "N/A") ?
                <img className="collection-movie-poster" src={props.movie.Poster} alt="movie poster" />
                : <img className="collection-movie-poster" src={moviedefault} alt="default movie poster" style={{ opacity: 0.5 }} />
            }
            {props.movie.Title &&
                <div className="collection-movie-actions-icons">
                    <h2 className="collection-movie-title">{props.movie.Title}</h2>
                    <button className="heart-collection liked"><i className="fas fa-heart"></i></button>
                </div>
            }
        </div>
    );
}

export default MovieBriefCard;