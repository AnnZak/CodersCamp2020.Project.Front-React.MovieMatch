import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SearchMoviesResponse, MovieDetailsResponse } from './ts/movieTypes';
import { RootState } from '../../app/store';
import { API_URL } from '../../constants';

type ErrorResponse = {
    error?: string,
    message?: string,
};

export const toggleLiked = createAsyncThunk<
    string,
    string,
    {
        rejectValue: ErrorResponse,
    }
>(
    'movie/like',
    async (movieId, thunkApi) => {
        try {
            const response = await axios({
                method: 'POST',
                headers: {
                    'authorization': localStorage.getItem('authorization'),
                },
                url: `${API_URL}/movies/${movieId}`
            });
            if (response.status === 200) {
                return `${movieId}` as string;
            } else {
                return thunkApi.rejectWithValue(response.data as ErrorResponse);
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data as ErrorResponse);
        }
    }
);

export const getMovieDetails = createAsyncThunk<
    MovieDetailsResponse,
    string,
    {
        rejectValue: ErrorResponse,
    }
>(
    'movie/show',
    async (movieId, thunkApi) => {
        try {
            const response = await axios.get(
                `${API_URL}/movies/${movieId}`, {
                headers: {
                    'authorization': localStorage.getItem('authorization'),
                },
            });
            if (response.status === 200) {
                return response.data as MovieDetailsResponse;
            } else {
                return thunkApi.rejectWithValue(response.data as ErrorResponse);
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data as ErrorResponse);
        }
    }
);

export const searchMovies = createAsyncThunk<
    SearchMoviesResponse,
    string,
    {
        rejectValue: ErrorResponse,
    }
>(
    'movies/search',
    async (searchQuery, thunkApi) => {
        try {
            const response = await axios.get(
                `${API_URL}/movies`, {
                params: {
                    title: searchQuery
                },
                headers: {
                    'authorization': localStorage.getItem('authorization'),
                },
            });
            if (response.status === 200) {
                return response.data as SearchMoviesResponse;
            } else {
                return thunkApi.rejectWithValue(response.data as ErrorResponse);
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data as ErrorResponse);
        }
    }
);

export const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        movieCollection: [
            '',
        ],
        searchedMovies: [
            {
                Title: '',
                Year: '',
                imdbID: '',
                Type: '',
                Poster: '',
            },
        ],
        movieDetails: {
            Title: '',
            imdbRating: '',
            Runtime: '',
            Year: '',
            Country: '',
            Genre: '',
            Director: '',
            Actors: '',
            Awards: '',
            Plot: '',
            Poster: ''
        },
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMsg: '',
    },
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            return state;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(searchMovies.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.errorMsg = '';
            state.searchedMovies = payload;
        });

        builder.addCase(searchMovies.rejected, (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMsg = payload && payload.message ? payload.message : payload && payload.error ? payload.error : 'unknown error occured';
        });

        builder.addCase(searchMovies.pending, (state) => {
            state.isFetching = true;
        });

        builder.addCase(getMovieDetails.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.errorMsg = '';
            state.movieDetails = payload;
        });

        builder.addCase(getMovieDetails.rejected, (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMsg = payload && payload.message ? payload.message : payload && payload.error ? payload.error : 'unknown error occured';
        });

        builder.addCase(getMovieDetails.pending, (state) => {
            state.isFetching = true;
        });

        builder.addCase(toggleLiked.fulfilled, (state, { payload }) => {
            state.isSuccess = true;
            state.isFetching = false;
            state.isError = false;
            state.errorMsg = '';
            if (state.movieCollection.length === 1 && state.movieCollection[0] === '') state.movieCollection = [payload];
            else state.movieCollection = [...state.movieCollection, payload];
        });

        builder.addCase(toggleLiked.rejected, (state, { payload }) => {
            state.isSuccess = false;
            state.isFetching = false;
            state.isError = true;
            state.errorMsg = payload && payload.message ? payload.message : payload && payload.error ? payload.error : 'unknown error occured';
        });

        builder.addCase(toggleLiked.pending, (state) => {
            state.isSuccess = false;
            state.isFetching = true;
            state.isError = false;
            state.errorMsg = '';
        });
    }
});

export const movieSelector = (state: RootState) => state.movies;
export const { clearState } = movieSlice.actions;