import { configureStore } from '@reduxjs/toolkit';
import taxpayerReducer, { finalIncomeReducer, taxCalculationsReducer } from '../redux/taxpayerSlice';

export const store = configureStore({
  reducer: {
    taxpayer: taxpayerReducer,
    taxCalculationsReducer,
    finalIncomeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
