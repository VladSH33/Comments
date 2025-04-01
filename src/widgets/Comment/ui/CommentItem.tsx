import React, { useState } from 'react';

import { RateComment } from '@/features/comment/RateComment';
import { ReplyComment } from '@/features/comment/ReplyComment';
import { DeleteComment } from '@/features/comment/DeleteComment';
import { Comment } from '@/entities/Comment';

import { CommentType } from '@/entities/Comment/model/types/comment';

import styles from './CommentItem.module.scss';

export const CommentItem: React.FC<CommentType> = ({
  id,
  userId,
  parentId,
  isLike,
  isDislike,
  text,
  createdAt,
  parentReplies,
  replies,
  isReplyComment,
  user,
}) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyComment, setShowReplyComment] = useState(false);

  const renderReplies = () => {
    if (replies.length === 0 || isReplyComment) {
      return null;
    }
    return replies.map((reply) => (
      <CommentItem
        {...reply}
        key={reply.id}
        parentId={id}
        parentReplies={replies}
        isReplyComment={true}
      />
    ));
  };

  const getRepliesText = (count: number) => {
    if (count === 1) return `${count} Ответ`;
    if (count > 1 && count < 5) return `${count} Ответа`;
    return `${count} Ответов`;
  };

  const currentComment: CommentType = {
    id,
    userId,
    parentId,
    isLike,
    isDislike,
    text,
    createdAt,
    user,
    replies,
    isReplyComment,
  };

  return (
    <>
      <Comment
        actions={
          <>
            <div className={styles.wrapperRateAndReplyComment}>
              <RateComment
                initialLike={isLike}
                initialDislike={isDislike}
                commentId={id}
                parentId={parentId}
              />
              {!isReplyComment && (
                <div
                  className={styles.showButtonReplyComment}
                  onClick={() => setShowReplyComment((prev) => !prev)}
                >
                  Ответить
                </div>
              )}
            </div>

            {!isReplyComment && showReplyComment && (
              <div className={styles.replyCommentContainer}>
                <ReplyComment
                  user={user}
                  showFormInitially={showReplyComment}
                  onClose={() => setShowReplyComment(false)}
                  parentComment={currentComment}
                />
              </div>
            )}

            <DeleteComment id={id} parentCommentId={parentId} parentReplies={parentReplies} />
            {replies && replies.length > 0 && (
              <button
                className={styles.showRepliesButton}
                onClick={() => setShowReplies((prev) => !prev)}
              >
                {getRepliesText(replies.length)}
              </button>
            )}
            {showReplies && renderReplies()}
          </>
        }
        createdAt={createdAt}
        user={user}
        text={text}
      />
    </>
  );
};
