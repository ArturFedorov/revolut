import React from 'react';

interface IButtonProps {
  text: string;
  className?: string;
  iconName?: 'plus' | 'refresh' | 'refresh_black';
  onClick?: void
}

const Button = (props: IButtonProps) => {
  return (
    <div className={`button ${props.className}`}>
      {
        props.iconName ?
        (<img
          className='button-icon'
          src={require(`../../../assets/icons/${props.iconName}.svg`)}
          alt="button" />)
        : null
      }
      <span className='button-text'>{props.text}</span>
    </div>
  )
}

export default Button;
