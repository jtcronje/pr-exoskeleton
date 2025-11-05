import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { FilterGroup as FilterGroupType } from '../../types';
import filtersConfig from '../../config/filters.config.json';
import FilterItem from './FilterItem';

interface FilterGroupProps {
  group: FilterGroupType;
  expanded: boolean;
  onToggle: () => void;
}

const FilterGroup: React.FC<FilterGroupProps> = ({
  group,
  expanded,
  onToggle,
}) => {
  const groupFilters = filtersConfig.filters.filter((f: any) =>
    group.filters.includes(f.id)
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={onToggle}
        activeOpacity={0.7}
      >
        <Text style={styles.headerText}>{group.name}</Text>
        <Text style={styles.icon}>{expanded ? '▼' : '▶'}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.content}>
          {groupFilters.map((filter: any) => (
            <FilterItem key={filter.id} filter={filter} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.paper,
  },
  headerText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  icon: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  content: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background.default,
  },
});

export default FilterGroup;
