export interface BasicState {
    isFetching: boolean,
    isSuccess: boolean,
    isError: boolean,
    errorMsg: string
}

export type ErrorResponse = { 
    error: string 
};

export type SuccessResponse = {
    message: string
}

export const clearState = <T extends BasicState>(state: T) => {
    state.isError = false;
    state.isSuccess = false;
    state.isFetching = false;
    return state as T;
}

export const UNKNOWN_ERROR_MSG = "unknown error occured"