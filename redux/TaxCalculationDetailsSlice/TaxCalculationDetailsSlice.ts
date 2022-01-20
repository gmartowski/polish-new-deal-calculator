import { createSlice } from "@reduxjs/toolkit";
import { taxCalculationsDetailsInitialState } from "../TaxPayerSlice/TaxPayerSliceData";

export const TaxCalculationsDetailsSlice = createSlice({
  name: 'taxCalculationsDetails',
  initialState: taxCalculationsDetailsInitialState,
  reducers: {
    calculateAnnualAverageIncome: (state, action) => {
      return {
        ...state,
        annualAverageIncome: action.payload.annualRevenueNetto - action.payload.annualTaxDeductibleExpenses,
      };
    },
    calculateTaxationBase: (state, action) => {
      return {
        ...state,
        taxationBase: action.payload.annualAverageIncome - action.payload.annualSocialInsurance,
      };
    },
  },
});

export const { calculateAnnualAverageIncome, calculateTaxationBase } = TaxCalculationsDetailsSlice.actions;

export const { reducer: taxCalculationsReducer } = TaxCalculationsDetailsSlice;