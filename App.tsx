import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { theme } from './src/theme';
import AppNavigator from './src/navigation/AppNavigator';
import { useApiStore } from './src/hooks/useApiStore';
import { initializeCubeJs } from './src/services/cubeJsService';

/**
 * Main App Component
 *
 * Entry point for the Dashboard Skeleton application
 *
 * HOW TO CUSTOMIZE FOR AI AGENTS:
 * 1. This is the root component that initializes the app
 * 2. Cube.js is initialized on app start if credentials are configured
 * 3. The app uses:
 *    - React Navigation for routing
 *    - Zustand for state management
 *    - Custom theme from src/theme
 * 4. To modify the initial setup:
 *    - Edit initialization logic in useEffect
 *    - Update theme configuration in src/config/theme.config.json
 * 5. The app structure:
 *    - AppNavigator handles routing
 *    - DashboardLayout provides the shell
 *    - Screens render page content
 *    - Filters and state are managed globally
 */

const App: React.FC = () => {
  const { activeClient, config } = useApiStore();

  useEffect(() => {
    // Initialize Cube.js on app start if configured
    if (
      config.cubeJs.enabled &&
      activeClient?.cubeJs.apiUrl &&
      activeClient?.cubeJs.apiToken
    ) {
      initializeCubeJs(
        activeClient.cubeJs.apiUrl,
        activeClient.cubeJs.apiToken
      );
      console.log('Cube.js initialized for client:', activeClient.name);
    } else {
      console.log(
        'Cube.js not configured. Using placeholder data. Configure in Settings.'
      );
    }
  }, [activeClient, config.cubeJs.enabled]);

  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background.default} />
        <AppNavigator />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureHandler: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
  },
});

export default App;
