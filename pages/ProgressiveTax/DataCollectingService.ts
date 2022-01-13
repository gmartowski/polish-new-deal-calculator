import { Utils } from "../../components/Utils/Utils";
import { ILumpSumData } from "../LumpSum/ILumpSumData";
import { IProgressiveTaxData } from "./IProgressiveTax";
import { IFlatTaxData } from "../FlatTax/IFlatTax";

export class DataCollectingService {
  static collectLumpSumData(data: ILumpSumData) {
    const {
      sum,
      newDealSum,
      newDealPit,
      newDealAnnualNetto,
      monthlyNetto,
      newDealMonthlyNetto,
      annualSocialInsurance,
      newDealHealthInsurance,
      healthInsurance,
      pit,
      annualNetto,
      rate
    } = data;

    return {
      common: [
        {
          name: 'Podatek',
          current: pit,
          newDeal: newDealPit,
        },
        {
          name: 'Składka zdrowotna',
          current: healthInsurance,
          newDeal: newDealHealthInsurance,
        },
        {
          name: 'ZUS',
          current: annualSocialInsurance,
          newDeal: annualSocialInsurance,
        },
        {
          name: 'SUMA obciążeń***',
          current: sum,
          newDeal: newDealSum,
        },
        {
          name: 'Ile zostaje netto?',
          current: annualNetto,
          newDeal: newDealAnnualNetto,
        },
        {
          name: 'Ile to miesięcznie netto (na ręke)?',
          current: monthlyNetto,
          newDeal: newDealMonthlyNetto,
        },
      ],
      summarized: [
        {
          name: 'Efektywna stopa obciążeń',
          value: rate,
        },
        {
          name: 'Ile stracisz / zyskasz na Polskim Ładzie ROCZNIE',
          value: Utils.convertToCurrency(newDealAnnualNetto - annualNetto),
        },
        {
          name: 'Ile stracisz / zyskasz na Polskim Ładzie Miesięcznie:',
          value: Utils.convertToCurrency(newDealMonthlyNetto - monthlyNetto),
        },
      ],
      chart: [
        {
          name: 'PIT',
          current: pit,
          newDeal: newDealPit,
        },
        {
          name: 'ZUS',
          current: annualSocialInsurance,
          newDeal: annualSocialInsurance,
        },
        {
          name: 'Składka zdrowotna',
          current: healthInsurance,
          newDeal: newDealHealthInsurance,
        },
        {
          name: 'SUMA obciążeń***',
          current: sum,
          newDeal: newDealSum,
        },
        {
          name: 'Ile zostaje netto?',
          current: annualNetto,
          newDeal: newDealAnnualNetto,
        },
      ]
    };
  }

  static collectProgressiveTaxData(data: IProgressiveTaxData) {
    const {
      pit,
      newDealPit,
      newDealMonthlyNetto,
      monthlyNetto,
      newDealAnnualNetto,
      newDealSum,
      newDealHealthInsurance,
      sum,
      annualSocialInsurance,
      rate,
      healthInsurance,
      annualNetto,
      taxBase,
      solidarity,
      relief
    } = data;
    return {
      common: [
        {
          name: 'Ulga dla klasy średniej',
          current: 0,
          newDeal: relief || 0,
        },
        {
          name: 'podstawa opodatkowania po uldze',
          current: taxBase,
          newDeal: relief ? (taxBase - relief) : taxBase,
        },
        {
          name: 'PIT',
          current: pit,
          newDeal: newDealPit,
        },
        {
          name: 'ZUS',
          current: annualSocialInsurance,
          newDeal: annualSocialInsurance,
        },
        {
          name: 'Składka zdrowotna',
          current: healthInsurance,
          newDeal: newDealHealthInsurance,
        },
        {
          name: 'Danina solidarnościowa',
          current: solidarity || 0,
          newDeal: solidarity || 0,
        },
        {
          name: 'SUMA obciążeń***',
          current: sum,
          newDeal: newDealSum,
        },
        {
          name: 'Ile zostaje netto?',
          current: annualNetto,
          newDeal: newDealAnnualNetto,
        },
        {
          name: 'Ile to miesięcznie netto (na ręke)?',
          current: monthlyNetto,
          newDeal: newDealMonthlyNetto,
        },
      ],
      summarized: [
        {
          name: 'Efektywna stopa obciążeń',
          value: rate,
        },
        {
          name: 'Ile stracisz / zyskasz na Polskim Ładzie ROCZNIE',
          value: Utils.convertToCurrency(newDealAnnualNetto - annualNetto),
        },
        {
          name: 'Ile stracisz / zyskasz na Polskim Ładzie Miesięcznie:',
          value: Utils.convertToCurrency(newDealMonthlyNetto - monthlyNetto),
        },
        {
          name: "Wpadasz w drugi próg podatkowy ?",
          value: taxBase >= 120000 ? "TAK" : "NIE"
        }
      ],
      chart: [
        {
          name: 'PIT',
          current: pit,
          newDeal: newDealPit,
        },
        {
          name: 'ZUS',
          current: annualSocialInsurance,
          newDeal: annualSocialInsurance,
        },
        {
          name: 'Składka zdrowotna',
          current: healthInsurance,
          newDeal: newDealHealthInsurance,
        },
        {
          name: 'Danina solidarnościowa',
          current: solidarity || 0,
          newDeal: solidarity || 0,
        },
        {
          name: 'SUMA obciążeń***',
          current: sum,
          newDeal: newDealSum,
        },
        {
          name: 'Ile zostaje netto?',
          current: annualNetto,
          newDeal: newDealAnnualNetto,
        },
      ]
    };

  }

  static collectFlatTaxData(data: IFlatTaxData) {
    const {
      pit,
      newDealPit,
      newDealMonthlyNetto,
      monthlyNetto,
      newDealAnnualNetto,
      newDealSum,
      newDealHealthInsurance,
      sum,
      annualSocialInsurance,
      rate,
      healthInsurance,
      annualNetto,
      solidarity
    } = data;
    return {
      common: [
        {
          name: 'PIT',
          current: pit,
          newDeal: newDealPit,
        },
        {
          name: 'ZUS',
          current: annualSocialInsurance,
          newDeal: annualSocialInsurance,
        },
        {
          name: 'Składka zdrowotna',
          current: healthInsurance,
          newDeal: newDealHealthInsurance,
        },
        {
          name: 'Danina solidarnościowa',
          current: solidarity || 0,
          newDeal: solidarity || 0,
        },
        {
          name: 'SUMA obciążeń***',
          current: sum,
          newDeal: newDealSum,
        },
        {
          name: 'Ile zostaje netto?',
          current: annualNetto,
          newDeal: newDealAnnualNetto,
        },
        {
          name: 'Ile to miesięcznie netto (na ręke)?',
          current: monthlyNetto,
          newDeal: newDealMonthlyNetto,
        },
      ],
      summarized: [
        {
          name: 'Efektywna stopa obciążeń',
          value: rate,
        },
        {
          name: 'Ile stracisz / zyskasz na Polskim Ładzie ROCZNIE',
          value: Utils.convertToCurrency(newDealAnnualNetto - annualNetto),
        },
        {
          name: 'Ile stracisz / zyskasz na Polskim Ładzie Miesięcznie:',
          value: Utils.convertToCurrency(newDealMonthlyNetto - monthlyNetto),
        },
      ],
      chart: [
        {
          name: 'PIT',
          current: pit,
          newDeal: newDealPit,
        },
        {
          name: 'ZUS',
          current: annualSocialInsurance,
          newDeal: annualSocialInsurance,
        },
        {
          name: 'Składka zdrowotna',
          current: healthInsurance,
          newDeal: newDealHealthInsurance,
        },
        {
          name: 'Danina solidarnościowa',
          current: solidarity || 0,
          newDeal: solidarity || 0,
        },
        {
          name: 'SUMA obciążeń***',
          current: sum,
          newDeal: newDealSum,
        },
        {
          name: 'Ile zostaje netto?',
          current: annualNetto,
          newDeal: newDealAnnualNetto,
        },
      ]
    }
  }
}