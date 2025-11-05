# AI Agent Customization Guide

This guide is specifically written for AI agents to understand how to modify and extend the Dashboard Skeleton.

## 🎯 Quick Reference

### File Locations

| What to Modify | File Path |
|---------------|-----------|
| Add/Remove Pages | `src/config/pages.config.json` |
| Add/Remove Filters | `src/config/filters.config.json` |
| API Configuration | `src/config/api.config.json` |
| Theme/Colors | `src/config/theme.config.json` |
| Graph Components | `src/components/graphs/` |
| Filter Components | `src/components/filters/` |
| Page Screens | `src/screens/dashboard/` |
| Navigation Routes | `src/navigation/AppNavigator.tsx` |

## 📋 Common Tasks

### Task 1: Add a New Page

**Steps:**

1. **Update pages configuration**
   - File: `src/config/pages.config.json`
   - Action: Add new page object to `pages` array

```json
{
  "id": "unique-page-id",
  "name": "Display Name",
  "icon": "material-icon-name",
  "route": "RouteName",
  "description": "Brief description",
  "graphs": [
    {
      "id": "graph-1",
      "type": "LineChart",
      "title": "Graph Title",
      "position": { "row": 0, "col": 0, "width": 12, "height": 4 }
    }
  ]
}
```

2. **Create screen component**
   - File: `src/screens/dashboard/NewPageScreen.tsx`
   - Template:

```typescript
import React from 'react';
import pagesConfig from '../../config/pages.config.json';
import DashboardPage from './DashboardPage';

const NewPageScreen: React.FC = () => {
  const page = pagesConfig.pages.find((p: any) => p.id === 'unique-page-id');
  if (!page) return null;
  return <DashboardPage page={page as any} />;
};

export default NewPageScreen;
```

3. **Export from index**
   - File: `src/screens/dashboard/index.ts`
   - Action: Add export line

```typescript
export { default as NewPageScreen } from './NewPageScreen';
```

4. **Add to navigation**
   - File: `src/navigation/AppNavigator.tsx`
   - Action: Import and add Drawer.Screen

```typescript
import { NewPageScreen } from '../screens/dashboard';

// Inside Drawer.Navigator:
<Drawer.Screen
  name="RouteName"
  component={ScreenWrapper(NewPageScreen)}
/>
```

### Task 2: Rename a Page

**Steps:**

1. Open `src/config/pages.config.json`
2. Find the page by `id`
3. Change the `name` field
4. Save file

**Example:**
```json
{
  "id": "overview",
  "name": "New Name Here",  // <-- Change this
  "icon": "view-dashboard",
  "route": "Overview"
}
```

**Note:** Changing `name` only affects display. To change the route, you must also update `route` field and navigation setup.

### Task 3: Add a New Filter

**Steps:**

1. **Update filters configuration**
   - File: `src/config/filters.config.json`
   - Action: Add new filter object to `filters` array

```json
{
  "id": "myNewFilter",
  "name": "My New Filter",
  "type": "singleSelect",
  "defaultValue": "all",
  "options": [
    { "value": "all", "label": "All" },
    { "value": "option1", "label": "Option 1" },
    { "value": "option2", "label": "Option 2" }
  ],
  "cubeJsMapping": {
    "dimension": "Model.field",
    "operator": "equals"
  }
}
```

2. **Add to filter group**
   - Same file: `src/config/filters.config.json`
   - Action: Add filter ID to appropriate group

```json
{
  "id": "business",
  "name": "Business Filters",
  "filters": ["category", "status", "myNewFilter"]  // <-- Add here
}
```

3. **No code changes needed** - Filter automatically renders

**Filter Type Options:**
- `singleSelect`: Dropdown with single selection
- `multiSelect`: Multi-select with checkboxes
- `dateRange`: Date range picker
- `number`: Numeric input field

### Task 4: Remove a Page

**Steps:**

1. Remove page from `src/config/pages.config.json`
2. Remove screen file from `src/screens/dashboard/`
3. Remove export from `src/screens/dashboard/index.ts`
4. Remove Drawer.Screen from `src/navigation/AppNavigator.tsx`

### Task 5: Add Cube.js Query to Graph

**Method A: Direct in Configuration**

File: `src/config/pages.config.json`

```json
{
  "id": "my-graph",
  "type": "LineChart",
  "title": "Sales Trend",
  "position": { "row": 0, "col": 0, "width": 12, "height": 4 },
  "cubeJsQuery": {
    "measures": ["Orders.count", "Orders.totalAmount"],
    "timeDimensions": [{
      "dimension": "Orders.createdAt",
      "granularity": "day",
      "dateRange": "last 30 days"
    }],
    "dimensions": ["Products.category"],
    "filters": [],
    "order": {
      "Orders.createdAt": "asc"
    }
  }
}
```

**Method B: Using Query Builder**

1. Import builder in component
2. Create query
3. Pass to graph

```typescript
import { buildLineChartQuery } from '../../utils/queryBuilder';

const query = buildLineChartQuery({
  measures: ['Orders.count'],
  timeDimension: 'Orders.createdAt',
  granularity: 'day',
  dateRange: 'last 30 days',
});
```

### Task 6: Replace Placeholder Graph with Real Chart

**Steps:**

1. **Choose graph component**
   - File: e.g., `src/components/graphs/LineChartGraph.tsx`

2. **Install charting library** (if not installed)
```bash
npm install victory-native
```

3. **Replace placeholder**

```typescript
import { VictoryChart, VictoryLine, VictoryAxis } from 'victory-native';

// Replace the return statement with:
return (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <VictoryChart>
      <VictoryAxis />
      <VictoryLine
        data={data}
        x="date"
        y="value"
      />
    </VictoryChart>
  </View>
);
```

4. **Format data for chart**
```typescript
const chartData = data.map(item => ({
  x: item.date,
  y: item.value
}));
```

### Task 7: Modify Theme Colors

**Steps:**

1. Open `src/config/theme.config.json`
2. Modify color values

```json
{
  "colors": {
    "primary": {
      "main": "#1E3A8A",      // <-- Change these
      "light": "#3B82F6",
      "lighter": "#60A5FA"
    }
  }
}
```

3. Restart app to apply changes

### Task 8: Configure Cube.js API

**Option A: Through UI**
1. Navigate to Settings page in app
2. Click "Edit"
3. Enter API URL and token
4. Click "Save"
5. Click "Test Connection"

**Option B: Through Configuration**

File: `src/config/api.config.json`

```json
{
  "cubeJs": {
    "enabled": true,
    "apiUrl": "https://your-cube-api.com/cubejs-api/v1",
    "apiToken": "your-api-token-here"
  },
  "clients": {
    "default": {
      "id": "default",
      "name": "Default Client",
      "cubeJs": {
        "apiUrl": "https://your-cube-api.com/cubejs-api/v1",
        "apiToken": "your-api-token-here"
      }
    }
  },
  "activeClient": "default"
}
```

### Task 9: Add Multi-Client Support

**Steps:**

1. **Add client configuration**
   - File: `src/config/api.config.json`

```json
{
  "clients": {
    "client1": {
      "id": "client1",
      "name": "Client 1 Name",
      "cubeJs": {
        "apiUrl": "https://client1.cube.api/cubejs-api/v1",
        "apiToken": "client1-token"
      },
      "theme": {
        "primary": "#1E3A8A",
        "secondary": "#374151",
        "accent": "#60A5FA"
      }
    },
    "client2": {
      "id": "client2",
      "name": "Client 2 Name",
      "cubeJs": {
        "apiUrl": "https://client2.cube.api/cubejs-api/v1",
        "apiToken": "client2-token"
      }
    }
  },
  "activeClient": "client1"
}
```

2. **Switch client programmatically**

```typescript
import { useApiStore } from '../hooks/useApiStore';

const { setActiveClient } = useApiStore();
setActiveClient('client2');
```

## 🔍 Understanding the Architecture

### Data Flow

```
User Action → Filter Component → Filter Store (Zustand)
                                      ↓
                              Graph Component
                                      ↓
                              Cube.js Service
                                      ↓
                              API Request → Data → Graph Render
```

### Component Hierarchy

```
App.tsx
├── AppNavigator
│   └── DashboardLayout
│       ├── Sidebar (left navigation)
│       ├── Content Area (pages)
│       │   ├── Header
│       │   └── Graphs
│       └── FilterPane (right sidebar)
```

### State Management

Three main stores:

1. **FilterStore** (`useFilterStore`)
   - Manages all filter values
   - Propagates to all graph components
   - File: `src/hooks/useFilterStore.ts`

2. **AppStore** (`useAppStore`)
   - UI state (sidebar collapsed, filter pane visible)
   - Current page
   - File: `src/hooks/useAppStore.ts`

3. **ApiStore** (`useApiStore`)
   - API configuration
   - Active client
   - Multi-client management
   - File: `src/hooks/useApiStore.ts`

## 🎨 Styling Guidelines

### Using Theme

```typescript
import { theme } from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.default,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
  },
  text: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
  }
});
```

### Available Theme Values

- **Colors**: `theme.colors.primary.main`, `theme.colors.text.primary`, etc.
- **Spacing**: `theme.spacing.sm`, `theme.spacing.md`, `theme.spacing.lg`
- **Typography**: `theme.typography.fontSize.base`, `theme.typography.fontWeight.semibold`
- **Border Radius**: `theme.borderRadius.sm`, `theme.borderRadius.md`

## 🐛 Debugging Tips

### Check Configuration

```typescript
// Log page configuration
import pagesConfig from './config/pages.config.json';
console.log('Pages:', pagesConfig.pages);

// Log filter configuration
import filtersConfig from './config/filters.config.json';
console.log('Filters:', filtersConfig.filters);
```

### Check Filter State

```typescript
const filters = useFilterStore((state) => state.filters);
console.log('Current filters:', filters);
```

### Check API Configuration

```typescript
const { config, activeClient } = useApiStore();
console.log('API Config:', config);
console.log('Active Client:', activeClient);
```

## 📦 Adding Dependencies

### Common Libraries

**For real charts:**
```bash
npm install victory-native
# or
npm install react-native-chart-kit
```

**For date pickers:**
```bash
npm install react-native-date-picker
# or
npm install @react-native-community/datetimepicker
```

**For icons:**
```bash
npm install react-native-vector-icons
```

## ✅ Validation Checklist

Before completing modifications:

- [ ] Configuration files are valid JSON
- [ ] All referenced IDs exist (page IDs, filter IDs, etc.)
- [ ] Graph types match available components
- [ ] Filter types are supported
- [ ] Routes match screen components
- [ ] Cube.js queries have correct structure
- [ ] Theme values are valid (colors as hex strings, numbers for spacing)
- [ ] TypeScript types are correct
- [ ] No console errors on app start

## 🚀 Testing Your Changes

1. **Start development server**
```bash
npm start
```

2. **Check console for errors**

3. **Navigate to modified page**

4. **Test filters**
   - Apply filters
   - Check if graphs update
   - Reset filters

5. **Test responsiveness**
   - Collapse sidebar
   - Hide filter pane
   - Check different screen sizes

## 📚 Additional Resources

- TypeScript types: `src/types/index.ts`
- Service layer: `src/services/cubeJsService.ts`
- Query builders: `src/utils/queryBuilder.ts`
- Example graphs: `src/components/graphs/`
- Example filters: `src/components/filters/`

---

**Remember**: Most changes can be made through JSON configuration files without touching code!
