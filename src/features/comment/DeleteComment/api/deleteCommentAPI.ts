import { baseApi } from '@/shared/api/rtkQuery';
import { CommentType } from '@/entities/Comment/model/types/comment';

type UpdateCommentRepliesArg = {
  id: string;
  replies: CommentType[];
};

export const deleteCommentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteComment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comment'],
    }),
    updateCommentReplies: builder.mutation<CommentType, UpdateCommentRepliesArg>({
      query: ({ id, replies }) => ({
        url: `/comments/${id}`,
        method: 'PATCH',
        data: { replies },
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const { useDeleteCommentMutation, useUpdateCommentRepliesMutation } = deleteCommentApi;
