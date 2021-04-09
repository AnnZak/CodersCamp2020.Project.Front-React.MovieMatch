import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';

export const userSlice = createSlice({

    name: 'user',
    initialState: {
        username: '',
        email: '',
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
    extraReducers: {

    },
})

export const userSelector = (state: RootState) => state.user;

export const loginUser = createAsyncThunk(
    'users/login',
    async ( userCredentials: {login: string, password: string}, thunkApi) => {
        try {

            const response = await axios.post(
                'https://awesome-movie-match.herokuapp.com/api/users/login', {
                    email: userCredentials.login,
                    password: userCredentials.password,
                }
            )
            if(response.status === 200) {
                localStorage.setItem('token', response.data.token);
                return response.data;
            } else {
                return thunkApi.rejectWithValue(response.data);
            }
        } catch (error) {
            console.log("Error", error.response.data);
            thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const { clearState }  = userSlice.actions;