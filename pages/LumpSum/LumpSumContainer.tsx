import LumpSum from "./LumpSum";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import React from "react";
import { Utils } from "../../components/Utils/Utils";

const LumpSumContainer = () => {

  const monthsInYear = 12;
  const monthlyHealthInsurance = 381.81;
  const monthlyHealthInsuranceDepreciation = 328.78;
  const revenueFirstThreshold = 60000;
  const revenueSecondThreshold = 300000;
  const newDealMonthlyHealtInsurances = {
    first: 306,
    second: 509,
    third: 917,
  };

  const {
    annualRevenueNetto,
    annualSocialInsurance,
    lumpSumCurrency,
    lumpSumPercentage,
  } = useSelector((state: RootState) => state.taxpayer);

  const { annualAverageIncome, taxationBase } = useSelector((state: RootState) => state.taxCalculationsReducer);

  const newDealPIT = () => {
    const value = (annualRevenueNetto - annualSocialInsurance) * lumpSumPercentage;
    return value > 0 ? value : 0;
  };

  const currentPIT = (): number => {
    const value = ((annualRevenueNetto - annualSocialInsurance) * lumpSumPercentage - (monthsInYear * monthlyHealthInsuranceDepreciation));
    return value > 0 ? value : 0;
  };

  const annualHealthInsurance = (): number => {
    return monthlyHealthInsurance * monthsInYear;
  };

  const annualNewDealHealthInsurance = (): number => {
    if (annualRevenueNetto > revenueSecondThreshold) {
      return newDealMonthlyHealtInsurances.first * monthsInYear;
    }

    if (annualRevenueNetto > revenueFirstThreshold) {
      return newDealMonthlyHealtInsurances.second * monthsInYear;
    }

    return newDealMonthlyHealtInsurances.first * monthsInYear;
  };

  const effectiveTaxBurden = (): number => {
    return (currentPIT() + annualHealthInsurance() + annualSocialInsurance) / annualAverageIncome;
  };

  const effectiveNewDealTaxBurden = (): number => {
    return (newDealPIT() + annualNewDealHealthInsurance() + annualSocialInsurance) / annualAverageIncome;
  };

  const nettoSalary = (): number => {
    return annualAverageIncome - (currentPIT() + annualHealthInsurance() + annualSocialInsurance);
  };

  const newDealNettoSalary = (): number => {
    return annualAverageIncome - (newDealPIT() + annualNewDealHealthInsurance() + annualSocialInsurance);
  };

  const taxBurdenSum = (): number => {
    return currentPIT() + annualHealthInsurance() + annualSocialInsurance;
  };

  const newDealTaxBurdenSum = (): number => {
    return newDealPIT() + annualNewDealHealthInsurance() + annualSocialInsurance;
  };

  const collectData = () => {

    return {
      common: [
        {
          name: 'PIT',
          current: Utils.roundup(currentPIT()),
          newDeal: Utils.roundup(newDealPIT()),
        },
        {
          name: 'ZUS',
          current: annualSocialInsurance,
          newDeal: annualSocialInsurance,
        },
        {
          name: 'Składka zdrowotna',
          current: Utils.roundup(annualHealthInsurance()),
          newDeal: Utils.roundup(annualNewDealHealthInsurance()),

        },
        {
          name: 'SUMA obciążeń***',
          current: Utils.roundup(taxBurdenSum()),
          newDeal: Utils.roundup(newDealTaxBurdenSum()),

        }, {
          name: 'Ile zostaje netto?',
          current: Utils.roundup(nettoSalary()),
          newDeal: Utils.roundup(newDealNettoSalary()),
        },
      ],
      summarized: {
        name: 'Efektywna stopa obciążeń',
        current: Utils.percentage(effectiveTaxBurden),
        newDeal: Utils.percentage(effectiveNewDealTaxBurden),
      },
    };
  };


  return <LumpSum data={collectData()} currency={lumpSumCurrency}/>;
};

export default LumpSumContainer;
