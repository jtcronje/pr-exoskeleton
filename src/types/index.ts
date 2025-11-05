// Core Types for Dashboard Skeleton

export interface Page {
  id: string;
  name: string;
  icon: string;
  route: string;
  description: string;
  graphs: Graph[];
}

export interface Graph {
  id: string;
  type: GraphType;
  title: string;
  position: GraphPosition;
  cubeJsQuery?: CubeJsQuery;
  config?: GraphConfig;
}

export type GraphType =
  | 'LineChart'
  | 'BarChart'
  | 'AreaChart'
  | 'PieChart'
  | 'MetricCard'
  | 'Table';

export interface GraphPosition {
  row: number;
  col: number;
  width: number;
  height: number;
}

export interface GraphConfig {
  [key: string]: any;
}

export interface Filter {
  id: string;
  name: string;
  type: FilterType;
  defaultValue: any;
  options?: FilterOption[];
  config?: FilterConfig;
  cubeJsMapping: CubeJsFilterMapping;
}

export type FilterType =
  | 'dateRange'
  | 'multiSelect'
  | 'singleSelect'
  | 'number'
  | 'text';

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  [key: string]: any;
}

export interface FilterGroup {
  id: string;
  name: string;
  filters: string[];
}

export interface FilterState {
  [filterId: string]: any;
}

export interface CubeJsFilterMapping {
  dimension?: string;
  measure?: string;
  operator: string;
}

export interface CubeJsQuery {
  measures?: string[];
  dimensions?: string[];
  timeDimensions?: TimeDimension[];
  filters?: CubeJsFilter[];
  segments?: string[];
  limit?: number;
  offset?: number;
  order?: OrderClause[];
}

export interface TimeDimension {
  dimension: string;
  dateRange?: string | string[];
  granularity?: 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';
}

export interface CubeJsFilter {
  member: string;
  operator: string;
  values: any[];
}

export interface OrderClause {
  [key: string]: 'asc' | 'desc';
}

export interface ApiConfig {
  cubeJs: {
    enabled: boolean;
    apiUrl: string;
    apiToken: string;
    defaultCacheTTL: number;
    pollInterval: number;
    retryConfig: RetryConfig;
  };
  clients: {
    [clientId: string]: ClientConfig;
  };
  activeClient: string;
}

export interface ClientConfig {
  id: string;
  name: string;
  cubeJs: {
    apiUrl: string;
    apiToken: string;
  };
  theme?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  retryDelayMultiplier: number;
}

export interface Theme {
  colors: ThemeColors;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  sidebar: SidebarConfig;
  filterPane: FilterPaneConfig;
}

export interface ThemeColors {
  primary: ColorShades;
  secondary: ColorShades;
  background: BackgroundColors;
  text: TextColors;
  border: BorderColors;
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface ColorShades {
  main: string;
  light: string;
  lighter: string;
  dark: string;
  darker: string;
}

export interface BackgroundColors {
  default: string;
  paper: string;
  sidebar: string;
  sidebarHover: string;
  card: string;
}

export interface TextColors {
  primary: string;
  secondary: string;
  disabled: string;
  white: string;
}

export interface BorderColors {
  main: string;
  light: string;
  dark: string;
}

export interface Typography {
  fontFamily: string;
  fontSize: FontSizes;
  fontWeight: FontWeights;
}

export interface FontSizes {
  xs: number;
  sm: number;
  base: number;
  lg: number;
  xl: number;
  '2xl': number;
  '3xl': number;
  '4xl': number;
}

export interface FontWeights {
  regular: string;
  medium: string;
  semibold: string;
  bold: string;
}

export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
}

export interface BorderRadius {
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface Shadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface SidebarConfig {
  width: {
    expanded: number;
    collapsed: number;
  };
}

export interface FilterPaneConfig {
  width: number;
}
