import React, { Component } from 'react';
import PocketList from '../pockets/PocketList';
import {CurrencyService} from '../../api/CurrencyService';
import RateList from '../rates/RateList';

class HomeView extends Component<{}, {}> {
  componentDidMount() {
    CurrencyService.getCurrencyList();
  }

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
