import axios from 'axios';
import { config } from '../config/config';
import {IRateResponse} from '../shared/interfaces/IRate';


const apiKey = process.env.REACT_APP_API_KEY;

export class CurrencyService {
  static getCurrencyList () {
    return axios.get<IRateResponse>(`${config.api}latest.json`, {
      params: {
        app_id: apiKey,
        symbols: Object.keys(config.currencyList).join(',')
      }
    });
  };

  static getAllCurrencies() {
    return axios.get<{[key: string]: string}[]>(`${config.api}currencies.json`)
  }
}
