import { useContext } from 'react';
import { GranularAnalyticsContext } from './GranularAnalytics';

export const useGranularAnalytics = () => {
  const context = useContext(GranularAnalyticsContext);
  if (!context) {
    throw new Error('useGranularAnalytics must be used within GranularAnalyticsProvider');
  }
  return context;
};