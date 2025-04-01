import React, { useState, useEffect } from 'react';
import { useAddCommentMutation, useUpdateCommentMutation } from '../api/addCommentAPI';
import styles from './ReplyComment.module.scss';
import { CommentType } from '@/entities/Comment/model/types/comment';
import { UserType } from '@/entities/User/model/types/user';
import { Icon } from '@/shared/assets/icons';

type ReplyCommentProps = {
  user: UserType;
  isShowReplyComment?: boolean;
  showFormInitially?: boolean;
  onClose?: () => void;
  parentComment?: CommentType;
};

export const ReplyComment: React.FC<ReplyCommentProps> = ({
  user,
  showFormInitially = false,
  onClose,
  parentComment,
}) => {
  const [addComment] = useAddCommentMutation();
  const [updateComment] = useUpdateCommentMutation();

  const [textComment, setTextComment] = useState('');
  const [showReplyComment, setShowReplyComment] = useState(showFormInitially);

  useEffect(() => {
    if (parentComment && user.username) {
      setTextComment(`@${user.username} `);
    }
  }, [parentComment, user.username]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!textComment.trim()) {
      alert('Пожалуйста, введите текст комментария.');
      return;
    }

    const newComment: CommentType = {
      id: Date.now().toString(),
      userId: user.id,
      parentId: parentComment ? parentComment.id : null,
      isLike: false,
      isDislike: false,
      text: textComment,
      createdAt: new Date().toISOString(),
      user: user,
      replies: [],
      isReplyComment: true,
    };

    try {
      if (parentComment) {
        const updatedParentComment = {
          ...parentComment,
          replies: [...parentComment.replies, newComment],
        };

        await updateComment(updatedParentComment).unwrap();
      } else {
        await addComment(newComment).unwrap();
      }

      setTextComment('');
      onClose?.();
    } catch (err) {
      console.error('Ошибка при добавлении комментария:', err);
      alert('Не удалось добавить комментарий. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <>
      {(showFormInitially || showReplyComment) && (
        <div className={styles.replyComment}>
          <div className={styles.replyCommentUserAvatar}>
            <Icon
              name={user.icon}
              className={styles.userIcon}
              size={48}
              aria-label={`Аватар ${user.username}`}
            />
          </div>
          <form className={styles.replyCommentForm} onSubmit={handleSubmit}>
            <input
              className={styles.replyCommentInput}
              type="text"
              placeholder="Введите комментарий"
              value={textComment}
              onChange={(e) => setTextComment(e.target.value)}
            />
            <div className={styles.replyCommentButtonsСancelAndSend}>
              {parentComment && (
                <button className={styles.replyCommentButtonСancel} type="button" onClick={onClose}>
                  Отмена
                </button>
              )}

              <button className={styles.replyCommentButtonSend} type="submit">
                {parentComment ? 'Ответить' : 'Оставить комментарий'}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
