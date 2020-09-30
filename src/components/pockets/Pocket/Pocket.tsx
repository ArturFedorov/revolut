import React, { Component } from 'react';

class Pocket extends Component<{}, {}> {
  render() {
    return (
      <div className={'pocket'}>
        <div className={'pocket-header'}>
          <h2>British Pound</h2>
          <img
            src={require('../../../assets/icons/pound.svg')}
            alt={'pound'}/>
        </div>
        <div className={'pocket-buttons'}></div>
        <div className={'pocket-content'}>
          as
        </div>
      </div>
    )
  }
}

export default Pocket;
