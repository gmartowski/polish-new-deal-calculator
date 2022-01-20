interface IFinalIncomeItem {
  name: string;
  previous: number;
  newDeal: number;
}

interface ITaxPayerState {
  annualRevenueNetto: number;
  annualTaxDeductibleExpenses: number;
  annualSocialInsurance: number;
  lumpSumPercentage: number;
  lumpSumCurrency: string;
}

interface ITaxCalculationsDetailsInitialState {
  annualAverageIncome: number;
  taxationBase: number;
}

interface IFinalIncomesState {
  lumpSum: IFinalIncomeItem,
  progressiveTax: IFinalIncomeItem,
  flatTax: IFinalIncomeItem,
}

export type { IFinalIncomesState, ITaxCalculationsDetailsInitialState, ITaxPayerState }