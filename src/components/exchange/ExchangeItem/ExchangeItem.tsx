import React from 'react';
import {IPocket} from '../../../shared/interfaces/IPocket';
import {OperationUtils} from '../../../shared/utils/OperationUtils';
import { connect } from 'react-redux';
import {IPocketAction} from '../../../store/reducers/pocketReducer';
import {SET_EXCHANGE_CURRENCY} from '../../../store/types/ActionTypes';

interface IExchangeItemProps {
  pocket: IPocket;
  isActive: boolean;
  setExchangeCurrency: (pocket: IPocket) => any
}

const ExchangeItem = (props: IExchangeItemProps) => {
  return (
    <div
      className={`exchange-item ${props.isActive ? 'is-active' : ''}`}
      onClick={ ()=> props.setExchangeCurrency(props.pocket)}>
      <span>{props.pocket.currency}</span>
      <span className="exchange-item-number is-bold">{OperationUtils.calculateBalance(props.pocket.operations).toFixed(2)}</span>
    </div>
  )
}

const mapDispatchToProps = (dispatch: React.Dispatch<IPocketAction>) => {
  return {
    setExchangeCurrency: (pocket: IPocket) => dispatch({type: SET_EXCHANGE_CURRENCY, pocket})
  }
}

export default connect(null, mapDispatchToProps) (ExchangeItem);
