"use client";

import { logOutAction } from "@/app/(Auth)/sign-in/action";
import { USER } from "@/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface InitialSateType {
  isAuthenticated: boolean;
  isLoading: boolean;
  isLogoutLoading: boolean;
  data: USER | null;
}

const initialState: InitialSateType = {
  isAuthenticated: false,
  isLoading: true,
  isLogoutLoading: false,
  data: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set_current_user: (state, action: PayloadAction<USER>) => {
      (state.isAuthenticated = true), (state.data = action.payload);
    },
    stop_loading: (state) => {
      state.isLoading = false;
    },
    start_loading: (state) => {
      state.isLoading = true;
    },
    start_logout: (state) => {
      state.isLogoutLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLogoutLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLogoutLoading = false;
        state.isAuthenticated = false;
        state.data = null;
      });
  },
});

export const logoutUser = createAsyncThunk("user/logout", async () => {
  try {
    await logOutAction();
  } catch {}
});

export const { set_current_user, stop_loading, start_loading } =
  UserSlice.actions;
export default UserSlice.reducer;
