import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { theme } from '../../theme';
import { Header } from '../../components/layout';
import { Page, Graph } from '../../types';
import {
  LineChartGraph,
  BarChartGraph,
  PieChartGraph,
  AreaChartGraph,
  MetricCard,
  TableGraph,
} from '../../components/graphs';

/**
 * Dashboard Page Component
 *
 * Generic page component that renders graphs based on page configuration
 *
 * HOW TO CUSTOMIZE FOR AI AGENTS:
 * 1. Page configuration is in src/config/pages.config.json
 * 2. To modify graphs on a page:
 *    - Edit the "graphs" array in the page config
 *    - Change graph types, titles, or positions
 * 3. To add real data:
 *    - Add cubeJsQuery to each graph in the config
 *    - Or pass queries as props to this component
 * 4. Graph components automatically receive filter state
 */

interface DashboardPageProps {
  page: Page;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ page }) => {
  const renderGraph = (graph: Graph) => {
    const commonProps = {
      key: graph.id,
      title: graph.title,
      query: graph.cubeJsQuery,
    };

    switch (graph.type) {
      case 'LineChart':
        return <LineChartGraph {...commonProps} />;
      case 'BarChart':
        return <BarChartGraph {...commonProps} />;
      case 'PieChart':
        return <PieChartGraph {...commonProps} />;
      case 'AreaChart':
        return <AreaChartGraph {...commonProps} />;
      case 'MetricCard':
        return <MetricCard {...commonProps} />;
      case 'Table':
        return <TableGraph {...commonProps} />;
      default:
        return <LineChartGraph {...commonProps} />;
    }
  };

  return (
    <View style={styles.container}>
      <Header title={page.name} subtitle={page.description} />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.graphsContainer}>
          {page.graphs.map((graph) => renderGraph(graph))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  graphsContainer: {
    padding: theme.spacing.sm,
  },
});

export default DashboardPage;
