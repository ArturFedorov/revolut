import {UPDATE_POCKET} from '../types/ActionTypes';
import {IPocket} from '../../shared/interfaces/IPocket';

interface IPocketAction {
  type: string;
  pocket: IPocket;
}

export const pocketReducer = (state: IPocket[], action: IPocketAction) => {
  switch (action.type) {
    case UPDATE_POCKET:
      const pocketIndex = state.findIndex(pocket => pocket.id === action.pocket.id);
      const newState = [...state].splice(pocketIndex, 1, action.pocket);
      return [newState];
    default:
      return state;
  }
}
