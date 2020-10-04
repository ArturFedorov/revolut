import React from 'react';
import refresh from '../../../assets/icons/refresh.svg';
import {IOperation} from '../../../shared/interfaces/IOperation';

const PocketOperation = ({operation}: {operation: IOperation}) => {
  return (
    <div className={'pocket-operation'}>
      <div className={'pocket-operation-round'}>
        <img src={refresh} alt={'refresh'}/>
      </div>
      <div className={'pocket-operation-info'}>
        <div className={'pocket-operation-balance'}>
          <p className={'no-margin'}>{operation.description}</p>
          <p className={'no-margin'}>
            <span>{operation.isDeduction ? '–' : '+'} </span>
            <span>{operation.sumFrom.toFixed(2)}</span>
            <span className='is-tiny'> {operation.currency}</span>
          </p>
        </div>
        <div className={'pocket-operation-balance'}>
          <p className={'no-margin'}>
            <span className='is-caption is-secondary'>
              {operation.date.toLocaleTimeString()}
            </span>
          </p>
          <p className={'no-margin'}>
            <span>{operation.isDeduction ? '+' : '-'} </span>
            <span className='is-caption is-blue'>{operation.sumTo.toFixed(2)}</span>
            <span className='is-tiny is-blue'> {operation.exchangeCurrency}</span>
          </p >
        </div>
      </div>
    </div>
  )
}

export default PocketOperation;
