import {IConfiguration} from '../shared/interfaces/IConfiguration';

export const config: IConfiguration = {
  api: 'https://openexchangerates.org/api/latest.json',
  currencyList: {
    GBP: 'British Pound',
    EUR: 'Euro',
    USD: 'US Dollar'
  }
}
