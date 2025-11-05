import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { Filter } from '../../types';

/**
 * Date Range Filter Component
 *
 * HOW TO CUSTOMIZE FOR AI AGENTS:
 * 1. This is a placeholder implementation
 * 2. To add a real date picker:
 *    - Install: npm install react-native-date-picker
 *    - Or use: @react-native-community/datetimepicker
 *    - Replace the placeholder with actual date picker components
 * 3. The component already handles state management via Zustand
 */

interface DateRangeFilterProps {
  filter: Filter;
  value: { start: string; end: string };
  onChange: (value: { start: string; end: string }) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  filter,
  value,
  onChange,
}) => {
  const handlePresetSelect = (preset: any) => {
    const now = new Date();
    let start: Date;
    let end: Date = now;

    if (preset.value === 'ytd') {
      start = new Date(now.getFullYear(), 0, 1);
    } else if (preset.value === 'lastYear') {
      start = new Date(now.getFullYear() - 1, 0, 1);
      end = new Date(now.getFullYear() - 1, 11, 31);
    } else if (preset.days) {
      start = new Date(now.getTime() - preset.days * 24 * 60 * 60 * 1000);
    } else {
      start = now;
    }

    onChange({
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateDisplay}>
        <Text style={styles.dateText}>
          {value?.start || 'Start Date'} - {value?.end || 'End Date'}
        </Text>
      </View>

      {filter.config?.presets && (
        <View style={styles.presets}>
          <Text style={styles.presetsLabel}>Quick Select:</Text>
          {filter.config.presets.map((preset: any, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.presetButton}
              onPress={() => handlePresetSelect(preset)}
            >
              <Text style={styles.presetButtonText}>{preset.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.note}>
        Note: Replace with actual date picker component
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.xs,
  },
  dateDisplay: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background.paper,
    borderWidth: 1,
    borderColor: theme.colors.border.main,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.sm,
  },
  dateText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.primary,
  },
  presets: {
    marginTop: theme.spacing.sm,
  },
  presetsLabel: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
    fontWeight: theme.typography.fontWeight.medium,
  },
  presetButton: {
    padding: theme.spacing.xs,
    backgroundColor: theme.colors.background.paper,
    borderWidth: 1,
    borderColor: theme.colors.border.main,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.xs,
  },
  presetButtonText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.primary.main,
    textAlign: 'center',
  },
  note: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.disabled,
    fontStyle: 'italic',
    marginTop: theme.spacing.sm,
  },
});

export default DateRangeFilter;
