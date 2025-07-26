/**
 * Simple Cookie Consent Banner
 * 
 * Minimal cookie consent banner with privacy policy link
 */

import React, { useState, useEffect } from 'react'
import { Text, Group } from '@mantine/core'
import { IconX } from '@tabler/icons-react'
import PropTypes from 'prop-types'

import { ModularCard, ModularButton } from '../UI'

export const SimpleCookieConsent = ({
  websiteName = 'This website',
  message = 'uses cookies to enhance your experience. By continuing to use our site, you consent to our use of cookies.',
  privacyPolicyUrl = '/privacy-policy',
  onAccept = () => {},
  position = 'bottom',
  storageKey = 'simple_cookie_consent',
  ...rest
}) => {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem(storageKey)
    if (!hasAccepted) {
      setShowBanner(true)
    }
  }, [storageKey])

  const handleAccept = () => {
    // Save acceptance to localStorage
    localStorage.setItem(storageKey, JSON.stringify({
      accepted: true,
      timestamp: new Date().toISOString(),
      version: '1.0'
    }))
    
    setShowBanner(false)
    onAccept()
  }

  const handleLearnMore = () => {
    if (privacyPolicyUrl.startsWith('http')) {
      window.open(privacyPolicyUrl, '_blank')
    } else {
      window.location.href = privacyPolicyUrl
    }
  }

  if (!showBanner) {
    return null
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: position === 'bottom' ? 0 : 'auto',
      top: position === 'top' ? 0 : 'auto',
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '16px',
      backgroundColor: 'rgba(255, 255, 255, 0.98)'
    }} {...rest}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <ModularCard variant="primary" padding="md">
          <Group justify="space-between" align="center" wrap="nowrap">
            <Text size="sm" c="gray.8" style={{ flex: 1, marginRight: '16px' }}>
              <strong>{websiteName}</strong> {message}
            </Text>
            
            <Group gap="md" wrap="nowrap" style={{ flexShrink: 0 }}>
              <ModularButton
                variant="link"
                size="sm"
                onClick={handleLearnMore}
                style={{ textDecoration: 'underline' }}
              >
                Learn more
              </ModularButton>
              
              <ModularButton
                variant="primary"
                size="sm"
                onClick={handleAccept}
              >
                Got it
              </ModularButton>
            </Group>
          </Group>
        </ModularCard>
      </div>
    </div>
  )
}

SimpleCookieConsent.propTypes = {
  websiteName: PropTypes.string,
  message: PropTypes.string,
  privacyPolicyUrl: PropTypes.string,
  onAccept: PropTypes.func,
  position: PropTypes.oneOf(['top', 'bottom']),
  storageKey: PropTypes.string
}

SimpleCookieConsent.displayName = 'SimpleCookieConsent'

export default SimpleCookieConsent