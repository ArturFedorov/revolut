import {combineReducers} from 'redux';
import {IPocketState, pocketReducer} from './pocketReducer';
import {IRateState, rateReducer} from './rateReducer';

export interface IAppState {
  pockets: IPocketState;
  rates: IRateState;
}

export const rootReducer = combineReducers({
  pockets: pocketReducer,
  rates: rateReducer
});
