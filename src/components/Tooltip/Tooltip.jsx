import React, { useState } from 'react';
import './Tooltip.css';

const Tooltip = ({ 
  children, 
  content, 
  position = 'top', 
  delay = 300,
  className = '',
  disabled = false,
  noArrow = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const showTooltip = () => {
    if (disabled) return;
    
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  if (!content) return children;

  return (
    <div 
      className={`tooltip-wrapper ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && (
        <div 
          className={`tooltip tooltip-${position} ${noArrow ? 'tooltip-no-arrow' : ''}`}
          role="tooltip"
          aria-hidden={!isVisible}
        >
          {content}
          {!noArrow && <div className="tooltip-arrow" />}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
