import React from 'react';
import { useDeleteCommentMutation, useUpdateCommentRepliesMutation } from '../api/deleteCommentAPI';
import styles from './DeleteComment.module.scss';
import { CommentType } from '@/entities/Comment/model/types/comment';

type DeleteCommentProps = {
  id: string;
  parentCommentId: string | null;
  parentReplies?: CommentType[];
};

export const DeleteComment: React.FC<DeleteCommentProps> = ({
  id,
  parentCommentId,
  parentReplies,
}) => {
  const [deleteComment] = useDeleteCommentMutation();
  const [updateCommentReplies] = useUpdateCommentRepliesMutation();

  const handleDeleteReply = async (event: React.MouseEvent<HTMLDivElement>) => {
    try {
      if (parentCommentId && parentReplies) {
        const updatedReplies = parentReplies.filter((reply) => reply.id !== id);
        await updateCommentReplies({
          id: parentCommentId,
          replies: updatedReplies,
        }).unwrap();
      } else {
        await deleteComment(id.toString()).unwrap();
      }
    } catch (err) {
      console.error('Ошибка удаления:', err);
      alert('Не удалось удалить комментарий. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <div className={styles.DeleteCommentButton} onClick={handleDeleteReply}>
      <i className="fa-regular fa-trash-can fa-lg" />
    </div>
  );
};
