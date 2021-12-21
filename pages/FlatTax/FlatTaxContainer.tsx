import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import FlatTax from "./FlatTax";
import {Utils} from "../../components/Utils/Utils";

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

  const collectData = () => {
    const chart = [
      {
        name: 'PIT',
        current: Utils.roundup(currentPIT),
        newDeal: Utils.roundup(newDealPIT),
      },
      {
        name: 'ZUS',
        current: annualSocialInsurance,
        newDeal: annualSocialInsurance,
      },
      {
        name: 'Składka zdrowotna',
        current: Utils.roundup(annualHealthInsurance),
        newDeal: Utils.roundup(newDealAnnualHealthInsurance),

      },
      {
        name: 'Danina solidarnościowa',
        current: Utils.roundup(solidarityTribute),
        newDeal: Utils.roundup(solidarityTribute),
      },
      {
        name: 'Suma obciążeń',
        current: Utils.roundup(taxBurdenSum),
        newDeal: Utils.roundup(newDealTaxBurdenSum),
      },
      {
        name: 'Ile zostaje netto ?',
        current: Utils.roundup(nettoSalary),
        newDeal: Utils.roundup(newDealNettoSalary),
      }]
    return {
      chart,
      table: [
        ...chart,
        {
          name: 'Efektywna stopa obciążeń',
          current: Utils.percentage(effectiveTaxBurden),
          newDeal: Utils.percentage(effectiveNewDealTaxBurden),
        },]
    };
  };

  return (
    <FlatTax data={collectData()}/>
  )
}

export default FlatTaxContainer