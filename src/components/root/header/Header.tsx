import React from 'react';
import logo from  '../../../assets/icons/logo.svg';
import settings from '../../../assets/icons/settings.svg';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
      <img
        className='header-logo'
        src={logo}
        alt={'logo'}/>
        <Link
          className='header-setting'
          to='/settings'>
          <img src={settings} />
        </Link>
    </div>
  )
}

export default Header;
