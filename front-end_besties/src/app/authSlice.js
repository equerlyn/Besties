import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userData: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setIsAuthenticated, setUserData } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
