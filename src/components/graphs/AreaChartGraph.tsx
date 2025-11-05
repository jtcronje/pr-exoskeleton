import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';
import { useFilterStore } from '../../hooks/useFilterStore';
import { executeQuery } from '../../services/cubeJsService';
import { CubeJsQuery } from '../../types';
import PlaceholderGraph from './PlaceholderGraph';

/**
 * Area Chart Component
 *
 * HOW TO CUSTOMIZE FOR AI AGENTS:
 * 1. Similar to LineChart but with filled area
 * 2. Example query:
 *    {
 *      measures: ['Orders.totalAmount'],
 *      timeDimensions: [{
 *        dimension: 'Orders.createdAt',
 *        granularity: 'week',
 *        dateRange: 'last 90 days'
 *      }]
 *    }
 * 3. To add a real area chart:
 *    import { VictoryArea, VictoryChart } from 'victory-native';
 */

interface AreaChartGraphProps {
  title: string;
  query?: CubeJsQuery;
  width?: number;
  height?: number;
}

const AreaChartGraph: React.FC<AreaChartGraphProps> = ({
  title,
  query,
  width,
  height,
}) => {
  const [data, setData] = useState<any[]>([]);
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
      setData(result);
    } catch (error) {
      console.error('Error loading area chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { width, height }]}>
        <ActivityIndicator size="large" color={theme.colors.primary.main} />
      </View>
    );
  }

  // TODO: Replace with actual area chart implementation
  return (
    <PlaceholderGraph
      title={title}
      graphType="AreaChart"
      data={data}
      appliedFilters={filters}
      width={width}
      height={height}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },
});

export default AreaChartGraph;
