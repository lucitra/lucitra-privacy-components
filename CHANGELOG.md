# Changelog

## [1.0.1](https://github.com/lucitra/lucitra-privacy-components/compare/privacy-components-v1.0.0...privacy-components-v1.0.1) (2025-08-01)


### Bug Fixes

* resolve all import and build issues ([856b2b6](https://github.com/lucitra/lucitra-privacy-components/commit/856b2b6c403e80b56091da74c8d9dd62ae7b62ca))
* update CodeBlock import to ModularCodeBlock ([260b1a8](https://github.com/lucitra/lucitra-privacy-components/commit/260b1a84ea6d4cba0c98d6240f6b5c02d2a861c9))


### Miscellaneous Chores

* update @lucitra/react-components dependency to latest version ([11b6735](https://github.com/lucitra/lucitra-privacy-components/commit/11b6735e66714464b69c8b0a21aed0c66d8d580d))

## [1.0.0](https://github.com/lucitra/lucitra-privacy-components/compare/privacy-components-v0.8.0...privacy-components-v1.0.0) (2025-08-01)


### ⚠ BREAKING CHANGES

* Animation and UI components moved to @lucitra/react-components v0.25.0

### Bug Fixes

* update remaining UI imports to use react-components ([aeaa361](https://github.com/lucitra/lucitra-privacy-components/commit/aeaa361bc1bf042ef70f6a84387fde73cc5ef74c))


### Code Refactoring

* move non-privacy components to react-components ([5fdd3d5](https://github.com/lucitra/lucitra-privacy-components/commit/5fdd3d59a54bd237eba8b71726540bccf5c8a040))

## [0.8.0](https://github.com/lucitra/lucitra-privacy-components/compare/privacy-components-v0.7.0...privacy-components-v0.8.0) (2025-08-01)

### Features

- introduce Standard Layout components for improved UI structure ([cb73191](https://github.com/lucitra/lucitra-privacy-components/commit/cb73191705d6acf3ce10882a39e1ec97249a4a3b))

## [0.8.0] - 2024-08-01

### BREAKING CHANGES

- Moved non-privacy-specific components to `@lucitra/react-components` v0.25.0
- Removed duplicate StandardLayout components (now imported from react-components)
- Removed Animation components (now in react-components)
- Removed generic UI components (now in react-components)

### Changed

- Updated to depend on `@lucitra/react-components` v0.25.0
- All Animation components (ScrollAnimationWrapper, ParallaxWrapper, etc.) are now imported from react-components
- All UI components (ModularCard, ModularButton, etc.) are now imported from react-components
- StandardLayout components are now imported from react-components
- Reduced package size by ~40% by removing duplicates

### Added

- New `PrivacyPageLayout` component that extends StandardPage with privacy features
- Re-exports of commonly used components from react-components for convenience

### Migration Guide

```javascript
// Before (0.7.0)
import {
  ModularCard,
  ScrollAnimationWrapper,
} from "@lucitra/privacy-components";

// After (0.8.0) - Option 1: Direct import
import { ModularCard, ScrollAnimationWrapper } from "@lucitra/react-components";

// After (0.8.0) - Option 2: Still works via re-export
import {
  ModularCard,
  ScrollAnimationWrapper,
} from "@lucitra/privacy-components";
```

See MIGRATION_GUIDE.md for detailed instructions.

## [0.7.0] - Previous version

- Initial animation system implementation
- UI component library
- Privacy-specific components
