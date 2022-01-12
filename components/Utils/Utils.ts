export class Utils {

  static roundup = (prop: number): number => {
    return Math.round(Number(prop));
  };

  static percentage = (prop: () => number): string => {
    return `${Math.round(Number(prop()) * 100)} %`;
  };

  static getCurrencyDetails = (locale: 'PLN' | 'EUR') => {
    switch (locale) {
      case "PLN":
        return { locale: "pl-PL", curr: "PLN" };
      default:
        return { locale: "de-DE", curr: "EUR" };

    }
  };

  static convertToCurrency = (value: number, currency: 'PLN' | 'EUR' = 'PLN') => {
    const { locale, curr } = Utils.getCurrencyDetails(currency);
    return new Intl.NumberFormat(locale, { style: 'currency', currency: curr }).format(value);
  };

}
