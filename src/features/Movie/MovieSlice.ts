import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SearchMoviesResponse, MovieDetailsResponse, MovieCollectionResponse } from './ts/movieTypes';
import { RootState } from '../../app/store';
import { API_URL } from '../../constants';
import { getToken } from '../../helpers/auth/auth';
import { SuccessResponse } from '../common';

type ErrorResponse = {
    error?: string,
    message?: string,
};

export const toggleWatched = createAsyncThunk<SuccessResponse, string, {rejectValue: ErrorResponse}>(
    'movie/toggle',
    async (movieId, thunkApi) => {
        try {
            const token = getToken();
            if (!token) return thunkApi.rejectWithValue({ error: "Token invalid" });

            const response = await axios({
                method: 'PATCH',
                headers: {
                    'authorization': token,
                },
                url: `${API_URL}/movies/${movieId}`
            });
            if (response.status === 200) {
                return response.data as SuccessResponse;
            } else {
                return thunkApi.rejectWithValue(response.data as ErrorResponse);
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data as ErrorResponse);
        }
    }
)

export const getUserCollection = createAsyncThunk<
    MovieCollectionResponse,
    string,
    {
        rejectValue: ErrorResponse,
    }
>(
    'movie/usercollection',
    async (userId, thunkApi) => {
        try {
            const token = getToken();
            if (!token) return thunkApi.rejectWithValue({ error: "Token invalid" });

            const response = await axios({
                method: 'GET',
                headers: {
                    'authorization': token,
                },
                url: `${API_URL}/movies/collection/${userId}`
            });
            if (response.status === 200) {
                return response.data as MovieCollectionResponse;
            } else {
                return thunkApi.rejectWithValue(response.data as ErrorResponse);
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data as ErrorResponse);
        }
    }
);

export const showCollection = createAsyncThunk<
    MovieCollectionResponse,
    string,
    {
        rejectValue: ErrorResponse,
    }
>(
    'movie/collection',
    async (userId, thunkApi) => {
        try {
            const token = getToken();
            if (!token) return thunkApi.rejectWithValue({ error: "Token invalid" });

            const response = await axios({
                method: 'GET',
                headers: {
                    'authorization': token,
                },
                url: `${API_URL}/movies/collection/${userId}`
            });
            if (response.status === 200) {
                return response.data as MovieCollectionResponse;
            } else {
                return thunkApi.rejectWithValue(response.data as ErrorResponse);
            }
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data as ErrorResponse);
        }
    }
);

export const addToLiked = createAsyncThunk<
    string,
    string,
    {
        rejectValue: ErrorResponse,
    }
>(
    'movie/like',
    async (movieId, thunkApi) => {
        try {
            const token = getToken();
            if (!token) return thunkApi.rejectWithValue({ error: "Token invalid" });

            const response = await axios({
                method: 'POST',
                headers: {
                    'authorization': token,
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

export const removeFromLiked = createAsyncThunk<
    string,
    string,
    {
        rejectValue: ErrorResponse,
    }
>(
    'movie/unlike',
    async (movieId, thunkApi) => {
        try {
            const token = getToken();
            if (!token) return thunkApi.rejectWithValue({ error: "Token invalid" });
            const response = await axios({
                method: 'DELETE',
                headers: {
                    'authorization': token,
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
    'movie/details',
    async (movieId, thunkApi) => {
        try {
            const token = getToken();
            if (!token) return thunkApi.rejectWithValue({ error: "Token invalid" });

            const response = await axios({
                method: 'GET',
                headers: {
                    'authorization': token,
                },
                url: `${API_URL}/movies/${movieId}`
            });
            if (response.status === 200) {
                let res = { imdbId: movieId, ...response.data };
                return res as MovieDetailsResponse;
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
    'movie/search',
    async (searchQuery, thunkApi) => {
        try {
            const token = getToken();
            if (!token) return thunkApi.rejectWithValue({ error: "Token invalid" });

            const response = await axios.get(
                `${API_URL}/movies`, {
                params: {
                    title: searchQuery
                },
                headers: {
                    'authorization': token,
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

export const getSuggestedMovies = createAsyncThunk<
    SearchMoviesResponse,
    string,
    {
        rejectValue: ErrorResponse,
    }
>(
    'movie/suggest',
    async (empty, thunkApi) => {
        try {
            const token = getToken();
            if (!token) return thunkApi.rejectWithValue({ error: "Token invalid" });

            const response = await axios.get(
                `${API_URL}/movies/suggest`, {
                headers: {
                    'authorization': token,
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
    name: 'movie',
    initialState: {
        userMovieCollection: [
            {
                _id: '',
                imdbId: '',
                watched: false
            },
        ],
        movieCollection: [
            {
                _id: '',
                imdbId: '',
                watched: false
            },
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
        suggestedMovies: [
            {
                Title: '',
                Year: '',
                imdbID: '',
                Type: '',
                Poster: '',
            },
        ],
        movieDetails: {
            imdbId: '',
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
        clearCollection: (state) => {
            state.movieCollection = [
                {
                    _id: '',
                    imdbId: '',
                    watched: false
                },
            ];
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

        builder.addCase(getSuggestedMovies.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.errorMsg = '';
            state.suggestedMovies = payload;
        });

        builder.addCase(getSuggestedMovies.rejected, (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMsg = payload && payload.message ? payload.message : payload && payload.error ? payload.error : 'unknown error occured';
        });

        builder.addCase(getSuggestedMovies.pending, (state) => {
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

        builder.addCase(addToLiked.fulfilled, (state, { payload }) => {
            state.isSuccess = true;
            state.isFetching = false;
            state.isError = false;
            state.errorMsg = '';
            const newMovie = {
                _id: '',
                imdbId: payload,
                watched: false
            };
            if (state.userMovieCollection.length === 1 && state.userMovieCollection[0]._id === '') {
                state.userMovieCollection = [newMovie];
            }
            else state.userMovieCollection = [...state.userMovieCollection, newMovie];
        });

        builder.addCase(addToLiked.rejected, (state, { payload }) => {
            state.isSuccess = false;
            state.isFetching = false;
            state.isError = true;
            state.errorMsg = payload && payload.message ? payload.message : payload && payload.error ? payload.error : 'unknown error occured';
        });

        builder.addCase(addToLiked.pending, (state) => {
            state.isSuccess = false;
            state.isFetching = true;
            state.isError = false;
            state.errorMsg = '';
        });

        builder.addCase(removeFromLiked.fulfilled, (state, { payload }) => {
            state.isSuccess = true;
            state.isFetching = false;
            state.isError = false;
            state.errorMsg = '';
            state.userMovieCollection.filter(obj => obj.imdbId !== payload);
        });

        builder.addCase(removeFromLiked.rejected, (state, { payload }) => {
            state.isSuccess = false;
            state.isFetching = false;
            state.isError = true;
            state.errorMsg = payload && payload.message ? payload.message : payload && payload.error ? payload.error : 'unknown error occured';
        });

        builder.addCase(removeFromLiked.pending, (state) => {
            state.isSuccess = false;
            state.isFetching = true;
            state.isError = false;
            state.errorMsg = '';
        });

        builder.addCase(showCollection.fulfilled, (state, { payload }) => {
            state.isSuccess = true;
            state.isFetching = false;
            state.isError = false;
            state.errorMsg = '';
            state.movieCollection = payload;
        });

        builder.addCase(showCollection.rejected, (state, { payload }) => {
            state.isSuccess = false;
            state.isFetching = false;
            state.isError = true;
            state.errorMsg = payload && payload.message ? payload.message : payload && payload.error ? payload.error : 'unknown error occured';
        });

        builder.addCase(showCollection.pending, (state) => {
            state.isSuccess = false;
            state.isFetching = true;
            state.isError = false;
            state.errorMsg = '';
        });

        builder.addCase(getUserCollection.fulfilled, (state, { payload }) => {
            state.isSuccess = true;
            state.isFetching = false;
            state.isError = false;
            state.errorMsg = '';
            state.userMovieCollection = payload;
        });

        builder.addCase(getUserCollection.rejected, (state, { payload }) => {
            state.isSuccess = false;
            state.isFetching = false;
            state.isError = true;
            state.errorMsg = payload && payload.message ? payload.message : payload && payload.error ? payload.error : 'unknown error occured';
        });

        builder.addCase(getUserCollection.pending, (state) => {
            state.isSuccess = false;
            state.isFetching = true;
            state.isError = false;
            state.errorMsg = '';
        });

        //toggle watched
        builder.addCase(toggleWatched.fulfilled, (state, { meta }) => {
            state.isSuccess = true;
            state.isFetching = false;
            state.isError = false;
            state.errorMsg = '';

            const index = state.userMovieCollection.map(movie => movie.imdbId).indexOf(meta.arg);
            state.userMovieCollection[index].watched = !state.userMovieCollection[index].watched;
        });

        builder.addCase(toggleWatched.rejected, (state, { payload }) => {
            state.isSuccess = false;
            state.isFetching = false;
            state.isError = true;
            state.errorMsg = payload && payload.message ? payload.message : payload && payload.error ? payload.error : 'unknown error occured';
        });

        builder.addCase(toggleWatched.pending, (state) => {
            state.isSuccess = false;
            state.isFetching = true;
            state.isError = false;
            state.errorMsg = '';
        });
    }
});

export const movieSelector = (state: RootState) => state.movies;
export const { clearState, clearCollection } = movieSlice.actions;