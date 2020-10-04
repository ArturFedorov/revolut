import {FETCH_RATES} from '../types/ActionTypes';
import {IRate} from '../../shared/interfaces/IRate';
import {CurrencyService} from '../../api/CurrencyService';

interface IRateAction {
  type: string;
  rate: IRate[];
}

export interface IRateState {
  rates: IRate[];
}

const initialState: IRateState = {
  rates: []
}


export const rateReducer = (state = initialState, action: IRateAction) => {
  switch (action.type) {
    case FETCH_RATES:
      CurrencyService.getCurrencyList()
        .then()
      return state;
    default:
      return state;
  }
}
