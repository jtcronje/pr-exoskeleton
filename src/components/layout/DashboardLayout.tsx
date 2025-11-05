import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../theme';
import { useAppStore } from '../../hooks/useAppStore';
import Sidebar from './Sidebar';
import FilterPane from '../filters/FilterPane';

/**
 * Dashboard Layout Component
 *
 * Main layout wrapper that includes sidebar, content area, and filter pane
 *
 * HOW TO CUSTOMIZE FOR AI AGENTS:
 * 1. This component provides the overall dashboard structure
 * 2. Layout is responsive and adjusts to sidebar/filter pane state
 * 3. Content area is where page components are rendered
 * 4. To modify layout behavior:
 *    - Adjust width calculations in styles
 *    - Modify responsive breakpoints
 *    - Update padding/spacing from theme config
 */

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { sidebarCollapsed, filterPaneVisible } = useAppStore();

  const getSidebarWidth = () => {
    return sidebarCollapsed
      ? theme.sidebar.width.collapsed
      : theme.sidebar.width.expanded;
  };

  const getFilterPaneWidth = () => {
    return filterPaneVisible ? theme.filterPane.width : 0;
  };

  return (
    <View style={styles.container}>
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <View
        style={[
          styles.content,
          {
            width:
              Dimensions.get('window').width -
              getSidebarWidth() -
              getFilterPaneWidth(),
          },
        ]}
      >
        {children}
      </View>

      {/* Right Filter Pane */}
      {filterPaneVisible && <FilterPane />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.colors.background.default,
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
  },
});

export default DashboardLayout;
