import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import FlatTax from "./FlatTax";

const FlatTaxContainer = () => {

  const taxRate = 0.19;
  const healthInsuranceRate = 0.049;
  const minimalHealthInsuranceQuota = 3250.8;
  const monthsInYear = 12;
  const monthlyHealthInsurance = 381.81;
  const monthlyHealthInsuranceDepreciation = 328.78;
  const solidarityTributeThreshold = 1000000;
  const solidarityTributeTaxRate = 0.04;

  const {
    annualRevenueNetto,
    annualTaxDeductibleExpenses,
    annualSocialInsurance,
  } = useSelector((state: RootState) => state.taxpayer);

  const {annualAverageIncome, taxationBase} = useSelector((state: RootState) => state.taxCalculationsReducer);

  const newDealPIT = (): number => {
    return ((annualRevenueNetto - annualTaxDeductibleExpenses - annualSocialInsurance) * taxRate);
  };

  const currentPIT = (): number => {
    return newDealPIT() - (monthsInYear * monthlyHealthInsuranceDepreciation);
  };

  const annualHealthInsurance = (): number => {
    return monthlyHealthInsurance * monthsInYear;
  };

  const newDealAnnualHealthInsurance = (): number => {
    const newDealHealthInsuranceQuota = (annualAverageIncome - annualSocialInsurance) * healthInsuranceRate;
    return newDealHealthInsuranceQuota > minimalHealthInsuranceQuota ? newDealHealthInsuranceQuota : minimalHealthInsuranceQuota;
  };

  const solidarityTribute = (): number => {
    return taxationBase > solidarityTributeThreshold ? (taxationBase - solidarityTributeThreshold) * solidarityTributeTaxRate : 0;
  };

  const taxBurdenSum = (): number => {
    return currentPIT() + annualSocialInsurance + annualHealthInsurance() + solidarityTribute();
  };

  const newDealTaxBurdenSum = (): number => {
    return newDealPIT() + annualSocialInsurance + newDealAnnualHealthInsurance() + solidarityTribute();
  };

  const effectiveTaxBurden = (): number => {
    return (currentPIT() + annualSocialInsurance + annualHealthInsurance() + solidarityTribute()) / annualAverageIncome;
  };

  const effectiveNewDealTaxBurden = (): number => {
    return (newDealPIT() + annualSocialInsurance + newDealAnnualHealthInsurance() + solidarityTribute()) / annualAverageIncome;
  };

  const nettoSalary = (): number => {
    return annualAverageIncome - (currentPIT() + annualSocialInsurance + annualHealthInsurance() + solidarityTribute());
  };

  const newDealNettoSalary = (): number => {
    return annualAverageIncome - (newDealPIT() + annualSocialInsurance + newDealAnnualHealthInsurance() + solidarityTribute());
  };

  const convertionHOC = (prop: () => number): number => {
    return Math.round(Number(prop()));
  };

  const roundHOC = (prop: () => number): string => {
    return `${Math.round(Number(prop()) * 100)} %`;
  };

  const collectData = () => {
    const chart = [
      {
        name: 'PIT',
        current: convertionHOC(currentPIT),
        newDeal: convertionHOC(newDealPIT),
      },
      {
        name: 'ZUS',
        current: annualSocialInsurance,
        newDeal: annualSocialInsurance,
      },
      {
        name: 'Składka zdrowotna',
        current: convertionHOC(annualHealthInsurance),
        newDeal: convertionHOC(newDealAnnualHealthInsurance),

      },
      {
        name: 'Danina solidarnościowa',
        current: convertionHOC(solidarityTribute),
        newDeal: convertionHOC(solidarityTribute),
      },
      {
        name: 'Suma obciążeń',
        current: convertionHOC(taxBurdenSum),
        newDeal: convertionHOC(newDealTaxBurdenSum),
      },
      {
        name: 'Ile zostaje netto ?',
        current: convertionHOC(nettoSalary),
        newDeal: convertionHOC(newDealNettoSalary),
      }]
    return {
      chart,
      table: [
        ...chart,
        {
          name: 'Efektywna stopa obciążeń',
          current: roundHOC(effectiveTaxBurden),
          newDeal: roundHOC(effectiveNewDealTaxBurden),
        },]
    };
  };

  return (
    <FlatTax data={collectData()}/>
  )
}

export default FlatTaxContainer