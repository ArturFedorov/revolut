import React, { Component } from 'react';
import Pocket from './Pocket/Pocket';
import {IPocket} from '../../shared/interfaces/IPocket';
import {config} from '../../config/config';

class PocketList extends Component<{}, {}> {
  pockets: IPocket[] = Object.keys(config.currencyList)
    .map(currency => ({
      id: currency,
      currency: config.currencyList[currency],
      balance: 0,
      operations: [1,2,3].map(num => ({
        id: num,
        description: `Exchange ${num % 2 === 0 ? 'from' : 'to'} EUR`,
        time: `14:0${num}`,
        balance: `${num % 2 === 0 ? '+50' : '-50'} GBR`,
        balance2: `${num % 2 === 0 ? '+62.4' : '-62.4'} Eur`
      }))
    }));

  render() {
    return (
     <div className='pocket-list'>
       <h1>Currency pockets</h1>
       <div className='pocket-list-content'>
         { this.pockets.map(pocket => (
           <div key={pocket.id} className='pocket-list-item'>
             <Pocket pocket={pocket}/>
           </div>
         ))}
       </div>
     </div>
    )
  }
}

export default PocketList;
