import React from 'react';
import close from '../../../assets/icons/close.svg';

interface IErrorMessageProps {
  text: string;
  isVisible: boolean;
  hideMessage: () => void
}

const ErrorMessage = (props: IErrorMessageProps) => {
  return (
    <div className={ `error ${props.isVisible ? 'is-visible' : ``}`}>
      <div className="error-text">
        <span>{props.text}</span>
      </div>
      <div
        className="error-close"
        onClick={props.hideMessage}>
        <img src={close} alt="close"/>
      </div>
    </div>
  )
}

export default ErrorMessage;
