import React from 'react';

interface ErrorAction {
  label: string;
  onClick: () => void;
}

interface InlineErrorProps {
  message: string;
  variant?: 'error' | 'warning';
  actions?: ErrorAction[];
}

export const InlineError: React.FC<InlineErrorProps> = ({
  message,
  variant = 'error',
  actions = [],
}) => {
  const variantStyles = {
    error: {
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      icon: '✕',
      iconColor: '#EF4444',
    },
    warning: {
      background: 'rgba(245, 158, 11, 0.1)',
      border: '1px solid rgba(245, 158, 11, 0.3)',
      icon: '⚠',
      iconColor: '#F59E0B',
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        background: style.background,
        border: style.border,
        borderRadius: '8px',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        marginBottom: '16px',
      }}
    >
      <div
        style={{
          fontSize: '18px',
          color: style.iconColor,
          flexShrink: 0,
          marginTop: '2px',
        }}
      >
        {style.icon}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            color: '#FFFFFF',
            fontSize: '14px',
            lineHeight: '1.5',
            marginBottom: actions.length > 0 ? '12px' : 0,
          }}
        >
          {message}
        </div>
        {actions.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                style={{
                  padding: '6px 12px',
                  borderRadius: '4px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
