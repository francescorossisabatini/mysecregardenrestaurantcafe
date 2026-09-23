import type { Preview } from '@storybook/react-vite'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { LanguageProvider } from '../src/contexts/LanguageContext'
import { MobileMenuProvider } from '../src/contexts/MobileMenuContext'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

    backgrounds: {
      default: 'cream',
      values: [
        { name: 'cream', value: '#FAF7F3' },
        { name: 'white', value: '#FFFFFF' },
      ],
    },
  },

  decorators: [
    (Story) => (
      <MemoryRouter>
        <LanguageProvider>
          <MobileMenuProvider>
            <Story />
          </MobileMenuProvider>
        </LanguageProvider>
      </MemoryRouter>
    ),
  ],
};

export default preview;
