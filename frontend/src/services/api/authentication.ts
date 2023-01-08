import axiosInstance from '../api';
import { LoginPayload, RegisterEmployeePayload } from '../../typings/interfaces/authentication';

export const Login = (payload: LoginPayload) => {
  return axiosInstance({
    method: 'POST',
    url: `users/login`,
    data: payload,
  });
};

export const RegisterEmployee = (payload: RegisterEmployeePayload) => {
  return axiosInstance({
    method: 'POST',
    url: `users/register`,
    data: payload,
  });
};
