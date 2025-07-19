# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lucitra Privacy Components - Privacy-focused React components for cookie consent, data governance, and privacy management.

## Development Commands

```bash
# Install dependencies
npm install

# Start Storybook development server
npm run storybook

# Build component library
npm run build

# Run tests
npm test

# Lint code
npm run lint
```

## Commit Message Guidelines

**IMPORTANT**: All commit messages MUST follow these rules:

### Format
```
<type>: <subject>
```

### Rules
1. **Type**: Must be one of: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
2. **Subject**: 
   - **MUST be all lowercase** (except proper nouns like React, GitHub, GDPR, CCPA, etc.)
   - No period at the end
   - Max 100 characters
   - Imperative mood ("add" not "adds" or "added")

### Examples
✅ **Correct:**
```
feat: add cookie consent component
fix: resolve GDPR compliance issue
docs: update privacy manager documentation
refactor: simplify consent flow logic
```

❌ **Incorrect:**
```
feat: Add Cookie Consent          # Wrong: Capitals
fix: resolved GDPR issue.         # Wrong: Past tense and period
docs: Update Privacy Docs         # Wrong: Capitals
```

## Important Notes

- Privacy-focused component library
- Includes cookie managers, consent forms, and privacy dashboards
- Built with Mantine UI components
- Pre-commit hooks enforce linting and commit message format