import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Colors, Typography, BorderRadius, Spacing } from '../constants/theme';

export const ChipSelector = ({
  options,
  selected,
  multi = false,
  onChange,
  minSelection = 0,
  maxSelection,
}) => {
  const handleChipPress = (chipId) => {
    if (multi) {
      if (selected.includes(chipId)) {
        const newSelected = selected.filter(id => id !== chipId);
        if (newSelected.length >= minSelection) {
          onChange(newSelected);
        }
      } else {
        if (!maxSelection || selected.length < maxSelection) {
          onChange([...selected, chipId]);
        }
      }
    } else {
      onChange([chipId]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.chipsContainer}>
        {options.map((option) => {
          const isSelected = selected.includes(option.id);
          return (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.chip,
                isSelected && styles.chipSelected,
              ]}
              onPress={() => handleChipPress(option.id)}
              accessibilityRole={multi ? 'checkbox' : 'radio'}
              accessibilityState={{ checked: isSelected }}
            >
              {option.icon && <View style={styles.iconContainer}>{option.icon}</View>}
              <Text style={styles.chipText}>{option.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: Colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  chipSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  chipText: {
    fontSize: Typography.sizes.small,
    fontWeight: Typography.weights.semibold,
    color: Colors.text,
  },
  iconContainer: {
    marginRight: 4,
  },
});

export default ChipSelector;
