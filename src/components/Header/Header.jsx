import React from 'react';
import './Header.css';
import logo from '../../assets/success_logo.png';

const Header = () => {
  return (
    <header className="app-header" >
      <img src={logo} alt="Success Goals" className="app-logo" />
      <p className="app-subtitle">Turn ambition into action — instantly.</p>
    </header>
  );
};

export default Header;
