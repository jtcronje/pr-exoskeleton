import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { theme } from '../../theme';
import { useFilterStore } from '../../hooks/useFilterStore';
import { executeQuery } from '../../services/cubeJsService';
import { CubeJsQuery } from '../../types';

/**
 * Table Component
 *
 * Displays data in tabular format
 *
 * HOW TO CUSTOMIZE FOR AI AGENTS:
 * 1. Define your Cube.js query in the 'query' prop
 * 2. Example query:
 *    {
 *      measures: ['Orders.count', 'Orders.totalAmount'],
 *      dimensions: ['Products.name', 'Users.city'],
 *      limit: 20
 *    }
 * 3. Columns are automatically generated from query results
 * 4. Add sorting, pagination, and export features as needed
 */

interface TableGraphProps {
  title: string;
  query?: CubeJsQuery;
  width?: number;
  height?: number;
}

const TableGraph: React.FC<TableGraphProps> = ({
  title,
  query,
  width,
  height,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
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

      // Extract column names from first row
      if (result && result.length > 0) {
        setColumns(Object.keys(result[0]));
      }
    } catch (error) {
      console.error('Error loading table data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { width, height }]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Table</Text>
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary.main} />
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View>
            {/* Table Header */}
            <View style={styles.tableRow}>
              {columns.length > 0 ? (
                columns.map((col, idx) => (
                  <View key={idx} style={styles.tableHeaderCell}>
                    <Text style={styles.tableHeaderText}>{col}</Text>
                  </View>
                ))
              ) : (
                <View style={styles.placeholderContainer}>
                  <Text style={styles.placeholderText}>
                    No columns defined. Add a Cube.js query.
                  </Text>
                </View>
              )}
            </View>

            {/* Table Body */}
            <ScrollView style={styles.tableBody}>
              {data.map((row, rowIdx) => (
                <View key={rowIdx} style={styles.tableRow}>
                  {columns.map((col, colIdx) => (
                    <View key={colIdx} style={styles.tableCell}>
                      <Text style={styles.tableCellText}>
                        {row[col] !== null && row[col] !== undefined
                          ? String(row[col])
                          : '—'}
                      </Text>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  tableHeaderCell: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background.sidebar,
    minWidth: 150,
  },
  tableHeaderText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.white,
  },
  tableCell: {
    padding: theme.spacing.sm,
    minWidth: 150,
  },
  tableCellText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.primary,
  },
  tableBody: {
    maxHeight: 400,
  },
  placeholderContainer: {
    flex: 1,
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.disabled,
  },
});

export default TableGraph;
