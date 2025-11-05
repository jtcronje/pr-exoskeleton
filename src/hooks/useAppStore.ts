import { create } from 'zustand';

interface AppStore {
  sidebarCollapsed: boolean;
  filterPaneVisible: boolean;
  currentPage: string;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleFilterPane: () => void;
  setFilterPaneVisible: (visible: boolean) => void;
  setCurrentPage: (page: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  sidebarCollapsed: false,
  filterPaneVisible: true,
  currentPage: 'overview',

  toggleSidebar: () => {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
  },

  setSidebarCollapsed: (collapsed: boolean) => {
    set({ sidebarCollapsed: collapsed });
  },

  toggleFilterPane: () => {
    set((state) => ({ filterPaneVisible: !state.filterPaneVisible }));
  },

  setFilterPaneVisible: (visible: boolean) => {
    set({ filterPaneVisible: visible });
  },

  setCurrentPage: (page: string) => {
    set({ currentPage: page });
  },
}));
