export type SearchedMovie = {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
};

export type SearchMoviesResponse = SearchedMovie[];

export type MovieDetailsResponse = {
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
