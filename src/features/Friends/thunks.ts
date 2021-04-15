import { createAsyncThunk } from "@reduxjs/toolkit";
import {Friend, InvitationCollection} from './types'
import * as friendsApi from './api';
import { ErrorResponse, SuccessResponse } from "../common";

export const getAll = createAsyncThunk<
    Array<Friend>,
    void,
    {
        rejectValue: ErrorResponse,
    }
>(
    "friends/getAll",
    async () => {
        try {
            const response = await friendsApi.getAll();
            if(response.status === 200) return response.data.results as Friend[];
    
            return response.data;
        } catch (error) {
            return error.response.data as ErrorResponse;
        }
    }
);

export const search = createAsyncThunk<
    Array<Friend>,
    string,
    {
        rejectValue: ErrorResponse,
    }
>(
    "friends/search",
    async (dispName, thunkApi) => {
        const response = await friendsApi.search(dispName);
        if(response.status === 200) return response.data.results as Friend[];

        return thunkApi.rejectWithValue(response.data);
    }
);

export const invite = createAsyncThunk<
    SuccessResponse,
    string,
    {
        rejectValue: ErrorResponse,
    }
>(
    "friends/invite",
    async (friendId, thunkApi) => {
        const response = await friendsApi.invite(friendId);
        if(response.status === 200) return response.data as SuccessResponse;

        return thunkApi.rejectWithValue(response.data);
    }
);

export const accept = createAsyncThunk<
    SuccessResponse,
    string,
    {
        rejectValue: ErrorResponse,
    }
>(
    "friends/accept",
    async (invitationId, thunkApi) => {
        const response = await friendsApi.acceptInvitation(invitationId);
        if(response.status === 200) return response.data as SuccessResponse;

        return thunkApi.rejectWithValue(response.data);
    }
);

export const decline = createAsyncThunk<
    SuccessResponse,
    string,
    {
        rejectValue: ErrorResponse,
    }
>(
    "friends/decline",
    async (invitationId, thunkApi) => {
        const response = await friendsApi.declineInvitation(invitationId);
        if(response.status === 200) return response.data as SuccessResponse;

        return thunkApi.rejectWithValue(response.data);
    }
);

export const getInvitations = createAsyncThunk<
    InvitationCollection,
    void,
    {
        rejectValue: ErrorResponse,
    }
>(
    "friends/invitations",
    async (never, thunkApi) => {
        try {
            const response = await friendsApi.getInvitations();
            if(response.status === 200) return response.data as InvitationCollection;
    
            return thunkApi.rejectWithValue(response.data as ErrorResponse);
        } catch (error) {
            return thunkApi.rejectWithValue(error.response.data as ErrorResponse);
        }
    }
);