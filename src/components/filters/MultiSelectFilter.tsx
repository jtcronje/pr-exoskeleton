import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
} from 'react-native';
import { theme } from '../../theme';
import { Filter, FilterOption } from '../../types';

interface MultiSelectFilterProps {
  filter: Filter;
  value: string[];
  onChange: (value: string[]) => void;
}

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({
  filter,
  value = [],
  onChange,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const handleSelectAll = () => {
    if (value.length === filter.options?.length) {
      onChange([]);
    } else {
      onChange(filter.options?.map((opt) => opt.value) || []);
    }
  };

  const getDisplayText = () => {
    if (!value || value.length === 0) {
      return 'Select...';
    }
    if (value.length === 1) {
      const option = filter.options?.find((opt) => opt.value === value[0]);
      return option?.label || value[0];
    }
    return `${value.length} selected`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectedText}>{getDisplayText()}</Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

      {value && value.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tagsContainer}
        >
          {value.map((v) => {
            const option = filter.options?.find((opt) => opt.value === v);
            return (
              <View key={v} style={styles.tag}>
                <Text style={styles.tagText}>{option?.label || v}</Text>
                <TouchableOpacity onPress={() => handleToggle(v)}>
                  <Text style={styles.tagRemove}>×</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{filter.name}</Text>
              {filter.config?.selectAll && (
                <TouchableOpacity onPress={handleSelectAll}>
                  <Text style={styles.selectAllText}>
                    {value.length === filter.options?.length
                      ? 'Deselect All'
                      : 'Select All'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <FlatList
              data={filter.options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleToggle(item.value)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      value.includes(item.value) && styles.checkboxSelected,
                    ]}
                  >
                    {value.includes(item.value) && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </View>
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: theme.spacing.xs,
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.background.paper,
    borderWidth: 1,
    borderColor: theme.colors.border.main,
    borderRadius: theme.borderRadius.sm,
  },
  selectedText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.primary,
    flex: 1,
  },
  arrow: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.secondary,
  },
  tagsContainer: {
    marginTop: theme.spacing.xs,
    flexDirection: 'row',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary.lighter,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    marginRight: theme.spacing.xs,
  },
  tagText: {
    fontSize: theme.typography.fontSize.xs,
    color: theme.colors.text.white,
    marginRight: theme.spacing.xs,
  },
  tagRemove: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.white,
    fontWeight: theme.typography.fontWeight.bold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    maxHeight: '70%',
    backgroundColor: theme.colors.background.paper,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  modalTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  selectAllText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.primary.main,
    fontWeight: theme.typography.fontWeight.medium,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: theme.colors.border.dark,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: theme.colors.primary.main,
    borderColor: theme.colors.primary.main,
  },
  checkmark: {
    color: theme.colors.text.white,
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.bold,
  },
  optionText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
  },
  doneButton: {
    backgroundColor: theme.colors.primary.main,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  doneButtonText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.white,
    fontWeight: theme.typography.fontWeight.semibold,
  },
});

export default MultiSelectFilter;
