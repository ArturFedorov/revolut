import React, { Component } from 'react';
import Pocket from './Pocket/Pocket';

class PocketList extends Component<{}, {}> {
  render() {
    return (
     <div className={'pocket-list'}>
       <h1>Currency pockets</h1>
       <div>
         <Pocket />
       </div>
     </div>
    )
  }
}

export default PocketList;
