import React, { Component} from 'react';
import { connect } from 'react-redux';
import {IAppState} from '../../../store/reducers/rootReducer';
import refresh from '../../../assets/icons/refresh.svg';
import {IPocket} from '../../../shared/interfaces/IPocket';

export interface IFormProps {
  exchangeFrom: IPocket | undefined;
  exchangeTo: IPocket | undefined;
  exchangeRate: string | number | null;
};

interface IFormState {
  [key: string]: string;
}

class ExchangeForm extends Component<IFormProps, IFormState> {
  state: IFormState = {
    exchangeFrom: '',
    exchangeTo: ''
  }

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const key = (event.target as HTMLInputElement).id;
    const value = (event.target as HTMLInputElement).value;
    console.log(key);
    console.log(value);


    if(key === 'exchangeFrom') {
      console.log('penis');
      this.setState({
        exchangeTo: '12'
      });

      console.log(this.state);
    }
    console.log('value', value);
    this.validateInput(value);

    this.setState({
      [key]: value
    });


  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
  }

  validateInput = (value: string) => {
    console.log(value);
    console.log(this.state);
    console.log(this.props);
  }

  render() {
    return (
        <form className='exchange-form' onSubmit={this.handleSubmit}>
          <div className="exchange-wrapper">
            <label className="is-caption" htmlFor="exchangeFrom">
              Exchange from {this.props.exchangeFrom?.currency}
            </label>
            <input
              id="exchangeFrom"
              type="number"
              placeholder="Exchange from"
              className='exchange-input'
              onChange={this.handleChange}/>
          </div>
          <div className='exchange-buttons'>
            <button className='exchange-button'>
              <img src={refresh} alt="refresh"/>
              {this.props.exchangeRate ? (<span className="is-white">{this.props.exchangeRate}</span>) : null}
            </button>
          </div>
          <div className="exchange-wrapper">
            <label className="is-caption" htmlFor="exchangeTo">
              Exchange to {this.props.exchangeTo?.currency}
            </label>
            <input
              id="exchangeTo"
              type="number"
              value={this.state.exchangeTo}
              placeholder="Exchange to"
              className='exchange-input'
              onChange={this.handleChange}/>
          </div>
        </form>
    )
  }
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => {
  return {

  }
}

const mapStateToProps = (state: IAppState, ownProps: {}) => {
  return {
    exchangeFrom: state.pockets.activePocket,
    exchangeTo: state.pockets.exchangeCurrency
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeForm);
