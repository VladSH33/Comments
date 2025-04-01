import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/app/App';
import StoreProvider from '@/app/StoreProvider/StoreProvider';
import './styles/global.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
