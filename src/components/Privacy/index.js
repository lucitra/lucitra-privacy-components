// =============================================================================
// UNIFIED PRIVACY SYSTEM
// =============================================================================
// Single, configurable privacy management system for all use cases

export * from './Unified'

// =============================================================================
// SPECIALIZED COMPONENTS
// =============================================================================
// Specialized components for enterprise and advanced use cases

// Privacy Enhancing Technology Components
// Enterprise-grade privacy controls for immediate PET revenue
// Gaming privacy demos to showcase technology capabilities

export { EnterprisePrivacyManager } from './EnterprisePrivacyManager'
export { GamingPrivacyConsent } from './GamingPrivacyConsent'
export { PrivacyBudgetVisualization } from './PrivacyBudgetVisualization'
export { PrivacyProvider } from './PrivacyProvider'

// AI Data Governance System - Complete legal compliance suite
export * from './AIDataGovernance'

// Production Cookie Manager - Real browser cookies with compliance
export * from './CookieManager'

// Privacy Settings Components
export {
  PrivacySettingsButton,
  CurrentPrivacySettings,
  InlinePrivacyToggle,
  EnterpriseConsentManager,
  SimpleCookieConsent
} from './CookieManager'

// UI Design System Components - Reusable modular components
export {
  ModularCard,
  StatusIndicator,
  ModularButton,
  ModularBadge,
  CodeBlock,
  AlertBox,
  ProgressBar,
  TabButton
} from './UI'

// Types and utilities
export * from './constants/privacyConstants'