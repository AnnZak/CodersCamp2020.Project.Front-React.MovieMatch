import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SearchMoviesResponse } from './ts/movieTypes';
import { RootState } from '../../app/store';
import { API_URL } from '../../constants';

type ErrorResponse = {
    error: string
};

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
            }
            )
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
        movieCollection: [],
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
            state.errorMsg = payload ? payload.error : 'unknown error occured';
        });

        builder.addCase(searchMovies.pending, (state) => {
            state.isFetching = true;
        });
    }
});

export const movieSelector = (state: RootState) => state.movies;
export const { clearState } = movieSlice.actions;