import React from 'react';

interface SkeletonLoaderProps {
  variant: 'splash' | 'card' | 'text';
  width?: string;
  height?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant,
  width = '100%',
  height = 'auto',
}) => {
  const shimmerKeyframes = `
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
  `;

  const baseStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
    backgroundSize: '1000px 100%',
    animation: 'shimmer 2s infinite linear',
    borderRadius: '8px',
  };

  if (variant === 'splash') {
    return (
      <div style={{ width, height: height === 'auto' ? '400px' : height }}>
        <style>{shimmerKeyframes}</style>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', padding: '40px' }}>
          {/* Logo skeleton */}
          <div
            style={{
              ...baseStyle,
              width: '120px',
              height: '120px',
              borderRadius: '50%',
            }}
          />
          {/* Tagline skeleton */}
          <div
            style={{
              ...baseStyle,
              width: '300px',
              height: '32px',
            }}
          />
          {/* Subtitle skeleton */}
          <div
            style={{
              ...baseStyle,
              width: '400px',
              height: '20px',
            }}
          />
          {/* Button skeletons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <div style={{ ...baseStyle, width: '140px', height: '48px' }} />
            <div style={{ ...baseStyle, width: '100px', height: '48px' }} />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div style={{ width, height: height === 'auto' ? '200px' : height }}>
        <style>{shimmerKeyframes}</style>
        <div style={{ ...baseStyle, width: '100%', height: '100%', padding: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ ...baseStyle, width: '60%', height: '24px' }} />
            <div style={{ ...baseStyle, width: '90%', height: '16px' }} />
            <div style={{ ...baseStyle, width: '80%', height: '16px' }} />
            <div style={{ ...baseStyle, width: '40%', height: '36px', marginTop: '16px' }} />
          </div>
        </div>
      </div>
    );
  }

  // text variant
  return (
    <div style={{ width, height: height === 'auto' ? '20px' : height }}>
      <style>{shimmerKeyframes}</style>
      <div style={{ ...baseStyle, width: '100%', height: '100%' }} />
    </div>
  );
};
