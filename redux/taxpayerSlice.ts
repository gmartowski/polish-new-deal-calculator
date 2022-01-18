import { createSlice } from '@reduxjs/toolkit';

export interface ITaxPayerState {
  annualRevenueNetto: number;
  annualTaxDeductibleExpenses: number;
  annualSocialInsurance: number;
  lumpSumPercentage: number;
  lumpSumCurrency: string;
}

export interface ITaxCalculationsDetailsInitialState {
  annualAverageIncome: number;
  taxationBase: number;
}

export interface IFinalIncomesState {
  lumpSum: IFinalIncomeItem,
  progressiveTax: IFinalIncomeItem,
  flatTax: IFinalIncomeItem,
}

const taxPayerInitialState: ITaxPayerState = {
  annualRevenueNetto: 100000,
  annualTaxDeductibleExpenses: 0,
  annualSocialInsurance: 13490.76, // w 2021 - 11980 (roczna, sam ZUS miesięcznie 998), 2022  - 13490,76 (roczna, sam ZUS miesięcznie 1124,23)
  lumpSumPercentage: 0.12,
  lumpSumCurrency: "PLN",
};

const taxCalculationsDetailsInitialState: ITaxCalculationsDetailsInitialState = {
  annualAverageIncome: 100000,
  taxationBase: 100000 - 13490.76,
};

interface IFinalIncomeItem {
  name: string;
  previous: number;
  newDeal: number;
}

const finalIncomes: IFinalIncomesState = {
  lumpSum: {
    name: 'Ryczałt',
    previous: 0,
    newDeal: 0,
  },
  progressiveTax: {
    name: 'Skala podatkowa',
    previous: 0,
    newDeal: 0,
  },
  flatTax: {
    name: 'Podatek Liniowy',
    previous: 0,
    newDeal: 0,
  },
};

export const taxpayerSlice = createSlice({
  name: 'taxpayer',
  initialState: taxPayerInitialState,
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

export const taxCalculationsDetailsSlice = createSlice({
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

export const finalIncomesSlice = createSlice({
  name: 'finalIncomes',
  initialState: finalIncomes,
  reducers: {
    presentAllQuotas: (state, actions) => {
      return {
        lumpSum: {
          name: 'Ryczałt',
          previous: actions.payload.previous,
          newDeal: actions.payload.newDeal,
          ...state.lumpSum,
        },
        progressiveTax: {
          name: 'Skala podatkowa',
          previous: actions.payload.previous,
          newDeal: actions.payload.newDeal,
          ...state.progressiveTax,
        },
        flatTax: {
          name: 'Podatek Liniowy',
          previous: actions.payload.flatTax.previous,
          newDeal: actions.payload.flatTax.newDeal,
          ...state.flatTax,
        },
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { update } = taxpayerSlice.actions;
export const { presentAllQuotas } = finalIncomesSlice.actions;
export const { calculateAnnualAverageIncome, calculateTaxationBase } = taxCalculationsDetailsSlice.actions;

export const { reducer: taxCalculationsReducer } = taxCalculationsDetailsSlice;
export const { reducer: finalIncomeReducer } = finalIncomesSlice;

export default taxpayerSlice.reducer;
