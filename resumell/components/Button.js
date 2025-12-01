import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Colors, Typography, BorderRadius } from '../constants/theme';

export const Button = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  ariaLabel,
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondary;
      case 'ghost':
        return styles.ghost;
      default:
        return styles.primary;
    }
  };

  const getTextColor = () => {
    return variant === 'ghost' ? Colors.textSecondary : Colors.text;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyle(),
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onClick}
      disabled={disabled || loading}
      accessibilityLabel={ariaLabel || label}
      accessibilityRole="button"
    >
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={Colors.text} size="small" />
        </View>
      )}
      <Text style={[styles.text, { color: getTextColor() }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  loadingContainer: {
    marginRight: 8,
  },
  text: {
    fontSize: Typography.sizes.body,
    fontWeight: Typography.weights.semibold,
    fontFamily: Typography.fontFamily,
  },
});

export default Button;
