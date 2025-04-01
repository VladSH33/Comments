import React, { useEffect } from 'react';
import { ReplyComment } from '@/features/comment/ReplyComment';
import { Comments } from '@/widgets/Comments';
import { setRefreshToken } from '@/shared/utils/auth';
import { ErrorBoundary } from '@/shared/UI/ErrorBoundary';

const App: React.FC = () => {
  useEffect(() => {
    setRefreshToken('valid-token');
  }, []);

  return (
    <div className="page">
      <div className="container">
        <div className="content">
          <h1 className="commemts__title">Комментарии</h1>
          <ErrorBoundary>
            <ReplyComment
              user={{
                id: '1',
                username: 'Пользователь',
                content: 'описание',
                icon: 'User',
              }}
              showFormInitially
            />
            <Comments />
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default App;
