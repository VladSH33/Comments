import axios from 'axios';
import { BASE_URL } from '@/shared/const/environment';
import { getCookie, deleteCookie } from '../utils/cookies';
import { refreshToken } from '../utils/auth';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

axiosInstance.interceptors.request.use((config) => {
  const token = getCookie('refreshToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const UNAUTHORIZED_STATUS_CODE = 401;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === UNAUTHORIZED_STATUS_CODE && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error('Ошибка при обновлении токена:', refreshError);
        deleteCookie('authToken');
        deleteCookie('refreshToken');
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
