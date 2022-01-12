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
                 }) {
    return {
      common: [
        {
          name: 'Ulga dla klasy średniej',
          current: 0,
          newDeal: relief ? relief : 0,
        },
        {
          name: 'podstawa opodatkowania po uldze',
          current: taxBase,
          newDeal: relief ? (taxBase - relief) : taxBase,
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
          current: solidarity ? solidarity : 0,
          newDeal: solidarity ? solidarity : 0,
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