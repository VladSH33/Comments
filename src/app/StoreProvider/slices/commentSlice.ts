import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentType } from '@/types/comment';
import { rtkQueryApi } from '@/api/rtkQuery';

type CommentsState = {
  comments: CommentType[];
};

const initialState: CommentsState = {
  comments: [],
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addFullComments: (state, action: PayloadAction<CommentType[]>) => {
      state.comments = action.payload;
    },
    addOneComment: (state, action: PayloadAction<CommentType>) => {
      state.comments.push(action.payload);
    },
    removeComment: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.filter((comment) => comment.id !== action.payload);
    },
    updateComment: (state, action: PayloadAction<{ id: string; isLike: boolean }>) => {
      const comment = state.comments.find((comment) => comment.id === action.payload.id);
      if (comment) {
        comment.isLike = action.payload.isLike;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(rtkQueryApi.endpoints.getComments.matchFulfilled, (state, { payload }) => {
      state.comments = payload as CommentType[];
    });
  },
});

export const { addFullComments, removeComment, updateComment, addOneComment } =
  commentSlice.actions;
export default commentSlice.reducer;
