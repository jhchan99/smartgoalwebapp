import React from 'react';
import { TbLayoutSidebarFilled, TbLayoutSidebar } from "react-icons/tb";
import Tooltip from "../Tooltip/Tooltip";
import NotificationBadge from "../NotificationBadge/NotificationBadge";
import './SidebarButton.css';

const SidebarButton = ({ 
  variant = 'open', // 'open' or 'close'
  onClick,
  showNotificationBadge = false,
  className = '',
  disabled = false
}) => {
  const isOpenButton = variant === 'open';
  const Icon = isOpenButton ? TbLayoutSidebarFilled : TbLayoutSidebar;
  const tooltipContent = isOpenButton ? "Open sidebar" : "Close sidebar";
  const ariaLabel = isOpenButton ? "Open sidebar" : "Close sidebar";

  return (
    <Tooltip
      content={tooltipContent}
      position={isOpenButton ? "right" : "bottom"}
      noArrow={true}
    >
      <div className={`sidebar-button-wrapper ${className}`}>
        <button
          className={`sidebar-button sidebar-button--${variant}`}
          onClick={onClick}
          aria-label={ariaLabel}
          disabled={disabled}
        >
          <Icon className="sidebar-button__icon" />
        </button>
        {showNotificationBadge && (
          <NotificationBadge show={showNotificationBadge} />
        )}
      </div>
    </Tooltip>
  );
};

export default SidebarButton;
