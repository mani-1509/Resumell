import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  ariaLabel,
}) => {
  const baseStyles = {
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    fontFamily: 'Inter, system-ui, sans-serif',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 120ms cubic-bezier(0.4, 0.0, 0.2, 1)',
    border: 'none',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.5 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
      color: '#FFFFFF',
    },
    secondary: {
      background: 'rgba(255, 255, 255, 0.05)',
      color: '#FFFFFF',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    ghost: {
      background: 'transparent',
      color: '#A1A1AA',
    },
  };

  return (
    <button
      style={{ ...baseStyles, ...variantStyles[variant] }}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel || label}
      aria-busy={loading}
    >
      {loading && <span>⏳</span>}
      {label}
    </button>
  );
};
