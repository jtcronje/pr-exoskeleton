import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DashboardLayout from '../components/layout/DashboardLayout';
import {
  OverviewScreen,
  AnalyticsScreen,
  ReportsScreen,
  MetricsScreen,
  InsightsScreen,
  SettingsScreen,
} from '../screens/dashboard';

/**
 * App Navigator
 *
 * Navigation setup using React Navigation Drawer
 *
 * HOW TO CUSTOMIZE FOR AI AGENTS:
 * 1. To add a new page/route:
 *    - Add the page to src/config/pages.config.json
 *    - Create the screen component in src/screens/dashboard/
 *    - Import and add to the Drawer.Screen list below
 * 2. To remove a page:
 *    - Remove from pages.config.json
 *    - Remove the corresponding Drawer.Screen below
 * 3. The drawer is hidden because we use a custom Sidebar component
 * 4. Navigation is controlled by the Sidebar component
 */

const Drawer = createDrawerNavigator();

// Wrapper component to include layout
const ScreenWrapper = (Component: React.ComponentType) => {
  return () => (
    <DashboardLayout>
      <Component />
    </DashboardLayout>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerType: 'permanent',
          drawerStyle: {
            width: 0, // Hide default drawer since we use custom Sidebar
          },
        }}
        initialRouteName="Overview"
      >
        <Drawer.Screen
          name="Overview"
          component={ScreenWrapper(OverviewScreen)}
        />
        <Drawer.Screen
          name="Analytics"
          component={ScreenWrapper(AnalyticsScreen)}
        />
        <Drawer.Screen
          name="Reports"
          component={ScreenWrapper(ReportsScreen)}
        />
        <Drawer.Screen
          name="Metrics"
          component={ScreenWrapper(MetricsScreen)}
        />
        <Drawer.Screen
          name="Insights"
          component={ScreenWrapper(InsightsScreen)}
        />
        <Drawer.Screen
          name="Settings"
          component={ScreenWrapper(SettingsScreen)}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
