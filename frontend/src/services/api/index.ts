import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import { APP_BASE_URL } from '../../config/vars';
import {
  AUTH_ACCESS_TOKEN_CASH_MANAGEMENT_USER,
  AUTH_REFRESH_TOKEN_CASH_MANAGEMENT_USER,
} from '../../constants/LocalStoragesKeys';

// eslint-disable-next-line
const axiosInstance = axios.create({
  baseURL: APP_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const accessToken = localStorage.getItem(AUTH_ACCESS_TOKEN_CASH_MANAGEMENT_USER);
    if (accessToken) {
      if (config && config.headers) config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: any) => Promise.reject(error),
);

const refreshAuthToken = async (failedRequest: any) => {
  try {
    const refreshToken = localStorage.getItem(AUTH_REFRESH_TOKEN_CASH_MANAGEMENT_USER);
    if (refreshToken) {
      try {
        const { data } = await axiosInstance.post('/users/refreshToken', {
          refreshToken: refreshToken,
        });
        const { accessToken } = data;
        localStorage.setItem(AUTH_ACCESS_TOKEN_CASH_MANAGEMENT_USER, accessToken);
        failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`;
        return Promise.resolve();
      } catch (error) {
        localStorage.removeItem(AUTH_REFRESH_TOKEN_CASH_MANAGEMENT_USER);
        localStorage.removeItem(AUTH_ACCESS_TOKEN_CASH_MANAGEMENT_USER);
        window.location.href = window.location.host;
        return Promise.reject(error);
      }
    }
  } catch (error) {
    localStorage.removeItem(AUTH_REFRESH_TOKEN_CASH_MANAGEMENT_USER);
    localStorage.removeItem(AUTH_ACCESS_TOKEN_CASH_MANAGEMENT_USER);
    window.location.href = window.location.host;
    return Promise.reject(error);
  }
};

createAuthRefreshInterceptor(axiosInstance, refreshAuthToken, {
  statusCodes: [403],
});

export default axiosInstance;
