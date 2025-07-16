// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default [{
  ignores: ['dist', 'node_modules', '.yalc', 'rollup.config.js']
}, {
  files: ['**/*.{js,jsx}'],
  ...js.configs.recommended,
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parserOptions: {
      ecmaVersion: 'latest',
      ecmaFeatures: { jsx: true },
      sourceType: 'module',
    },
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    'jsx-a11y': jsxA11y,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    ...jsxA11y.configs.recommended.rules,
    'no-unused-vars': ['error', { 
      varsIgnorePattern: '^[A-Z_]',
      argsIgnorePattern: '^_'
    }],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}, {
  files: ['**/*.test.{js,jsx}', '**/test/**/*.{js,jsx}'],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
      vi: 'readonly',
      global: 'readonly',
    },
  },
}, ...(storybook.configs["flat/recommended"] || [])];