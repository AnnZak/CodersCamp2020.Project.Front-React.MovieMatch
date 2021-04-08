import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
})

export const userSelector = (state: RootState) => state.user;

export const loginUser = createAsyncThunk(
    'users/login',
    async ( userCredentials: {login: string, password: string}, thunkApi) => {
        try {
            const response = await fetch(
                'https://awesome-movie-match.herokuapp.com/api/users/login',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userCredentials
                    }),
                }
            );
            const data = await response.json();
            if(response.status === 200) {
                localStorage.setItem('token', data.token);
                return data;
            } else {
                return thunkApi.rejectWithValue(data);
            }
        } catch (error) {
            console.log("Error", error.response.data);
            thunkApi.rejectWithValue(error.response.data);
        }
    }
);

export const { clearState }  = userSlice.actions;