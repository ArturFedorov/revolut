import React from 'react';
import {IRate} from '../../../shared/interfaces/IRate';
import Button from '../../common/Button/Button';
import {Link} from 'react-router-dom';

const Rate = ({rate}: {rate: IRate}) => {
  return (
    <div className='rate'>
      <div>
        <p className='no-margin'>{rate.baseCurrency}</p>
        <p className='no-margin is-secondary is-caption'>{rate.baseCurrencyName}</p>
      </div>
      <Link
        to={ {pathname: `/exchange/${rate.baseCurrency}/${rate.exchangeCurrency}`}}>
        <Button
          className='rate-button is-white'
          text={ rate.rate ? rate.rate.toFixed(4) : ''}
          iconName={'refresh_black'}/>
      </Link>
      <div>
        <p className='no-margin'>{rate.exchangeCurrency}</p>
        <p className='no-margin is-secondary is-caption'>{rate.exchangeCurrencyName}</p>
      </div>
    </div>
  )
}

export default Rate;
