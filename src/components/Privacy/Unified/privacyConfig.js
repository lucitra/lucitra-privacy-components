/**
 * Unified Privacy Configuration
 * 
 * Standardized configuration for all privacy components
 * Replaces scattered category definitions and settings
 */

// Standard privacy categories used across all components
export const STANDARD_CATEGORIES = {
  essential: {
    name: 'Essential',
    description: 'Required for the platform to work (login, preferences, security)',
    required: true,
    icon: 'IconShield',
    examples: ['Session management', 'Authentication', 'Security tokens', 'Error reporting']
  },
  analytics: {
    name: 'Analytics & Performance',
    description: 'Help us understand platform usage patterns to improve performance and user experience',
    required: false,
    icon: 'IconDatabase',
    examples: ['Page views', 'User journeys', 'Performance metrics', 'Feature usage']
  },
  marketing: {
    name: 'Marketing & Personalization',
    description: 'Enable personalized content recommendations and relevant feature suggestions',
    required: false,
    icon: 'IconUsers',
    examples: ['Content preferences', 'A/B testing', 'Feature recommendations', 'User targeting']
  },
  ai_training: {
    name: 'AI Training Participation',
    description: 'Allow your anonymized 3D creations and text prompts to help train our AI models',
    required: false,
    icon: 'IconBrain',
    examples: ['3D content analysis', 'Model improvement', 'Research participation', 'Bias detection']
  }
};

// Default configuration that can be overridden
export const DEFAULT_CONFIG = {
  // Display configuration
  mode: 'banner', // banner | modal | dashboard | embedded
  variant: 'simple', // simple | detailed | enterprise
  position: 'bottom', // top | bottom
  
  // Categories to use (can override with custom categories)
  categories: STANDARD_CATEGORIES,
  
  // Storage configuration
  storage: {
    type: 'cookies', // cookies | localStorage | both
    cookieName: 'lucitra_consent',
    domain: typeof window !== 'undefined' ? window.location.hostname : '',
    path: '/',
    secure: true,
    sameSite: 'Lax',
    expireDays: 365
  },
  
  // Compliance configuration
  compliance: {
    frameworks: ['GDPR'], // GDPR | CCPA | Custom
    auditTrail: true,
    consentRenewal: 365, // days
    showOnFirstVisit: true,
    requireExplicitConsent: false // true = no pre-selected options
  },
  
  // UI configuration
  ui: {
    theme: 'default', // default | dark | light | custom
    colors: {
      primary: '#000000',
      secondary: '#6b7280',
      accent: '#3b82f6',
      background: '#ffffff',
      text: '#000000'
    },
    animations: true,
    showProgress: true,
    showExamples: true
  },
  
  // Branding configuration
  branding: {
    title: 'Privacy Preferences',
    subtitle: 'Control how we use cookies and process your data',
    companyName: 'Lucitra',
    privacyPolicyUrl: '/privacy',
    cookiePolicyUrl: '/cookies'
  },
  
  // Behavior configuration
  behavior: {
    hideAfterConsent: true,
    autoShowModal: false,
    respectDoNotTrack: true,
    defaultConsentState: 'unset', // unset | all_true | all_false | essential_only
    customizePreselection: 'all_true' // all_true | all_false | current_state
  }
};

// Helper function to merge user config with defaults
export const mergeConfig = (userConfig = {}) => {
  return {
    ...DEFAULT_CONFIG,
    ...userConfig,
    storage: {
      ...DEFAULT_CONFIG.storage,
      ...userConfig.storage
    },
    compliance: {
      ...DEFAULT_CONFIG.compliance,
      ...userConfig.compliance
    },
    ui: {
      ...DEFAULT_CONFIG.ui,
      ...userConfig.ui,
      colors: {
        ...DEFAULT_CONFIG.ui.colors,
        ...userConfig.ui?.colors
      }
    },
    branding: {
      ...DEFAULT_CONFIG.branding,
      ...userConfig.branding
    },
    behavior: {
      ...DEFAULT_CONFIG.behavior,
      ...userConfig.behavior
    },
    categories: userConfig.categories || DEFAULT_CONFIG.categories
  };
};

// Helper to get category keys
export const getCategoryKeys = (categories = STANDARD_CATEGORIES) => {
  return Object.keys(categories);
};

// Helper to get default consent state based on config
export const getDefaultConsentState = (config) => {
  const categories = config.categories;
  const behavior = config.behavior.defaultConsentState;
  
  const state = {};
  
  Object.keys(categories).forEach(key => {
    const category = categories[key];
    
    if (category.required) {
      state[key] = true; // Required categories always true
    } else {
      switch (behavior) {
        case 'all_true':
          state[key] = true;
          break;
        case 'all_false':
          state[key] = false;
          break;
        case 'essential_only':
          state[key] = false;
          break;
        case 'unset':
        default:
          state[key] = null; // Unset - user needs to choose
          break;
      }
    }
  });
  
  return state;
};