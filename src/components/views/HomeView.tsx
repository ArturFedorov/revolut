import React, { Component } from 'react';
import PocketList from '../pockets/PocketList';

class HomeView extends Component<{}, {}> {
  render() {
    return (
      <div className='home'>
        <PocketList />
      </div>
    )
  }
}

export default HomeView;
