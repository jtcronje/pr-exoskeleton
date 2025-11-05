import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';
import { useFilterStore } from '../../hooks/useFilterStore';
import { executeQuery } from '../../services/cubeJsService';
import { CubeJsQuery } from '../../types';

/**
 * Metric Card Component
 *
 * Displays a single KPI metric with optional comparison
 *
 * HOW TO CUSTOMIZE FOR AI AGENTS:
 * 1. Define your Cube.js query in the 'query' prop
 * 2. Example query:
 *    {
 *      measures: ['Orders.count'],
 *      timeDimensions: [{
 *        dimension: 'Orders.createdAt',
 *        dateRange: 'this month'
 *      }]
 *    }
 * 3. The component will display the first measure value
 * 4. Add comparison logic by querying previous period
 */

interface MetricCardProps {
  title: string;
  query?: CubeJsQuery;
  width?: number;
  height?: number;
  format?: (value: number) => string;
  icon?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  query,
  width,
  height,
  format = (val) => val.toLocaleString(),
  icon = '📊',
}) => {
  const [value, setValue] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const filters = useFilterStore((state) => state.filters);

  useEffect(() => {
    if (query) {
      loadData();
    }
  }, [query, filters]);

  const loadData = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const result = await executeQuery(query, filters);
      if (result && result.length > 0) {
        // Get the first measure value
        const firstMeasure = query.measures?.[0];
        if (firstMeasure) {
          setValue(result[0][firstMeasure] || 0);
        }
      }
    } catch (error) {
      console.error('Error loading metric data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { width, height }]}>
      <View style={styles.header}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        ) : (
          <>
            <Text style={styles.value}>
              {value !== null ? format(value) : '—'}
            </Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Placeholder Metric</Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Data updates with filter changes
        </Text>
      </View>
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
    minHeight: 180,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  icon: {
    fontSize: 24,
    marginRight: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.secondary,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: theme.typography.fontSize['3xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary.main,
    marginBottom: theme.spacing.sm,
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
  footer: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.light,
  },
  footerText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.disabled,
    textAlign: 'center',
  },
});

export default MetricCard;
