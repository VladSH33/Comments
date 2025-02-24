import { configureStore } from '@reduxjs/toolkit';
import commentReducer from '@/app/StoreProvider/slices/commentSlice';
import { rtkQueryApi } from '@/api/rtkQuery';

export const store = configureStore({
  reducer: {
    comments: commentReducer,
    [rtkQueryApi.reducerPath]: rtkQueryApi.reducer, // Добавляем RTK Query редьюсер
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkQueryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
