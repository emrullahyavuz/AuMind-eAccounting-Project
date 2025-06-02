import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';

// Function to decode JWT token
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Token decode error:', error);
    return null;
  }
};

// Get user info from token
const getUserFromToken = (token) => {
  if (!token) return null;
  const decodedToken = decodeToken(token);
  if (!decodedToken) return null;
  
  return {
    id: decodedToken.Id,
    name: decodedToken.Name,
    email: decodedToken.Email,
    userName: decodedToken.UserName,
    companyId: decodedToken.CompanyId,
    isAdmin: decodedToken.IsAdmin === "True",
    companies: JSON.parse(decodedToken.Companies || '[]')
  };
};

const initialState = {
  user: getUserFromToken(localStorage.getItem('token')),
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
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.data.token;
          state.user = getUserFromToken(payload.data.token);
          state.isAuthenticated = true;
          state.currentCompany = payload.data;
          localStorage.setItem('token', payload.data.token);
        }
      )
      .addMatcher(
        authApi.endpoints.changeCompany.matchFulfilled,
        (state, { payload }) => {
          if (payload.isSuccessful && payload.data) {
            state.token = payload.data.token;
            state.user = getUserFromToken(payload.data.token);
            state.currentCompany = payload.data;
            localStorage.setItem('token', payload.data.token);
          }
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
