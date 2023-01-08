import { AddEmployeeInterface, EmployeeId } from '../../typings/interfaces/employee';
import axiosInstance from '.';

export const AddEmployee = (payload: AddEmployeeInterface) => {
  return axiosInstance({
    method: 'POST',
    url: `employees/add`,
    data: payload,
  });
};

export const FetchEmployees = () => {
  return axiosInstance({
    method: 'GET',
    url: `employees/all`,
  });
};

export const DeleteEmployees = (payload: EmployeeId) => {
  return axiosInstance({
    method: 'DELETE',
    url: `employees/delete/${payload.id}`,
  });
};
