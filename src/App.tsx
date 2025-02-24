import React from 'react';
import AddComment from '@/components/AddComment/AddComment';
import Commemts from './components/Comments/Comments';

const App = () => {
  return (
    <div className="page">
      <div className="container">
        <div className="page-frame">
          <h1 className="commemts__title">Комментарии</h1>
          <AddComment userId={'1'} userIcon={'/icons/daniil-icon.png'} />
          <Commemts />
        </div>
      </div>
    </div>
  );
};

export default App;
