import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import userSlice from './user/user.slice';

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useUserSelector = () =>
  useSelector((state: RootState) => state.user);
