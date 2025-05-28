import React from "react";
import { TbLayoutSidebar } from "react-icons/tb";
import Tooltip from "../Tooltip/Tooltip";
import success_logo from "../../assets/success_logo.png";
import "./Sidebar.css";

const Sidebar = ({ children, isOpen, onClose }) => {
  return (
    <aside className={`sidebar${isOpen ? "" : " collapsed"}`}>
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
            onClick={onClose}
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
  );
};

export default Sidebar;
