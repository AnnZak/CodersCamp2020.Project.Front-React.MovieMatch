import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from '../../constants';
import { setToken } from '../../helpers/auth/auth';
import { ErrorResponse, SuccessResponse } from "../common";
import { LoginResponse, LoginCredentials, RegisterCredentials, UserData } from "./types";
import * as userApi from './api';

type KnownReject = {
    rejectValue: ErrorResponse
}

export const loginUser = createAsyncThunk<LoginResponse, LoginCredentials, KnownReject>(
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

export const getUserData = createAsyncThunk<UserData, void, KnownReject>(
    'user/getData',
    async (userCredentials?, thunkApi?) => {
        try {
            const response = await userApi.getUserData();
            if (response.status === 200) {
                return response.data as UserData;
            } else {
                return thunkApi.rejectWithValue(response.data as ErrorResponse);
            }
        } catch (error) {
            console.log("Error", error.response.data);
            return thunkApi.rejectWithValue(error.response.data as ErrorResponse);
        }
    }
);

export const registerUser = createAsyncThunk<SuccessResponse, RegisterCredentials, KnownReject>(
    'user/register',
    async (userCredentials, thunkApi) => {
        try {
            const response = await axios.post(
                `${API_URL}/users/register`, userCredentials
            )
            if (response.status === 200) {
                return response.data as SuccessResponse;
            } else {
                return thunkApi.rejectWithValue(response.data as ErrorResponse);
            }
        } catch (error) {
            console.log("Error", error.response.data);
            return thunkApi.rejectWithValue(error.response.data as ErrorResponse);
        }
    }
);

export const confirmRegistration = createAsyncThunk<SuccessResponse, string, KnownReject>(
    'user/confirm',
    async (regToken:string, thunkApi) => {

        try {
            const response = await userApi.confirmRegistration(regToken);
            if(response.status === 200) return response.data as SuccessResponse;
            
            return thunkApi.rejectWithValue(response.data as ErrorResponse);
            
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data as ErrorResponse);
        }
    }
)


type UserField = { name?: string, displayedName?: string, email?: string}
type ChangeParams = {id: string, toChange: UserField}

export const changeData = createAsyncThunk<SuccessResponse, ChangeParams, KnownReject>(
    'user/changeData',
    async (params: ChangeParams, thunkApi) => {

        try {
            const response = await userApi.editData(params.id, params.toChange);
            if(response.status === 200) return response.data as SuccessResponse;
            
            return thunkApi.rejectWithValue(response.data as ErrorResponse);
            
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data as ErrorResponse);
        }
    }
)