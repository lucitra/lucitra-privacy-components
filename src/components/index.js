// Privacy-specific components
export * from './Privacy/CookieManager';
export * from './Privacy/EnterprisePrivacyManager';
export * from './Privacy/PrivacyProvider';
export * from './Privacy/GamingPrivacyConsent';
export * from './Privacy/AIDataGovernance';
export * from './Privacy/PrivacyBudgetVisualization';
export * from './Privacy/Unified';

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
  ModularCodeBlock,
  TabButton,
  
  // Utilities
  ThemeProvider,
} from '@lucitra/react-components';

// Privacy-specific layout extensions
export * from './Layout/PrivacyPageLayout';