// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  role: null,
  status: 'idle',
  message: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload.username;
      state.user_id = action.payload.userid;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.message = action.payload.message;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      state.message = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.status = 'idle';
      state.message = null;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;

// Async action creator
export const loginUser = (userData) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (response.ok) {
      dispatch(loginSuccess(data));
    } else {
      const error = data.error;
      throw new Error(error);
    }
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
