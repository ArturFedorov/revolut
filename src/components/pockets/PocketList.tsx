import React, { Component } from 'react';
import Pocket from './Pocket/Pocket';
import { connect } from 'react-redux';
import {IPocketState} from '../../store/reducers/pocketReducer';
import {IAppState} from '../../store/reducers/rootReducer';

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

const mapStateToProps = (state: IAppState, ownProps: {}) => {
  return { pockets: state.pockets.pockets};
}

export default connect(mapStateToProps) (PocketList);
