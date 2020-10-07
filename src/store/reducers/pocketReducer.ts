import {SET_ACTIVE_POCKET, SET_EXCHANGE_CURRENCY, UPDATE_POCKETS} from '../types/ActionTypes';
import {IPocket} from '../../shared/interfaces/IPocket';
import {config} from '../../config/config';
import {Currencies} from '../../shared/constants/Currencies';
import {OperationUtils} from '../../shared/utils/OperationUtils';

export interface IPocketAction {
  type: string;
  pocket: IPocket;
  secondPocket?: IPocket;
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
    case UPDATE_POCKETS:
      const parsed: IPocket[] = pockets ? JSON.parse(pockets) : [...state.pockets];
      const pocketIndex = parsed.findIndex(pocket => pocket.id === action.pocket.id);
      const secondPocketIndex = parsed.findIndex(pocket => pocket.id === action.secondPocket!.id)

      parsed[pocketIndex] = action.pocket;
      parsed[secondPocketIndex!] = action.secondPocket!;

      localStorage.setItem('pockets', JSON.stringify(parsed));

      return { ...state, pockets: parsed };
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
