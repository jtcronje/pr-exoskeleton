import React from 'react';
import pagesConfig from '../../config/pages.config.json';
import DashboardPage from './DashboardPage';

const AnalyticsScreen: React.FC = () => {
  const page = pagesConfig.pages.find((p: any) => p.id === 'analytics');
  if (!page) return null;
  return <DashboardPage page={page as any} />;
};

export default AnalyticsScreen;
