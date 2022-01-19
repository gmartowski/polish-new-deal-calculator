import { createSlice } from '@reduxjs/toolkit';
import { taxPayerDetailsInitialState } from "./TaxPayerSliceData";

export const TaxPayerSlice = createSlice({
  name: 'taxpayer',
  initialState: taxPayerDetailsInitialState,
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
export const { update } = TaxPayerSlice.actions;
export default TaxPayerSlice.reducer;
