import axios from 'axios';
import {ICurrency} from '../shared/interfaces/ICurrency';
import { config } from '../config/config';


const apiKey = process.env.REACT_APP_API_KEY;

export class CurrencyService {
  static getCurrencyList (base = 'EUR') {
    return axios.get<ICurrency[]>(config.api, {
      params: {
        app_id: apiKey,
        // base,
        symbols: Object.keys(config.currencyList).join(',')
      }
    });
  };
}
