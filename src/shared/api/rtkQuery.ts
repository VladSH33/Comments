import { createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/shared/const/environment';
import axiosBaseQuery from './baseQuery';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Comment'],
  endpoints: () => ({}),
});
