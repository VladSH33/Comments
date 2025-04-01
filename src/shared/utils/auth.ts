import { setCookie, getCookie, deleteCookie } from './cookies';
import axios from 'axios';
import { BASE_URL } from '@/shared/const/environment';

export const generateAccessToken = (): string => {
  return `access-token-${Math.random().toString(36).substring(2)}-${Date.now()}`;
};

export const generateRefreshToken = (): string => {
  return `refresh-token-${Math.random().toString(36).substring(2)}-${Date.now()}`;
};

export const isAuthenticated = (): boolean => {
  return !!getCookie('authToken');
};

export const setAccessToken = (token: string): void => {
  setCookie('authToken', token);
};

export const setRefreshToken = (token: string): void => {
  setCookie('refreshToken', token);
};

export const clearAuthToken = (): void => {
  deleteCookie('authToken');
};

export const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = getCookie('refreshToken');
    if (!refreshToken) {
      throw new Error('Refresh token not found');
    }

    const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
      refreshToken,
    });

    const newToken = response.data.accessToken;
    setCookie('authToken', newToken);
    return newToken;
  } catch (error) {
    console.error('Ошибка при обновлении токена:', error);
    deleteCookie('authToken');
    deleteCookie('refreshToken');
    return null;
  }
};
