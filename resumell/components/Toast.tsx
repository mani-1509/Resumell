import React, { useEffect, useState } from 'react';

interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  type,
  message,
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 240);
  };

  const typeStyles = {
    success: {
      background: 'rgba(16, 185, 129, 0.15)',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      icon: '✓',
      iconColor: '#10B981',
    },
    error: {
      background: 'rgba(239, 68, 68, 0.15)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      icon: '✕',
      iconColor: '#EF4444',
    },
    warning: {
      background: 'rgba(245, 158, 11, 0.15)',
      border: '1px solid rgba(245, 158, 11, 0.3)',
      icon: '⚠',
      iconColor: '#F59E0B',
    },
    info: {
      background: 'rgba(99, 102, 241, 0.15)',
      border: '1px solid rgba(99, 102, 241, 0.3)',
      icon: 'ℹ',
      iconColor: '#6366F1',
    },
  };

  if (!isVisible) return null;

  const style = typeStyles[type];

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        minWidth: '300px',
        maxWidth: '500px',
        background: style.background,
        border: style.border,
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        zIndex: 9999,
        transform: isExiting ? 'translateX(120%)' : 'translateX(0)',
        opacity: isExiting ? 0 : 1,
        transition: 'all 240ms cubic-bezier(0.4, 0.0, 0.2, 1)',
      }}
    >
      <div
        style={{
          fontSize: '20px',
          color: style.iconColor,
          flexShrink: 0,
        }}
      >
        {style.icon}
      </div>
      <div style={{ flex: 1, color: '#FFFFFF', fontSize: '14px', lineHeight: '1.5' }}>
        {message}
      </div>
      <button
        onClick={handleClose}
        aria-label="Close notification"
        style={{
          background: 'transparent',
          border: 'none',
          color: '#A1A1AA',
          cursor: 'pointer',
          fontSize: '18px',
          padding: 0,
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  );
};
