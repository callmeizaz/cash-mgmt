import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';
import { doAsyncLogin, doLogout } from '../thunks/authentication';
import {
  AUTH_REFRESH_TOKEN_CASH_MANAGEMENT_USER,
  AUTH_ACCESS_TOKEN_CASH_MANAGEMENT_USER,
} from '../../constants/LocalStoragesKeys';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  userType: string;
  bills: string[];
}

interface AuthenticationState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  currentUser: User | null;
  userType: string;
}

const initialState: AuthenticationState = {
  loading: 'idle',
  currentUser: null,
  userType: 'employee',
};

interface LoginPayload {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    resetLoading: (state) => {
      return { ...state, loading: 'idle' };
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(doAsyncLogin.pending, (state: RootState) => {
        return {
          ...state,
          loading: 'pending',
        };
      })
      .addCase(doAsyncLogin.fulfilled, (state: RootState, action: PayloadAction<LoginPayload>) => {
        const { accessToken, refreshToken, user } = action.payload;
        localStorage.setItem(AUTH_REFRESH_TOKEN_CASH_MANAGEMENT_USER, refreshToken);
        localStorage.setItem(AUTH_ACCESS_TOKEN_CASH_MANAGEMENT_USER, accessToken);
        return {
          ...state,
          loading: 'succeeded',
          currentUser: user,
          userType: user.userType || '',
        };
      })
      .addCase(doAsyncLogin.rejected, (state: RootState) => {
        return {
          ...state,
          loading: 'failed',
        };
      })
      .addCase(doLogout.fulfilled, (state: RootState) => {
        localStorage.removeItem(AUTH_REFRESH_TOKEN_CASH_MANAGEMENT_USER);
        localStorage.removeItem(AUTH_ACCESS_TOKEN_CASH_MANAGEMENT_USER);
        return initialState;
      });
  },
});

export const { resetLoading } = authenticationSlice.actions;

export default authenticationSlice;
