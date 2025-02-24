import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/app/StoreProvider/store';

// Используем `useDispatch` с типизацией `AppDispatch`
export const useAppDispatch: () => AppDispatch = useDispatch;

// Используем `useSelector` с типизацией `RootState`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
