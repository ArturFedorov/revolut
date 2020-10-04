import axios from 'axios';
import {ICurrency} from '../shared/interfaces/ICurrency';
import { config } from '../config/config';


const apiKey = process.env.REACT_APP_API_KEY;

export class CurrencyService {
  static getCurrencyList () {
    return axios.get<ICurrency[]>(config.api, {
      params: {
        app_id: apiKey,
        symbols: Object.keys(config.currencyList).join(',')
      }
    });
  };
}
