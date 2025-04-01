import React, { useState } from 'react';
import styles from './RateComment.module.scss';
import { useRateCommentMutation } from '../api/rateCommentAPI';

type RateCommentProps = {
  initialLike: boolean;
  initialDislike: boolean;
  commentId: string;
  parentId: string | null;
};

export const RateComment: React.FC<RateCommentProps> = ({
  initialLike,
  initialDislike,
  commentId,
  parentId,
}) => {
  const [rateComment] = useRateCommentMutation();
  const [isLiked, setIsLiked] = useState(initialLike);
  const [isDisliked, setIsDisliked] = useState(initialDislike);

  const handleRate = async (type: 'like' | 'dislike') => {
    const newState = {
      like: type === 'like' ? !isLiked : false,
      dislike: type === 'dislike' ? !isDisliked : false,
    };

    setIsLiked(newState.like);
    setIsDisliked(newState.dislike);

    try {
      await rateComment({
        id: commentId,
        parentId,
        isLike: newState.like,
        isDislike: newState.dislike,
      }).unwrap();
    } catch (error) {
      setIsLiked(initialLike);
      setIsDisliked(initialDislike);
      console.error('Rating update failed:', error);
    }
  };

  const RateButton = ({ type, isActive }: { type: 'like' | 'dislike'; isActive: boolean }) => (
    <button
      className={type === 'like' ? styles.likeButton : styles.dislikeButton}
      onClick={() => handleRate(type)}
    >
      <i
        className={`fa-${isActive ? 'solid' : 'regular'} fa-thumbs-${
          type === 'like' ? 'up' : 'down'
        }`}
      />
    </button>
  );

  return (
    <div className={styles.rateContainer}>
      <RateButton type="like" isActive={isLiked} />
      <RateButton type="dislike" isActive={isDisliked} />
    </div>
  );
};
