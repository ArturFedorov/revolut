import {FETCH_CURRENCY_LIST, FETCH_RATES} from '../types/ActionTypes';
import {IRate} from '../../shared/interfaces/IRate';
import {CurrencyService} from '../../api/CurrencyService';
import {OperationUtils} from '../../shared/utils/OperationUtils';
import {ICurrency} from '../../shared/interfaces/ICurrency';

export interface IRateAction {
  type: string;
  rates?: IRate[];
}

export interface IRateState {
  rates: IRate[];
  currencies: ICurrency[];
  lastUpdated?: Date;
}

const initialState: IRateState = {
  rates: [],
  currencies: [],
  lastUpdated: new Date()
}


export const rateReducer = async (state = initialState, action: IRateAction) => {
  switch (action.type) {
    case FETCH_RATES:
      const response = await CurrencyService.getCurrencyList();
      return {
        ...state,
        rates: OperationUtils.combineRates(response.data.rates)
      };

    case FETCH_CURRENCY_LIST:
      const list = localStorage.getItem('currencies');

      if(list) {
        return {
          ...state,
          currencies: list
        }
      } else {
        const apiList = await CurrencyService.getAllCurrencies();
        localStorage.setItem('currencies', JSON.stringify(apiList.data));
        return {
          ...state,
          currencies: apiList.data
        };
      }
    default:
      return state;
  }
}
