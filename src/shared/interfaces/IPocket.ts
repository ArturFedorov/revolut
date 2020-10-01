import {IOperation} from './IOperation';

export interface IPocket {
  currency: string;
  operations: IOperation[];
}
