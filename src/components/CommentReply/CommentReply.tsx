import React, { useState } from 'react';
import { format } from 'date-fns';
import '@/components/CommentReply/commentReply.style.scss';
import { useGetUserByIdQuery, useUpdateCommentMutation } from '@/api/rtkQuery';

type CommentReplyProps = {
  userId: string;
  commentText: string;
  isLike: boolean;
  isDislike: boolean;
  id: string;
  createdAt: string;
  onDelete: (id: string) => void;
};

const CommentReply: React.FC<CommentReplyProps> = ({
  id,
  userId,
  commentText,
  isLike,
  isDislike,
  createdAt,
  onDelete,
}) => {
  const { data: user, error, isLoading } = useGetUserByIdQuery(userId);
  const [updateComment] = useUpdateCommentMutation();
  const [isLiked, setIsLiked] = useState(isLike);
  const [isDisliked, setIsDisliked] = useState(isDislike);
  const [key, setKey] = useState(0);

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки</div>;
  if (!user) return <div>Пользователь не найден</div>;

  const handleLike = async () => {
    try {
      const newIsLike = !isLiked;
      const newIsDislike = false;
      await updateComment({ id, isLike: newIsLike, isDislike: newIsDislike }).unwrap();
      setIsLiked(newIsLike);
      setIsDisliked(newIsDislike);
      setKey((prev) => prev + 1);
    } catch (err) {
      console.error('Ошибка при отправке лайка:', err);
    }
  };

  const handleDislike = async () => {
    try {
      const newIsDislike = !isDisliked;
      const newIsLike = false; // Снимаем лайк при установке дизлайка
      await updateComment({ id, isLike: newIsLike, isDislike: newIsDislike }).unwrap();
      setIsDisliked(newIsDislike);
      setIsLiked(newIsLike);
      setKey((prev) => prev + 1);
    } catch (err) {
      console.error('Ошибка при отправке дизлайка:', err);
    }
  };

  return (
    <div key={key} className="comment">
      <div className="comment__header">
        <img src={user.image} alt={user.username} className="comment__author-icon" />
        <span className="comment__title">{user.username}</span>
        <div className="comment__data-create">
          {format(new Date(createdAt), 'dd.MM.yyyy HH:mm')}
        </div>
      </div>
      <p className="comment__text">{commentText}</p>
      <div className="wrapper-btn">
        <button className="btn-likeAndDislike" onClick={handleLike}>
          {isLiked ? (
            <i className="fa-solid fa-thumbs-up fa-lg"></i>
          ) : (
            <i className="fa-regular fa-thumbs-up fa-lg"></i>
          )}
        </button>
        <button className="btn-likeAndDislike" onClick={handleDislike}>
          {isDisliked ? (
            <i className="fa-solid fa-thumbs-down fa-lg"></i>
          ) : (
            <i className="fa-regular fa-thumbs-down fa-lg"></i>
          )}
        </button>
        <div className="comment-deleted" onClick={() => onDelete(id)}>
          <i className="fa-regular fa-trash-can fa-lg"></i>
        </div>
        {/* <button className="btn btn-reply">Ответить</button> */}
      </div>
      <div className="container-reply"></div>
    </div>
  );
};

export default CommentReply;
