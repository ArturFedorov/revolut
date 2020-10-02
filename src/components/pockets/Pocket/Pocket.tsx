import React, { Component } from 'react';
import Button from '../../common/Button/Button';
import noData from '../../../assets/icons/nodata.svg';
import PocketOperation from '../PocketOperation/PocketOperation';
import {IPocket} from '../../../shared/interfaces/IPocket';

class Pocket extends Component<{pocket: IPocket}, {}> {

  render() {
    return (
      <div className='pocket'>
        <div className='pocket-header'>
          <h2>{this.props.pocket.currency}</h2>
          <img
            src={require('../../../assets/icons/pound.svg')}
            alt='pound'/>
            <div className='pocket-devider'></div>
        </div>
        <div className='pocket-buttons'>
          <Button
            className='pocket-button'
            text={'Exchange'}
            iconName={'refresh'}/>
          <Button
            text={'Details'}
            iconName={'plus'}/>
        </div>
        <div className='pocket-content'>
          <h2 className='no-margin'>3456.56</h2>
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
