import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';
import { useFilterStore } from '../../hooks/useFilterStore';
import { executeQuery } from '../../services/cubeJsService';
import { CubeJsQuery } from '../../types';
import PlaceholderGraph from './PlaceholderGraph';

/**
 * Pie Chart Component
 *
 * HOW TO CUSTOMIZE FOR AI AGENTS:
 * 1. Define your Cube.js query in the 'query' prop
 * 2. Example query for pie chart:
 *    {
 *      measures: ['Orders.count'],
 *      dimensions: ['Products.category'],
 *      order: { 'Orders.count': 'desc' },
 *      limit: 6
 *    }
 * 3. To add a real pie chart, use Victory Native:
 *    import { VictoryPie } from 'victory-native';
 */

interface PieChartGraphProps {
  title: string;
  query?: CubeJsQuery;
  width?: number;
  height?: number;
  showLegend?: boolean;
}

const PieChartGraph: React.FC<PieChartGraphProps> = ({
  title,
  query,
  width,
  height,
  showLegend = true,
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
      console.error('Error loading pie chart data:', error);
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

  // TODO: Replace with actual pie chart implementation
  return (
    <PlaceholderGraph
      title={title}
      graphType="PieChart"
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

export default PieChartGraph;
