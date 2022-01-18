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
const progressiveDescriptions = {
  title: "Rozliczenie wg. skali podatkowej - 17%, 32%",
  records: [
    {
      isNegative: false,
      primary: "30 tys. PLN kwoty wolnej od podatku",
      secondary: "Kwota wolna od podatku wzrośnie do 30 tysięcy złotych. Obecnie wynosi 8 tysięcy złotych."
    },
    {
      isNegative: false,
      primary: "Drugi próg podatkowy od 120 tys. PLN",
      secondary: "Drugi próg podatkowy wzrośnie do 120 tysięcy złotych. Obecnie wynosi 85528 złotych."
    },
    {
      isNegative: false,
      primary: "Ulga dla klasy średniej",
      secondary: "Pojawi się „ulga dla klasy średniej” mająca przysługiwać osobom, których przychody mieszczą się w przedziale od 68412 zł do 133692 zł rocznie."
    },
    {
      isNegative: false,
      primary: "Rozliczenie z małżonkiem",
      secondary: "Jedynie na skali możemy się rozliczyć z małżonkiem"
    },
    {
      isNegative: true,
      primary: "Składka zdrowotna - 9% dochodu",
      secondary: "Składka zdrowotna wzrośnie do 9% dochodu i nie będzie mogła być niższa niż 9% minimalnego wynagrodzenia."
    },
    {
      isNegative: true,
      primary: "Nie odliczymy składki zdrowotnej od podatku",
      secondary: "Brak możliwości odliczenia składki zdrowotnej od podatku, podstawe opodatkowania pomniejszymy jedynie o ZUS"
    },
  ]
}
const flatTaxDescriptions = {
  title: "Rozliczenie wg. stawki liniowej 19%",
  records: [
    {
      isNegative: true,
      primary: "4,9% - składki zdrowotnej",
      secondary: "Składka zdrowotna wzrośnie do 4,9% dochodu"
    },
    {
      isNegative: true,
      primary: "Brak rozliczenia z małżonkiem",
      secondary: "Jedynie będąc na skali możemy się rozliczyć z małżonkiem"
    },
    {
      isNegative: true,
      primary: "Brak kwoty wolnej od podatku",
    },
    {
      isNegative: true,
      primary: "Brak ulgi dla klasy średniej",
      secondary: "Przewidziana jedynie dla UoP i skali"
    },
    {
      isNegative: true,
      primary: "Nie odliczymy składki zdrowotnej od podatku",
      secondary: "Brak możliwości odliczenia składki zdrowotnej od podatku, podstawe opodatkowania pomniejszymy jedynie o ZUS"
    },
  ]
}
const lumpSumDescriptions = {
  title: "Rozliczenie wg. stawki ryczałtowej",
  records: [
    {
      isNegative: false,
      primary: "Mniejsza stawka ryczałtowa dla IT",
      secondary: "IT - zmiana opodatkowania z 15% na 12%",
    },
    {
      isNegative: false,
      primary: "Najprostsza forma opodatkowania",
      secondary: "Brak skomplikowanych wzorów (ulga dla klasy średniej) i manipulacji kosztami",
    },
    {
      isNegative: true,
      primary: "Nie odliczymy składki zdrowotnej od podatku",
      secondary: "Brak możliwości odliczenia składki zdrowotnej od podatku, podstawe opodatkowania pomniejszymy jedynie o ZUS"
    },
    {
      isNegative: true,
      primary: "Zmiana wysokości składki zdrowotnej",
      secondary: "3 progi (60%, 100%, 180%) - przychód do 60, do 300 i powyżej 300 tys PLN, 9%. Jako przychód - kwota netto na FV. UWAGA ! Nie odejmujemy w tym przypadku składek ZUS !!!"
    },
    {
      isNegative: true,
      primary: "Brak ulgi dla klasy średniej",
      secondary: "Przewidziana jedynie dla UoP i skali"
    },
  ]
}


export { numberOfMonths, progressiveData, progressiveDescriptions, flatTaxDescriptions, lumpSumDescriptions }