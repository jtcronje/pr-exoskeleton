import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../theme';
import filtersConfig from '../../config/filters.config.json';
import { useFilterStore } from '../../hooks/useFilterStore';
import FilterGroup from './FilterGroup';

/**
 * Filter Pane Component
 *
 * Displays all filter groups and manages filter interactions
 *
 * HOW TO CUSTOMIZE FOR AI AGENTS:
 * 1. Filter configuration is in src/config/filters.config.json
 * 2. To add a new filter:
 *    - Add filter definition to filters.config.json
 *    - Optionally add to a filter group
 *    - The component will automatically render it
 * 3. Filter state is managed by Zustand store
 * 4. All filters propagate to graph components automatically
 */

const FilterPane: React.FC = () => {
  const { filters, resetAllFilters } = useFilterStore();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['time', 'business']);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleResetAll = () => {
    resetAllFilters();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filters</Text>
        <TouchableOpacity onPress={handleResetAll} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={true}
      >
        {filtersConfig.filterGroups.map((group) => (
          <FilterGroup
            key={group.id}
            group={group}
            expanded={expandedGroups.includes(group.id)}
            onToggle={() => toggleGroup(group.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {Object.keys(filters).length} filters available
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: theme.filterPane.width,
    backgroundColor: theme.colors.background.paper,
    borderLeftWidth: 1,
    borderLeftColor: theme.colors.border.main,
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.main,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  resetButton: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.primary.lighter,
  },
  resetButtonText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.white,
    fontWeight: theme.typography.fontWeight.medium,
  },
  scrollView: {
    flex: 1,
  },
  footer: {
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.main,
  },
  footerText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.disabled,
    textAlign: 'center',
  },
});

export default FilterPane;
