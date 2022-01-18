import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import FlatTax from "./FlatTax";
import { Utils } from "../../components/Utils/Utils";
import { DataCollectingService } from "../ProgressiveTax/DataCollectingService";
import { flatTaxData } from "./FlatTaxData";
import { IFlatTaxData } from "./IFlatTax";


const FlatTaxContainer = () => {

  const {
    annualRevenueNetto,
    annualTaxDeductibleExpenses,
    annualSocialInsurance,
    lumpSumCurrency
  } = useSelector((state: RootState) => state.taxpayer);

  const { annualAverageIncome, taxationBase } = useSelector((state: RootState) => state.taxCalculationsReducer);
  const {
    healthInsuranceRate,
    monthlyHealthInsurance,
    monthlyHealthInsuranceDepreciation,
    minimalHealthInsuranceQuota,
    taxRate,
    solidarityTributeTaxRate,
    solidarityTributeThreshold,
    monthsInYear
  } = flatTaxData;

  const personalIncomeTax = (): number => {
    return newDealPersonalIncomeTax() - (monthsInYear * monthlyHealthInsuranceDepreciation);
  };

  const newDealPersonalIncomeTax = (): number => {
    return ((annualRevenueNetto - annualTaxDeductibleExpenses - annualSocialInsurance) * taxRate);
  };

  const newDealAnnualHealthInsurance = (): number => {
    const newDealHealthInsuranceQuota = (annualAverageIncome - annualSocialInsurance) * healthInsuranceRate;
    return newDealHealthInsuranceQuota > minimalHealthInsuranceQuota ? newDealHealthInsuranceQuota : minimalHealthInsuranceQuota;
  };

  const annualHealthInsurance = (): number => {
    return monthlyHealthInsurance * monthsInYear;
  };

  const effectiveRate = (sum: number): string => taxationBase === 0 ? "n/d" : `${Utils.roundup(sum / annualAverageIncome * 100)} %`;

  const calculateQuotas = (): IFlatTaxData => {
    const pit = Utils.roundup(personalIncomeTax());
    const solidarity = taxationBase > solidarityTributeThreshold ? (taxationBase - solidarityTributeThreshold) * solidarityTributeTaxRate : 0;
    const healthInsurance = Utils.roundup(annualHealthInsurance());
    const sum = Utils.roundup(pit + annualSocialInsurance + healthInsurance + solidarity);
    const annualNetto = Utils.roundup(annualAverageIncome - sum);

    const newDealPit = Utils.roundup(newDealPersonalIncomeTax());
    const newDealHealthInsurance = Utils.roundup(newDealAnnualHealthInsurance());
    const newDealSum = Utils.roundup(newDealPit + annualSocialInsurance + newDealHealthInsurance + solidarity);
    const newDealAnnualNetto = Utils.roundup(annualAverageIncome - newDealSum);

    return {
      pit,
      healthInsurance,
      sum,
      annualNetto,
      annualSocialInsurance,
      newDealPit,
      solidarity,
      newDealHealthInsurance,
      newDealSum,
      newDealAnnualNetto,
      rate: effectiveRate(sum),
      newDealRate: effectiveRate(newDealSum),
      monthlyNetto: Utils.roundup(annualNetto / monthsInYear),
      newDealMonthlyNetto: Utils.roundup(newDealAnnualNetto / monthsInYear),
    };
  };

  return <FlatTax data={DataCollectingService.collectFlatTaxData(calculateQuotas())} currency={lumpSumCurrency}/>;
}

export default FlatTaxContainer