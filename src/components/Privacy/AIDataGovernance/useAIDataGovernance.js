import { useContext } from 'react';
import { AIDataGovernanceContext } from './AIDataGovernance';

export const useAIDataGovernance = () => {
  const context = useContext(AIDataGovernanceContext);
  if (!context) {
    throw new Error('useAIDataGovernance must be used within AIDataGovernanceProvider');
  }
  return context;
};