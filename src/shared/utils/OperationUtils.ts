import {v4 as uuidv4} from 'uuid';
import {IOperation} from '../interfaces/IOperation';
import {IApiRate, IRate} from '../interfaces/IRate';
import {Currencies} from '../constants/Currencies';

export class OperationUtils {
  static calculateBalance(operations: IOperation[]) {
    let balance = 0;

    for(let index = operations.length - 1 ; index > 0; index--) {
      operations[index].isDeduction
        ? balance -= operations[index].sumFrom
        : balance += operations[index].sumFrom;
    }

    return balance;
  }

  static combineRates(rates: IApiRate): IRate[] {
    const rateList = Object.keys(rates);
    const newPairs: IRate[] = [];


    // calculate possible exchange rates
    rateList.forEach(rate => {
      let otherRates = rateList.filter(otherRate => otherRate !== rate);
      otherRates.forEach(otherRate => {
        newPairs.push({
          id: uuidv4(),
          baseCurrency: rate,
          baseCurrencyName: this.getCurrencyName(rate),
          exchangeCurrency: otherRate,
          exchangeCurrencyName: this.getCurrencyName(otherRate),
          rate: (rates[rate]/rates[otherRate]).toFixed(4)
        });
      });

    })

    return newPairs;
  }

  static setInitialDollarOperation(): IOperation {
    return {
      id: uuidv4(),
      currency: Currencies.USD,
      exchangeCurrency: Currencies.EUR,
      rate: 0.8538,
      sumFrom: 10000,
      sumTo: 10000 * 0.8538,
      isDeduction: false,
      description: 'Exchange from EUR',
      date: new Date()
    };
  }

  static getCurrencyName = (key: string) =>  {
    const currencies = localStorage.getItem('currencies');

    return currencies
      ? JSON.parse(currencies)[key]
      : '';
  };

}
