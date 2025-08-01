// Privacy-specific components
export * from './Privacy/CookieConsent';
export * from './Privacy/Dashboard';
export * from './Privacy/EnterprisePrivacyManager';
export * from './Privacy/PrivacyProvider';
export * from './Privacy/UnifiedPrivacyManager';
export * from './Privacy/GamingConsentModal';
export * from './Privacy/DataInventory';
export * from './Privacy/AITrainingConsent';
export * from './Privacy/AIGovernancePanel';

// Re-export components from @lucitra/react-components
// This provides convenience while avoiding duplication
export {
  // Layout components
  StandardPage,
  StandardPageContainer,
  StandardHeader,
  StandardHeroSection,
  
  // Core UI components
  Button,
  Card,
  Badge,
  Typography,
  
  // Animation components (now in react-components)
  ScrollAnimationWrapper,
  ParallaxWrapper,
  LenisScrollProvider,
  StickySection,
  ScrollProgress,
  useLenis,
  useScrollAnimation,
  useParallax,
  useScrollProgress,
  useStickyScroll,
  
  // UI components (now in react-components)
  ModularButton,
  ModularCard,
  ModularBadge,
  AlertBox,
  ProgressBar,
  StatusIndicator,
  CodeBlock,
  TabButton,
  
  // Utilities
  ThemeProvider,
} from '@lucitra/react-components';

// Privacy-specific layout extensions
export * from './Layout/PrivacyPageLayout';