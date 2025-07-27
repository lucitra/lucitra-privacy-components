/**
 * ComplianceCookieConsent Stories
 * 
 * GDPR & CCPA compliant cookie consent examples
 */

import React from 'react'
import { ComplianceCookieConsent } from './ComplianceCookieConsent'

export default {
  title: 'Privacy/CookieManager/ComplianceCookieConsent',
  component: ComplianceCookieConsent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A fully compliant cookie consent solution with GDPR and CCPA support, including "Do not sell" options and proper cookie categorization.'
      }
    }
  },
  argTypes: {
    websiteName: {
      control: 'text',
      description: 'The name prefix for the consent message (e.g., "We" or "Our website")'
    },
    privacyPolicyUrl: {
      control: 'text',
      description: 'URL to the privacy policy page'
    },
    cookiePolicyUrl: {
      control: 'text',
      description: 'URL to the cookie policy page'
    },
    position: {
      control: 'radio',
      options: ['top', 'bottom'],
      description: 'Position of the banner on the page'
    },
    enableDoNotSell: {
      control: 'boolean',
      description: 'Enable CCPA "Do not sell" option'
    },
    enableAITraining: {
      control: 'boolean',
      description: 'Enable AI training consent option'
    },
    aiTrainingUses: {
      control: 'array',
      description: 'List of specific AI training use cases'
    },
    onConsentChange: {
      action: 'consent-changed',
      description: 'Callback fired when consent preferences change'
    },
    onConsentSave: {
      action: 'consent-saved',
      description: 'Callback fired when consent is saved'
    }
  }
}

// Helper to clear cookies for demos
const clearConsent = (cookiePrefix = 'demo') => {
  // Clear all consent-related cookies
  document.cookie = `${cookiePrefix}_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  document.cookie = `${cookiePrefix}_preferences=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  document.cookie = `${cookiePrefix}_analytics_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  document.cookie = `${cookiePrefix}_marketing_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  document.cookie = `${cookiePrefix}_ai_training_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  window.location.reload()
}

// Template with demo page
const Template = (args) => (
  <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '20px' }}>
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1>Privacy-First Website Demo</h1>
      <p>This demo shows our GDPR & CCPA compliant cookie consent system.</p>
      
      <button 
        onClick={() => clearConsent(args.cookiePrefix)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Reset Cookie Preferences
      </button>
      
      <div style={{ backgroundColor: 'white', padding: '30px', border: '1px solid #dee2e6', marginTop: '20px' }}>
        <h2>Sample Content</h2>
        <p>
          This represents your website content. The cookie consent banner will appear at the {args.position || 'bottom'} of the page
          if the user hasn't made a choice yet.
        </p>
        <p>
          Features included:
        </p>
        <ul>
          <li>GDPR compliant with proper categorization</li>
          <li>CCPA compliant with "Do not sell" option</li>
          <li>Toggle switches for better UX</li>
          <li>Persistent preferences with consent tracking</li>
          <li>Accessible cookie settings button after consent</li>
        </ul>
      </div>
    </div>
    <ComplianceCookieConsent {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  websiteName: 'We',
  privacyPolicyUrl: '/privacy-policy',
  cookiePolicyUrl: '/cookie-policy',
  position: 'bottom',
  enableDoNotSell: true,
  cookiePrefix: 'compliance_cookie_consent_demo'
}

export const TopPosition = Template.bind({})
TopPosition.args = {
  ...Default.args,
  position: 'top'
}

export const WithoutDoNotSell = Template.bind({})
WithoutDoNotSell.args = {
  ...Default.args,
  enableDoNotSell: false
}
WithoutDoNotSell.storyName = 'Without CCPA (GDPR Only)'

export const CustomWebsiteName = Template.bind({})
CustomWebsiteName.args = {
  ...Default.args,
  websiteName: 'Our platform',
  companyName: 'Acme Corp'
}

// Interactive example showing consent data
export const WithConsentTracking = () => {
  const [consentData, setConsentData] = React.useState(null)
  
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', padding: '20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>Consent Tracking Demo</h1>
        <button 
          onClick={() => clearConsent('consent_tracking')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#333',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          Reset Consent
        </button>
        
        {consentData && (
          <div style={{ 
            backgroundColor: '#e9ecef', 
            padding: '20px', 
            marginBottom: '20px',
            fontFamily: 'monospace',
            fontSize: '14px'
          }}>
            <strong>Last Consent Data:</strong>
            <pre>{JSON.stringify(consentData, null, 2)}</pre>
          </div>
        )}
        
        <ComplianceCookieConsent
          cookiePrefix="consent_tracking"
          onConsentSave={(data) => setConsentData(data)}
        />
      </div>
    </div>
  )
}

// Minimal implementation
export const Minimal = () => (
  <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
    <ComplianceCookieConsent />
  </div>
)

// Resume Builder Website Example
export const ResumeBuilderExample = Template.bind({})
ResumeBuilderExample.args = {
  websiteName: 'ResumeBuilder',
  privacyPolicyUrl: '/privacy-policy',
  cookiePolicyUrl: '/cookie-policy',
  position: 'bottom',
  enableDoNotSell: true,
  enableAITraining: true,
  aiTrainingUses: [
    'Improve resume writing suggestions and phrasing',
    'Train job-matching algorithms',
    'Optimize resume layouts for better ATS performance',
    'Enhance industry-specific keyword recommendations',
    'Develop better bullet point suggestions'
  ],
  cookiePrefix: 'resume_builder_consent'
}
ResumeBuilderExample.storyName = 'Resume Builder Site'

// Personal Blog Example
export const PersonalBlogExample = Template.bind({})
PersonalBlogExample.args = {
  websiteName: 'Our blog',
  privacyPolicyUrl: '/privacy',
  cookiePolicyUrl: '/cookies',
  position: 'bottom',
  enableDoNotSell: true,
  enableAITraining: true,
  aiTrainingUses: [
    'Improve content recommendation algorithms',
    'Train comment spam detection',
    'Analyze writing patterns for AI assistants',
    'Optimize content for better engagement'
  ],
  cookiePrefix: 'blog_consent'
}
PersonalBlogExample.storyName = 'Personal Blog'

// Tech Startup Example
export const TechStartupExample = Template.bind({})
TechStartupExample.args = {
  websiteName: 'TechStartup',
  privacyPolicyUrl: '/legal/privacy',
  cookiePolicyUrl: '/legal/cookies',
  position: 'bottom',
  enableDoNotSell: true,
  enableAITraining: true,
  aiTrainingUses: [
    'Train customer support chatbots',
    'Improve product recommendation engines',
    'Optimize user interface based on behavior patterns',
    'Enhance search functionality',
    'Develop predictive analytics for user needs'
  ],
  cookiePrefix: 'startup_consent'
}
TechStartupExample.storyName = 'Tech Startup'