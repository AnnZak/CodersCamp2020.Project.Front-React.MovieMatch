import {userReducer, clearState} from './UserSlice'
import {SliceState} from './types';

describe('user reducer', () => {

    const testState: SliceState = {
        _id: '',
        displayedName: '',
        name: '',
        email: '',
        isFetching: true,
        isSuccess: true,
        isError: true,
        errorMsg: 'Try Me!',
    }
    
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

    it('should handle initial state', () => {
        expect(userReducer(undefined, {type: "unknown"})).toEqual(initialState);
    });

    it('should handle flag clearing', () => {
        expect(userReducer(testState, clearState())).toEqual(initialState);
    })
});