import React from 'react';

interface IButtonProps {
  text: string;
  className?: string;
  iconName?: 'plus' | 'refresh' | 'refresh_black';
}

const Button = (props: IButtonProps) => {
  return (
    <a className={`button ${props.className}`}>
      {
        props.iconName ?
        (<img className='button-icon' src={require(`../../../assets/icons/${props.iconName}.svg`)}/>)
        : null
      }
      <span className='button-text'>{props.text}</span>
    </a>
  )
}

export default Button;
