# Design System Usage

This package uses the shared Lucitra Design System from `@lucitra/react-components`.

## Important: CSS Import Required

The design tokens and utility classes are now provided by `@lucitra/react-components`. You must import the CSS in your application:

```javascript
// In your main app entry point (e.g., App.js, index.js)
import '@lucitra/react-components/dist/index.css';
```

Or in your CSS:

```css
/* In your main CSS file */
@import '@lucitra/react-components/dist/index.css';
```

## Available Design Tokens

The following CSS custom properties are available:

### Colors
- `--color-primary-*` - Primary brand colors
- `--color-neutral-*` - Neutral/gray colors
- `--color-background-*` - Background colors
- `--color-content-*` - Text/content colors
- `--color-border-*` - Border colors

### Typography
- `--font-family-*` - Font families (inter, archivo-black, etc.)
- `--font-size-*` - Font sizes (xs to 10xl)
- `--font-weight-*` - Font weights
- `--line-height-*` - Line heights
- `--letter-spacing-*` - Letter spacing

### Spacing
- `--spacing-*` - Spacing scale (2xs to 16xl)
- `--spacing-unit-*` - Raw spacing units

### Other
- `--radius-*` - Border radius values
- `--border-width-*` - Border widths

## Theme Support

The design system supports three themes:

```javascript
import { applyTheme, THEMES } from '@lucitra/react-components';

// Apply dark theme
applyTheme(THEMES.DARK);

// Apply light theme (default)
applyTheme(THEMES.LIGHT);

// Apply black theme
applyTheme(THEMES.BLACK);
```

## Utility Classes

Typography utilities:
- `.text-xl-bold`, `.text-lg-semibold`, etc.
- `.font-inter`, `.font-bold`, etc.

Spacing utilities:
- `.p-sm`, `.p-md`, `.p-lg` - Padding
- `.m-sm`, `.m-md`, `.m-lg` - Margin
- `.px-*`, `.py-*` - Directional padding
- `.mx-*`, `.my-*` - Directional margin

## JavaScript API

```javascript
import { 
  DESIGN_TOKENS,
  generateCSSFromTokens,
  generateTypographyUtilities 
} from '@lucitra/react-components';

// Access raw design tokens
console.log(DESIGN_TOKENS.colors.primary);

// Generate CSS from tokens
const css = generateCSSFromTokens(myTokens);
```