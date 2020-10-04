import React from 'react';
import {IRate} from '../../../shared/interfaces/IRate';
import Button from '../../common/Button/Button';

const Rate = ({rate}: {rate: IRate}) => {
  return (
    <div className='rate'>
      <div>
        <p className='no-margin'>{rate.baseCurrency}</p>
        <p className='no-margin is-secondary is-caption'>{rate.baseCurrencyName}</p>
      </div>
      <Button
        className='rate-button is-white'
        text={rate.rate.toString()}
        iconName={'refresh_black'}/>
      <div>
        <p className='no-margin'>{rate.exchangeCurrency}</p>
        <p className='no-margin is-secondary is-caption'>{rate.exchangeCurrencyName}</p>
      </div>
    </div>
  )
}

export default Rate;
