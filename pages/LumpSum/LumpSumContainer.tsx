import LumpSum from "./LumpSum";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import React from "react";
import { Utils } from "../../components/Utils/Utils";
import { DataCollectingService } from "../ProgressiveTax/DataCollectingService";
import { lumpSumData } from "./LumpSumData";

const LumpSumContainer = () => {
  
  const {
    annualRevenueNetto,
    annualSocialInsurance,
    lumpSumCurrency,
    lumpSumPercentage,
  } = useSelector((state: RootState) => state.taxpayer);

  const { annualAverageIncome, taxationBase } = useSelector((state: RootState) => state.taxCalculationsReducer);

  const newDealPersonalIncomeTax = () => {
    const value = (annualRevenueNetto - annualSocialInsurance) * lumpSumPercentage;
    return value > 0 ? value : 0;
  };

  const personalIncomeTax = (): number => {
    const value = ((annualRevenueNetto - annualSocialInsurance) * lumpSumPercentage - (lumpSumData.monthsInYear * lumpSumData.monthlyHealthInsuranceDepreciation));
    return value > 0 ? value : 0;
  };

  const annualHealthInsurance = (): number => {
    return lumpSumData.monthlyHealthInsurance * lumpSumData.monthsInYear;
  };

  const annualNewDealHealthInsurance = (): number => {
    if (annualRevenueNetto > lumpSumData.revenueSecondThreshold) {
      return lumpSumData.newDealMonthlyHealtInsurances.first * lumpSumData.monthsInYear;
    }

    if (annualRevenueNetto > lumpSumData.revenueFirstThreshold) {
      return lumpSumData.newDealMonthlyHealtInsurances.second * lumpSumData.monthsInYear;
    }

    return lumpSumData.newDealMonthlyHealtInsurances.first * lumpSumData.monthsInYear;
  };

  const effectiveRate = (sum: number): string => taxationBase === 0 ? "n/d" : `${Utils.roundup(sum / annualAverageIncome * 100)} %`;

  const calculateQuotas = () => {

    const pit = Utils.roundup(newDealPersonalIncomeTax());
    const pitBeforeND = Utils.roundup(personalIncomeTax());
    const healthInsurance = Utils.roundup(annualNewDealHealthInsurance());
    const healthInsuranceBeforeND = Utils.roundup(annualHealthInsurance());
    const sum = Utils.roundup(pit + annualSocialInsurance + healthInsurance);
    const sumBeforeND = Utils.roundup(pitBeforeND + annualSocialInsurance + healthInsuranceBeforeND);
    const annualNetto = Utils.roundup(annualAverageIncome - sum);
    const annualNettoBeforeND = Utils.roundup(annualAverageIncome - sumBeforeND);

    return {
      pit,
      pitBeforeND,
      healthInsurance,
      healthInsuranceBeforeND,
      sum,
      sumBeforeND,
      annualNetto,
      annualNettoBeforeND,
      annualSocialInsurance,
      rate: effectiveRate(sum),
      monthlyNetto: Utils.roundup(annualNetto / lumpSumData.monthsInYear),
      monthlyNettoBeforeND: Utils.roundup(annualNettoBeforeND / lumpSumData.monthsInYear),
    };
  };


  return <LumpSum data={DataCollectingService.collect(calculateQuotas())} currency={lumpSumCurrency}/>;
};

export default LumpSumContainer;
