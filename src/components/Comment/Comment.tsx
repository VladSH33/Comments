import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import '@/components/Comment/comment.style.scss';
import { useGetUserByIdQuery, useUpdateCommentMutation, useGetRepliesQuery } from '@/api/rtkQuery';
import CommentReply from '../CommentReply/CommentReply';
import AddComment from '../AddComment/AddComment';

type CommentProps = {
  userId: string;
  commentText: string;
  isLike: boolean;
  isDislike: boolean;
  id: string;
  onDelete: (id: string) => void;
  createdAt: string;
};

const Comment: React.FC<CommentProps> = ({
  id,
  userId,
  commentText,
  isLike,
  isDislike,
  onDelete,
  createdAt,
}) => {
  const { data: user, error, isLoading } = useGetUserByIdQuery(userId);
  const [updateComment] = useUpdateCommentMutation();
  const [isLiked, setIsLiked] = useState(isLike);
  const [isDisliked, setIsDisliked] = useState(isDislike);
  const [key, setKey] = useState(0);
  const [showAddComment, setShowAddComment] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const {
    data: replies,
    isLoading: isRepliesLoading,
    error: repliesError,
  } = useGetRepliesQuery(id, {
    skip: false, // Всегда запрашиваем ответы
  });
  useEffect(() => {
    setIsLiked(isLike);
  }, [isLike]);

  useEffect(() => {
    setIsDisliked(isDislike);
  }, [isDislike]);

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

  const handleReply = () => {
    setShowReplies((prev) => !prev); // Показываем/скрываем ответы
  };

  const openAddComment = () => {
    setShowAddComment((prev) => !prev);
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
          <i className={`${isLike ? 'fa-solid' : 'fa-regular'} fa-thumbs-up fa-lg`}></i>
        </button>
        <button className="btn-likeAndDislike" onClick={handleDislike}>
          {isDisliked ? (
            <i className="fa-solid fa-thumbs-down fa-lg"></i>
          ) : (
            <i className="fa-regular fa-thumbs-down fa-lg"></i>
          )}
        </button>
        <button className="btn-reply btn" onClick={openAddComment}>
          Ответить
        </button>
        <div className="comment-deleted" onClick={() => onDelete(id)}>
          <i className="fa-regular fa-trash-can fa-lg"></i>
        </div>
      </div>
      {replies?.length !== 0 ? (
        <button className="btn btn-open-replys" onClick={handleReply}>
          {replies?.length === 1
            ? `${replies.length} Ответ`
            : replies?.length && replies.length > 1 && replies.length < 5
              ? `${replies.length} Ответа`
              : `${replies?.length} Ответов`}
        </button>
      ) : null}
      <div className="container-reply">
        {showAddComment && (
          <AddComment
            userId={'1'}
            userIcon={'/icons/daniil-icon.png'}
            openAddComment={openAddComment}
            addDaughterComment={id}
          />
        )}
        {showReplies && (
          <>
            {isRepliesLoading ? (
              <div>Загрузка ответов...</div>
            ) : repliesError ? (
              <div>Ошибка при загрузке ответов</div>
            ) : replies && replies.length > 0 ? (
              replies.map((reply) => (
                <CommentReply
                  key={reply.id}
                  id={reply.id}
                  createdAt={reply.createdAt}
                  userId={reply.userId}
                  commentText={reply.text}
                  isLike={reply.isLike}
                  isDislike={reply.isDislike}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <div>Нет ответов</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
