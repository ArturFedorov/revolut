import React, {Component} from 'react';
import {IRateState} from '../../store/reducers/rateReducer';
import {config} from '../../config/config';
import {IRate} from '../../shared/interfaces/IRate';
import Rate from './rate/Rate';

class RateList extends Component<{}, {}> {
  rates: IRate[] = Object.keys(config.currencyList).map(currency => ({
    exchangeCurrency: currency,
    exchangeCurrencyName: config.currencyList[currency],
    baseCurrency: currency,
    baseCurrencyName: config.currencyList[currency],
    rate: 1.2345
  }));

  render() {
    return (
      <div className='rate-list'>
        <h1>Exchange Rates</h1>
        <div className='rate-list-content'>
          { this.rates.map(rate => (
            <div key={rate.exchangeCurrency} className='rate-list-item'>
              <Rate rate={rate}/>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default RateList;
