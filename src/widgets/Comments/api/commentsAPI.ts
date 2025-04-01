import { baseApi } from '@/shared/api/rtkQuery';
import { CommentType } from '@/entities/Comment/model/types/comment';

export const commenstApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query<CommentType[], void>({
      query: () => ({
        url: '/comments?&_expand=user',
        method: 'GET',
      }),
      providesTags: ['Comment'],
    }),
  }),
});

export const { useGetCommentsQuery } = commenstApi;
