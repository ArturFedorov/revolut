import axios from 'axios';
import {ICurrency} from '../shared/interfaces/ICurrency';

//access_key=7bafbce6fde2b4f7e992517234f3c387&symbols=USD,GBP,EUR&format=1
const apiKey = process.env.REA

export class CurrencyService {
  static getCurrencyList () {
    return axios.get<ICurrency[]>('/spotify/login');
  };
}
