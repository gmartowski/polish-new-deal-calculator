const numberOfMonths = 12;
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
    beforeND: {
      first: {
        quota: 85528,
        percentage: 0.17,
        freeQuota: 525.12, // kwota do odlicznia po uwzglęndieniu kwoty wolnej od podatku
      },
      second: {
        percentage: 0.32,
      }
    },
    afterND: {
      first: {
        quota: 120000,
        percentage: 0.17,
        freeQuota: 5100, // kwota do odlicznia po uwzglęndieniu kwoty wolnej od podatku
      },
      second: {
        percentage: 0.32,
      },
    },
  },
  healthInsurance: {
    beforeND: {
      quota: 381.81,// składka zdrowotna przed NŁ
      quotaForPIT: 328.78 // składka zdrowotna przed NŁ - kwota do odliczenia od podatku
    },
    afterND: {
      percentage: 0.09, // procentowa kwota składki zdrowotnej
      minimalAnnualQuota: 3250.8, // minimalna kwota składki zdrowotnej rocznie
    },
  },
  socialInsurance: {
    beforeND: {
      pension: 615.93, //emerytalna
      rent: 252.43, //rentowa
      sickleave: 77.31,//chorobowa
      accident: 52.70,//wypadkowa
      labourFound: 77.31//fpracy
    },
    afterND: {
      pension: 693.58,//emerytalna
      rent: 284.26,//rentowa
      sickleave: 87.05,//chorobowa
      accident: 59.34,//wypadkowa
      labourFound: 87.05//fpracy
    },
  }
};

export {numberOfMonths, progressiveData}