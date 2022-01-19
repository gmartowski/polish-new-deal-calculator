import { configureStore } from '@reduxjs/toolkit';
import taxpayerReducer from './TaxPayerSlice/TaxPayerSlice';
import { taxCalculationsReducer } from "./TaxCalculationDetailsSlice/TaxCalculationDetailsSlice";

export const store = configureStore({
  reducer: {
    taxpayer: taxpayerReducer,
    taxCalculationsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
