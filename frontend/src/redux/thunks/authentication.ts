import { RegisterEmployeePayload } from './../../typings/interfaces/authentication';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { Login, RegisterEmployee } from '../../services/api/authentication';
import { LoginPayload } from '../../typings/interfaces/authentication';

export const doAsyncLogin = createAsyncThunk(
  'authentication/login',
  async (payload: LoginPayload) => {
    const { data } = await Login(payload);
    return data;
  },
);

export const doLogout = createAsyncThunk('authentication/logout', () => {
  return;
});

export const doAsyncRegisterEmployee = createAsyncThunk(
  'auth/register/employee',
  async (payload: RegisterEmployeePayload, { rejectWithValue }) => {
    try {
      const { data } = await RegisterEmployee(payload);
      return data;
    } catch (error: any) {
      const { data } = error.response;
      return rejectWithValue(data.msg);
    }
  },
);
