import React, { useState, useEffect } from 'react';

const Notification = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Allow time for fade out animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return 'fas fa-check-circle';
      case 'error': return 'fas fa-exclamation-circle';
      case 'warning': return 'fas fa-exclamation-triangle';
      default: return 'fas fa-info-circle';
    }
  };

  return (
    <div className={`notification notification-${type} ${isVisible ? 'visible' : 'hidden'}`}>
      <i className={getIcon()}></i>
      <span>{message}</span>
      <button 
        className="notification-close"
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default Notification;