import { CubeJsQuery, Graph } from '../types';

/**
 * Query Builder Utilities
 *
 * These utilities help construct Cube.js queries for different graph types.
 *
 * HOW TO USE FOR AI AGENTS:
 * 1. Call the appropriate builder function for your graph type
 * 2. Pass in the necessary dimensions, measures, and time dimensions
 * 3. The function returns a properly formatted Cube.js query
 * 4. Use this query with the cubeJsService to fetch data
 *
 * EXAMPLE:
 * const query = buildLineChartQuery({
 *   measures: ['Orders.count'],
 *   timeDimension: 'Orders.createdAt',
 *   granularity: 'day',
 *   dateRange: 'last 30 days'
 * });
 */

interface LineChartQueryParams {
  measures: string[];
  timeDimension: string;
  granularity?: 'day' | 'week' | 'month' | 'year';
  dateRange?: string | string[];
  dimensions?: string[];
}

export const buildLineChartQuery = (params: LineChartQueryParams): CubeJsQuery => {
  return {
    measures: params.measures,
    dimensions: params.dimensions || [],
    timeDimensions: [
      {
        dimension: params.timeDimension,
        granularity: params.granularity || 'day',
        dateRange: params.dateRange || 'last 30 days',
      },
    ],
    order: {
      [params.timeDimension]: 'asc',
    },
  };
};

interface BarChartQueryParams {
  measures: string[];
  dimensions: string[];
  limit?: number;
  order?: 'asc' | 'desc';
}

export const buildBarChartQuery = (params: BarChartQueryParams): CubeJsQuery => {
  return {
    measures: params.measures,
    dimensions: params.dimensions,
    limit: params.limit || 10,
    order: params.order
      ? { [params.measures[0]]: params.order }
      : { [params.measures[0]]: 'desc' },
  };
};

interface PieChartQueryParams {
  measure: string;
  dimension: string;
  limit?: number;
}

export const buildPieChartQuery = (params: PieChartQueryParams): CubeJsQuery => {
  return {
    measures: [params.measure],
    dimensions: [params.dimension],
    limit: params.limit || 6,
    order: {
      [params.measure]: 'desc',
    },
  };
};

interface MetricQueryParams {
  measure: string;
  timeDimension?: string;
  dateRange?: string | string[];
  comparisonDateRange?: string | string[];
}

export const buildMetricQuery = (params: MetricQueryParams): CubeJsQuery => {
  const query: CubeJsQuery = {
    measures: [params.measure],
  };

  if (params.timeDimension) {
    query.timeDimensions = [
      {
        dimension: params.timeDimension,
        dateRange: params.dateRange || 'this month',
      },
    ];
  }

  return query;
};

interface TableQueryParams {
  measures: string[];
  dimensions: string[];
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

export const buildTableQuery = (params: TableQueryParams): CubeJsQuery => {
  return {
    measures: params.measures,
    dimensions: params.dimensions,
    limit: params.limit || 50,
    offset: params.offset || 0,
    order: params.orderBy
      ? { [params.orderBy]: params.orderDirection || 'desc' }
      : undefined,
  };
};

/**
 * Helper function to build a query from graph configuration
 * This reads the graph config and constructs an appropriate query
 */
export const buildQueryFromGraph = (graph: Graph): CubeJsQuery | null => {
  // If graph has predefined query, use it
  if (graph.cubeJsQuery) {
    return graph.cubeJsQuery;
  }

  // Otherwise return null - AI agent should define queries
  return null;
};

export default {
  buildLineChartQuery,
  buildBarChartQuery,
  buildPieChartQuery,
  buildMetricQuery,
  buildTableQuery,
  buildQueryFromGraph,
};
