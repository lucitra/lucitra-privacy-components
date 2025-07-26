/**
 * SimpleCookieConsent Stories
 * 
 * Storybook examples for simple cookie consent banner
 */

import React from 'react'
import { SimpleCookieConsent } from './SimpleCookieConsent'

export default {
  title: 'Privacy/CookieManager/SimpleCookieConsent',
  component: SimpleCookieConsent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A simple, minimal cookie consent banner with customizable message and privacy policy link.'
      }
    }
  },
  argTypes: {
    websiteName: {
      control: 'text',
      description: 'The name of the website shown in the banner'
    },
    message: {
      control: 'text',
      description: 'The message shown after the website name'
    },
    privacyPolicyUrl: {
      control: 'text',
      description: 'URL to the privacy policy page'
    },
    position: {
      control: 'radio',
      options: ['top', 'bottom'],
      description: 'Position of the banner on the page'
    },
    onAccept: {
      action: 'accepted',
      description: 'Callback fired when user clicks "Got it"'
    }
  }
}

// Helper to clear localStorage for demos
const clearConsent = () => {
  localStorage.removeItem('simple_cookie_consent')
  localStorage.removeItem('simple_cookie_consent_demo')
  window.location.reload()
}

// Template with clear button
const Template = (args) => (
  <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', padding: '20px' }}>
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1>Simple Cookie Consent Demo</h1>
      <p>This is a demo page showing the simple cookie consent banner.</p>
      <button 
        onClick={clearConsent}
        style={{
          padding: '8px 16px',
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Clear Consent (Refresh Page)
      </button>
      <p>The banner will appear at the {args.position} of the page if you haven't accepted cookies yet.</p>
      <div style={{ height: '1000px', backgroundColor: 'white', padding: '20px', border: '1px solid #ddd' }}>
        <h2>Page Content</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    </div>
    <SimpleCookieConsent {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  websiteName: 'This website',
  message: 'uses cookies to enhance your experience. By continuing to use our site, you consent to our use of cookies.',
  privacyPolicyUrl: '/privacy-policy',
  position: 'bottom',
  storageKey: 'simple_cookie_consent_demo'
}

export const TopPosition = Template.bind({})
TopPosition.args = {
  ...Default.args,
  position: 'top'
}

export const CustomMessage = Template.bind({})
CustomMessage.args = {
  ...Default.args,
  websiteName: 'Our Website',
  message: 'uses cookies to ensure you get the best experience. By continuing, you agree to our use of cookies.'
}

export const ExternalPrivacyPolicy = Template.bind({})
ExternalPrivacyPolicy.args = {
  ...Default.args,
  privacyPolicyUrl: 'https://www.example.com/privacy-policy'
}

// Minimal example
export const Minimal = () => (
  <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
    <SimpleCookieConsent />
  </div>
)