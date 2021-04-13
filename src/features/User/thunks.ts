import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from '../../constants';
import { setToken } from '../../helpers/auth/auth';
import { ErrorResponse, SuccessResponse } from "../common";
import { LoginResponse, LoginCredentials, RegisterCredentials } from "./types";



export const loginUser = createAsyncThunk<
    LoginResponse,
    LoginCredentials,
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
    SuccessResponse,
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