import { createSlice } from '@reduxjs/toolkit';

export interface TaxPayerState {
  revenueNetto: number;
  costsNetto: number;
  averageIncome: number;
  healthInsurance: number;
  taxationBase: number;
}

const initialState: TaxPayerState = {
  revenueNetto: 145000,
  costsNetto: 33000,
  averageIncome: 112000,
  healthInsurance: 11980,
  taxationBase: 100200,
};

export const taxpayerSlice = createSlice({
  name: 'taxpayer',
  initialState,
  reducers: {
    update: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      return { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { update } = taxpayerSlice.actions;

export default taxpayerSlice.reducer;
