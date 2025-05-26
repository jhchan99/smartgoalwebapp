import React, { useState } from "react";
import { TbLayoutSidebarFilled, TbLayoutSidebar } from "react-icons/tb";
import Tooltip from "../Tooltip/Tooltip";
import "./Sidebar.css";

const Sidebar = ({ children }) => {
  const [open, setOpen] = useState(true);

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
        <button
          className="sidebar-toggle"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? "Close sidebar" : "Open sidebar"}
        >
          {open ? <TbLayoutSidebarFilled className="sidebar-icon" /> : <TbLayoutSidebar className="sidebar-icon" />}
        </button>
      </Tooltip>
    </aside>
  );
};

export default Sidebar;
