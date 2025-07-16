export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // New feature
        'fix',      // Bug fix
        'docs',     // Documentation changes
        'style',    // Code style changes (formatting, etc.)
        'refactor', // Code refactoring
        'perf',     // Performance improvements
        'test',     // Test additions or modifications
        'build',    // Build system changes
        'ci',       // CI configuration changes
        'chore',    // Other changes that don't modify src or test files
        'revert'    // Revert previous commit
      ]
    ],
    'scope-enum': [
      2,
      'always',
      [
        'privacy',      // Core privacy functionality
        'consent',      // Consent management
        'analytics',    // Analytics and tracking
        'ai',          // AI governance components
        'compliance',   // Compliance and legal components
        'ui',          // UI components
        'config',      // Configuration changes
        'deps',        // Dependencies
        'security',    // Security-related changes
        'performance'  // Performance optimizations
      ]
    ],
    'subject-case': [2, 'always', 'lower-case'],
    'subject-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 100]
  }
}