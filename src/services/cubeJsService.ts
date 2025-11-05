import cubejs from '@cubejs-client/core';
import { CubeJsQuery, FilterState, Filter } from '../types';
import filtersConfig from '../config/filters.config.json';

/**
 * CubeJS Service
 *
 * This service provides a layer for interacting with Cube.js API.
 * It handles query execution, filter transformation, and data fetching.
 *
 * HOW TO USE FOR AI AGENTS:
 * 1. Update the API credentials in src/config/api.config.json
 * 2. Enable Cube.js by setting "enabled": true in api.config.json
 * 3. Use transformFiltersToQuery() to convert filter state to Cube.js filters
 * 4. Use executeQuery() to fetch data from Cube.js
 * 5. Replace placeholder data in graph components with real Cube.js queries
 */

let cubeApi: any = null;

/**
 * Initialize Cube.js API client
 * @param apiUrl - Cube.js API endpoint
 * @param apiToken - Authentication token
 */
export const initializeCubeJs = (apiUrl: string, apiToken: string) => {
  if (!apiUrl || !apiToken) {
    console.warn('Cube.js API URL or token not provided');
    return null;
  }

  try {
    cubeApi = cubejs(apiToken, {
      apiUrl,
    });
    return cubeApi;
  } catch (error) {
    console.error('Failed to initialize Cube.js:', error);
    return null;
  }
};

/**
 * Get the current Cube.js API instance
 */
export const getCubeApi = () => {
  return cubeApi;
};

/**
 * Transform filter state to Cube.js query filters
 *
 * This function converts the dashboard filter state into Cube.js compatible filters.
 *
 * @param filterState - Current state of all filters
 * @returns Array of Cube.js filters
 */
export const transformFiltersToQuery = (filterState: FilterState): any[] => {
  const cubeFilters: any[] = [];
  const filters = filtersConfig.filters as Filter[];

  filters.forEach((filterConfig) => {
    const value = filterState[filterConfig.id];
    const mapping = filterConfig.cubeJsMapping;

    // Skip if no value or default value
    if (
      value === undefined ||
      value === null ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      value === filterConfig.defaultValue
    ) {
      return;
    }

    // Handle date range filters
    if (filterConfig.type === 'dateRange' && mapping.dimension) {
      cubeFilters.push({
        member: mapping.dimension,
        operator: mapping.operator,
        values: [value.start, value.end],
      });
      return;
    }

    // Handle multi-select filters
    if (filterConfig.type === 'multiSelect' && mapping.dimension) {
      cubeFilters.push({
        member: mapping.dimension,
        operator: mapping.operator,
        values: Array.isArray(value) ? value : [value],
      });
      return;
    }

    // Handle single-select filters
    if (filterConfig.type === 'singleSelect' && mapping.dimension && value !== 'all') {
      cubeFilters.push({
        member: mapping.dimension,
        operator: mapping.operator,
        values: [value],
      });
      return;
    }

    // Handle number filters
    if (filterConfig.type === 'number' && mapping.dimension) {
      cubeFilters.push({
        member: mapping.dimension,
        operator: mapping.operator,
        values: [value],
      });
      return;
    }
  });

  return cubeFilters;
};

/**
 * Execute a Cube.js query
 *
 * @param query - Cube.js query object
 * @param filterState - Optional filter state to apply to query
 * @returns Query result data
 */
export const executeQuery = async (
  query: CubeJsQuery,
  filterState?: FilterState
): Promise<any> => {
  if (!cubeApi) {
    console.warn('Cube.js not initialized. Returning mock data.');
    return generateMockData(query);
  }

  try {
    // Apply filters if provided
    let finalQuery = { ...query };
    if (filterState) {
      const filters = transformFiltersToQuery(filterState);
      finalQuery = {
        ...query,
        filters: [...(query.filters || []), ...filters],
      };
    }

    const resultSet = await cubeApi.load(finalQuery);
    return resultSet.tablePivot();
  } catch (error) {
    console.error('Cube.js query failed:', error);
    return generateMockData(query);
  }
};

/**
 * Generate mock data for development/testing
 * This is used when Cube.js is not configured
 *
 * AI AGENTS: Replace this with real Cube.js queries once API is configured
 */
const generateMockData = (query: CubeJsQuery): any[] => {
  const mockData: any[] = [];
  const dataPoints = 10;

  for (let i = 0; i < dataPoints; i++) {
    const dataPoint: any = {};

    // Add dimensions
    query.dimensions?.forEach((dim) => {
      dataPoint[dim] = `Category ${i + 1}`;
    });

    // Add measures with random values
    query.measures?.forEach((measure) => {
      dataPoint[measure] = Math.floor(Math.random() * 1000) + 100;
    });

    // Add time dimensions
    query.timeDimensions?.forEach((timeDim) => {
      const date = new Date();
      date.setDate(date.getDate() - (dataPoints - i));
      dataPoint[timeDim.dimension] = date.toISOString().split('T')[0];
    });

    mockData.push(dataPoint);
  }

  return mockData;
};

/**
 * Validate Cube.js connection
 * @returns Boolean indicating if connection is valid
 */
export const validateConnection = async (): Promise<boolean> => {
  if (!cubeApi) {
    return false;
  }

  try {
    // Try a simple query to validate connection
    await cubeApi.load({
      measures: [],
      dimensions: [],
    });
    return true;
  } catch (error) {
    console.error('Cube.js connection validation failed:', error);
    return false;
  }
};

export default {
  initializeCubeJs,
  getCubeApi,
  transformFiltersToQuery,
  executeQuery,
  validateConnection,
  generateMockData,
};
