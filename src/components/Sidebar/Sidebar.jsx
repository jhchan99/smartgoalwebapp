import React, { useState, useEffect } from "react";
import { TbLayoutSidebarFilled, TbLayoutSidebar } from "react-icons/tb";
import Tooltip from "../Tooltip/Tooltip";
import NotificationBadge from "../NotificationBadge/NotificationBadge";
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
    <aside className={`sidebar${open ? "" : " collapsed"}`}>
      <div className="sidebar-content">
        {open && children}
      </div>
      <Tooltip 
        key={open ? "bottom" : "right"}
        content={open ? "Close sidebar" : "Open sidebar"}
        position={open ? "bottom" : "right"}
        noArrow={true}
        className="sidebar-tooltip-wrapper"
      >
        <div className="sidebar-toggle-wrapper">
          <button
            className="sidebar-toggle"
            onClick={handleToggle}
            aria-label={open ? "Close sidebar" : "Open sidebar"}
          >
            {open ? <TbLayoutSidebarFilled className="sidebar-icon" /> : <TbLayoutSidebar className="sidebar-icon" />}
          </button>
          <NotificationBadge show={!open && unviewedCount > 0} />
        </div>
      </Tooltip>
    </aside>
  );
};

export default Sidebar;
