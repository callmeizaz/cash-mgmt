import { AddBillInterface, BillInterface, FilteredBills } from '../../typings/interfaces/bill';
import axiosInstance from '../api';

export const AddBill = (payload: AddBillInterface) => {
  return axiosInstance({
    method: 'POST',
    url: `bills/add/`,
    data: payload.formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const FetchBill = () => {
  return axiosInstance({
    method: 'GET',
    url: `bills/getBills/`,
  });
};

export const DeleteBill = (payload: BillInterface) => {
  return axiosInstance({
    method: 'POST',
    url: `bills/delete/${payload.id}`,
  });
};
export const ApproveBill = (payload: BillInterface) => {
  return axiosInstance({
    method: 'PUT',
    url: `bills/approve/${payload.id}`,
  });
};
export const RejectBill = (payload: BillInterface) => {
  return axiosInstance({
    method: 'PUT',
    url: `bills/reject/${payload.id}`,
  });
};

export const FetchBillByDate = (payload: FilteredBills) => {
  return axiosInstance({
    method: 'GET',
    url: `bills/getFilteredBills/`,
    params: payload,
  });
};

export const ExportBill = () => {
  return axiosInstance({
    method: 'GET',
    url: `bills/export`,
  });
};

export const FetchBillById = (payload: BillInterface) => {
  return axiosInstance({
    method: 'GET',
    url: `bills/get/${payload.id}`,
  });
};
