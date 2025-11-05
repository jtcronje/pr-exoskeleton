import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';
import { useFilterStore } from '../../hooks/useFilterStore';
import { executeQuery } from '../../services/cubeJsService';
import { CubeJsQuery } from '../../types';
import PlaceholderGraph from './PlaceholderGraph';

/**
 * Line Chart Component
 *
 * HOW TO CUSTOMIZE FOR AI AGENTS:
 * 1. Define your Cube.js query in the 'query' prop
 * 2. The component automatically applies filters from the filter store
 * 3. To add a real line chart:
 *    - Install: npm install victory-native
 *    - Import: import { VictoryLine, VictoryChart, VictoryAxis } from 'victory-native';
 *    - Replace PlaceholderGraph with actual VictoryChart components
 * 4. Example query:
 *    {
 *      measures: ['Orders.count'],
 *      timeDimensions: [{
 *        dimension: 'Orders.createdAt',
 *        granularity: 'day',
 *        dateRange: 'last 30 days'
 *      }]
 *    }
 */

interface LineChartGraphProps {
  title: string;
  query?: CubeJsQuery;
  width?: number;
  height?: number;
}

const LineChartGraph: React.FC<LineChartGraphProps> = ({
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
      console.error('Error loading line chart data:', error);
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

  // TODO: Replace with actual line chart implementation
  return (
    <PlaceholderGraph
      title={title}
      graphType="LineChart"
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

export default LineChartGraph;
