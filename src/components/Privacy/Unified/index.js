/**
 * Unified Privacy System
 * 
 * Single, configurable privacy management system
 * Replaces all fragmented cookie consent components
 */

export { UnifiedPrivacyProvider } from './UnifiedPrivacyProvider';
export { useUnifiedPrivacy } from './UnifiedPrivacyContext';
export { UnifiedPrivacyManager } from './UnifiedPrivacyManager';
export { UnifiedPrivacyContext } from './UnifiedPrivacyContext';
export { 
  STANDARD_CATEGORIES, 
  DEFAULT_CONFIG, 
  mergeConfig, 
  getCategoryKeys, 
  getDefaultConsentState 
} from './privacyConfig';