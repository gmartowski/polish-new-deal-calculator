import { ITaxCalculationsDetailsInitialState, ITaxPayerState } from "./ITaxPayerSlice";

const taxPayerDetailsInitialState: ITaxPayerState = {
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

export { taxCalculationsDetailsInitialState, taxPayerDetailsInitialState }