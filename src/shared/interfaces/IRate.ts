export interface IRate {
  id: string;
  baseCurrency: string;
  baseCurrencyName: string;
  exchangeCurrency: string;
  exchangeCurrencyName: string;
  rate: number | string;
}

export interface IApiRate {
  [key: string]: number;
}

export interface IRateResponse {
  rates: IApiRate;
}
