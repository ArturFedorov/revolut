import {IOperation} from './IOperation';

export interface IPocket {
  id: string;
  balance: number;
  currency: string;
  operations: IOperation[];
}
