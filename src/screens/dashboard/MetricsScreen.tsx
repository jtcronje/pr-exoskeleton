import React from 'react';
import pagesConfig from '../../config/pages.config.json';
import DashboardPage from './DashboardPage';

const MetricsScreen: React.FC = () => {
  const page = pagesConfig.pages.find((p: any) => p.id === 'metrics');
  if (!page) return null;
  return <DashboardPage page={page as any} />;
};

export default MetricsScreen;
