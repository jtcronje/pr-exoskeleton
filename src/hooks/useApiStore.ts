import { create } from 'zustand';
import { ApiConfig, ClientConfig } from '../types';
import apiConfigJson from '../config/api.config.json';

interface ApiStore {
  config: ApiConfig;
  activeClient: ClientConfig | null;
  setApiConfig: (config: Partial<ApiConfig>) => void;
  setActiveClient: (clientId: string) => void;
  updateClientConfig: (clientId: string, config: Partial<ClientConfig>) => void;
  addClient: (client: ClientConfig) => void;
  removeClient: (clientId: string) => void;
}

export const useApiStore = create<ApiStore>((set, get) => ({
  config: apiConfigJson as ApiConfig,
  activeClient: (apiConfigJson as ApiConfig).clients[(apiConfigJson as ApiConfig).activeClient] || null,

  setApiConfig: (newConfig: Partial<ApiConfig>) => {
    set((state) => ({
      config: {
        ...state.config,
        ...newConfig,
      },
    }));
  },

  setActiveClient: (clientId: string) => {
    const { config } = get();
    const client = config.clients[clientId];
    if (client) {
      set({
        config: {
          ...config,
          activeClient: clientId,
        },
        activeClient: client,
      });
    }
  },

  updateClientConfig: (clientId: string, newConfig: Partial<ClientConfig>) => {
    set((state) => ({
      config: {
        ...state.config,
        clients: {
          ...state.config.clients,
          [clientId]: {
            ...state.config.clients[clientId],
            ...newConfig,
          },
        },
      },
    }));
  },

  addClient: (client: ClientConfig) => {
    set((state) => ({
      config: {
        ...state.config,
        clients: {
          ...state.config.clients,
          [client.id]: client,
        },
      },
    }));
  },

  removeClient: (clientId: string) => {
    set((state) => {
      const { [clientId]: removed, ...remainingClients } = state.config.clients;
      return {
        config: {
          ...state.config,
          clients: remainingClients,
        },
      };
    });
  },
}));
