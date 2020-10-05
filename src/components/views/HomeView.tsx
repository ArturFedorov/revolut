import React, { Component } from 'react';
import PocketList from '../pockets/PocketList';
import RateList from '../rates/RateList';

class HomeView extends Component<{}, {}> {
  render() {
    return (
      <div className='home'>
        <PocketList />
        <RateList />
      </div>
    )
  }
}


export default HomeView;
