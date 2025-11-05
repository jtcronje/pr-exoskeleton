import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { theme } from '../../theme';
import { useAppStore } from '../../hooks/useAppStore';
import pagesConfig from '../../config/pages.config.json';
import { useNavigation } from '@react-navigation/native';

/**
 * Sidebar Navigation Component
 *
 * Collapsible left sidebar with page navigation
 *
 * HOW TO CUSTOMIZE FOR AI AGENTS:
 * 1. Pages are configured in src/config/pages.config.json
 * 2. To add a new page:
 *    - Add page definition to pages.config.json with icon and route
 *    - Create corresponding screen component
 *    - Add route to navigation setup
 * 3. To rename a page:
 *    - Update the "name" field in pages.config.json
 * 4. To reorder pages:
 *    - Reorder the pages array in pages.config.json
 * 5. Icon names come from MaterialCommunityIcons
 *    - See: https://materialdesignicons.com/
 */

const Sidebar: React.FC = () => {
  const navigation = useNavigation<any>();
  const { sidebarCollapsed, toggleSidebar, currentPage, setCurrentPage } =
    useAppStore();

  const handleNavigate = (page: any) => {
    setCurrentPage(page.id);
    navigation.navigate(page.route);
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: sidebarCollapsed
            ? theme.sidebar.width.collapsed
            : theme.sidebar.width.expanded,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        {!sidebarCollapsed && (
          <Text style={styles.headerTitle}>Dashboard</Text>
        )}
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={toggleSidebar}
        >
          <Text style={styles.toggleIcon}>
            {sidebarCollapsed ? '▶' : '◀'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Navigation Items */}
      <ScrollView style={styles.scrollView}>
        {pagesConfig.pages.map((page: any) => (
          <TouchableOpacity
            key={page.id}
            style={[
              styles.navItem,
              currentPage === page.id && styles.navItemActive,
            ]}
            onPress={() => handleNavigate(page)}
            activeOpacity={0.7}
          >
            <View style={styles.navItemContent}>
              <Text style={styles.icon}>
                {getIconForName(page.icon)}
              </Text>
              {!sidebarCollapsed && (
                <Text
                  style={[
                    styles.navItemText,
                    currentPage === page.id && styles.navItemTextActive,
                  ]}
                >
                  {page.name}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer */}
      {!sidebarCollapsed && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>v1.0.0</Text>
          <Text style={styles.footerText}>Dashboard Skeleton</Text>
        </View>
      )}
    </View>
  );
};

// Simple icon mapping - replace with actual icon library in production
const getIconForName = (iconName: string): string => {
  const iconMap: { [key: string]: string } = {
    'view-dashboard': '📊',
    'chart-line': '📈',
    'file-document': '📄',
    'chart-box': '📉',
    'lightbulb': '💡',
    'cog': '⚙️',
  };
  return iconMap[iconName] || '📌';
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background.sidebar,
    height: '100%',
    borderRightWidth: 1,
    borderRightColor: theme.colors.border.dark,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.dark,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.white,
  },
  toggleButton: {
    padding: theme.spacing.xs,
  },
  toggleIcon: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.white,
  },
  scrollView: {
    flex: 1,
    paddingTop: theme.spacing.sm,
  },
  navItem: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    marginHorizontal: theme.spacing.xs,
    marginBottom: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  navItemActive: {
    backgroundColor: theme.colors.background.sidebarHover,
  },
  navItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing.sm,
  },
  navItemText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.white,
    fontWeight: theme.typography.fontWeight.regular,
  },
  navItemTextActive: {
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.primary.lighter,
  },
  footer: {
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border.dark,
    alignItems: 'center',
  },
  footerText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.disabled,
  },
});

export default Sidebar;
