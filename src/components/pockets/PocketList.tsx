import React, { Component } from 'react';
import Pocket from './Pocket/Pocket';
import { connect } from 'react-redux'
import {IPocketState} from '../../store/reducers/pocketReducer';

class PocketList extends Component<IPocketState, {}> {
  render() {
    return (
     <div className='pocket-list'>
       <h1>Currency pockets</h1>
       <div className='pocket-list-content'>
         { this.props.pockets.map(pocket => (
           <div key={pocket.id} className='pocket-list-item'>
             <Pocket pocket={pocket}/>
           </div>
         ))}
       </div>
     </div>
    )
  }
};

const mapStateToProps = (state: IPocketState, ownProps: {}) => {
  return { pockets: state.pockets };
}

export default connect(mapStateToProps) (PocketList);
