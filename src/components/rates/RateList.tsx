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
import ErrorMessage from '../common/ErrorMessage/ErrorMessage';

interface IRateProps {
  rates: IRate[]
  currencies: ICurrency[],
  fetchList: () => void,
  fetchRates: () => void
}



class RateList extends Component<IRateProps, {rates: IRate[], errorMessage: string}> {
  state = {
    rates: [] as IRate[],
    errorMessage: ''
  }

  intevalId = 0;

  componentDidMount() {
    this.props.fetchList();
    this.pollRates();
    this.intevalId =  Number(setInterval(() => this.pollRates(), 30000));
  }

  componentWillUnmount() {
    clearInterval(this.intevalId);
  }

  pollRates() {
    CurrencyService.getCurrencyList()
      .then(response => {
        this.setState({rates: OperationUtils.combineRates(response.data.rates)});
      }).catch(error => {
        const description = error.response.data.description
          ? error.response.data.description
          : error.message;

        this.setState({
          errorMessage: description
        })
    });
  }

  hideErrorMessage = () => this.setState({errorMessage: ''})

  render() {
    return (
      <div className='rate-list'>
        <ErrorMessage
          text={this.state.errorMessage}
          isVisible={Boolean(this.state.errorMessage)}
          hideMessage={this.hideErrorMessage}/>
        <h1 className="rate-list-header">Exchange Rates</h1>
        <div className='rate-list-content'>
          {
            this.state && this.state.rates
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

const mapStateToProps = (state: IAppState) => {
  return {
    currencies: state.rates.currencies,
    rates: state.rates.rates
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RateList);
