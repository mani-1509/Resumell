import React, { useEffect, useRef } from 'react';

interface ModalAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

interface ModalProps {
  title?: string;
  content: React.ReactNode;
  actions?: ModalAction[];
  onClose?: () => void;
  isOpen?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  content,
  actions = [],
  onClose,
  isOpen = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    // Focus trap
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements && focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '24px',
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Modal content */}
      <div
        ref={modalRef}
        style={{
          position: 'relative',
          background: 'rgba(15, 15, 26, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          maxWidth: '560px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '32px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        }}
      >
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'transparent',
              border: 'none',
              color: '#A1A1AA',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '4px',
              lineHeight: 1,
            }}
          >
            ×
          </button>
        )}

        {/* Title */}
        {title && (
          <h2
            id="modal-title"
            style={{
              color: '#FFFFFF',
              fontSize: '24px',
              fontWeight: 600,
              marginBottom: '16px',
              marginTop: 0,
            }}
          >
            {title}
          </h2>
        )}

        {/* Content */}
        <div style={{ marginBottom: actions.length > 0 ? '24px' : 0 }}>
          {content}
        </div>

        {/* Actions */}
        {actions.length > 0 && (
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  background:
                    action.variant === 'primary'
                      ? 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)'
                      : 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '16px',
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
