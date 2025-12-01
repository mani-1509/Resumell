import React from 'react';

interface CardAction {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

interface ProgressCardProps {
  title: string;
  description?: string;
  percent?: number;
  actions?: CardAction[];
  completed?: boolean;
  icon?: React.ReactNode;
  badge?: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  description,
  percent = 0,
  actions = [],
  completed = false,
  icon,
  badge,
}) => {
  return (
    <div
      style={{
        background: completed
          ? 'rgba(16, 185, 129, 0.1)'
          : 'rgba(255, 255, 255, 0.05)',
        border: `1px solid ${completed ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
        borderRadius: '12px',
        padding: '24px',
        transition: 'all 240ms ease',
        position: 'relative',
      }}
    >
      {/* Badge */}
      {badge && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '4px 8px',
            borderRadius: '4px',
            background: 'rgba(99, 102, 241, 0.2)',
            color: '#6366F1',
            fontSize: '12px',
            fontWeight: 600,
          }}
        >
          {badge}
        </div>
      )}

      {/* Icon and header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
        {icon && (
          <div style={{ fontSize: '24px', opacity: completed ? 0.6 : 1 }}>
            {completed ? '✓' : icon}
          </div>
        )}
        <div style={{ flex: 1 }}>
          <h3
            style={{
              color: '#FFFFFF',
              fontSize: '18px',
              fontWeight: 600,
              marginBottom: '8px',
              textDecoration: completed ? 'line-through' : 'none',
              opacity: completed ? 0.7 : 1,
            }}
          >
            {title}
          </h3>
          {description && (
            <p
              style={{
                color: '#A1A1AA',
                fontSize: '14px',
                lineHeight: '1.5',
                margin: 0,
              }}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {percent > 0 && !completed && (
        <div
          style={{
            width: '100%',
            height: '6px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '3px',
            marginBottom: '16px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${percent}%`,
              height: '100%',
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
              transition: 'width 400ms ease',
            }}
          />
        </div>
      )}

      {/* Actions */}
      {actions.length > 0 && !completed && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              disabled={action.disabled}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                background: index === 0
                  ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'
                  : 'rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
                cursor: action.disabled ? 'not-allowed' : 'pointer',
                opacity: action.disabled ? 0.5 : 1,
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* Completed state */}
      {completed && (
        <div
          style={{
            color: '#10B981',
            fontSize: '14px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          ✓ Completed
        </div>
      )}
    </div>
  );
};
