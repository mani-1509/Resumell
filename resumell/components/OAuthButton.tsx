import React, { useState } from 'react';

interface OAuthButtonProps {
  provider: 'google' | 'linkedin';
  onSuccess: (token: string) => void;
  onError: (error: Error) => void;
  label?: string;
  icon?: React.ReactNode;
}

export const OAuthButton: React.FC<OAuthButtonProps> = ({
  provider,
  onSuccess,
  onError,
  label,
  icon,
}) => {
  const [loading, setLoading] = useState(false);

  const handleOAuthClick = async () => {
    setLoading(true);
    try {
      // Simulate OAuth flow - replace with actual implementation
      // window.open(`/auth/${provider}`, '_blank', 'width=600,height=700');
      
      // Mock success after 1s
      setTimeout(() => {
        const mockToken = `${provider}_token_${Date.now()}`;
        onSuccess(mockToken);
        setLoading(false);
      }, 1000);
    } catch (error) {
      onError(error as Error);
      setLoading(false);
    }
  };

  const providerStyles = {
    google: {
      background: '#FFFFFF',
      color: '#1F1F1F',
    },
    linkedin: {
      background: '#0A66C2',
      color: '#FFFFFF',
    },
  };

  const defaultLabel = provider === 'google' ? 'Continue with Google' : 'Continue with LinkedIn';

  return (
    <button
      onClick={handleOAuthClick}
      disabled={loading}
      aria-label={label || defaultLabel}
      style={{
        width: '100%',
        padding: '12px 24px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: 600,
        border: 'none',
        cursor: loading ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        transition: 'transform 120ms ease',
        ...providerStyles[provider],
      }}
    >
      {icon}
      {loading ? 'Connecting...' : (label || defaultLabel)}
    </button>
  );
};
