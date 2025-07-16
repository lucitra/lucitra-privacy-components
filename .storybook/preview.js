import React from 'react'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'

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
      
      return React.createElement(
        MantineProvider,
        { defaultColorScheme: colorScheme },
        React.createElement(
          'div',
          {
            style: {
              padding: '20px',
              minHeight: '100vh',
              backgroundColor: 'var(--mantine-color-body)',
              color: 'var(--mantine-color-text)',
              fontFamily: 'system-ui, sans-serif'
            }
          },
          React.createElement(Story)
        )
      )
    },
  ],
}

export default preview