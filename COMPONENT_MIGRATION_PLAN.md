# Component Migration Plan

## Components to Move to @lucitra/react-components

### Phase 1: Animation System (High Priority)
Move the entire animation system as it's completely general-purpose:

```bash
# Move to react-components
src/components/Animation/ → @lucitra/react-components/src/components/Animation/
src/hooks/useScrollAnimation.js → @lucitra/react-components/src/hooks/useScrollAnimation.js
```

**Why:** These are modern scroll animations that any React app could use, not privacy-specific.

### Phase 2: UI Components (Medium Priority)
Move generic UI components from Privacy/UI:

```bash
# Components to move
ModularButton → Button/ModularButton
ModularCard → Card/ModularCard  
ModularBadge → Badge/ModularBadge
AlertBox → Feedback/AlertBox
ProgressBar → DataDisplay/ProgressBar
StatusIndicator → DataDisplay/StatusIndicator
CodeBlock → DataDisplay/CodeBlock
TabButton → Navigation/TabButton
```

**Why:** These are general UI components. The "Modular" prefix doesn't make them privacy-specific.

### Phase 3: Utilities (Low Priority)
Move design token utilities:

```bash
src/utils/tokenConverter.js → @lucitra/react-components/src/utils/tokenConverter.js
```

**Why:** Token conversion is useful for any design system implementation.

## Components to Keep in @lucitra/privacy-components

### Privacy-Specific Components (Stay)
- CookieManager & consent components
- PrivacyProvider & context
- AIDataGovernance components
- EnterprisePrivacyManager
- GamingPrivacyConsent
- PrivacyBudgetVisualization
- UnifiedPrivacyManager
- DataInventory components
- AITrainingConsent components

### Privacy-Specific Hooks (Stay)
- usePrivacy
- useAIDataGovernance
- useConsentStorage

## Migration Strategy

### Step 1: Copy Components
```bash
# Copy animation components
cp -r lucitra-privacy-components/src/components/Animation lucitra-react-components/src/components/
cp lucitra-privacy-components/src/hooks/useScrollAnimation.js lucitra-react-components/src/hooks/

# Copy UI components (rename/reorganize)
cp lucitra-privacy-components/src/components/Privacy/UI/*.jsx lucitra-react-components/src/components/
```

### Step 2: Update Imports in react-components
```javascript
// Add to react-components index.js
export * from './components/Animation';
export { ModularButton } from './components/Button/ModularButton';
export { ModularCard } from './components/Card/ModularCard';
// ... etc
```

### Step 3: Update privacy-components to Import
```javascript
// privacy-components index.js
export {
  // Animation components
  ScrollAnimationWrapper,
  ParallaxWrapper,
  LenisScrollProvider,
  
  // UI components
  ModularButton,
  ModularCard,
  AlertBox,
  ProgressBar,
} from '@lucitra/react-components';

// Keep exporting privacy-specific components
export * from './Privacy/CookieManager';
export * from './Privacy/PrivacyProvider';
// ... etc
```

### Step 4: Remove Duplicates
```bash
# After confirming imports work
rm -rf lucitra-privacy-components/src/components/Animation
rm -rf lucitra-privacy-components/src/components/Privacy/UI
rm lucitra-privacy-components/src/hooks/useScrollAnimation.js
```

## Benefits After Migration

1. **react-components becomes more valuable**: Gains modern animation system and additional UI components
2. **privacy-components becomes focused**: Only privacy-specific functionality
3. **No duplication**: Single source of truth for each component
4. **Better discoverability**: Developers find animations in the general library
5. **Cleaner dependencies**: Privacy package truly depends on and extends react-components

## Version Planning

- **@lucitra/react-components v0.25.0**: Add animation system and UI components
- **@lucitra/privacy-components v0.8.0**: Remove moved components, import from react-components

## Timeline

1. Week 1: Move animation system
2. Week 2: Move UI components
3. Week 3: Update documentation and examples
4. Week 4: Release both packages

## Usage After Migration

```javascript
// App using both packages
import { 
  Button,
  ScrollAnimationWrapper,
  LenisScrollProvider 
} from '@lucitra/react-components';

import { 
  CookieConsent,
  PrivacyDashboard 
} from '@lucitra/privacy-components';

// The animation works with any component
<LenisScrollProvider>
  <ScrollAnimationWrapper animation="fadeInUp">
    <Button>General button with animation</Button>
  </ScrollAnimationWrapper>
  
  <ScrollAnimationWrapper animation="slideIn">
    <PrivacyDashboard /> {/* Privacy component with animation */}
  </ScrollAnimationWrapper>
</LenisScrollProvider>
```