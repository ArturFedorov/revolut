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
          <p className={'no-margin'}>{operation.balance}</p>
        </div>
        <div className={'pocket-operation-balance'}>
          <p className={'no-margin is-caption is-secondary'}>{operation.time}</p>
          <p className={'no-margin is-caption is-blue'}>{operation.balance2}</p >
        </div>
      </div>
    </div>
  )
}

export default PocketOperation;
