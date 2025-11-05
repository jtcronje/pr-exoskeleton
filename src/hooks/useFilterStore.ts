import { create } from 'zustand';
import { FilterState } from '../types';
import filtersConfig from '../config/filters.config.json';

interface FilterStore {
  filters: FilterState;
  setFilter: (filterId: string, value: any) => void;
  setFilters: (filters: FilterState) => void;
  resetFilter: (filterId: string) => void;
  resetAllFilters: () => void;
  getFilterValue: (filterId: string) => any;
}

// Initialize default filter values from config
const getDefaultFilters = (): FilterState => {
  const defaults: FilterState = {};
  filtersConfig.filters.forEach((filter) => {
    defaults[filter.id] = filter.defaultValue;
  });
  return defaults;
};

export const useFilterStore = create<FilterStore>((set, get) => ({
  filters: getDefaultFilters(),

  setFilter: (filterId: string, value: any) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [filterId]: value,
      },
    }));
  },

  setFilters: (filters: FilterState) => {
    set({ filters });
  },

  resetFilter: (filterId: string) => {
    const defaultFilters = getDefaultFilters();
    set((state) => ({
      filters: {
        ...state.filters,
        [filterId]: defaultFilters[filterId],
      },
    }));
  },

  resetAllFilters: () => {
    set({ filters: getDefaultFilters() });
  },

  getFilterValue: (filterId: string) => {
    return get().filters[filterId];
  },
}));
