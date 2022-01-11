import { IProgressiveTaxResults } from "./IProgressiveTax";

export class DataCollectingService {
  static collect({
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
                   rate,
                   monthlyNetto,
                   monthlyNettoBeforeND
                 }: IProgressiveTaxResults) {
    return {
      common: [
        {
          name: 'Ulga dla klasy średniej',
          current: 0,
          newDeal: relief,
        },
        {
          name: 'podstawa opodatkowania po uldze',
          current: taxBase,
          newDeal: taxBase - relief,
        },
        {
          name: 'PIT',
          current: pitBeforeND,
          newDeal: pit,
        },
        {
          name: 'ZUS',
          current: annualSocialInsurance,
          newDeal: annualSocialInsurance,
        },
        {
          name: 'Składka zdrowotna',
          current: healthInsuranceBeforeND,
          newDeal: healthInsurance,
        },
        {
          name: 'Danina solidarnościowa',
          current: solidarity,
          newDeal: solidarity,
        },
        {
          name: 'SUMA obciążeń***',
          current: sumBeforeND,
          newDeal: sum,
        },
        {
          name: 'Ile zostaje netto?',
          current: annualNettoBeforeND,
          newDeal: annualNetto,
        },
        {
          name: 'Ile to miesięcznie netto (na ręke)?',
          current: monthlyNettoBeforeND,
          newDeal: monthlyNetto,
        },
      ],
      summarized: {
        name: 'Efektywna stopa obciążeń',
        rate,
        annual: annualNettoBeforeND - annualNetto,
        monthly: monthlyNettoBeforeND - monthlyNetto,
      },
    };
  }
}