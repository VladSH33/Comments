import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/constants/envrionment';
import { CommentType } from '@/types/comment';

// Определяем API-сервис
export const rtkQueryApi = createApi({
  reducerPath: 'api', // Уникальное имя для редьюсера
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    getComments: builder.query<CommentType[], void>({
      query: () => 'comments?parentId=parent',
      providesTags: ['Comment'],
    }),
    getReplies: builder.query<CommentType[], string>({
      query: (parentId) => `comments?parentId=${parentId}`,
    }),
    getUsers: builder.query({
      query: () => 'users',
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`,
    }),
    updateComment: builder.mutation({
      query: ({ id, ...updatedFields }) => ({
        url: `comments/${id}`,
        method: 'PATCH',
        body: updatedFields,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Comment', id }],
    }),
    deleteComment: builder.mutation<void, string>({
      query: (id) => ({
        url: `comments/${id}`,
        method: 'DELETE',
        transformResponse: (response: string) => {
          if (response === 'Not Found') {
            throw new Error('Комментарий не найден');
          }
          return response;
        },
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Comment', id }],
    }),
    addComment: builder.mutation({
      query: (newComment) => ({
        url: 'comments', // эндпоинт
        method: 'POST',
        body: newComment, // отправляемые данные
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

// Экспортируем хук для использования в компонентах
export const {
  useGetCommentsQuery,
  useGetRepliesQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useAddCommentMutation,
} = rtkQueryApi;
