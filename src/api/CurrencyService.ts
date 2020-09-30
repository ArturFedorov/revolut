import axios from 'axios';
import {ICurrency} from '../shared/interfaces/ICurrency';

export class CurrencyService {
  static getCurrencyList () {
    return axios.get<ICurrency[]>('/spotify/login');
  };
}
