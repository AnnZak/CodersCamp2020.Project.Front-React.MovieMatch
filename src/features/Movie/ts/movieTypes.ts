export type SearchedMovie = {
    Title: string,
    Year: string,
    imdbID: string,
    Type: string,
    Poster: string
};

export type SearchMoviesResponse = [
    SearchedMovie
];