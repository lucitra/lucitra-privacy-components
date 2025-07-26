/**
 * Compliance Cookie Consent
 * 
 * GDPR & CCPA compliant cookie consent management
 * Combines best practices from both enterprise and standard implementations
 */

import React, { useState, useEffect } from 'react'
import { Text, Group, Stack, Switch, Divider } from '@mantine/core'
import { IconCookie, IconX, IconSettings, IconShieldCheck, IconChartBar, IconAd } from '@tabler/icons-react'
import PropTypes from 'prop-types'

import {
  ModularCard,
  ModularButton,
  ModularBadge,
  AlertBox,
  TabButton
} from '../UI'

// Standard cookie categories for compliance
const COOKIE_CATEGORIES = {
  essential: {
    name: 'Essential',
    description: 'These cookies are necessary to the core functionality of our website and some of its features, such as access to secure areas.',
    required: true,
    defaultEnabled: true,
    icon: IconShieldCheck
  },
  functional: {
    name: 'Functional', 
    description: 'Enable enhanced features like video playback, live chat, and interactive content. Without these cookies, some features may not work properly.',
    required: false,
    defaultEnabled: true,
    icon: IconSettings
  },
  analytics: {
    name: 'Analytics',
    description: 'Help us understand how visitors interact with our website by collecting anonymous information about page visits, time spent, and navigation patterns. This data is aggregated and cannot identify you personally.',
    required: false,
    defaultEnabled: true,
    icon: IconChartBar
  },
  advertising: {
    name: 'Advertising',
    description: 'Allow personalized advertisements based on your interests and limit how often you see an ad. These cookies may share information with third-party advertisers and social media platforms.',
    required: false,
    defaultEnabled: true,
    icon: IconAd
  }
}

export const ComplianceCookieConsent = ({
  websiteName = 'We',
  onConsentChange = () => {},
  onConsentSave = () => {},
  privacyPolicyUrl = '/privacy-policy',
  cookiePolicyUrl = '/cookie-policy',
  position = 'bottom',
  enableDoNotSell = true,
  enableAITraining = true,
  aiTrainingUses = [],
  storageKey = 'compliance_cookie_consent',
  ...rest
}) => {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [activeTab, setActiveTab] = useState('preferences')
  const [consent, setConsent] = useState({})
  const [doNotSell, setDoNotSell] = useState(true) // Default to true (opted out of selling)
  const [aiTraining, setAiTraining] = useState(false) // Default to false (opted out of AI training)
  const [consentId, setConsentId] = useState(null)
  const [consentDate, setConsentDate] = useState(null)
  const [hasUserChoice, setHasUserChoice] = useState(false)

  // Initialize consent state
  useEffect(() => {
    const savedConsent = localStorage.getItem(storageKey)
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent)
        setConsent(parsed.preferences || {})
        setDoNotSell(parsed.doNotSell || false)
        setAiTraining(parsed.aiTraining || false)
        setConsentId(parsed.consentId)
        setConsentDate(parsed.timestamp)
        setHasUserChoice(true)
      } catch (e) {
        console.warn('Failed to parse saved consent:', e)
        initializeDefaultConsent()
      }
    } else {
      initializeDefaultConsent()
      setDoNotSell(true) // Default to opted out
      setAiTraining(false) // Default to opted out
      setShowBanner(true)
    }
  }, [storageKey])

  const initializeDefaultConsent = () => {
    const defaultConsent = {}
    Object.keys(COOKIE_CATEGORIES).forEach(key => {
      defaultConsent[key] = COOKIE_CATEGORIES[key].defaultEnabled
    })
    setConsent(defaultConsent)
  }

  const generateConsentId = () => {
    return 'consent_' + Date.now().toString(36) + Math.random().toString(36).substring(2)
  }

  const saveConsent = (consentData, doNotSellValue, aiTrainingValue) => {
    const timestamp = new Date().toISOString()
    const newConsentId = generateConsentId()
    
    const consentRecord = {
      consentId: newConsentId,
      timestamp,
      preferences: consentData,
      doNotSell: doNotSellValue,
      aiTraining: aiTrainingValue,
      version: '2.0',
      website: websiteName
    }

    localStorage.setItem(storageKey, JSON.stringify(consentRecord))
    
    setConsent(consentData)
    setDoNotSell(doNotSellValue)
    setAiTraining(aiTrainingValue)
    setConsentId(newConsentId)
    setConsentDate(timestamp)
    setHasUserChoice(true)
    setShowBanner(false)
    setShowPreferences(false)
    
    onConsentChange(consentData, doNotSellValue, aiTrainingValue)
    onConsentSave(consentRecord)
  }

  const handleAccept = () => {
    const allAccepted = {}
    Object.keys(COOKIE_CATEGORIES).forEach(key => {
      allAccepted[key] = true
    })
    saveConsent(allAccepted, doNotSell, aiTraining)
  }

  const handleDecline = () => {
    const essentialOnly = {}
    Object.keys(COOKIE_CATEGORIES).forEach(key => {
      essentialOnly[key] = COOKIE_CATEGORIES[key].required
    })
    saveConsent(essentialOnly, true, false) // Set do not sell to true and AI training to false when declining
  }

  const handleSavePreferences = () => {
    saveConsent(consent, doNotSell, aiTraining)
  }

  const handleCategoryToggle = (categoryKey) => {
    if (COOKIE_CATEGORIES[categoryKey].required) return
    
    setConsent(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }))
  }

  // Cookie settings button for users who have already consented
  if (!showBanner && hasUserChoice) {
    return (
      <ModularButton
        variant="ghost"
        size="sm"
        onClick={() => setShowPreferences(true)}
        leftIcon={<IconCookie size={16} />}
        aria-label="Open cookie preferences"
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          zIndex: 1000,
          backgroundColor: 'white',
          border: '1px solid gray'
        }}
        {...rest}
      >
        Cookie Settings
      </ModularButton>
    )
  }

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && !showPreferences && (
        <div 
          role="dialog"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
          style={{
            position: 'fixed',
            bottom: position === 'bottom' ? 0 : 'auto',
            top: position === 'top' ? 0 : 'auto',
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.98)'
          }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <ModularCard variant="primary" padding="lg">
              <Stack gap="md">
                <Text id="cookie-consent-description" size="sm" c="gray.8">
                  <span id="cookie-consent-title" style={{ fontWeight: 500 }}>{websiteName} use cookies to provide you with the best experience.</span> By default, we enable functional, analytics, and advertising cookies to enhance features, understand usage, and show relevant content. We DO NOT sell your data or use it for AI training without your consent. Click "Preferences" to customize your choices, "Decline" to use only essential cookies, or "Accept" to continue with recommended settings. Learn more in our{' '}
                  <Text 
                    component="a" 
                    href={cookiePolicyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'underline' }}
                  >
                    Cookie Policy
                  </Text>.
                </Text>
                
                <Group gap="sm" justify="flex-end">
                  <ModularButton
                    variant="ghost"
                    onClick={() => {
                      setShowPreferences(true)
                      setShowBanner(false)
                    }}
                  >
                    Preferences
                  </ModularButton>
                  
                  <ModularButton
                    variant="outline"
                    onClick={handleDecline}
                  >
                    Decline
                  </ModularButton>
                  
                  <ModularButton
                    variant="primary"
                    onClick={handleAccept}
                  >
                    Accept
                  </ModularButton>
                </Group>
              </Stack>
            </ModularCard>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferences && (
        <PreferencesModal
          categories={COOKIE_CATEGORIES}
          consent={consent}
          doNotSell={doNotSell}
          aiTraining={aiTraining}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onCategoryToggle={handleCategoryToggle}
          onDoNotSellToggle={() => setDoNotSell(!doNotSell)}
          onAiTrainingToggle={() => setAiTraining(!aiTraining)}
          onSave={handleSavePreferences}
          onClose={() => {
            setShowPreferences(false)
            if (!hasUserChoice) setShowBanner(true)
          }}
          privacyPolicyUrl={privacyPolicyUrl}
          cookiePolicyUrl={cookiePolicyUrl}
          consentId={consentId}
          consentDate={consentDate}
          enableDoNotSell={enableDoNotSell}
          enableAITraining={enableAITraining}
          aiTrainingUses={aiTrainingUses}
        />
      )}
    </>
  )
}

// Preferences Modal Component
const PreferencesModal = ({
  categories,
  consent,
  doNotSell,
  aiTraining,
  activeTab,
  onTabChange,
  onCategoryToggle,
  onDoNotSellToggle,
  onAiTrainingToggle,
  onSave,
  onClose,
  privacyPolicyUrl,
  cookiePolicyUrl,
  consentId,
  consentDate,
  enableDoNotSell,
  enableAITraining,
  aiTrainingUses
}) => {
  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="preferences-title"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
      <div style={{
        width: '100%',
        maxWidth: '700px',
        maxHeight: '90vh',
        overflow: 'auto',
        backgroundColor: 'white',
        borderRadius: '0px'
      }}>
        <ModularCard variant="primary" padding="xl">
          {/* Header */}
          <Group justify="space-between" mb="xl">
            <Text id="preferences-title" fw={600} size="xl" c="black">Cookie Preferences</Text>
            <ModularButton
              variant="ghost"
              onClick={onClose}
              leftIcon={<IconX size={16} />}
              aria-label="Close preferences"
            >
              Close
            </ModularButton>
          </Group>

          {/* Tab Navigation */}
          <Group mb="xl" gap="sm">
            <TabButton
              active={activeTab === 'preferences'}
              onClick={() => onTabChange('preferences')}
            >
              Preferences
            </TabButton>
            <TabButton
              active={activeTab === 'details'}
              onClick={() => onTabChange('details')}
            >
              Details
            </TabButton>
          </Group>

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <Stack gap="lg">
              <Text c="gray.7" mb="sm">
                We use different types of cookies to optimize your experience on our website. Click on the categories below to learn more about their purposes. You may choose which types of cookies to allow and can change your preferences at any time. Remember that disabling cookies may affect your experience on the website. You can learn more about how we use cookies by visiting our{' '}
                <Text 
                  component="a" 
                  href={cookiePolicyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                >
                  Cookie Policy
                </Text>.
              </Text>

              <AlertBox variant="info">
                <Text size="xs">
                  You can withdraw or change your consent at any time by clicking the "Cookie Settings" button that appears after closing this dialog.
                </Text>
              </AlertBox>

              {/* Do Not Sell Option */}
              {enableDoNotSell && (
                <>
                  <ModularCard variant="accent">
                    <Group justify="space-between" align="center">
                      <div style={{ flex: 1 }}>
                        <Text fw={600} c="black" mb="xs">
                          Do not sell or share my personal information
                        </Text>
                        <Text size="sm" c="gray.7">
                          We will not sell your personal data to third parties or share it for cross-context behavioral advertising. This is enabled by default to protect your privacy.
                        </Text>
                      </div>
                      <Switch
                        checked={doNotSell}
                        onChange={onDoNotSellToggle}
                        size="md"
                        color="dark"
                        styles={{
                          track: {
                            borderRadius: 0,
                            border: '1px solid black'
                          }
                        }}
                      />
                    </Group>
                  </ModularCard>
                  <Divider />
                </>
              )}

              {/* AI Training Option */}
              {enableAITraining && (
                <>
                  <ModularCard variant="accent">
                    <Group justify="space-between" align="center">
                      <div style={{ flex: 1 }}>
                        <Text fw={600} c="black" mb="xs">
                          AI model training
                        </Text>
                        <Text size="sm" c="gray.7" mb={aiTrainingUses.length > 0 ? 'sm' : 0}>
                          Your anonymized data may be used to train AI models that improve our services. This is completely optional and disabled by default.
                        </Text>
                        {aiTrainingUses.length > 0 && (
                          <Stack gap="xs">
                            <Text size="xs" fw={500} c="gray.8">We may use your data to:</Text>
                            {aiTrainingUses.map((use, index) => (
                              <Text key={index} size="xs" c="gray.7" pl="md">
                                • {use}
                              </Text>
                            ))}
                          </Stack>
                        )}
                      </div>
                      <Switch
                        checked={aiTraining}
                        onChange={onAiTrainingToggle}
                        size="md"
                        color="dark"
                        styles={{
                          track: {
                            borderRadius: 0,
                            border: '1px solid black'
                          }
                        }}
                      />
                    </Group>
                  </ModularCard>
                  <Divider />
                </>
              )}

              {/* Cookie Categories */}
              <Stack gap="md">
                {Object.entries(categories).map(([key, category]) => {
                  const Icon = category.icon
                  const isEnabled = consent[key]
                  
                  return (
                    <ModularCard key={key} variant="secondary" padding="md">
                      <Stack gap="xs">
                        <Group justify="space-between" align="center">
                          <Group gap="sm">
                            <Icon size={20} color="black" />
                            <Text fw={600} c="black">{category.name}</Text>
                            {category.required && (
                              <ModularBadge variant="primary" size="xs">
                                ALWAYS ACTIVE
                              </ModularBadge>
                            )}
                          </Group>
                          
                          <Switch
                            checked={isEnabled}
                            onChange={() => onCategoryToggle(key)}
                            disabled={category.required}
                            size="md"
                            color="dark"
                            styles={{
                              track: {
                                borderRadius: 0,
                                border: '1px solid black'
                              }
                            }}
                          />
                        </Group>
                        
                        <Text size="sm" c="gray.7" pl="28px">
                          {category.description}
                        </Text>
                      </Stack>
                    </ModularCard>
                  )
                })}
              </Stack>

              {/* Action Buttons */}
              <Group justify="center" gap="md" mt="xl">
                <ModularButton
                  variant="primary"
                  onClick={onSave}
                  size="md"
                >
                  Save Preferences
                </ModularButton>
              </Group>
            </Stack>
          )}

          {/* Details Tab */}
          {activeTab === 'details' && (
            <Stack gap="lg">
              <AlertBox variant="info">
                Your consent preferences help us respect your privacy choices while providing you with the best possible experience on our website.
              </AlertBox>

              {/* Consent Information */}
              {consentId && (
                <ModularCard variant="secondary">
                  <Text fw={600} c="black" mb="md">Your Consent Information</Text>
                  <Stack gap="xs">
                    <Text size="sm" c="gray.7">
                      <strong>Consent ID:</strong> {consentId}
                    </Text>
                    <Text size="sm" c="gray.7">
                      <strong>Consent Date:</strong> {consentDate ? new Date(consentDate).toLocaleString() : 'Not set'}
                    </Text>
                  </Stack>
                  <Text size="xs" c="gray.6" mt="sm">
                    Please reference your consent ID when contacting us about your privacy preferences.
                  </Text>
                </ModularCard>
              )}

              <Stack gap="sm">
                <ModularButton
                  variant="link"
                  onClick={() => window.open(privacyPolicyUrl, '_blank')}
                >
                  View Privacy Policy
                </ModularButton>
                <ModularButton
                  variant="link"
                  onClick={() => window.open(cookiePolicyUrl, '_blank')}
                >
                  View Cookie Policy
                </ModularButton>
              </Stack>
            </Stack>
          )}
        </ModularCard>
      </div>
    </div>
  )
}

ComplianceCookieConsent.propTypes = {
  websiteName: PropTypes.string,
  onConsentChange: PropTypes.func,
  onConsentSave: PropTypes.func,
  privacyPolicyUrl: PropTypes.string,
  cookiePolicyUrl: PropTypes.string,
  position: PropTypes.oneOf(['top', 'bottom']),
  enableDoNotSell: PropTypes.bool,
  enableAITraining: PropTypes.bool,
  aiTrainingUses: PropTypes.arrayOf(PropTypes.string),
  storageKey: PropTypes.string
}

ComplianceCookieConsent.displayName = 'ComplianceCookieConsent'

export default ComplianceCookieConsent