export type SearchedMovie = {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
};

export type SearchMoviesResponse = SearchedMovie[];

export type MovieDetailsResponse = {
    imdbId: string,
    Title: string,
    imdbRating: string,
    Runtime: string,
    Year: string,
    Country: string,
    Genre: string,
    Director: string,
    Actors: string,
    Awards: string,
    Plot: string,
    Poster: string,
};
export type MovieCollectionDetailsResponse = MovieInCollection[];

export type MovieInCollection = {
    _id: string,
    imdbId: string,
    watched: boolean,
}

export type MovieCollectionResponse = MovieInCollection[];