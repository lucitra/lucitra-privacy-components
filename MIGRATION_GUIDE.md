# Migration Guide: v0.8.0

## Breaking Changes

### 1. StandardLayout Components Moved

The `StandardLayout` components are no longer included in this package. They are now imported from `@lucitra/react-components`.

**Before:**
```javascript
import { StandardPage, StandardHeader } from '@lucitra/privacy-components';
```

**After:**
```javascript
// Option 1: Import from react-components directly
import { StandardPage, StandardHeader } from '@lucitra/react-components';

// Option 2: Still works via re-export
import { StandardPage, StandardHeader } from '@lucitra/privacy-components';
```

### 2. New PrivacyPageLayout Component

For privacy-specific pages, use the new `PrivacyPageLayout` which includes:
- Privacy provider setup
- Cookie consent banner
- Smooth scrolling (Lenis)

```javascript
import { PrivacyPageLayout } from '@lucitra/privacy-components';

function MyPrivacyPage() {
  return (
    <PrivacyPageLayout
      header={<MyHeader />}
      showCookieConsent={true}
      smoothScroll={true}
    >
      <MyContent />
    </PrivacyPageLayout>
  );
}
```

### 3. Animation Components

New animation components for modern scroll effects:

```javascript
import { 
  ScrollAnimationWrapper,
  ParallaxWrapper,
  LenisScrollProvider 
} from '@lucitra/privacy-components';

// Wrap your app for smooth scrolling
<LenisScrollProvider>
  <ScrollAnimationWrapper animation="fadeInUp">
    <YourComponent />
  </ScrollAnimationWrapper>
</LenisScrollProvider>
```

### 4. Dependency Changes

- `@lucitra/react-components` is now a direct dependency
- You must have `@lucitra/react-components` v0.24.0 or higher

## Benefits

1. **Smaller Bundle**: No more duplicate code
2. **Consistent Updates**: Core components updated in one place
3. **Better Types**: TypeScript definitions from react-components
4. **Clear Separation**: Privacy-specific vs general components

## Recommended Setup

```javascript
// App.jsx
import { ThemeProvider } from '@lucitra/react-components';
import { PrivacyProvider } from '@lucitra/privacy-components';

function App() {
  return (
    <ThemeProvider>
      <PrivacyProvider>
        <Router>
          {/* Your routes */}
        </Router>
      </PrivacyProvider>
    </ThemeProvider>
  );
}
```

## Need Help?

- Check the [examples](./src/stories) directory
- File an issue on GitHub
- Review the component documentation in Storybook