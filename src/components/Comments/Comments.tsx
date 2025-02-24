import React, { useEffect, useState } from 'react';
import { RootState } from '@/app/StoreProvider/store';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useGetCommentsQuery, useDeleteCommentMutation } from '@/api/rtkQuery';
import { addFullComments, removeComment } from '@/app/StoreProvider/slices/commentSlice';

import Comment from '@/components/Comment/Comment';

import '@/components/Comments/comments.style.scss';

const Comments: React.FC = () => {
  const { data: comments, error, isLoading } = useGetCommentsQuery();
  const [deleteComment] = useDeleteCommentMutation();
  const [key, setKey] = useState(0);
  const dispatch = useAppDispatch();
  const localComments = useAppSelector((state: RootState) => state.comments.comments);
  useEffect(() => {
    if (comments) {
      dispatch(addFullComments(comments));
    }
  }, [comments, dispatch]);

  const handleDelete = async (id: string) => {
    console.log(id);
    try {
      await deleteComment(id.toString()).unwrap();
      dispatch(removeComment(id.toString()));
      setKey((prev) => prev + 1);
    } catch (err) {
      console.error('Ошибка удаления:', err);
    }
  };

  if (isLoading) return <div>Загрузка комментариев...</div>;
  if (error) return <div>Ошибка загрузки</div>;

  return (
    <div className="comments">
      {localComments.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          createdAt={comment.createdAt}
          userId={comment.userId}
          commentText={comment.text}
          isLike={comment.isLike}
          isDislike={comment.isDislike}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Comments;
