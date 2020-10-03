import {Currencies} from '../constants/Currencies';

export interface IOperation {
  id: number;
  currency: Currencies.EUR | Currencies.GBP | Currencies.USD;
  description: string;
  date: Date;
  rate: number;
  sumFrom: number;
  sumTo: number;
  isDeduction: boolean;
}
