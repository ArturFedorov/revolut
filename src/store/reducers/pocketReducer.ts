import {SET_ACTIVE_POCKET, SET_EXCHANGE_CURRENCY, UPDATE_POCKET} from '../types/ActionTypes';
import {IPocket} from '../../shared/interfaces/IPocket';
import {config} from '../../config/config';
import {Currencies} from '../../shared/constants/Currencies';
import {OperationUtils} from '../../shared/utils/OperationUtils';

export interface IPocketAction {
  type: string;
  pocket: IPocket;
}

export interface IPocketState {
  pockets: IPocket[];
  activePocket?: IPocket;
  exchangeCurrency?: IPocket;
}

const pockets = localStorage.getItem('pockets');

const initialState: IPocketState = {
  pockets: pockets
      ? JSON.parse(pockets)
      : Object.keys(config.currencyList).map(currency => ({
        id: currency,
        balance: 0,
        currency: config.currencyList[currency],
        operations: currency === Currencies.USD ? [OperationUtils.setInitialDollarOperation()] : []
      }))
}


export const pocketReducer = (state = initialState, action: IPocketAction) => {
  switch (action.type) {
    case UPDATE_POCKET:
      const pocketIndex = state.pockets.findIndex(pocket => pocket.id === action.pocket.id);
      const newState = [...state.pockets].splice(pocketIndex, 1, action.pocket);
      return { ...state, pockets: newState };
    case SET_ACTIVE_POCKET:
      return {
        ...state,
        activePocket: action.pocket
      }
    case SET_EXCHANGE_CURRENCY:
      return {
        ...state,
        exchangeCurrency: action.pocket
      }
    default:
      return state;
  }
}
