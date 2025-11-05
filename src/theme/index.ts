import { Theme } from '../types';
import themeConfig from '../config/theme.config.json';

export const theme: Theme = themeConfig as Theme;

// Helper functions for theme access
export const getColor = (path: string): string => {
  const keys = path.split('.');
  let value: any = theme.colors;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return '#000000'; // Fallback color
    }
  }

  return typeof value === 'string' ? value : '#000000';
};

export const getSpacing = (size: keyof Theme['spacing']): number => {
  return theme.spacing[size] || 0;
};

export const getFontSize = (size: keyof Theme['typography']['fontSize']): number => {
  return theme.typography.fontSize[size] || 16;
};

export const getBorderRadius = (size: keyof Theme['borderRadius']): number => {
  return theme.borderRadius[size] || 0;
};

export default theme;
