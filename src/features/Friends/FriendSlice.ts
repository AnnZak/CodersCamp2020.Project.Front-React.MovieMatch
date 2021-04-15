import { createSlice, createAsyncThunk, AsyncThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {clearState, UNKNOWN_ERROR_MSG} from '../common'
import { SliceState } from "./types";
import { getAll, search, invite, accept, decline, getInvitations } from './thunks';


const initialState: SliceState = {
    allFriends: [],
    invitations: {
        sent: [],
        received: []
    },
    shownFriends: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMsg: "",
}

export const friendSlice = createSlice({

    name: "friends",

    initialState,

    reducers: {
        clearState, //TODO: check if it works
        resetState: (state) => {
            state = initialState;
        }
    },

    extraReducers: (builder) => {

        //getAll

        builder.addCase(getAll.fulfilled, (state, { payload }) => {
            state.allFriends = payload;
            state.isFetching = false;
            state.isSuccess = true;
        });

        builder.addCase(getAll.pending, (state) => {
            state.isFetching = true;
        });

        builder.addCase(getAll.rejected, (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMsg = payload?.error || UNKNOWN_ERROR_MSG;
        });

        //search

        builder.addCase(search.fulfilled, (state, { payload }) => {
            state.isFetching = false;
            state.isSuccess = true;
            state.shownFriends = payload;
        });

        builder.addCase(search.pending, (state) => {
            state.isFetching = true;
            state.shownFriends = [];
        });

        builder.addCase(search.rejected, (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMsg = payload?.error || UNKNOWN_ERROR_MSG;
        });


        //invite

        builder.addCase(invite.fulfilled, (state) => {
            state.isFetching = false;
            state.isSuccess = true;
        });

        builder.addCase(invite.pending, (state) => {
            state.isFetching = true;
        });

        builder.addCase(invite.rejected, (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMsg = payload?.error || UNKNOWN_ERROR_MSG;
        });

        //accept invitation

        builder.addCase(accept.fulfilled, (state, {meta}) => {
            const invitationId = meta.arg;

            const index = state.invitations.received.map(invitation => invitation._id).indexOf(invitationId);

            state.allFriends.push(state.invitations.received[index].sender)
            state.invitations.received.splice(index, 1);

            state.isFetching = false;
            state.isSuccess = true;
        });

        builder.addCase(accept.pending, (state) => {
            state.isFetching = true;
        });

        builder.addCase(accept.rejected, (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMsg = payload?.error || UNKNOWN_ERROR_MSG;
        });

        //decline invitation

        builder.addCase(decline.fulfilled, (state, { meta }) => {
            const invitationId = meta.arg;
            state.invitations.received = state.invitations.received.filter(invitation => invitationId !== invitation._id)
            state.isFetching = false;
            state.isSuccess = true;
        });

        builder.addCase(decline.pending, (state) => {
            state.isFetching = true;
        });

        builder.addCase(decline.rejected, (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMsg = payload?.error || UNKNOWN_ERROR_MSG;
        });

        //get all invitations
        builder.addCase(getInvitations.fulfilled, (state, { payload }) => {
            state.invitations = payload;
            state.isFetching = false;
            state.isSuccess = true;
        });

        builder.addCase(getInvitations.pending, (state) => {
            state.isFetching = true;
        });

        builder.addCase(getInvitations.rejected, (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.errorMsg = payload?.error || UNKNOWN_ERROR_MSG;
        });
    }
});

const removeById = <T>(array: Array<T>, id: string) => {

}

export const friendsSelector = (state: RootState) => state.friends
export { getAll, search, invite, accept, decline, getInvitations }
export type { Friend } from './types'