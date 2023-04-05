import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  id: string;
  email: string;
  role: string;
  name: string;
}

const userInitialState: IUserState = {
  email: '',
  role: '',
  name: '',
  id: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },

    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },

    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { setEmail, setName, setRole, setId } = userSlice.actions;

export default userSlice.reducer;
