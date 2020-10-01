import {IConfiguration} from '../shared/interfaces/IConfiguration';

export const config: IConfiguration = {
  api: 'http://data.fixer.io/api/latest',
  currencyList: {
    bp: 'British Pound',
    eur: 'Euro',
    usd: 'US Dollar'
  }
}
