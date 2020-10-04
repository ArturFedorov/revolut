import {IOperation} from '../interfaces/IOperation';
import {IRate} from '../interfaces/IRate';

export class OperationUtils {
  static calculateBalance(operations: IOperation[]) {
    let balance = 0;

    for(let index = operations.length; index > 0; index--) {
      operations[index].isDeduction
        ? balance -= operations[index].sumFrom
        : balance += operations[index].sumFrom;
    }

    return balance;
  }

  static combineRates(rates: IRate[]) {
    return rates.map(rate => {
      
    })
  }
}
