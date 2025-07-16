# @lucitra/privacy-components

Enterprise Privacy-Enhancing Technology Components for React applications.

## Overview

This package provides advanced privacy and compliance components designed for enterprise applications. It includes components for consent management, analytics tracking, AI governance, and privacy visualization tools.

## Installation

```bash
# This is a private package
npm install @lucitra/privacy-components
```

## Peer Dependencies

This package requires the following peer dependencies:

```json
{
  "@lucitra/react-components": ">=0.12.0",
  "react": ">=19.0.0",
  "react-dom": ">=19.0.0"
}
```

## Components

### Core Privacy Components

- **EnterprisePrivacyManager** - Comprehensive privacy management dashboard
- **GamingPrivacyConsent** - Specialized consent for gaming applications
- **PrivacyBudgetVisualization** - Visual representation of privacy budgets
- **PrivacyProvider** - Context provider for privacy state management

### AI Governance

- **AIDataGovernance** - AI training data governance dashboard
- **AITrainingConsentComponent** - Consent management for AI training
- **ComplianceDashboard** - Regulatory compliance monitoring
- **DataClassificationDashboard** - Data classification and labeling
- **LegalFrameworkDisplay** - Legal framework information display

### Cookie & Consent Management

- **CookieConsentBanner** - GDPR/CCPA compliant cookie banner
- **CookieManager** - Advanced cookie management interface
- **EnterpriseConsentManager** - Enterprise-grade consent management
- **GranularConsentModal** - Detailed consent preferences
- **SimplePrivacyNotice** - Lightweight privacy notice
- **PrivacySettings** - User privacy settings interface

### Analytics & Tracking

- **GranularAnalyticsProvider** - Privacy-preserving analytics context
- **GranularCookieDemo** - Interactive cookie consent demo

### UI Components

- **ModularButton** - Styled button with privacy-focused design
- **ModularCard** - Card component with enterprise styling
- **ModularBadge** - Status and category badges
- **AlertBox** - Privacy alerts and notifications
- **CodeBlock** - Code display for privacy policies
- **ProgressBar** - Progress indicators for compliance
- **StatusIndicator** - Status display for privacy states
- **TabButton** - Navigation tabs for privacy interfaces

## Usage

### Basic Setup

```jsx
import {
  GranularAnalyticsProvider,
  SimplePrivacyNotice,
  GranularConsentModal
} from '@lucitra/privacy-components'

function App() {
  return (
    <GranularAnalyticsProvider>
      <YourApp />
      <SimplePrivacyNotice />
      <GranularConsentModal />
    </GranularAnalyticsProvider>
  )
}
```

### Enterprise Privacy Dashboard

```jsx
import { EnterprisePrivacyManager } from '@lucitra/privacy-components'

function PrivacyDashboard() {
  return (
    <EnterprisePrivacyManager
      complianceFrameworks={['GDPR', 'CCPA', 'HIPAA']}
      features={{
        dataGovernance: true,
        consentManagement: true,
        privacyBudget: true
      }}
    />
  )
}
```

### AI Governance

```jsx
import { 
  AIDataGovernance,
  AITrainingConsentComponent 
} from '@lucitra/privacy-components'

function AIGovernance() {
  return (
    <div>
      <AITrainingConsentComponent
        dataTypes={['behavioral', 'biometric', 'demographic']}
        purposes={['model_training', 'personalization']}
      />
      <AIDataGovernance
        datasets={datasetList}
        complianceRequired={true}
      />
    </div>
  )
}
```

## Development

### Setup

```bash
npm install
npm run dev    # Start development build with watch
npm run build  # Build for production
```

### Testing

```bash
npm test              # Run tests in watch mode
npm run test:run      # Run tests once
npm run test:coverage # Run tests with coverage
```

### Code Quality

```bash
npm run lint          # Check code quality
npm run lint:fix      # Fix linting issues
```

## Architecture

### Design Philosophy

This package follows a monochrome, enterprise-focused design system with:

- Minimal color palette for professional environments
- High contrast for accessibility
- Modular components for flexible composition
- Privacy-first design patterns

### Component Naming

All components use the "Modular" prefix for UI elements to avoid conflicts with the public `@lucitra/react-components` package.

### Privacy Features

- **Differential Privacy**: Built-in support for privacy budgets
- **Consent Management**: Granular consent with legal framework compliance
- **Data Governance**: Tools for data classification and lifecycle management
- **Federated Learning**: Components for distributed AI training consent

## License

Commercial License - All rights reserved.

This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## Support

For enterprise support and licensing inquiries, please contact:
- Email: privacy@lucitra.com
- Website: https://lucitra.com/privacy-components