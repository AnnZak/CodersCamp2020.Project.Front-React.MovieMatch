import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { deleteToken } from '../../helpers/auth/auth';
import { UNKNOWN_ERROR_MSG } from '../common';
import { SliceState } from "./types";
import { loginUser, registerUser, confirmRegistration, getUserData } from './thunks';

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

const userSlice = createSlice({
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

        //login

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
            state.errorMsg = action.payload ? action.payload.error : UNKNOWN_ERROR_MSG;
        });

        builder.addCase(loginUser.pending, (state) => {
            state.isFetching = true;
        });

        //getData

        builder.addCase(getUserData.fulfilled, (state, { payload }) => {
            state._id = payload._id;
            state.displayedName = payload.displayedName;
            state.name = payload.name;
            state.email = payload.email;
            state.isFetching = false;
            state.isSuccess = true;
            state.errorMsg = "";
        });

        builder.addCase(getUserData.rejected, (state, action) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMsg = action.payload ? action.payload.error : UNKNOWN_ERROR_MSG;
        });

        builder.addCase(getUserData.pending, (state) => {
            state.isFetching = true;
        });

        //register

        builder.addCase(registerUser.fulfilled, (state) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.errorMsg = "";
        });

        builder.addCase(registerUser.rejected, (state, action) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMsg = action.payload ? action.payload.error : UNKNOWN_ERROR_MSG;
        });

        builder.addCase(registerUser.pending, (state) => {
            state.isFetching = true;
        });

        //confirm register

        builder.addCase(confirmRegistration.fulfilled, (state) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.errorMsg = "";
        });

        builder.addCase(confirmRegistration.rejected, (state, action) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMsg = action.payload ? action.payload.error : UNKNOWN_ERROR_MSG;
        });

        builder.addCase(confirmRegistration.pending, (state) => {
            state.isFetching = true;
        });
    }
});

export const userSelector = (state: RootState) => state.user;
export const userReducer = userSlice.reducer;
export const { clearState, resetState, logout } = userSlice.actions;


