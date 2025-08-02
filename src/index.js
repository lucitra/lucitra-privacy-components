// @lucitra/privacy-components
// Enterprise Privacy-Enhancing Technology Components
// Commercial License - Unauthorized use prohibited

// Import shared design system from react-components
// Note: Applications should import '@lucitra/react-components/dist/index.css' once

// Import privacy-specific styles
import './styles/index.css'

// Core Privacy Components
export * from './components/Privacy'

// Component Categories (for organized imports)
export * as AIDataGovernance from './components/Privacy/AIDataGovernance'
export * as CookieManager from './components/Privacy/CookieManager'
export * as EnterprisePrivacyManager from './components/Privacy/EnterprisePrivacyManager'
export * as PrivacyBudgetVisualization from './components/Privacy/PrivacyBudgetVisualization'
export * as PrivacyProvider from './components/Privacy/PrivacyProvider'
// UI components are now in @lucitra/react-components

// Privacy Constants
export * from './components/Privacy/constants/privacyConstants'

// Layout Components
export * from './components/Layout'