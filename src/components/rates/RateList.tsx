import React, {Component} from 'react';
import {IRate} from '../../shared/interfaces/IRate';
import Rate from './rate/Rate';
import {IRateAction} from '../../store/reducers/rateReducer';
import { connect } from 'react-redux';
import {FETCH_CURRENCY_LIST, FETCH_RATES} from '../../store/types/ActionTypes';
import {IAppState} from '../../store/reducers/rootReducer';
import {ICurrency} from '../../shared/interfaces/ICurrency';
import {CurrencyService} from '../../api/CurrencyService';
import {OperationUtils} from '../../shared/utils/OperationUtils';

interface IRateProps {
  rates: IRate[]
  currencies: ICurrency[],
  fetchList: () => void,
  fetchRates: () => void
}



class RateList extends Component<IRateProps, {rates: IRate[]}> {
  intevalId = 0;

  componentDidMount() {
    this.props.fetchList();
    this.pollRates();
    this.intevalId =  Number(setInterval(() => this.pollRates(), 60000));
  }

  componentWillUnmount() {
    clearInterval(this.intevalId);
  }

  pollRates() {
    CurrencyService.getCurrencyList()
      .then(response => {
        this.setState({rates: OperationUtils.combineRates(response.data.rates)});
      })
  }

  render() {
    return (
      <div className='rate-list'>
        <h1 className="rate-list-header">Exchange Rates</h1>
        <div className='rate-list-content'>
          {
            this.state
            ? (this.state.rates.map(rate => (
                <div key={rate.id} className='rate-list-item'>
                  <Rate rate={rate}/>
                </div>
              )))
            : (<p>No exchange rates</p>)
          }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: React.Dispatch<IRateAction>) => {
  return {
    fetchList: () => dispatch({type: FETCH_CURRENCY_LIST}),
    fetchRates: () => dispatch({ type: FETCH_RATES})
  }
}

const mapStateToProps = (state: IAppState, ownProps: {}) => {
  return {
    currencies: state.rates.currencies,
    rates: state.rates.rates
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RateList);
