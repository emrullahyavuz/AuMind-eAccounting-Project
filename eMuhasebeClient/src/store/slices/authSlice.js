import { createSlice } from '@reduxjs/toolkit';
import { api } from '../api';

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  currentCompany: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.currentCompany = null;
      localStorage.removeItem('token');
    },
    setCurrentCompany: (state, action) => {
      state.currentCompany = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        api.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token;
          state.user = payload.user;
          state.isAuthenticated = true;
          localStorage.setItem('token', payload.token);
        }
      )
      .addMatcher(
        api.endpoints.changeCompany.matchFulfilled,
        (state, { payload }) => {
          state.currentCompany = payload.company;
        }
      );
  },
});

export const { logout, setCurrentCompany } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentCompany = (state) => state.auth.currentCompany;

export default authSlice.reducer;
