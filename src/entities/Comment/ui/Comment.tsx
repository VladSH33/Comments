import React from 'react';
import { format } from 'date-fns';
import styles from './Сomment.module.scss';
import { Icon } from '@/shared/assets/icons';
import { UserType } from '../../User';

type CommentProps = {
  actions: React.ReactNode;
  createdAt: string;
  user: UserType;
  text: string;
};

export const Comment: React.FC<CommentProps> = ({ actions, createdAt, user, text }) => {
  return (
    <div className={styles.comment}>
      <>
        <div className={styles.commentHeader}>
          <Icon
            name={user.icon}
            className={styles.userIcon}
            size={32}
            aria-label={`Аватар ${user.username}`}
          />
          <div className={styles.commentUsername}>{user.username}</div>
          <div className={styles.commentDataCreate}>
            {format(new Date(createdAt), 'dd.MM.yyyy HH:mm')}
          </div>
        </div>

        <p className={styles.commentText}>{text}</p>

        {actions}
      </>
    </div>
  );
};
