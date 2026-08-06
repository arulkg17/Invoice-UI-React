import { createAsyncThunk } from "@reduxjs/toolkit";

import authService from "../../services/authService";

import type { LoginRequest, LoginResponse } from "../../models";

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  {
    rejectValue: string;
  }
>(
  "auth/login",

  async (request, { rejectWithValue }) => {
    try {
      const response = await authService.login(request);

      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ?? "Invalid username or password.",
      );
    }
  },
);
