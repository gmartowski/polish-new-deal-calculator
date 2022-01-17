export const lumpSumData = {
  monthsInYear: 12,
  percentageForIT: {
    previous: 0.15, // podatek ryczałtowy dla IT (programiści, informatycy etc.) - 2021
    newDeal: 0.12 // podatek ryczałtowy dla IT (programiści, informatycy etc.) - Polski Ład
  },
  healthInsurance: {
    previous: {
      monthly: 381.81, // składka zdrowotna
      monthlyDeprecation: 328.78, // kwota do odliczenia za składkę zdrowotną
    },
    newDeal: {
      first: 306,// 5657,3 * 0,6 * 0,09 - 60% przeciętnego wynagrodzenia (2021) * 9%
      second: 509, // 5657,3 * 0,09 - 100% przeciętnego wynagrodzenia (2021) * 9%
      third: 917, // 5657,3 * 1,8 * 0,09 - 180% przeciętnego wynagrodzenia (2021) * 9%
    }
  },
  threshold: {
    first: 60000, // pierwszy próg wyznaczający wysokość składki zdrowotnej
    second: 300000 // drugi próg wyznaczający wysokość składki zdrowotnej
  },
}