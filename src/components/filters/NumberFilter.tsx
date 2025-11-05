import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { theme } from '../../theme';
import { Filter } from '../../types';

interface NumberFilterProps {
  filter: Filter;
  value: number;
  onChange: (value: number) => void;
}

const NumberFilter: React.FC<NumberFilterProps> = ({
  filter,
  value,
  onChange,
}) => {
  const handleChange = (text: string) => {
    const num = parseFloat(text);
    if (!isNaN(num)) {
      onChange(num);
    } else if (text === '') {
      onChange(0);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value?.toString() || '0'}
        onChangeText={handleChange}
        keyboardType="numeric"
        placeholder={`Enter ${filter.name.toLowerCase()}`}
        placeholderTextColor={theme.colors.text.disabled}
      />
      {filter.config && (
        <Text style={styles.hint}>
          Range: {filter.config.min || 0} - {filter.config.max || '∞'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.xs,
  },
  input: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background.paper,
    borderWidth: 1,
    borderColor: theme.colors.border.main,
    borderRadius: theme.borderRadius.sm,
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.primary,
  },
  hint: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.disabled,
    marginTop: theme.spacing.xs,
  },
});

export default NumberFilter;
