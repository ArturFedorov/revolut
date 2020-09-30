import React from 'react';
import logo from  '../../../assets/icons/logo.svg';

const Header = () => {
  return (
    <div className={'header'}>
      <img
        className={'header-logo'}
        src={logo}
        alt={'logo'}/>
    </div>
  )
}

export default Header;
