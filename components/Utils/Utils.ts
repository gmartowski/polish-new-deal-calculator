export class Utils {

  static roundup = (prop: () => number): number => {
    return Math.round(Number(prop()));
  };

  static percentage = (prop: () => number): string => {
    return `${Math.round(Number(prop()) * 100)} %`;
  };

}