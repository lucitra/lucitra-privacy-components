// Legacy cookie manager (kept for low-level utilities)
export { 
  LucitraCookieManager, 
  getCookieManager, 
  useCookieManager, 
  COOKIE_CONFIG 
} from './CookieManager'

// Remaining privacy settings components
export { 
  PrivacySettingsButton, 
  CurrentPrivacySettings, 
  InlinePrivacyToggle 
} from './PrivacySettings.jsx'

// Simple cookie consent banner
export { SimpleCookieConsent } from './SimpleCookieConsent.jsx'

// GDPR & CCPA compliant cookie consent
export { ComplianceCookieConsent } from './ComplianceCookieConsent.jsx'

// Shared hooks for consent management
export { useConsentStorage, useConsentVisibility, generateConsentId } from './useConsentStorage.js'