import React from "react";
import SidebarButton from '../SidebarButton/SidebarButton';
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
        
        <SidebarButton
          variant="close"
          onClick={onClose}
        />
      </div>
      
      <div className="sidebar-content">
        {children}
      </div>
    </aside>
  );
};

export default Sidebar;
