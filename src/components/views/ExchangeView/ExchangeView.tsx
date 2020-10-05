import React, { Component } from 'react';
import { connect } from 'react-redux';
import {IAppState} from '../../../store/reducers/rootReducer';
import {IPocket} from '../../../shared/interfaces/IPocket';
import {IPocketAction} from '../../../store/reducers/pocketReducer';
import {SET_ACTIVE_POCKET, SET_EXCHANGE_CURRENCY} from '../../../store/types/ActionTypes';
import Pocket from '../../pockets/Pocket/Pocket';
import refresh from '../../../assets/icons/refresh.svg';
import ExchangeItem from '../../exchange/ExchangeItem/ExchangeItem';

interface IExchangeState {
  activePocket: IPocket | undefined;
  exchangeCurrency?: IPocket | undefined;
  pockets: IPocket[];
  match: {
    params: {
      currency: string
    }
  },
  setActivePocket: (pocket: IPocket) => void,
  setExchangeCurrency: (pocket: IPocket) => void
}

class ExchangeView extends Component<IExchangeState, {}> {
  otherRates: IPocket[] = [];
  componentDidMount() {
    const currency = this.props.match.params.currency;
    const activePocket = this.props.pockets.find(pocket => pocket.id === currency);

    if(activePocket) {
      this.props.setActivePocket(activePocket);
      this.otherRates = this.props.pockets.filter((pocket: IPocket) => pocket.id !== activePocket.id);

      if(this.otherRates.length) {
        this.props.setExchangeCurrency(this.otherRates[0]);
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
        <div className='exchange-form'>
          <div className="exchange-wrapper">
            <label className="is-caption" htmlFor="source">
              Exchange from {this.props.activePocket?.currency}
            </label>
            <input
              id="source"
              type="number"
              placeholder="Exchange from"
              className='exchange-input'/>
          </div>
          <div className='exchange-buttons'>
            <button className='exchange-button'>
              <img src={refresh} alt="refresh"/>
            </button>
          </div>
          <div className="exchange-wrapper">
            <label className="is-caption" htmlFor="aim">
              Exchange to
            </label>
            <input
              id="aim"
              type="number"
              placeholder="Exchange to"
              className='exchange-input'/>
          </div>
        </div>
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

const mapDispatchToProps = (dispatch: React.Dispatch<IPocketAction>) => {
  return {
    setActivePocket: (pocket: IPocket) => dispatch({type: SET_ACTIVE_POCKET, pocket}),
    setExchangeCurrency: (pocket: IPocket) => dispatch({type: SET_EXCHANGE_CURRENCY, pocket})
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
