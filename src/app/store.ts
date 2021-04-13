import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { movieSlice } from '../features/Movie/MovieSlice';
import { userSlice } from '../features/User/UserSlice';
import { friendSlice } from '../features/Friends/FriendSlice';
//import reducer slices from ../features

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    movies: movieSlice.reducer,
    friends: friendSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
