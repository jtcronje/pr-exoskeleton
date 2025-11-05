import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { theme } from '../../theme';
import { Filter, FilterOption } from '../../types';

interface SingleSelectFilterProps {
  filter: Filter;
  value: string;
  onChange: (value: string) => void;
}

const SingleSelectFilter: React.FC<SingleSelectFilterProps> = ({
  filter,
  value,
  onChange,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedOption = filter.options?.find((opt) => opt.value === value);

  const handleSelect = (option: FilterOption) => {
    onChange(option.value);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectedText}>
          {selectedOption?.label || 'Select...'}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>

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
            <Text style={styles.modalTitle}>{filter.name}</Text>
            <FlatList
              data={filter.options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    item.value === value && styles.optionSelected,
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.value === value && styles.optionTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {item.value === value && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
              )}
            />
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
  modalTitle: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  optionSelected: {
    backgroundColor: theme.colors.primary.lighter + '20',
  },
  optionText: {
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
  },
  optionTextSelected: {
    color: theme.colors.primary.main,
    fontWeight: theme.typography.fontWeight.semibold,
  },
  checkmark: {
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.primary.main,
  },
});

export default SingleSelectFilter;
