import React, { useState } from "react";
import { TbLayoutSidebarFilled, TbLayoutSidebar } from "react-icons/tb";
import Tooltip from "../Tooltip/Tooltip";
import NotificationBadge from "../NotificationBadge/NotificationBadge";
import success_logo from "../../assets/success_logo.png";
import "./Sidebar.css";

const Sidebar = ({ children, unviewedCount = 0, onOpen }) => {
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    const newOpenState = !open;
    setOpen(newOpenState);
    
    // Mark goals as viewed when opening sidebar
    if (newOpenState && unviewedCount > 0 && onOpen) {
      onOpen();
    }
  };

  return (
    <>
      {/* Floating toggle button when sidebar is closed */}
      {!open && (
        <div className="sidebar-toggle-floating">
          <Tooltip
            content="Open sidebar"
            position="right"
            noArrow={true}
            className="sidebar-tooltip-wrapper"
          >
            <div className="sidebar-toggle-wrapper">
              <button
                className="sidebar-open-btn"
                onClick={handleToggle}
                aria-label="Open sidebar"
              >
                <TbLayoutSidebarFilled className="sidebar-icon" />
              </button>
              <NotificationBadge show={unviewedCount > 0} />
            </div>
          </Tooltip>
        </div>
      )}

      <aside className={`sidebar${open ? "" : " collapsed"}`}>
        {/* Sidebar Header - always rendered but hidden via CSS when collapsed */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src={success_logo} alt="Logo" className="sidebar-logo-img" />
          </div>
          <Tooltip
            content="Close sidebar"
            position="bottom"
            noArrow={true}
          >
            <button
              className="sidebar-close-btn"
              onClick={handleToggle}
              aria-label="Close sidebar"
            >
              <TbLayoutSidebar className="sidebar-icon" />
            </button>
          </Tooltip>
        </div>
        
        <div className="sidebar-content">
          {children}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
