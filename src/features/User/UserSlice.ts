import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../../app/store';
import { API_URL } from '../../constants';
import { deleteToken, setToken } from '../../helpers/auth/auth';

export type UserCredentials = {
    email: string,
    password: string,
};

type SliceState = {
    _id: string,
    displayedName: string,
    name: string,
    email: string,
    isFetching: boolean,
    isSuccess: boolean,
    isError: boolean,
    errorMsg: string,
}

type UserAttributes = {
    _id: string,
    email: string,
    name: string,
    displayedName: string,
}

type LoginResponse = {
    token: string,
    user: UserAttributes,
}

type ErrorResponse = {
    error: string
}

type RegisterResponse = {
    message: string,
}

export type RegisterCredentials = {
    email: string,
    name: string,
    displayedName: string,
    password: string,
};

export const loginUser = createAsyncThunk<
    LoginResponse,
    UserCredentials,
    {
        rejectValue: ErrorResponse,
    }
>(
    'user/login',
    async (userCredentials, thunkApi) => {
        try {
            const response = await axios.post(
                `${API_URL}/users/login`, {
                email: userCredentials.email,
                password: userCredentials.password,
            }
            )
            if (response.status === 200) {
                setToken(response.data.token);
                return response.data as LoginResponse;
            } else {
                return thunkApi.rejectWithValue(response.data as ErrorResponse);
            }
        } catch (error) {
            console.log("Error", error.response.data);
            return thunkApi.rejectWithValue(error.response.data as ErrorResponse);
        }
    }
);

export const registerUser = createAsyncThunk<
    RegisterResponse,
    RegisterCredentials,
    {
        rejectValue: ErrorResponse,
    }
>(
    'user/register',
    async (userCredentials, thunkApi) => {
        try {
            const response = await axios.post(
                `${API_URL}/users/register`, userCredentials
            )
            if (response.status === 200) {
                return response.data as RegisterResponse;
            } else {
                return thunkApi.rejectWithValue(response.data as ErrorResponse);
            }
        } catch (error) {
            console.log("Error", error.response.data);
            return thunkApi.rejectWithValue(error.response.data as ErrorResponse);
        }
    }
);

const initialState: SliceState = {
    _id: '',
    displayedName: '',
    name: '',
    email: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMsg: '',
}

export const userSlice = createSlice({
    name: 'user',

    initialState,
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;
            return state;
        },
        resetState: (state) => {
            state = initialState;
        },
        logout: (state) => {
            deleteToken();
            state = initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            state._id = payload.user._id;
            state.displayedName = payload.user.displayedName;
            state.name = payload.user.name;
            state.email = payload.user.email;
            state.isFetching = false;
            state.isSuccess = true;
            state.errorMsg = "";
        });

        builder.addCase(loginUser.rejected, (state, action) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMsg = action.payload ? action.payload.error : "unknown error occured";
        });

        builder.addCase(loginUser.pending, (state) => {
            state.isFetching = true;
        });
        builder.addCase(registerUser.fulfilled, (state) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.errorMsg = "";
        });

        builder.addCase(registerUser.rejected, (state, action) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMsg = action.payload ? action.payload.error : "unknown error occured";
        });

        builder.addCase(registerUser.pending, (state) => {
            state.isFetching = true;
        });
    }
});

export const userSelector = (state: RootState) => state.user;
export const { clearState, resetState, logout } = userSlice.actions;
