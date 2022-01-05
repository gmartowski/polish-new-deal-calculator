import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Utils } from "../../components/Utils/Utils";
import React from "react";
import ProgressiveTax from "./ProgressiveTax";

const ProgressiveTaxContainer = () => {

  const progressiveData = {
    solidarity: {
      threshold: 1000000, // próg obowiązywania daniny solidarnościowej
      percentage: 0.04, // danina solidarnościowa, procentowo
      minimalQuota: 0, // danina solidarnościowa, minimalna kwota
    },
    relief: {
      thresholds: {
        first: {
          quotaToReturn: 0,
        },
        second: {
          quota: 68412,
          fancyCounter: 0.0668,
          fancyQuotaToSubstract: 4566,
        },
        third: {
          quota: 102588,
          fancyCounter: -0.0735,
          fancyQuotaToAdd: 9829,
        },
        fourth: {
          quota: 133692,
          quotaToReturn: 0,
        },
      },
    },
    thresholds: {
      first: {
        quota: 120000,
        percentage: 0.17,
        freeQuota: 5100, // kwota do odlicznia po uwzglęndieniu kwoty wolnej od podatku
      },
      second: {
        percentage: 0.32,
      },
    },
    healthInsurance: {
      percentage: 0.09,
      minimalAnnualQuota: 3250.8,
    },
  };

  const {
    annualSocialInsurance,
    lumpSumCurrency,
  } = useSelector((state: RootState) => state.taxpayer);

  const { annualAverageIncome, taxationBase } = useSelector((state: RootState) => state.taxCalculationsReducer);

  const calculateRelief = (): number => {
    let avgIncome = Number(annualAverageIncome);

    if (avgIncome > progressiveData.relief.thresholds.fourth.quota) {
      return progressiveData.relief.thresholds.fourth.quotaToReturn;
    }

    if (avgIncome > progressiveData.relief.thresholds.third.quota) {
      return Math.round((avgIncome * (progressiveData.relief.thresholds.third.fancyCounter) + progressiveData.relief.thresholds.third.fancyQuotaToAdd) / progressiveData.thresholds.first.percentage);
    }

    if (avgIncome >= progressiveData.relief.thresholds.second.quota) {
      return Math.round(((avgIncome * progressiveData.relief.thresholds.second.fancyCounter) - progressiveData.relief.thresholds.second.fancyQuotaToSubstract) / progressiveData.thresholds.first.percentage);
    }

    return progressiveData.relief.thresholds.first.quotaToReturn;
  };

  const calculateAnnualHealthInsurance = (): number => {
    return (annualAverageIncome - annualSocialInsurance) * progressiveData.healthInsurance.percentage > progressiveData.healthInsurance.minimalAnnualQuota ?
      (annualAverageIncome - annualSocialInsurance) * progressiveData.healthInsurance.percentage :
      progressiveData.healthInsurance.minimalAnnualQuota;
  };

  const calculateSolidarity = (): number => {
    return taxationBase > progressiveData.solidarity.threshold ?
      (taxationBase - progressiveData.solidarity.threshold) * progressiveData.solidarity.percentage :
      progressiveData.solidarity.minimalQuota;
  };

  const calculatePIT = (base, relief): number => {
    const baseAfterRelief = base - relief;

    if (baseAfterRelief < 0) {
      return 0;
    }
console.log(!(baseAfterRelief > progressiveData.thresholds.first.quota));
    if (!(baseAfterRelief > progressiveData.thresholds.first.quota)) {
      console.log('1');
      return baseAfterRelief * progressiveData.thresholds.first.percentage - progressiveData.thresholds.first.freeQuota;
    }

    if ((progressiveData.thresholds.first.quota * progressiveData.thresholds.first.percentage + (baseAfterRelief - progressiveData.thresholds.first.quota * progressiveData.thresholds.second.percentage) - progressiveData.thresholds.first.freeQuota) < 0) {
      console.log('2');
      return 0;
    }

    console.log('3');
    console.log(progressiveData.thresholds.first.quota * progressiveData.thresholds.first.percentage + (baseAfterRelief - progressiveData.thresholds.first.quota * progressiveData.thresholds.second.percentage) - progressiveData.thresholds.first.freeQuota);
    return progressiveData.thresholds.first.quota * progressiveData.thresholds.first.percentage + (baseAfterRelief - progressiveData.thresholds.first.quota * progressiveData.thresholds.second.percentage) - progressiveData.thresholds.first.freeQuota;
  };

  const effectiveRate = (sum) => taxationBase === 0 ? "n/d" : `${sum / annualAverageIncome * 100} %`;

  const calculateQuotas = () => {
    const base = Utils.roundup(taxationBase);
    const relief = Utils.roundup(calculateRelief());
    const solidarity = Utils.roundup(calculateSolidarity());
    const pit = Utils.roundup(calculatePIT(base, relief));
    const insurance = Utils.roundup(calculateAnnualHealthInsurance());
    const sum = pit + annualSocialInsurance + insurance + solidarity;
    const netto = annualAverageIncome - sum;
    const rate = effectiveRate(sum);

    return {
      relief, solidarity, base, pit, insurance, sum, netto, rate,
    };
  };

  const collectData = () => {
    const { pit, sum, netto, relief, insurance, base, solidarity, rate } = calculateQuotas();

    return {
      common: [
        {
          name: 'Ulga dla klasy średniej',
          newDeal: relief,
        },
        {
          name: 'podstawa opodatkowania po uldze',
          newDeal: base - relief,
        },
        {
          name: 'PIT',
          newDeal: pit,
        },
        {
          name: 'ZUS',
          newDeal: annualSocialInsurance,
        },
        {
          name: 'Składka zdrowotna',
          newDeal: insurance,
        },
        {
          name: 'Danina solidarnościowa',
          newDeal: solidarity,
        },
        {
          name: 'SUMA obciążeń***',
          newDeal: sum,
        },

        {
          name: 'Ile zostaje netto?',
          newDeal: netto,
        },
        {
          name: 'Ile to miesięcznie netto (na ręke)?',
          newDeal: netto / 12,
        },
      ],
      summarized: [
        {
          name: 'Efektywna stopa obciążeń',
          newDeal: rate,
        },
      ],
    };
  };


  return <ProgressiveTax data={collectData()} currency={lumpSumCurrency}/>;
};

export default ProgressiveTaxContainer;
