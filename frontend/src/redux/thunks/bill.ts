import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddBillInterface, BillInterface, FilteredBills } from '../../typings/interfaces/bill';

import * as BillApi from '../../services/api/bill';

export const doAsyncAddBill = createAsyncThunk('bill/add', async (payload: AddBillInterface) => {
  const response = await BillApi.AddBill(payload);
  return response.data;
});

export const doAsyncFetchBills = createAsyncThunk('bill/getBills', async () => {
  const response = await BillApi.FetchBill();
  return response.data;
});

export const doAsyncDeleteBill = createAsyncThunk('bill/delete', async (payload: BillInterface) => {
  const response = await BillApi.DeleteBill(payload);
  return response.data;
});

export const doAsyncRejectBill = createAsyncThunk('bill/reject', async (payload: BillInterface) => {
  const response = await BillApi.RejectBill(payload);
  return response.data;
});

export const doAsyncApproveBill = createAsyncThunk(
  'bill/approved',
  async (payload: BillInterface) => {
    const response = await BillApi.ApproveBill(payload);
    return response.data;
  },
);

export const doAsyncFetchBillById = createAsyncThunk(
  'bill/fetch/id',
  async (payload: BillInterface) => {
    const response = await BillApi.FetchBillById(payload);
    return response.data;
  },
);

export const doAsyncFetchBillsBetweenDates = createAsyncThunk(
  'bill/getMultipleBills',
  async (payload: FilteredBills, { rejectWithValue }) => {
    try {
      const response = await BillApi.FetchBillByDate(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

export const doAsyncExportBill = createAsyncThunk('bill/export', async () => {
  const response = await BillApi.ExportBill();
  return response.data;
});
