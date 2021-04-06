import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface AuthState {
    loggedIn: boolean,
    token: string | null
}

const initialState: AuthState = {
    loggedIn: false,
    token: null
};

//etc. work in progress