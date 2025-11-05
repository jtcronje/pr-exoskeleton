import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { Filter } from '../../types';
import { useFilterStore } from '../../hooks/useFilterStore';
import SingleSelectFilter from './SingleSelectFilter';
import MultiSelectFilter from './MultiSelectFilter';
import DateRangeFilter from './DateRangeFilter';
import NumberFilter from './NumberFilter';

/**
 * Filter Item Component
 *
 * Renders the appropriate filter component based on filter type
 */

interface FilterItemProps {
  filter: Filter;
}

const FilterItem: React.FC<FilterItemProps> = ({ filter }) => {
  const { setFilter, getFilterValue } = useFilterStore();
  const value = getFilterValue(filter.id);

  const handleChange = (newValue: any) => {
    setFilter(filter.id, newValue);
  };

  const renderFilter = () => {
    switch (filter.type) {
      case 'singleSelect':
        return (
          <SingleSelectFilter
            filter={filter}
            value={value}
            onChange={handleChange}
          />
        );
      case 'multiSelect':
        return (
          <MultiSelectFilter
            filter={filter}
            value={value}
            onChange={handleChange}
          />
        );
      case 'dateRange':
        return (
          <DateRangeFilter
            filter={filter}
            value={value}
            onChange={handleChange}
          />
        );
      case 'number':
        return (
          <NumberFilter
            filter={filter}
            value={value}
            onChange={handleChange}
          />
        );
      default:
        return (
          <Text style={styles.unsupported}>
            Unsupported filter type: {filter.type}
          </Text>
        );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{filter.name}</Text>
      {renderFilter()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  unsupported: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.disabled,
    fontStyle: 'italic',
  },
});

export default FilterItem;
