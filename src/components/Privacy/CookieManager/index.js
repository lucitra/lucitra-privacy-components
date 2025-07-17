// Legacy cookie manager
export { 
  LucitraCookieManager, 
  getCookieManager, 
  useCookieManager, 
  COOKIE_CONFIG 
} from './CookieManager'

// Enhanced granular cookie system
export { 
  GranularAnalytics, 
  GranularAnalyticsProvider
} from './GranularAnalytics.jsx'

export { useGranularAnalytics } from './useGranularAnalytics'

// Individual components (still available for granular usage)
export { GranularConsentModal } from './GranularConsentModal.jsx'
export { SimplePrivacyNotice } from './SimplePrivacyNotice.jsx'

// Consolidated component with MantineProvider handling
export { CookieConsentManager } from './CookieConsentManager.jsx'
export { 
  PrivacySettingsButton, 
  CurrentPrivacySettings, 
  InlinePrivacyToggle 
} from './PrivacySettings.jsx'
export { GranularCookieDemo } from './GranularCookieDemo.jsx'

// Enterprise consent management system
export { EnterpriseConsentManager } from './EnterpriseConsentManager.jsx'

// Legacy components for backwards compatibility
export { default as CookieConsentBanner } from './CookieConsentBanner.jsx'