// Resumell Design Tokens
// Based on onboarding-spec.json design system

export const Colors = {
  primary: '#6366F1',
  accent: '#8B5CF6',
  accentGradient: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
  background: '#0F0F1A',
  surface: 'rgba(255, 255, 255, 0.05)',
  surfaceHover: 'rgba(255, 255, 255, 0.08)',
  text: '#FFFFFF',
  textSecondary: '#A1A1AA',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
};

export const Typography = {
  fontFamily: 'Inter, system-ui, sans-serif',
  weights: {
    regular: '400',
    semibold: '600',
  },
  sizes: {
    h1: 28,
    h2: 24,
    h3: 20,
    body: 16,
    small: 14,
    tiny: 12,
  },
};

export const Spacing = {
  base: 4,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 40,
  xxxxl: 48,
  xxxxxl: 64,
};

export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const Animation = {
  microDuration: 120,
  transitionDuration: 400,
  easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
};

export const Breakpoints = {
  mobile: 480,
  tablet: 1024,
};

export default {
  Colors,
  Typography,
  Spacing,
  BorderRadius,
  Animation,
  Breakpoints,
};
