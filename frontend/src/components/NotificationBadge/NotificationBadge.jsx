import React from 'react';
import './NotificationBadge.css';

const NotificationBadge = ({ show = false, className = '' }) => {
  if (!show) return null;

  return (
    <div className={`notification-badge ${className}`} aria-label="New goals available">
    </div>
  );
};

export default NotificationBadge;
