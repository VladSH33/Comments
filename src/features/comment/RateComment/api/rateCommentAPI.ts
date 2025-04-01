import { baseApi } from '@/shared/api/rtkQuery';

type RateCommentArg = {
  id: string;
  parentId: string | null;
  isLike: boolean;
  isDislike: boolean;
};

export const rateCommentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    rateComment: builder.mutation<void, RateCommentArg>({
      query: (body) => ({
        url: '/comments/rate',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['Comment'],
    }),
  }),
});

export const { useRateCommentMutation } = rateCommentApi;
