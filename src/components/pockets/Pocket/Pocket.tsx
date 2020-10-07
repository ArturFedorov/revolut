import React, { Component } from 'react';
import noData from '../../../assets/icons/nodata.svg';
import PocketOperation from '../PocketOperation/PocketOperation';
import {IPocket} from '../../../shared/interfaces/IPocket';
import pound from '../../../assets/icons/pound.svg';
import dollar from '../../../assets/icons/dollar.svg';
import euro from '../../../assets/icons/euro.svg';
import currency from '../../../assets/icons/currency.svg';
import {Currencies} from '../../../shared/constants/Currencies';
import {OperationUtils} from '../../../shared/utils/OperationUtils';


class Pocket extends Component<{pocket: IPocket}, {}> {
  logoIcon = (id: string) => {
    if (id === Currencies.GBP) {
      return pound;
    } else if (id === Currencies.EUR) {
      return euro;
    } else if (id===Currencies.USD) {
      return dollar;
    } else {
      return currency;
    }
  }

  render() {
    return (
      <div className='pocket'>
        <div className='pocket-header'>
          <h2>{this.props.pocket.currency}</h2>
          <img
            src={this.logoIcon(this.props.pocket.id)}
            alt='pound'/>
            <div className='pocket-devider'></div>
        </div>
        <div className='pocket-buttons'></div>
        <div className='pocket-content'>
          <h2 className='pocket-balance'>
            {OperationUtils.calculateBalance(this.props.pocket.operations).toFixed(2)}
          </h2>
          { this.props.pocket.operations.length ? (<p className='is-small'>Today</p>): null }
          {
            this.props.pocket.operations.length
              ? (this.props.pocket.operations.map(operation => (
                <PocketOperation key={operation.id} operation={operation}/>
              )))
              : (
                <div className='pocket-empty'>
                  <img src={noData} alt='nodata'/>
                  <p className='is-secondary'>No recent operations</p>
                </div>
              )
          }
        </div>
      </div>
    )
  }
}

export default Pocket;
