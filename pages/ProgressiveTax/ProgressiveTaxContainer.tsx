import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Utils } from "../../components/Utils/Utils";
import { IProgressiveTaxResults } from "./IProgressiveTax";
import { numberOfMonths, progressiveData } from "./ProgressiveTaxData";
import ProgressiveTax from "./ProgressiveTax";
import { DataCollectingService } from "./DataCollectingService";

const ProgressiveTaxContainer = () => {

  const {
    annualSocialInsurance,
    lumpSumCurrency,
  } = useSelector((state: RootState) => state.taxpayer);

  const { annualAverageIncome, taxationBase } = useSelector((state: RootState) => state.taxCalculationsReducer);

  const middleClassRelief = (): number => {
    const { first, fourth, third, second } = progressiveData.relief.thresholds;
    const { percentage } = progressiveData.thresholds.afterND.first;
    let avgIncome = Number(annualAverageIncome);

    if (avgIncome > fourth.quota) {
      return fourth.quotaToReturn;
    }

    if (avgIncome > third.quota) {
      return Math.round((avgIncome * (third.fancyCounter) + third.fancyQuotaToAdd) / percentage);
    }

    if (avgIncome >= second.quota) {
      return Math.round(((avgIncome * second.fancyCounter) - second.fancyQuotaToSubstract) / percentage);
    }

    return first.quotaToReturn;
  };

  const annualHealthInsurance = (): number => {
    const { minimalAnnualQuota, percentage } = progressiveData.healthInsurance.afterND;

    if ((annualAverageIncome - annualSocialInsurance) * percentage > minimalAnnualQuota) {
      return (annualAverageIncome - annualSocialInsurance) * percentage
    }

    return minimalAnnualQuota
  };

  const solidarityTax = (): number => {
    const { percentage, threshold, minimalQuota } = progressiveData.solidarity;

    return taxationBase > threshold ? (taxationBase - threshold) * percentage : minimalQuota;
  };

  const personalIncomeTax = (base: number, relief: number): number => {
    const { quota, freeQuota, percentage } = progressiveData.thresholds.afterND.first
    const { percentage: secondPercentage } = progressiveData.thresholds.afterND.second
    const baseAfterRelief = base - relief;

    if (baseAfterRelief < 0) {
      return 0;
    }

    if (!(baseAfterRelief > quota)) {
      return baseAfterRelief * percentage - freeQuota;
    }

    if ((quota * percentage + ((baseAfterRelief - quota) * secondPercentage) - freeQuota) < 0) {
      return 0;
    }

    return quota * percentage + ((baseAfterRelief - quota) * secondPercentage) - freeQuota;
  };

  const newDealPersonalIncomeTax = (base: number): number => {
    const { quota, percentage, freeQuota } = progressiveData.thresholds.beforeND.first;
    const { percentage: secondPercentage } = progressiveData.thresholds.beforeND.second;
    const { quotaForPIT } = progressiveData.healthInsurance.beforeND;

    if (base < 0) {
      return 0;
    }

    if (!(base > quota)) {
      return base * percentage - freeQuota - (numberOfMonths * quotaForPIT);
    }

    return quota * percentage + ((base - quota) * secondPercentage) - freeQuota;
  }

  const effectiveRate = (sum: number): string => taxationBase === 0 ? "n/d" : `${Utils.roundup(sum / annualAverageIncome * 100)} %`;

  const calculateQuotas = (): IProgressiveTaxResults => {
    const taxBase = Utils.roundup(taxationBase);
    const relief = Utils.roundup(middleClassRelief());
    const solidarity = Utils.roundup(solidarityTax());
    const pit = Utils.roundup(personalIncomeTax(taxBase, relief));
    const pitBeforeND = newDealPersonalIncomeTax(taxBase);
    const healthInsurance = Utils.roundup(annualHealthInsurance());
    const healthInsuranceBeforeND = Utils.roundup(numberOfMonths * progressiveData.healthInsurance.beforeND.quota);
    const sum = pit + annualSocialInsurance + healthInsurance + solidarity;
    const sumBeforeND = pitBeforeND + annualSocialInsurance + healthInsuranceBeforeND + solidarity;
    const annualNetto = Utils.roundup(annualAverageIncome - sum);
    const annualNettoBeforeND = Utils.roundup(annualAverageIncome - sumBeforeND);

    return {
      relief,
      solidarity,
      taxBase,
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
      monthlyNetto: Utils.roundup(annualNetto / numberOfMonths),
      monthlyNettoBeforeND: Utils.roundup(annualNettoBeforeND / numberOfMonths)
    };
  };

  return <ProgressiveTax data={DataCollectingService.collect(calculateQuotas())} currency={lumpSumCurrency}/>;
};

export default ProgressiveTaxContainer;
