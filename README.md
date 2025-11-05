# Dashboard Skeleton - Modular React Native Dashboard Framework

A production-ready, modular React Native dashboard skeleton designed for multi-client deployments with Cube.js integration.

## 🚀 Features

- **Modular Architecture**: Configuration-driven dashboard that supports multiple clients
- **6 Pre-configured Pages**: Overview, Analytics, Reports, Metrics, Insights, and Settings
- **Collapsible Sidebar**: Left navigation with customizable pages
- **Dynamic Filters**: Right sidebar with configurable filter pane
- **Placeholder Graphs**: Ready-to-customize chart components (Line, Bar, Pie, Area, Metric Cards, Tables)
- **Cube.js Ready**: Built-in service layer for Cube.js API integration
- **State Management**: Zustand for global state (filters, UI, API config)
- **Responsive Design**: Adapts to different screen sizes
- **TypeScript**: Fully typed for better developer experience
- **Theme System**: Centralized color scheme (Blue, Black, Grey)

## 📁 Project Structure

```
dashboard-skeleton/
├── src/
│   ├── components/
│   │   ├── graphs/           # Graph components (Line, Bar, Pie, etc.)
│   │   ├── filters/          # Filter components (Multi-select, Date range, etc.)
│   │   ├── layout/           # Layout components (Sidebar, Header, etc.)
│   │   └── common/           # Common/shared components
│   ├── screens/
│   │   └── dashboard/        # Dashboard page screens
│   ├── navigation/           # Navigation setup
│   ├── config/               # Configuration files (JSON)
│   │   ├── pages.config.json      # Page definitions
│   │   ├── filters.config.json    # Filter definitions
│   │   ├── api.config.json        # API/Cube.js config
│   │   └── theme.config.json      # Theme configuration
│   ├── services/             # Service layer (Cube.js, etc.)
│   ├── hooks/                # Custom hooks and stores (Zustand)
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Utility functions
│   └── theme/                # Theme setup
├── docs/                     # Documentation
├── App.tsx                   # Main app component
├── index.js                  # Entry point
└── package.json
```

## 🛠️ Installation

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Expo CLI (optional, for development)

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd dashboard-skeleton
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Check system requirements (optional, recommended on macOS)**
```bash
npm run check-system
```
This will verify file descriptor limits and warn if adjustments are needed.

4. **Start the development server**
```bash
npm start
# or
expo start
```

5. **Run on specific platform**
```bash
npm run android  # For Android
npm run ios      # For iOS
npm run web      # For Web
```

## 📝 Configuration Guide

### Adding/Modifying Pages

Pages are configured in `src/config/pages.config.json`.

**To add a new page:**

1. Open `src/config/pages.config.json`
2. Add a new page object:
```json
{
  "id": "my-new-page",
  "name": "My New Page",
  "icon": "chart-line",
  "route": "MyNewPage",
  "description": "Description of my page",
  "graphs": []
}
```

3. Create the screen component in `src/screens/dashboard/MyNewPageScreen.tsx`:
```typescript
import React from 'react';
import pagesConfig from '../../config/pages.config.json';
import DashboardPage from './DashboardPage';

const MyNewPageScreen: React.FC = () => {
  const page = pagesConfig.pages.find((p: any) => p.id === 'my-new-page');
  if (!page) return null;
  return <DashboardPage page={page as any} />;
};

export default MyNewPageScreen;
```

4. Add the route to `src/navigation/AppNavigator.tsx`:
```typescript
import { MyNewPageScreen } from '../screens/dashboard';

// Inside Drawer.Navigator:
<Drawer.Screen
  name="MyNewPage"
  component={ScreenWrapper(MyNewPageScreen)}
/>
```

**To rename a page:**
- Simply update the `name` field in `pages.config.json`

**To reorder pages:**
- Reorder the objects in the `pages` array in `pages.config.json`

### Configuring Filters

Filters are configured in `src/config/filters.config.json`.

**To add a new filter:**

1. Open `src/config/filters.config.json`
2. Add a new filter definition:
```json
{
  "id": "myFilter",
  "name": "My Filter",
  "type": "singleSelect",
  "defaultValue": "all",
  "options": [
    { "value": "option1", "label": "Option 1" },
    { "value": "option2", "label": "Option 2" }
  ],
  "cubeJsMapping": {
    "dimension": "MyDimension.field",
    "operator": "equals"
  }
}
```

3. Add the filter to a filter group:
```json
{
  "id": "myGroup",
  "name": "My Filter Group",
  "filters": ["myFilter"]
}
```

**Filter Types:**
- `singleSelect`: Single choice dropdown
- `multiSelect`: Multiple choice with checkboxes
- `dateRange`: Date range picker with presets
- `number`: Numeric input

**To modify a filter:**
- Update the filter object in `filters.config.json`
- Changes apply immediately without code changes

### Adding Graphs to Pages

Graphs are defined in the `graphs` array of each page in `pages.config.json`.

**Example:**
```json
{
  "id": "my-graph",
  "type": "LineChart",
  "title": "My Graph Title",
  "position": { "row": 0, "col": 0, "width": 6, "height": 4 }
}
```

**Graph Types:**
- `LineChart`: Time series line chart
- `BarChart`: Bar/column chart
- `PieChart`: Pie/donut chart
- `AreaChart`: Area chart
- `MetricCard`: Single KPI metric display
- `Table`: Data table

### Cube.js Integration

#### Setup

1. Navigate to the Settings page in the dashboard
2. Click "Edit" in the API Configuration section
3. Enter your Cube.js API URL and token
4. Click "Save"
5. Click "Test Connection" to verify

#### Adding Queries to Graphs

**Method 1: In Configuration File**

Add `cubeJsQuery` to graph definition in `pages.config.json`:
```json
{
  "id": "sales-chart",
  "type": "LineChart",
  "title": "Sales Over Time",
  "cubeJsQuery": {
    "measures": ["Orders.count"],
    "timeDimensions": [{
      "dimension": "Orders.createdAt",
      "granularity": "day",
      "dateRange": "last 30 days"
    }]
  }
}
```

**Method 2: Using Query Builder**

```typescript
import { buildLineChartQuery } from '../utils/queryBuilder';

const query = buildLineChartQuery({
  measures: ['Orders.count'],
  timeDimension: 'Orders.createdAt',
  granularity: 'day',
  dateRange: 'last 30 days'
});
```

#### Cube.js Service API

```typescript
import { executeQuery } from '../services/cubeJsService';

// Execute a query with filters
const data = await executeQuery(cubeJsQuery, filterState);
```

## 🎨 Theme Customization

Theme is configured in `src/config/theme.config.json`.

**To change colors:**
```json
{
  "colors": {
    "primary": {
      "main": "#1E3A8A",
      "light": "#3B82F6"
    }
  }
}
```

**To change spacing:**
```json
{
  "spacing": {
    "sm": 8,
    "md": 16,
    "lg": 24
  }
}
```

Changes to theme.config.json require app restart.

## 🔧 Development Workflow

### For Developers

1. **Make configuration changes** in JSON files
2. **Create/modify components** as needed
3. **Test locally** using Expo
4. **Build for production**

### For AI Agents

This skeleton is designed to be AI-friendly:

1. **All configuration is in JSON files** - Easy to parse and modify
2. **Inline documentation** in components explains customization points
3. **Clear separation** between shell, data layer, and UI
4. **Type definitions** provide structure understanding

#### Common AI Tasks:

**Add a new page:**
```
1. Update src/config/pages.config.json
2. Create screen file in src/screens/dashboard/
3. Add route to src/navigation/AppNavigator.tsx
```

**Add a new filter:**
```
1. Update src/config/filters.config.json
2. No code changes needed - automatically rendered
```

**Replace placeholder with real chart:**
```
1. Open the graph component (e.g., LineChartGraph.tsx)
2. Replace PlaceholderGraph with Victory Native chart
3. Map data to chart format
```

**Add Cube.js query:**
```
1. Add cubeJsQuery to graph in pages.config.json
2. Or use queryBuilder utilities
3. Graph components automatically apply filters
```

## 📚 API Reference

### Hooks

#### `useFilterStore`
```typescript
const { filters, setFilter, resetAllFilters } = useFilterStore();
```

#### `useAppStore`
```typescript
const { sidebarCollapsed, toggleSidebar, currentPage } = useAppStore();
```

#### `useApiStore`
```typescript
const { config, activeClient, setActiveClient } = useApiStore();
```

### Services

#### `cubeJsService`
```typescript
// Initialize
initializeCubeJs(apiUrl, apiToken);

// Execute query
const data = await executeQuery(query, filters);

// Transform filters
const cubeFilters = transformFiltersToQuery(filterState);
```

### Utilities

#### `queryBuilder`
```typescript
// Build line chart query
buildLineChartQuery({ measures, timeDimension, granularity });

// Build bar chart query
buildBarChartQuery({ measures, dimensions, limit });
```

## 🚢 Deployment

### Multi-Client Setup

1. **Create client configuration** in `api.config.json`:
```json
{
  "clients": {
    "client1": {
      "id": "client1",
      "name": "Client 1",
      "cubeJs": {
        "apiUrl": "https://client1.cube.api",
        "apiToken": "token1"
      }
    }
  },
  "activeClient": "client1"
}
```

2. **Switch clients** programmatically:
```typescript
setActiveClient('client2');
```

### Building for Production

```bash
# Build for specific platform
expo build:android
expo build:ios
expo build:web

# Or using EAS
eas build --platform android
eas build --platform ios
```

## 🐛 Troubleshooting

**Problem: Filters not updating graphs**
- Solution: Ensure graphs are using `useFilterStore` hook
- Check filter cubeJsMapping in filters.config.json

**Problem: Cube.js connection fails**
- Solution: Verify API URL and token in Settings
- Check network connectivity
- Ensure CORS is configured on Cube.js server

**Problem: Graphs not rendering**
- Solution: Check console for errors
- Verify page configuration in pages.config.json
- Ensure graph type matches available components

**Problem: EMFILE: too many open files (macOS)**
- Symptom: Error `EMFILE: too many open files, watch` when running `npm start`
- Cause: macOS file descriptor limit is too low for Metro bundler's file watcher
- Solution: Check your system first with `npm run check-system`, then increase the file descriptor limit using one of these methods:

  **Temporary fix (current terminal session):**
  ```bash
  ulimit -n 4096
  npm start
  ```

  **Permanent fix (add to ~/.zshrc or ~/.bash_profile):**
  ```bash
  ulimit -n 4096
  ```
  Then restart your terminal or run `source ~/.zshrc`

  **System-wide fix (requires admin):**
  Create `/Library/LaunchDaemons/limit.maxfiles.plist` with appropriate limits (recommended for shared development machines)

## 📖 Additional Documentation

- [Cube.js Documentation](https://cube.dev/docs)
- [React Navigation](https://reactnavigation.org/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Victory Native Charts](https://formidable.com/open-source/victory/docs/native/)

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions welcome! Please read CONTRIBUTING.md for guidelines.

## 📧 Support

For issues or questions, please open a GitHub issue.

---

**Built with ❤️ for multi-client dashboard deployments**
