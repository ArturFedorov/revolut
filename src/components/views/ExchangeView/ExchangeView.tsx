import React, { Component } from 'react';
import { connect } from 'react-redux';
import {IAppState} from '../../../store/reducers/rootReducer';
import {IPocket} from '../../../shared/interfaces/IPocket';
import {IPocketAction} from '../../../store/reducers/pocketReducer';
import {SET_ACTIVE_POCKET, SET_EXCHANGE_CURRENCY} from '../../../store/types/ActionTypes';
import Pocket from '../../pockets/Pocket/Pocket';
import {IRateAction} from '../../../store/reducers/rateReducer';
import {CurrencyService} from '../../../api/CurrencyService';
import {OperationUtils} from '../../../shared/utils/OperationUtils';
import ExchangeForm from '../../exchange/ExchnageForm/ExchangeForm';
import {IRate} from '../../../shared/interfaces/IRate';
import RateList from '../../rates/RateList';

interface IExchangeState {
  activePocket: IPocket | undefined;
  exchangeCurrency?: IPocket | undefined;
  pockets: IPocket[];
  setActivePocket: (pocket: IPocket) => void;
  setExchangeCurrency: (pocket: IPocket) => void;
  fetchRates: () => void;
  match: {
    params: {
      currency: string,
      exchangeCurrency: string
    }
  }
}

class ExchangeView extends Component<IExchangeState, { exchangeRate: number | null, rates: IRate[] }> {
  otherRate = {} as IPocket | undefined;

  componentDidUpdate(prevProps: Readonly<IExchangeState>, prevState: Readonly<{ exchangeRate: number | null; rates: IRate[] }>, snapshot?: any) {
    console.log('updated');
    if(prevProps.activePocket?.id !== this.props.activePocket?.id
      || prevProps.exchangeCurrency?.id !==this.props.exchangeCurrency?.id) {
      this.setPockets();
    }
  }

  componentDidMount() {
    this.setPockets();
  }

  setPockets = () => {
    const { currency, exchangeCurrency} = this.props.match.params;
    const activePocket = this.props.pockets.find(pocket => pocket.id === currency);

    if(activePocket) {
      this.props.setActivePocket(activePocket);
      this.otherRate = this.props.pockets.find((pocket: IPocket) => pocket.id === exchangeCurrency);

      if(this.otherRate) {
        this.props.setExchangeCurrency(this.otherRate);

        // select rate for pair
        CurrencyService.getCurrencyList()
          .then(response => {
            const rates = OperationUtils.combineRates(response.data.rates);
            const exchangeRate = rates
              .find(rate => rate.baseCurrency === activePocket.id && rate.exchangeCurrency === exchangeCurrency);
            this.setState({
              exchangeRate: exchangeRate ? exchangeRate.rate : null,
              rates
            });
          })
      }
    }
  }

  isTabActive = (pocket: IPocket) => {
    if (!this.props.exchangeCurrency) return false;
    return this.props.exchangeCurrency.id === pocket.id;
  }

  render() {
    return (
      <div className='exchange'>
        <div className="exchange-content">
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
            : <div className="exchange-loading">Rate is loading...</div>}
          <div className='exchange-other'>
            {
              this.props.exchangeCurrency
                ? (<Pocket pocket={this.props.exchangeCurrency!} />)
                : null
            }
          </div>
        </div>
        <div className="exchange-rates">
          <RateList />
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
