import React, { Component} from 'react';
import { connect } from 'react-redux';
import {IAppState} from '../../../store/reducers/rootReducer';
import refresh from '../../../assets/icons/refresh.svg';
import {IPocket} from '../../../shared/interfaces/IPocket';
import {OperationUtils} from '../../../shared/utils/OperationUtils';
import {IPocketAction} from '../../../store/reducers/pocketReducer';
import {UPDATE_POCKETS} from '../../../store/types/ActionTypes';

export interface IFormProps {
  exchangeFrom: IPocket | undefined;
  exchangeTo: IPocket | undefined;
  exchangeRate: number | null;
  updatePockets: (exchangeFrom: IPocket, exchangeTo: IPocket) => void
}

interface IFormState {
  [key: string]: number | string | undefined | boolean;
  exchangeFrom: string | number;
  exchangeTo: string | number;
  errorMessage: string;
  balance: number;
  isValid: boolean;
}

class ExchangeForm extends Component<IFormProps, IFormState> {
  state: IFormState = {
    exchangeFrom: '',
    exchangeTo: '',
    errorMessage: '',
    balance: OperationUtils.calculateBalance(this.props.exchangeFrom!.operations),
    isValid: false
  }

  componentDidUpdate(prevProps: Readonly<IFormProps>, prevState: Readonly<IFormState>, snapshot?: any) {
    if(prevProps.exchangeFrom?.id !== this.props.exchangeFrom?.id ||
      prevProps.exchangeTo?.id !== this.props.exchangeTo!.id) {
      this.resetState();
    }
  }

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const key = (event.target as HTMLInputElement).id;
    const value = (event.target as HTMLInputElement).value;

    if(value) {
      if(key === 'exchangeFrom') {
        this.setState({
          exchangeTo: this.convertCurrency(parseFloat(value))
        });
      } else {
        this.setState({
          exchangeFrom: this.convertCurrency(parseFloat(value), true)
        })
      }

      this.setState({
        [key]: parseFloat(value)
      });

      this.valueIsValid(value);
    } else {
      this.resetState();
    }
  }

  resetState = () => this.setState({
    exchangeFrom: '',
    exchangeTo: '',
    errorMessage: '',
    balance: OperationUtils.calculateBalance(this.props.exchangeFrom!.operations),
    isValid: false
  })

  handleClick = () => {
    if(this.state.isValid) {

      // deduction
      this.props.exchangeFrom?.operations.push(OperationUtils.createOperation(
        this.props.exchangeFrom?.id,
        this.props.exchangeTo!.id,
        this.props.exchangeRate!,
        parseFloat(this.state.exchangeFrom.toString()),
        parseFloat(this.state.exchangeTo.toString()),
        true
      ));

      // addition

      this.props.exchangeTo?.operations.push(OperationUtils.createOperation(
        this.props.exchangeTo!.id,
        this.props.exchangeFrom!.id,
        this.props.exchangeRate!,
        parseFloat(this.state.exchangeTo.toString()),
        parseFloat(this.state.exchangeFrom.toString()),
        false
      ));

      this.props.updatePockets(this.props.exchangeFrom!, this.props.exchangeTo!);

      this.resetState();
    }
  }

  convertCurrency(value: number, devide = false) {
    if(!this.props.exchangeRate) return 0;
    if(devide) {
      return value * this.props.exchangeRate;
    }

    return value / this.props.exchangeRate;
  }

  valueIsValid = (value: string) => {
    if(!this.isValueNumeric(value)) {
      this.setState({
        errorMessage: 'Please input a Number',
        isValid: false
      });

      return false;
    }

    if(parseFloat(value) > this.state.balance!) {
      this.setState({
        errorMessage: 'Not sufficient funds in pocket',
        isValid: false
      });

      return false;
    }


    this.setState({
      errorMessage: '',
      isValid: true
    });

    return true;
  }

  isValueNumeric = (value: string) => !isNaN(parseFloat(value));

  render() {
    return (
        <div className='exchange-form'>
          <div className="exchange-wrapper">
            <label className="is-caption" htmlFor="exchangeFrom">
              Exchange from {this.props.exchangeFrom?.currency}
            </label>
            <input
              id="exchangeFrom"
              type="number"
              placeholder="Exchange from"
              value={this.state.exchangeFrom}
              className='exchange-input'
              onChange={this.handleChange}/>

            {
              this.state.errorMessage
                ? (
                  <div className="exchange-error">
                    <p className="exchange-error-message">{this.state.errorMessage}</p>
                  </div>
                ) : null
            }
          </div>
          <div className='exchange-buttons'>
            <button
              disabled={!this.state.isValid}
              className='exchange-button'
              onClick={this.handleClick}>
              <img src={refresh} alt="refresh"/>
              {this.props.exchangeRate ? (<span className="is-white">{this.props.exchangeRate.toFixed(4)}</span>) : null}
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
              placeholder={`Exchange to ${this.props.exchangeTo?.currency}`}
              className='exchange-input'
              onChange={this.handleChange}/>
          </div>
        </div>

    )
  }
}

const mapDispatchToProps = (dispatch: React.Dispatch<IPocketAction>) => {
  return {
    updatePockets: (exchangeFrom: IPocket, exchangeTo: IPocket) =>
      dispatch({
        type: UPDATE_POCKETS,
        pocket: exchangeFrom,
        secondPocket: exchangeTo
      })
  }
}

const mapStateToProps = (state: IAppState) => {
  return {
    exchangeFrom: state.pockets.activePocket,
    exchangeTo: state.pockets.exchangeCurrency
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeForm);
