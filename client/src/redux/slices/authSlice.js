import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
    },
    loginFailed(state, action) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload.error;
    },
    logout(state, action) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
});

const { actions, reducer } = authSlice;

export const { loginSuccess, loginFailed, logout } = actions;

export default reducer;
