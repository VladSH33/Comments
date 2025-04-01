import { baseApi } from '@/shared/api/rtkQuery';
import { CommentType } from '@/entities/Comment/model/types/comment';

type UpdateCommentRepliesArg = {
  id: string;
  replies: CommentType[];
};

export const addCommentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addComment: builder.mutation<CommentType, CommentType>({
      query: (newComment) => ({
        url: '/comments',
        method: 'POST',
        data: newComment,
      }),
      invalidatesTags: ['Comment'],
    }),
    updateComment: builder.mutation<CommentType, UpdateCommentRepliesArg>({
      query: ({ id, replies }) => ({
        url: `/comments/${id}`,
        method: 'PATCH',
        data: { replies },
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const { useAddCommentMutation, useUpdateCommentMutation } = addCommentApi;
