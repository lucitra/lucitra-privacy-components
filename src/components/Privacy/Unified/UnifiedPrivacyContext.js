/**
 * Unified Privacy Context
 * 
 * Single source of truth for all privacy and consent management
 * Replaces fragmented state management across multiple components
 */

import { createContext, useContext } from 'react';

export const UnifiedPrivacyContext = createContext(null);

export const useUnifiedPrivacy = () => {
  const context = useContext(UnifiedPrivacyContext);
  if (!context) {
    throw new Error('useUnifiedPrivacy must be used within UnifiedPrivacyProvider');
  }
  return context;
};