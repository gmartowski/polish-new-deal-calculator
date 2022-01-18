import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LumpSum from "./LumpSum";
import { Utils } from "../../components/Utils/Utils";
import { DataCollectingService } from "../ProgressiveTax/DataCollectingService";
import { lumpSumData } from "./LumpSumData";
import { ILumpSumData } from "./ILumpSumData";

const LumpSumContainer = () => {

  const {
    annualRevenueNetto,
    annualSocialInsurance,
    lumpSumCurrency,
    lumpSumPercentage,
  } = useSelector((state: RootState) => state.taxpayer);

  const { annualAverageIncome, taxationBase } = useSelector((state: RootState) => state.taxCalculationsReducer);
  const {
    threshold,
    percentageForIT,
    healthInsurance,
    monthsInYear,
  } = lumpSumData

  const personalIncomeTax = (): number => {
    return ((annualRevenueNetto - annualSocialInsurance) * percentageForIT.previous - (monthsInYear * healthInsurance.previous.monthlyDeprecation)) || 0;
  };

  const newDealPersonalIncomeTax = (): number => {
    return (annualRevenueNetto - annualSocialInsurance) * lumpSumPercentage || 0
  };

  const annualHealthInsurance = (): number => {
    return healthInsurance.previous.monthly * monthsInYear;
  };

  const annualNewDealHealthInsurance = (): number => {
    if (annualRevenueNetto > threshold.second) {
      return healthInsurance.newDeal.third * monthsInYear;
    }

    if (annualRevenueNetto > threshold.first) {
      return healthInsurance.newDeal.second * monthsInYear;
    }

    return healthInsurance.newDeal.first * monthsInYear;
  };

  const effectiveRate = (sum: number): string => taxationBase === 0 ? "n/d" : `${Utils.roundup(sum / annualAverageIncome * 100)} %`;

  const calculateQuotas = (): ILumpSumData => {
    const pit = Utils.roundup(personalIncomeTax());
    const healthInsurance = Utils.roundup(annualHealthInsurance());
    const sum = Utils.roundup(pit + annualSocialInsurance + healthInsurance);
    const annualNetto = Utils.roundup(annualAverageIncome - sum);

    const newDealPit = Utils.roundup(newDealPersonalIncomeTax());
    const newDealHealthInsurance = Utils.roundup(annualNewDealHealthInsurance());
    const newDealSum = Utils.roundup(newDealPit + annualSocialInsurance + newDealHealthInsurance);
    const newDealAnnualNetto = Utils.roundup(annualAverageIncome - newDealSum);

    return {
      pit,
      healthInsurance,
      sum,
      annualNetto,
      annualSocialInsurance,
      newDealPit,
      newDealHealthInsurance,
      newDealSum,
      newDealAnnualNetto,
      rate: effectiveRate(newDealSum),
      monthlyNetto: Utils.roundup(annualNetto / monthsInYear),
      newDealMonthlyNetto: Utils.roundup(newDealAnnualNetto / monthsInYear),
    };
  };


  return <LumpSum data={DataCollectingService.collectLumpSumData(calculateQuotas())} currency={lumpSumCurrency}/>;
};

export default LumpSumContainer;
