import React, { useState, useRef, useEffect } from 'react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import './DropdownMenu.css';

const DropdownMenu = ({ options, trigger, className = '', position = 'bottom-right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option, e) => {
    e.stopPropagation();
    if (option.onClick) {
      option.onClick();
    }
    setIsOpen(false);
  };

  const defaultTrigger = (
    <button
      className="dropdown-trigger"
      onClick={handleToggle}
      aria-label="More options"
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      <DotsVerticalIcon className="dropdown-trigger-icon" />
    </button>
  );

  return (
    <div className={`dropdown-menu ${className}`} ref={dropdownRef}>
      <div ref={triggerRef}>
        {trigger ? (
          React.cloneElement(trigger, { onClick: handleToggle })
        ) : (
          defaultTrigger
        )}
      </div>
      
      {isOpen && (
        <div className={`dropdown-content dropdown-${position}`}>
          {options.map((option, index) => (
            <button
              key={index}
              className={`dropdown-option ${option.className || ''}`}
              onClick={(e) => handleOptionClick(option, e)}
              disabled={option.disabled}
            >
              {option.icon && <span className="dropdown-option-icon">{option.icon}</span>}
              <span className="dropdown-option-text">{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
