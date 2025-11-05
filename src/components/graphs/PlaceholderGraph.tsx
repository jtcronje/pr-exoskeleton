import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../theme';

/**
 * Base Placeholder Graph Component
 *
 * HOW TO CUSTOMIZE FOR AI AGENTS:
 * 1. This component serves as a base for all placeholder graphs
 * 2. To add real data visualization:
 *    - Import your charting library (Victory Native, React Native Chart Kit, etc.)
 *    - Replace the placeholder content with actual chart components
 *    - Use the 'data' prop to render real data
 *    - Apply filters from 'appliedFilters' to your data queries
 * 3. The component is already set up to receive data and filters
 * 4. Styling follows the theme configuration in src/config/theme.config.json
 */

interface PlaceholderGraphProps {
  title: string;
  graphType: string;
  data?: any[];
  appliedFilters?: any;
  width?: number;
  height?: number;
}

const PlaceholderGraph: React.FC<PlaceholderGraphProps> = ({
  title,
  graphType,
  data,
  appliedFilters,
  width,
  height,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const defaultWidth = width || screenWidth - 40;
  const defaultHeight = height || 300;

  return (
    <View style={[styles.container, { width: defaultWidth, height: defaultHeight }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{graphType}</Text>
        </View>
      </View>

      <View style={styles.graphArea}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderIcon}>📊</Text>
          <Text style={styles.placeholderText}>
            {graphType} Placeholder
          </Text>
          <Text style={styles.placeholderSubtext}>
            Replace with real chart component
          </Text>
          {data && data.length > 0 && (
            <Text style={styles.dataInfo}>
              {data.length} data points available
            </Text>
          )}
        </View>
      </View>

      {appliedFilters && Object.keys(appliedFilters).length > 0 && (
        <View style={styles.filterInfo}>
          <Text style={styles.filterText}>
            🔍 {Object.keys(appliedFilters).length} filter(s) applied
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border.main,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  badge: {
    backgroundColor: theme.colors.primary.lighter,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  badgeText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.white,
    fontWeight: theme.typography.fontWeight.medium,
  },
  graphArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: theme.spacing.sm,
  },
  placeholderText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  placeholderSubtext: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.disabled,
  },
  dataInfo: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary.main,
    marginTop: theme.spacing.sm,
    fontWeight: theme.typography.fontWeight.medium,
  },
  filterInfo: {
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  filterText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
});

export default PlaceholderGraph;
