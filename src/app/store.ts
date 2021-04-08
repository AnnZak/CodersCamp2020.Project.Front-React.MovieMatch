import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
//import reducer slices from ../features

export const store = configureStore({
  reducer: {
    //add reducer slices
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
