import React from 'react';
import { TbLayoutSidebarFilled, TbLayoutSidebar } from "react-icons/tb";
import Tooltip from "../Tooltip/Tooltip";
import NotificationBadge from "../NotificationBadge/NotificationBadge";
import './Header.css';
import logo from '../../assets/success_logo.png';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

const Header = ({ sidebarOpen, onSidebarToggle, unviewedCount = 0 }) => {
  return (
    <header className="app-header">
      <div className="header-left">
        <Tooltip
          content={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          position="bottom"
          noArrow={true}
        >
          <div className="sidebar-toggle-wrapper">
            <button
              className="sidebar-toggle-btn"
              onClick={onSidebarToggle}
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {sidebarOpen ? (
                <TbLayoutSidebar className="sidebar-icon" />
              ) : (
                <TbLayoutSidebarFilled className="sidebar-icon" />
              )}
            </button>
            <NotificationBadge show={!sidebarOpen && unviewedCount > 0} />
          </div>
        </Tooltip>
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
