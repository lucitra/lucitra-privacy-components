import React from 'react'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import '../src/styles/index.css'

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      description: {
        component: 'Component from @lucitra/privacy-components',
      },
    },
  },
  globalTypes: {
    colorScheme: {
      description: 'Mantine color scheme',
      defaultValue: 'light',
      toolbar: {
        title: 'Color Scheme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'auto', title: 'Auto' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { colorScheme } = context.globals
      
      // Set data-theme attribute for design tokens
      React.useEffect(() => {
        const actualScheme = colorScheme === 'auto' 
          ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
          : colorScheme
        document.documentElement.setAttribute('data-theme', actualScheme)
      }, [colorScheme])
      
      return React.createElement(
        MantineProvider,
        { defaultColorScheme: colorScheme },
        React.createElement(
          'div',
          {
            style: {
              padding: 'var(--spacing-lg)',
              minHeight: '100vh',
              backgroundColor: 'var(--color-background-Primary)',
              color: 'var(--color-content-Primary)',
              fontFamily: 'var(--font-family-inter)',
              transition: 'background-color 0.3s ease, color 0.3s ease'
            }
          },
          React.createElement(Story)
        )
      )
    },
  ],
}

export default preview