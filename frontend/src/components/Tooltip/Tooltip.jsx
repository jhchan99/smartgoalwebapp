import React, { useState, useEffect } from 'react';
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

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const showTooltip = () => {
    if (disabled) return;
    
    // Clear any existing timeout first
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
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

  // Hide tooltip immediately on any interaction that should dismiss it
  const handleInteraction = (e) => {
    // Only hide on actual user interactions, not programmatic events
    if (e.isTrusted) {
      hideTooltip();
    }
  };

  if (!content) return children;

  return (
    <div 
      className={`tooltip-wrapper ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      onMouseDown={handleInteraction}
      onClick={handleInteraction}
    >
      {children}
      {isVisible && (
        <div 
          className={`tooltip tooltip-${position}`}
          role="tooltip"
          aria-hidden={!isVisible}
        >
          {content}
          {!noArrow && <div className="tooltip-arrow"/>}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
