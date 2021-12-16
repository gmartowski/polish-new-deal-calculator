import { createSlice } from '@reduxjs/toolkit';

export interface ITaxPayerState {
  annualRevenueNetto: number;
  annualTaxDeductibleExpenses: number;
  annualSocialInsurance: number;
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
  annualRevenueNetto: 145000,
  annualTaxDeductibleExpenses: 33000,
  annualSocialInsurance: 11980,
};

const taxCalculationsDetailsInitialState: ITaxCalculationsDetailsInitialState = {
  annualAverageIncome: 145000 - 33000,
  taxationBase: 145000 - 33000 - 11980,
};
interface IFinalIncomeItem {
  name: string;
  current: number;
  newDeal: number;
}

const finalIncomes: IFinalIncomesState = {
  lumpSum: {
    name: 'Ryczałt',
    current: 0,
    newDeal: 0,
  },
  progressiveTax: {
    name: 'Skala podatkowa',
    current: 0,
    newDeal: 0,
  },
  flatTax: {
    name: 'Podatek Liniowy',
    current: 0,
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
    calculate: (state, action) => {
      return {
        annualAverageIncome: action.payload.annualRevenueNetto - action.payload.annualTaxDeductibleExpenses,
        taxationBase: action.payload.annualAverageIncome - action.payload.annualSocialInsurance,
        ...state,
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
          current: actions.payload.current,
          newDeal: actions.payload.newDeal,
          ...state.lumpSum,
        },
        progressiveTax: {
          name: 'Skala podatkowa',
          current: actions.payload.current,
          newDeal: actions.payload.newDeal,
          ...state.progressiveTax,
        },
        flatTax: {
          name: 'Podatek Liniowy',
          current: actions.payload.flatTax.current,
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
export const { calculate } = taxCalculationsDetailsSlice.actions;

export const { reducer: taxCalculationsReducer } = taxCalculationsDetailsSlice;
export const { reducer: finalIncomeReducer } = finalIncomesSlice;

export default taxpayerSlice.reducer;
