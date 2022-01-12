import { IProgressiveTaxResults } from "./IProgressiveTax";
import { Utils } from "../../components/Utils/Utils";

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
      summarized: [
        {
          name: 'Efektywna stopa obciążeń',
          value: rate,
        },
        {
          name: 'Ile stracisz / zyskasz na Polskim Ładzie ROCZNIE',
          value: Utils.convertToCurrency(annualNetto - annualNettoBeforeND),
        },
        {
          name: 'Ile stracisz / zyskasz na Polskim Ładzie Miesięcznie:',
          value: Utils.convertToCurrency(monthlyNetto - monthlyNettoBeforeND),
        },
        {
          name: "Wpadasz w drugi próg podatkowy ?",
          value: taxBase >= 120000 ? "TAK" : "NIE"
        }
      ],
    };
  }
}