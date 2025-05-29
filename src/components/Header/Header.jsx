import React from 'react';
import SidebarButton from '../SidebarButton/SidebarButton';
import './Header.css';

const Header = ({ sidebarOpen, onSidebarToggle, unviewedCount = 0 }) => {
  return (
    <header className="app-header">
      <div className="header-left">
        <SidebarButton
          variant="open"
          onClick={onSidebarToggle}
          showNotificationBadge={!sidebarOpen && unviewedCount > 0}
        />
      </div>
      
      <div className="header-center">
        <p className="app-subtitle">Turn ambition into action — instantly.</p>
      </div>
      
      <div className="header-right">
        {/* Space for future header actions */}
      </div>
    </header>
  );
};

export default Header;
