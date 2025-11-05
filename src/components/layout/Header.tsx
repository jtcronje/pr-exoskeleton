import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../../theme';
import { useAppStore } from '../../hooks/useAppStore';

/**
 * Header Component
 *
 * Top bar with page title and filter toggle
 */

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { toggleFilterPane, filterPaneVisible } = useAppStore();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      <TouchableOpacity
        style={styles.filterButton}
        onPress={toggleFilterPane}
      >
        <Text style={styles.filterIcon}>🔍</Text>
        <Text style={styles.filterButtonText}>
          {filterPaneVisible ? 'Hide' : 'Show'} Filters
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.background.paper,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.main,
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.primary,
  },
  subtitle: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.xs,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.primary.main,
    borderRadius: theme.borderRadius.sm,
  },
  filterIcon: {
    fontSize: theme.typography.fontSize.base,
    marginRight: theme.spacing.xs,
  },
  filterButtonText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.white,
    fontWeight: theme.typography.fontWeight.semibold,
  },
});

export default Header;
