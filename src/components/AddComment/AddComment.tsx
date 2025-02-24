import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import './AddComment.style.scss';
import { useAddCommentMutation } from '@/api/rtkQuery';
import { addOneComment } from '@/app/StoreProvider/slices/commentSlice';

type AddCommentProps = {
  userId: string;
  userIcon: string;
  openAddComment: () => void;
  addDaughterComment?: string;
};

const AddComment: React.FC<AddCommentProps> = ({
  userId,
  userIcon,
  openAddComment,
  addDaughterComment,
}) => {
  const [addCommentDB] = useAddCommentMutation();
  const [textComment, setTextComment] = useState('');
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!textComment.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      userId,
      isLike: false,
      text: textComment,
      createdAt: new Date().toISOString(),
      parentId: addDaughterComment || 'parent',
      isDislike: false,
    };

    try {
      await addCommentDB(newComment).unwrap();
      setTextComment('');
    } catch (err) {
      console.error('Ошибка при добавлении комментария:', err);
    }
    dispatch(addOneComment(newComment));
  };

  return (
    <div className="addComment-panel">
      <img src={userIcon} alt="" className="userIcon" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Введите комментарий"
          className="addComment-panel__input"
          value={textComment}
          onChange={(e) => setTextComment(e.target.value)}
        />
        <div className="wrapper-btn">
          <button type="submit" className="btn-cancel btn" onClick={openAddComment}>
            Отмена
          </button>
          <button type="submit" className="btn btn-send">
            {addDaughterComment ? 'Ответить' : 'Оставить комментарий'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
