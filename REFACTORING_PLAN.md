# Refactoring Plan: Reducing Duplication Between Packages

## Current Issues
1. StandardLayout components are 100% duplicated
2. Design tokens (tokens.css) are duplicated
3. privacy-components declares react-components as peer dependency but doesn't use it
4. Both packages have their own UI component implementations
5. Potential naming conflicts when using both packages

## Proposed Solution: Clean Separation of Concerns

### 1. Package Responsibilities

#### @lucitra/react-components (Foundation Layer)
- **Core UI Components**: Button, Card, Badge, Typography, Forms
- **Layout System**: StandardLayout, Grid, Container
- **Design System**: Tokens, Theme, Colors, Spacing
- **General Utilities**: Hooks, Helpers, i18n
- **Common Features**: Navigation, DataDisplay, Feedback

#### @lucitra/privacy-components (Privacy Layer)
- **Privacy-Specific Components**: Cookie consent, Privacy dashboards
- **Privacy UI Extensions**: ModularCard variants for privacy use cases
- **Privacy Business Logic**: Consent management, Budget tracking
- **Privacy Animations**: Scroll animations tailored for privacy UX
- **Import and extend** from react-components

### 2. Implementation Steps

#### Step 1: Remove Duplicates from privacy-components
```bash
# Remove duplicate StandardLayout components
rm -rf src/components/Layout/StandardLayout/

# Remove duplicate tokens.css
rm src/styles/tokens.css
```

#### Step 2: Update privacy-components to use react-components
```javascript
// src/components/index.js
// Re-export layout components from react-components
export {
  StandardPage,
  StandardPageContainer,
  StandardHeader,
  StandardHeroSection
} from '@lucitra/react-components';

// Export privacy-specific components
export * from './Privacy/UI';
export * from './Privacy/CookieConsent';
export * from './Privacy/Dashboard';
// ... etc
```

#### Step 3: Create privacy-specific extensions
```javascript
// Example: Extend Button for privacy use cases
import { Button } from '@lucitra/react-components';

export const PrivacyActionButton = ({ privacyLevel, ...props }) => (
  <Button
    {...props}
    className={`privacy-level-${privacyLevel} ${props.className}`}
  />
);
```

#### Step 4: Update imports in privacy-components
```javascript
// Before
import { StandardPage } from '../Layout/StandardLayout/StandardPage';

// After
import { StandardPage } from '@lucitra/react-components';
```

### 3. Benefits

1. **No Duplication**: Single source of truth for each component
2. **Clear Separation**: Foundation vs Privacy-specific
3. **Better Maintenance**: Updates to core components benefit both packages
4. **Smaller Bundle**: Privacy package only includes privacy-specific code
5. **Consistent Design**: Shared design tokens and theme

### 4. Migration Guide for Users

```javascript
// Old way (potential conflicts)
import { Button } from '@lucitra/react-components';
import { ModularButton } from '@lucitra/privacy-components';

// New way (clear separation)
import { Button, Card, StandardLayout } from '@lucitra/react-components';
import { 
  PrivacyDashboard, 
  CookieConsent,
  // StandardLayout is now re-exported from react-components
  StandardLayout as PrivacyLayout 
} from '@lucitra/privacy-components';
```

### 5. Alternative Approach: Monorepo

If the duplication continues to be an issue, consider:
- Converting to a monorepo structure
- Shared packages for common components
- Separate packages for domain-specific features

```
packages/
  core/          # Shared UI components, layouts, tokens
  privacy/       # Privacy-specific components
  react/         # General React components
  utils/         # Shared utilities
```

## Next Steps

1. Audit all components for duplication
2. Create migration scripts
3. Update documentation
4. Test thoroughly
5. Release as major version (breaking changes)

## Timeline

- Phase 1: Remove duplicates (1 day)
- Phase 2: Update imports (1 day)
- Phase 3: Test and document (2 days)
- Phase 4: Release (1 day)

Total: ~1 week