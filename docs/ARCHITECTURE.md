# Architecture Documentation

## System Overview

The Dashboard Skeleton is built with a **configuration-driven architecture** that separates concerns into distinct layers:

1. **Configuration Layer** - JSON files defining pages, filters, and settings
2. **State Management Layer** - Zustand stores for global state
3. **Service Layer** - Cube.js integration and data fetching
4. **Component Layer** - Reusable UI components
5. **Screen Layer** - Page-level components
6. **Navigation Layer** - Routing and navigation

## Design Principles

### 1. Configuration Over Code

**Principle**: Modify behavior through configuration files instead of code changes.

**Benefits**:
- Faster iterations
- AI-friendly modifications
- Reduced code complexity
- Easier multi-client deployments

**Implementation**:
- Pages defined in `pages.config.json`
- Filters defined in `filters.config.json`
- API settings in `api.config.json`
- Theme in `theme.config.json`

### 2. Separation of Concerns

**Layers**:

```
┌─────────────────────────────────────┐
│     Configuration (JSON)            │
├─────────────────────────────────────┤
│     State Management (Zustand)      │
├─────────────────────────────────────┤
│     Service Layer (Cube.js)         │
├─────────────────────────────────────┤
│     Components (UI)                 │
├─────────────────────────────────────┤
│     Screens (Pages)                 │
├─────────────────────────────────────┤
│     Navigation (React Navigation)   │
└─────────────────────────────────────┘
```

### 3. Modularity

**Principle**: Each component should be self-contained and reusable.

**Examples**:
- Graph components work independently
- Filter components are interchangeable
- Layout components are composable

### 4. Type Safety

**Principle**: Use TypeScript for better development experience and fewer runtime errors.

**Implementation**:
- All types defined in `src/types/index.ts`
- Strict type checking enabled
- Configuration files have corresponding interfaces

## Component Architecture

### Graph Components

**Structure**:
```typescript
GraphComponent
├── Receives: title, query, filters
├── Fetches: data via cubeJsService
├── Renders: placeholder or actual chart
└── Updates: on filter changes
```

**Lifecycle**:
1. Component mounts
2. Subscribes to filter store
3. Executes Cube.js query
4. Renders data
5. Reacts to filter changes
6. Re-fetches and re-renders

**Example Flow**:
```
User Changes Filter
        ↓
Filter Store Updates
        ↓
Graph Component Detects Change (useEffect)
        ↓
Executes New Query with Filters
        ↓
Renders Updated Data
```

### Filter Components

**Structure**:
```typescript
FilterComponent
├── Reads: filter configuration
├── Manages: local UI state (modals, dropdowns)
├── Updates: global filter store
└── Triggers: graph re-renders
```

**Types**:

1. **SingleSelect**
   - Dropdown with single choice
   - Updates filter store on selection

2. **MultiSelect**
   - Checkboxes for multiple selections
   - Shows selected items as tags

3. **DateRange**
   - Date picker or presets
   - Returns { start, end } object

4. **Number**
   - Numeric input
   - Validates min/max from config

### Layout Components

**Sidebar**:
- Reads pages from configuration
- Manages collapsed/expanded state
- Handles navigation

**FilterPane**:
- Reads filters from configuration
- Groups filters into collapsible sections
- Provides reset functionality

**Header**:
- Displays page title and description
- Toggle filter pane visibility

**DashboardLayout**:
- Composes Sidebar + Content + FilterPane
- Manages responsive widths

## State Management

### Zustand Stores

**Why Zustand?**
- Lightweight
- No boilerplate
- React hooks integration
- Easy to understand

**Store Structure**:

#### FilterStore
```typescript
{
  filters: {
    filterId1: value1,
    filterId2: value2,
    ...
  },
  setFilter: (id, value) => void,
  resetFilter: (id) => void,
  resetAllFilters: () => void,
  getFilterValue: (id) => any
}
```

#### AppStore
```typescript
{
  sidebarCollapsed: boolean,
  filterPaneVisible: boolean,
  currentPage: string,
  toggleSidebar: () => void,
  toggleFilterPane: () => void,
  setCurrentPage: (page) => void
}
```

#### ApiStore
```typescript
{
  config: ApiConfig,
  activeClient: ClientConfig,
  setApiConfig: (config) => void,
  setActiveClient: (id) => void,
  updateClientConfig: (id, config) => void
}
```

## Service Layer

### Cube.js Service

**Responsibilities**:
1. Initialize Cube.js API client
2. Transform filter state to Cube.js filters
3. Execute queries
4. Handle errors and fallbacks
5. Provide mock data for development

**Key Functions**:

#### `initializeCubeJs(apiUrl, apiToken)`
- Creates Cube.js client instance
- Stores for reuse across app

#### `transformFiltersToQuery(filterState)`
- Converts UI filter state to Cube.js format
- Handles different filter types
- Maps using cubeJsMapping from config

#### `executeQuery(query, filterState)`
- Applies filters to query
- Executes via Cube.js client
- Returns formatted data
- Falls back to mock data if not configured

### Query Builder Utilities

**Purpose**: Simplify query construction for different chart types.

**Functions**:
- `buildLineChartQuery()` - Time series queries
- `buildBarChartQuery()` - Categorical comparisons
- `buildPieChartQuery()` - Distribution queries
- `buildMetricQuery()` - Single value KPIs
- `buildTableQuery()` - Tabular data

## Data Flow

### Filter Application Flow

```
1. User interacts with filter component
         ↓
2. Filter component calls setFilter()
         ↓
3. FilterStore updates state
         ↓
4. All graph components subscribed to FilterStore
         ↓
5. Graph components re-run useEffect
         ↓
6. New queries executed with updated filters
         ↓
7. Graphs re-render with new data
```

### Page Navigation Flow

```
1. User clicks sidebar item
         ↓
2. Sidebar calls navigation.navigate()
         ↓
3. React Navigation changes route
         ↓
4. Screen component renders
         ↓
5. DashboardPage reads page config
         ↓
6. Graphs rendered based on config
         ↓
7. Filters applied automatically
```

## Multi-Client Architecture

### Design

**Goal**: Support multiple clients with different:
- API endpoints
- Data sources
- Branding
- Graph configurations

**Implementation**:

1. **Client Configuration**
   - Each client has entry in `api.config.json`
   - Contains API credentials and theme

2. **Active Client**
   - Stored in ApiStore
   - Used for all API calls

3. **Client Switching**
   - Update activeClient in store
   - Re-initialize Cube.js
   - Optional: reload configuration

### Example Multi-Client Setup

```json
{
  "clients": {
    "acme-corp": {
      "id": "acme-corp",
      "name": "Acme Corporation",
      "cubeJs": {
        "apiUrl": "https://acme.cube.api/v1",
        "apiToken": "acme-token"
      },
      "theme": {
        "primary": "#FF0000"
      }
    },
    "globex": {
      "id": "globex",
      "name": "Globex Industries",
      "cubeJs": {
        "apiUrl": "https://globex.cube.api/v1",
        "apiToken": "globex-token"
      }
    }
  },
  "activeClient": "acme-corp"
}
```

## Extensibility Points

### Adding New Graph Types

1. Create component in `src/components/graphs/`
2. Implement standard props interface
3. Export from `src/components/graphs/index.ts`
4. Add type to GraphType union in `src/types/index.ts`
5. Update DashboardPage switch statement

### Adding New Filter Types

1. Create component in `src/components/filters/`
2. Implement FilterComponent interface
3. Add to FilterItem switch statement
4. Add type to FilterType union in types

### Adding New Pages

1. Update `pages.config.json`
2. Create screen component
3. Add to navigation setup

### Adding New Clients

1. Update `api.config.json`
2. No code changes needed

## Performance Considerations

### Optimization Strategies

1. **Lazy Loading**
   - Screens loaded on demand
   - Components split by route

2. **Memoization**
   - Graph components use useMemo for data transformation
   - Filter components prevent unnecessary re-renders

3. **Efficient State Updates**
   - Zustand only re-renders subscribed components
   - Filters don't trigger sidebar re-renders

4. **Data Caching**
   - Cube.js client handles caching
   - Configure TTL in api.config.json

### Bundle Size

- Use selective imports
- Tree-shaking enabled
- Analyze bundle with tools

## Security Considerations

### API Tokens

- Never commit tokens to git
- Use environment variables for production
- Rotate tokens regularly

### Data Access

- Cube.js handles authorization
- Dashboard only displays data user can access
- Configure security context in Cube.js

### Input Validation

- Filter values validated before queries
- Prevent injection attacks
- Sanitize user inputs

## Testing Strategy

### Unit Tests

- Test utility functions
- Test state management
- Test query builders

### Integration Tests

- Test component interactions
- Test filter → graph flow
- Test navigation

### E2E Tests

- Test full user workflows
- Test multi-client switching
- Test API integration

## Deployment

### Build Process

1. Configuration validation
2. TypeScript compilation
3. Bundle optimization
4. Platform-specific builds

### Environment Setup

- Development: Mock data
- Staging: Test Cube.js instance
- Production: Production Cube.js

### CI/CD Pipeline

1. Lint and type check
2. Run tests
3. Build for platforms
4. Deploy to app stores / web hosting

## Troubleshooting

### Common Issues

**Issue**: Graphs not updating with filters
- Check filter store subscription
- Verify cubeJsMapping in filter config
- Check query execution

**Issue**: Navigation not working
- Verify routes in AppNavigator
- Check page IDs match config
- Ensure screens exported correctly

**Issue**: API connection fails
- Verify credentials in config
- Check network connectivity
- Review CORS settings

## Future Enhancements

### Planned Features

1. **Persistent Storage**
   - Save filter preferences
   - Cache data locally
   - Offline mode

2. **Advanced Filters**
   - Custom filter types
   - Filter dependencies
   - Smart suggestions

3. **Enhanced Visualizations**
   - More chart types
   - Interactive charts
   - Export capabilities

4. **Multi-Tenant Features**
   - User authentication
   - Role-based access
   - Usage analytics

---

For implementation details, see component-level documentation in source files.
