import {UPDATE_POCKET} from '../types/ActionTypes';
import {IPocket} from '../../shared/interfaces/IPocket';
import {config} from '../../config/config';
import {Currencies} from '../../shared/constants/Currencies';

interface IPocketAction {
  type: string;
  pocket: IPocket;
}

export interface IPocketState {
  pockets: IPocket[];
}

const initialState: IPocketState = {
  pockets: Object.keys(config.currencyList).map(currency => ({
    id: currency,
    balance: 0,
    currency: config.currencyList[currency],
    operations: []
  }))
}


export const pocketReducer = (state = initialState, action: IPocketAction) => {
  switch (action.type) {
    case UPDATE_POCKET:
      const pocketIndex = state.pockets.findIndex(pocket => pocket.id === action.pocket.id);
      const newState = [...state.pockets].splice(pocketIndex, 1, action.pocket);
      return { ...state, pockets: newState };
    default:
      return state;
  }
}
