# Storybook Setup - Privacy Components

## Quick Start

```bash
npm run storybook           # Start Storybook development server
npm run build-storybook     # Build static documentation
```

## Available Components in Storybook

### 🔒 Privacy/UI Components
- **ModularButton** - Styled buttons for privacy interfaces
  - Variants: primary, secondary, success, danger, warning
  - Sizes: sm, md, lg
  - Features: disabled states, custom styling

### 🏢 Enterprise Privacy Components
- **EnterprisePrivacyManager** - Complete privacy dashboard
- **PrivacyBudgetVisualization** - Privacy budget monitoring
- **GamingPrivacyConsent** - Gaming-specific consent flows

### 🍪 Cookie Management
- **CookieConsentBanner** - GDPR/CCPA compliant banners
- **GranularConsentModal** - Detailed consent preferences
- **SimplePrivacyNotice** - Lightweight privacy notices

### 🤖 AI Governance
- **AIDataGovernance** - AI training data management
- **DataClassificationDashboard** - Data classification tools
- **ComplianceDashboard** - Regulatory compliance monitoring

## Accessing Storybook

1. **Start the server**: `npm run storybook`
2. **Open browser**: Navigate to `http://localhost:6006` (or 6007 if 6006 is busy)
3. **Browse components**: Use the sidebar to navigate through component categories
4. **Test interactions**: Use the Controls panel to modify component props
5. **View documentation**: Check the Docs tab for component details

## Troubleshooting

If components don't appear:
1. Check that story files have `.stories.jsx` extension
2. Verify React imports in story files (`import React from 'react'`)
3. Ensure components are properly exported
4. Check import paths (use relative paths like `../ComponentName`)
5. Clear browser cache and restart Storybook

## Fixed Issues

✅ **Import paths corrected** - ModularButton stories now use `../ModularButton`
✅ **React imports fixed** - All story files include `import React from 'react'`
✅ **ES modules used** - Modern import/export syntax throughout
✅ **MantineProvider added** - Full Mantine context and theming support
✅ **Complete parity** - Identical configuration to @lucitra/react-components
✅ **Color scheme controls** - Light/dark mode switching in toolbar
✅ **All addons working** - Links, essentials, interactions, docs, a11y

## Component Story Structure

Each component should have:
- Default export with component metadata
- Named exports for different states/variants
- Props controls for interactive testing
- Documentation describing usage

Example:
```jsx
import React from 'react'
import { ModularButton } from './ModularButton'

export default {
  title: 'Privacy/UI/ModularButton',
  component: ModularButton,
}

export const Primary = {
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}
```