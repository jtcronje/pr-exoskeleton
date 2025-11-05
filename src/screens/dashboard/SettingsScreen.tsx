import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { theme } from '../../theme';
import { Header } from '../../components/layout';
import { useApiStore } from '../../hooks/useApiStore';
import { initializeCubeJs, validateConnection } from '../../services/cubeJsService';

/**
 * Settings Screen
 *
 * Configure Cube.js API credentials and client settings
 *
 * HOW TO CUSTOMIZE FOR AI AGENTS:
 * 1. This screen manages API configuration
 * 2. To add a new client:
 *    - Use the "Add Client" section
 *    - Enter API URL and token
 *    - Save configuration
 * 3. To test connection:
 *    - Click "Test Connection" button
 *    - Validation happens via cubeJsService
 * 4. Configuration is saved in the API store (Zustand)
 * 5. For persistent storage, add AsyncStorage integration
 */

const SettingsScreen: React.FC = () => {
  const { config, activeClient, setActiveClient, updateClientConfig } = useApiStore();
  const [editing, setEditing] = useState(false);
  const [apiUrl, setApiUrl] = useState(activeClient?.cubeJs.apiUrl || '');
  const [apiToken, setApiToken] = useState(activeClient?.cubeJs.apiToken || '');
  const [testing, setTesting] = useState(false);

  const handleSave = () => {
    if (!activeClient) return;

    updateClientConfig(activeClient.id, {
      cubeJs: {
        apiUrl,
        apiToken,
      },
    });

    // Initialize Cube.js with new credentials
    initializeCubeJs(apiUrl, apiToken);

    setEditing(false);
    Alert.alert('Success', 'API configuration saved successfully');
  };

  const handleTestConnection = async () => {
    setTesting(true);
    try {
      initializeCubeJs(apiUrl, apiToken);
      const isValid = await validateConnection();

      if (isValid) {
        Alert.alert('Success', 'Connection to Cube.js API successful!');
      } else {
        Alert.alert('Error', 'Failed to connect to Cube.js API. Please check your credentials.');
      }
    } catch (error) {
      Alert.alert('Error', 'Connection test failed: ' + String(error));
    } finally {
      setTesting(false);
    }
  };

  const handleCancel = () => {
    setApiUrl(activeClient?.cubeJs.apiUrl || '');
    setApiToken(activeClient?.cubeJs.apiToken || '');
    setEditing(false);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Settings"
        subtitle="Configure API connections and dashboard settings"
      />

      <ScrollView style={styles.scrollView}>
        {/* Active Client Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Client</Text>
          <View style={styles.card}>
            <Text style={styles.label}>Client Name:</Text>
            <Text style={styles.value}>{activeClient?.name || 'No client selected'}</Text>

            <Text style={styles.label}>Client ID:</Text>
            <Text style={styles.value}>{activeClient?.id || 'N/A'}</Text>
          </View>
        </View>

        {/* API Configuration */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Cube.js API Configuration</Text>
            {!editing && (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setEditing(true)}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>API URL:</Text>
            {editing ? (
              <TextInput
                style={styles.input}
                value={apiUrl}
                onChangeText={setApiUrl}
                placeholder="https://api.example.com/cubejs-api/v1"
                placeholderTextColor={theme.colors.text.disabled}
              />
            ) : (
              <Text style={styles.value}>{apiUrl || 'Not configured'}</Text>
            )}

            <Text style={styles.label}>API Token:</Text>
            {editing ? (
              <TextInput
                style={styles.input}
                value={apiToken}
                onChangeText={setApiToken}
                placeholder="Your API token"
                placeholderTextColor={theme.colors.text.disabled}
                secureTextEntry={true}
              />
            ) : (
              <Text style={styles.value}>
                {apiToken ? '••••••••••••••••' : 'Not configured'}
              </Text>
            )}

            {editing && (
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.buttonSecondary]}
                  onPress={handleCancel}
                >
                  <Text style={styles.buttonSecondaryText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonPrimary]}
                  onPress={handleSave}
                >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            )}

            {!editing && (
              <TouchableOpacity
                style={[styles.button, styles.buttonPrimary, styles.testButton]}
                onPress={handleTestConnection}
                disabled={testing || !apiUrl || !apiToken}
              >
                <Text style={styles.buttonText}>
                  {testing ? 'Testing...' : 'Test Connection'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Setup Instructions</Text>
          <View style={styles.card}>
            <Text style={styles.instructionText}>
              1. Obtain your Cube.js API URL and token from your Cube.js deployment
            </Text>
            <Text style={styles.instructionText}>
              2. Click "Edit" and enter your credentials
            </Text>
            <Text style={styles.instructionText}>
              3. Click "Save" to store the configuration
            </Text>
            <Text style={styles.instructionText}>
              4. Click "Test Connection" to verify the setup
            </Text>
            <Text style={styles.instructionText}>
              5. Once connected, all dashboard graphs will use real data
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: theme.spacing.md,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.background.card,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border.main,
  },
  label: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.secondary,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  value: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  input: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background.default,
    borderWidth: 1,
    borderColor: theme.colors.border.main,
    borderRadius: theme.borderRadius.sm,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  button: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    minWidth: 100,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.primary.main,
  },
  buttonSecondary: {
    backgroundColor: theme.colors.secondary.light,
  },
  buttonText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.white,
  },
  buttonSecondaryText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.white,
  },
  editButton: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.primary.lighter,
    borderRadius: theme.borderRadius.sm,
  },
  editButtonText: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.white,
  },
  testButton: {
    marginTop: theme.spacing.md,
  },
  instructionText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
    lineHeight: 20,
  },
});

export default SettingsScreen;
