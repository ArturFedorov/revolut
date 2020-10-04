export interface IOperation {
  id: string;
  currency: string;
  exchangeCurrency: string;
  description: string;
  date: Date;
  rate: number;
  sumFrom: number;
  sumTo: number;
  isDeduction: boolean;
}
