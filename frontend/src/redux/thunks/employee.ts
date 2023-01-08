import { createAsyncThunk } from '@reduxjs/toolkit';

import * as EmployeeAPI from '../../services/api/employee';
import { AddEmployeeInterface, EmployeeId } from '../../typings/interfaces/employee';

export const doAsyncAddEmployee = createAsyncThunk(
  'employee/add',
  async (payload: AddEmployeeInterface) => {
    const response = await EmployeeAPI.AddEmployee(payload);
    return response.data;
  },
);

export const doAsyncFetchEmployees = createAsyncThunk('fetch/employee', async () => {
  const response = await EmployeeAPI.FetchEmployees();
  return response.data;
});

export const doAsyncDeleteEmployee = createAsyncThunk(
  'delete/employee',
  async (payload: EmployeeId) => {
    const response = await EmployeeAPI.DeleteEmployees(payload);
    return response.data;
  },
);
