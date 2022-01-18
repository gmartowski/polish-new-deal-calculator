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
          previous: pit,
          newDeal: newDealPit,
        },
        {
          name: 'Składka zdrowotna',
          previous: healthInsurance,
          newDeal: newDealHealthInsurance,
        },
        {
          name: 'ZUS',
          previous: annualSocialInsurance,
          newDeal: annualSocialInsurance,
        },
        {
          name: 'SUMA obciążeń***',
          previous: sum,
          newDeal: newDealSum,
        },
        {
          name: 'Ile zostaje netto?',
          previous: annualNetto,
          newDeal: newDealAnnualNetto,
        },
        {
          name: 'Ile to miesięcznie netto (na ręke)?',
          previous: monthlyNetto,
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
          name: 'Miesięczne PIT',
          value: `${Utils.roundup(newDealPit / 12)} zł`,
        },
        {
          name: 'Miesięczne ZUS',
          value: `${annualSocialInsurance / 12} zł`,
        },
        {
          name: 'Miesięczne składka zdrowotna',
          value: `${newDealHealthInsurance / 12} zł.`,
        },
      ],
      chart: [
        {
          name: 'PIT',
          previous: pit,
          newDeal: newDealPit,
        },
        {
          name: 'ZUS',
          previous: annualSocialInsurance,
          newDeal: annualSocialInsurance,
        },
        {
          name: 'Składka zdrowotna',
          previous: healthInsurance,
          newDeal: newDealHealthInsurance,
        },
        {
          name: 'SUMA obciążeń***',
          previous: sum,
          newDeal: newDealSum,
        },
        {
          name: 'Ile zostaje netto?',
          previous: annualNetto,
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
          previous: 0,
          newDeal: relief || 0,
        },
        {
          name: 'podstawa opodatkowania po uldze',
          previous: taxBase,
          newDeal: relief ? (taxBase - relief) : taxBase,
        },
        {
          name: 'PIT',
          previous: pit,
          newDeal: newDealPit,
        },
        {
          name: 'ZUS',
          previous: annualSocialInsurance,
          newDeal: annualSocialInsurance,
        },
        {
          name: 'Składka zdrowotna',
          previous: healthInsurance,
          newDeal: newDealHealthInsurance,
        },
        {
          name: 'Danina solidarnościowa',
          previous: solidarity || 0,
          newDeal: solidarity || 0,
        },
        {
          name: 'SUMA obciążeń***',
          previous: sum,
          newDeal: newDealSum,
        },
        {
          name: 'Ile zostaje netto?',
          previous: annualNetto,
          newDeal: newDealAnnualNetto,
        },
        {
          name: 'Ile to miesięcznie netto (na ręke)?',
          previous: monthlyNetto,
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
          name: "Wpadasz w drugi próg podatkowy?",
          value: taxBase >= 120000 ? "TAK" : "NIE"
        },
        {
          name: 'Miesięczne PIT',
          value: `${Utils.roundup(newDealPit / 12)} zł`,
        },
        {
          name: 'Miesięczne ZUS',
          value: `${Utils.roundup(annualSocialInsurance / 12)} zł`,
        },
        {
          name: 'Miesięczne składka zdrowotna',
          value: `${Utils.roundup(newDealHealthInsurance / 12)} zł.`,
        },
      ],
      chart: [
        {
          name: 'PIT',
          previous: pit,
          newDeal: newDealPit,
        },
        {
          name: 'ZUS',
          previous: annualSocialInsurance,
          newDeal: annualSocialInsurance,
        },
        {
          name: 'Składka zdrowotna',
          previous: healthInsurance,
          newDeal: newDealHealthInsurance,
        },
        {
          name: 'Danina solidarnościowa',
          previous: solidarity || 0,
          newDeal: solidarity || 0,
        },
        {
          name: 'SUMA obciążeń***',
          previous: sum,
          newDeal: newDealSum,
        },
        {
          name: 'Ile zostaje netto?',
          previous: annualNetto,
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
          previous: pit,
          newDeal: newDealPit,
        },
        {
          name: 'ZUS',
          previous: annualSocialInsurance,
          newDeal: annualSocialInsurance,
        },
        {
          name: 'Składka zdrowotna',
          previous: healthInsurance,
          newDeal: newDealHealthInsurance,
        },
        {
          name: 'Danina solidarnościowa',
          previous: solidarity || 0,
          newDeal: solidarity || 0,
        },
        {
          name: 'SUMA obciążeń***',
          previous: sum,
          newDeal: newDealSum,
        },
        {
          name: 'Ile zostaje netto?',
          previous: annualNetto,
          newDeal: newDealAnnualNetto,
        },
        {
          name: 'Ile to miesięcznie netto (na ręke)?',
          previous: monthlyNetto,
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
          name: 'Miesięczne PIT',
          value: `${Utils.roundup(newDealPit / 12)} zł`,
        },
        {
          name: 'Miesięczne ZUS',
          value: `${Utils.roundup(annualSocialInsurance / 12)} zł`,
        },
        {
          name: 'Miesięczne składka zdrowotna',
          value: `${Utils.roundup(newDealHealthInsurance / 12)} zł.`,
        },
      ],
      chart: [
        {
          name: 'PIT',
          previous: pit,
          newDeal: newDealPit,
        },
        {
          name: 'ZUS',
          previous: annualSocialInsurance,
          newDeal: annualSocialInsurance,
        },
        {
          name: 'Składka zdrowotna',
          previous: healthInsurance,
          newDeal: newDealHealthInsurance,
        },
        {
          name: 'Danina solidarnościowa',
          previous: solidarity || 0,
          newDeal: solidarity || 0,
        },
        {
          name: 'SUMA obciążeń***',
          previous: sum,
          newDeal: newDealSum,
        },
        {
          name: 'Ile zostaje netto?',
          previous: annualNetto,
          newDeal: newDealAnnualNetto,
        },
      ]
    }
  }
}