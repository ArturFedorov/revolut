import React, { Component } from 'react';
import PocketList from '../pockets/PocketList';
import {CurrencyService} from '../../api/CurrencyService';

class HomeView extends Component<{}, {}> {
  componentDidMount() {
    CurrencyService.getCurrencyList();
  }

  render() {
    return (
      <div className='home'>
        <PocketList />
      </div>
    )
  }
}

export default HomeView;
