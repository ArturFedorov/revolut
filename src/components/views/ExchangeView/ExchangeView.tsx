import React, { Component } from 'react';
import { connect } from 'react-redux';
import {IAppState} from '../../../store/reducers/rootReducer';
import {IPocket} from '../../../shared/interfaces/IPocket';
import {IPocketAction} from '../../../store/reducers/pocketReducer';
import {SET_ACTIVE_POCKET, SET_EXCHANGE_CURRENCY} from '../../../store/types/ActionTypes';
import Pocket from '../../pockets/Pocket/Pocket';
import ExchangeItem from '../../exchange/ExchangeItem/ExchangeItem';
import {IRateAction} from '../../../store/reducers/rateReducer';
import {CurrencyService} from '../../../api/CurrencyService';
import {OperationUtils} from '../../../shared/utils/OperationUtils';
import ExchangeForm from '../../exchange/ExchnageForm/ExchangeForm';

interface IExchangeState {
  activePocket: IPocket | undefined;
  exchangeCurrency?: IPocket | undefined;
  pockets: IPocket[];
  setActivePocket: (pocket: IPocket) => void;
  setExchangeCurrency: (pocket: IPocket) => void;
  fetchRates: () => void;
  match: {
    params: {
      currency: string
    }
  }
}

class ExchangeView extends Component<IExchangeState, { exchangeRate: string | number | null}> {
  otherRates: IPocket[] = [];
  componentDidMount() {
    const currency = this.props.match.params.currency;
    const activePocket = this.props.pockets.find(pocket => pocket.id === currency);

    if(activePocket) {
      this.props.setActivePocket(activePocket);
      this.otherRates = this.props.pockets.filter((pocket: IPocket) => pocket.id !== activePocket.id);

      if(this.otherRates.length) {
        this.props.setExchangeCurrency(this.otherRates[0]);

        // select rate for pair
        CurrencyService.getCurrencyList()
          .then(response => {
            const exchangeRate = OperationUtils.combineRates(response.data.rates)
              .find(rate => rate.baseCurrency === activePocket.id && rate.exchangeCurrency === this.otherRates[0].id);
            //this.setState();

            this.setState({exchangeRate: exchangeRate ? exchangeRate.rate : null});
          })
      }
    }
  }

  isTabActive(pocket: IPocket) {
    if (!this.props.exchangeCurrency) return false;
    return this.props.exchangeCurrency.id === pocket.id;
  }

  render() {
    return (
      <div className='exchange'>
        <div className='exchange-active'>
          {
            this.props.activePocket
              ? (<Pocket pocket={this.props.activePocket} />)
              : null
          }
        </div>
        { this.state
          ? <ExchangeForm
              exchangeRate={this.state.exchangeRate}
              />
          : null}
        <div className="exchange-rates">
          {
            this.otherRates.map(pocket => (
            <ExchangeItem
              key={pocket.id}
              isActive={this.isTabActive(pocket)}
              pocket={pocket} />)
            )
          }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: React.Dispatch<IPocketAction | IRateAction>) => {
  return {
    setActivePocket: (pocket: IPocket) => dispatch({type: SET_ACTIVE_POCKET, pocket}),
    setExchangeCurrency: (pocket: IPocket) => dispatch({type: SET_EXCHANGE_CURRENCY, pocket}),
  }
}

const mapStateToProps = (state: IAppState, ownProps: {}) => {
  return {
    activePocket: state.pockets.activePocket,
    exchangeCurrency: state.pockets.exchangeCurrency,
    pockets: state.pockets.pockets
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeView);
