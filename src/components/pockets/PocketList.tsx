import React, { Component } from 'react';
import Pocket from './Pocket/Pocket';
import {IPocket} from '../../shared/interfaces/IPocket';

class PocketList extends Component<{}, {}> {
  pockets: IPocket[] = [{
    currency: 'British Pound',
    operations: [1,2,3].map(num => ({
      id: num,
      description: `Exchange ${num % 2 === 0 ? 'from' : 'to'} EUR`,
      time: `14:0${num}`,
      balance: `${num % 2 === 0 ? '+50' : '-50'} GBR`,
      balance2: `${num % 2 === 0 ? '+62.4' : '-62.4'} Eur`
    }))
  }, {
    currency: 'Euro',
    operations: []
  }];

  render() {
    return (
     <div className={'pocket-list'}>
       <h1>Currency pockets</h1>
       <div className={'pocket-list-content'}>
         <Pocket pocket={this.pockets[0]}/>
         <Pocket pocket={this.pockets[1]}/>
       </div>
     </div>
    )
  }
}

export default PocketList;
