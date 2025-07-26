/**
 * useConsentStorage Hook
 * 
 * Shared hook for managing cookie consent storage across components
 * Reduces duplication between SimpleCookieConsent, ComplianceCookieConsent, etc.
 */

import { useState, useEffect, useCallback } from 'react'

/**
 * Generate a unique consent ID
 * @returns {string} Unique consent identifier
 */
export const generateConsentId = () => {
  return 'consent_' + Date.now().toString(36) + Math.random().toString(36).substring(2)
}

/**
 * Custom hook for managing consent storage
 * @param {string} storageKey - LocalStorage key for storing consent
 * @param {Object} defaultConsent - Default consent values
 * @returns {Object} Consent state and methods
 */
export const useConsentStorage = (storageKey, defaultConsent = {}) => {
  const [consent, setConsent] = useState(defaultConsent)
  const [consentId, setConsentId] = useState(null)
  const [consentDate, setConsentDate] = useState(null)
  const [hasConsented, setHasConsented] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load consent from localStorage
  useEffect(() => {
    try {
      const savedConsent = localStorage.getItem(storageKey)
      if (savedConsent) {
        const parsed = JSON.parse(savedConsent)
        setConsent(parsed.preferences || parsed.consent || defaultConsent)
        setConsentId(parsed.consentId)
        setConsentDate(parsed.timestamp || parsed.consentDate)
        setHasConsented(true)
      }
    } catch (error) {
      console.warn('Failed to load consent from storage:', error)
    } finally {
      setIsLoading(false)
    }
  }, [storageKey, defaultConsent])

  // Save consent to localStorage
  const saveConsent = useCallback((newConsent, additionalData = {}) => {
    const timestamp = new Date().toISOString()
    const newConsentId = generateConsentId()
    
    const consentRecord = {
      consentId: newConsentId,
      timestamp,
      preferences: newConsent,
      version: '1.0',
      ...additionalData
    }

    try {
      localStorage.setItem(storageKey, JSON.stringify(consentRecord))
      setConsent(newConsent)
      setConsentId(newConsentId)
      setConsentDate(timestamp)
      setHasConsented(true)
      
      return consentRecord
    } catch (error) {
      console.error('Failed to save consent:', error)
      return null
    }
  }, [storageKey])

  // Clear consent from storage
  const clearConsent = useCallback(() => {
    try {
      localStorage.removeItem(storageKey)
      setConsent(defaultConsent)
      setConsentId(null)
      setConsentDate(null)
      setHasConsented(false)
    } catch (error) {
      console.error('Failed to clear consent:', error)
    }
  }, [storageKey, defaultConsent])

  // Update partial consent
  const updateConsent = useCallback((updates) => {
    setConsent(prev => ({ ...prev, ...updates }))
  }, [])

  return {
    consent,
    consentId,
    consentDate,
    hasConsented,
    isLoading,
    saveConsent,
    clearConsent,
    updateConsent,
    setConsent
  }
}

/**
 * Hook for managing banner/modal visibility based on consent
 * @param {boolean} hasConsented - Whether user has already consented
 * @param {boolean} forceShow - Force show the banner/modal
 * @returns {Object} Visibility state and methods
 */
export const useConsentVisibility = (hasConsented, forceShow = false) => {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)

  useEffect(() => {
    if (!hasConsented && !forceShow) {
      setShowBanner(true)
    }
  }, [hasConsented, forceShow])

  const openPreferences = useCallback(() => {
    setShowBanner(false)
    setShowPreferences(true)
  }, [])

  const closePreferences = useCallback(() => {
    setShowPreferences(false)
    if (!hasConsented) {
      setShowBanner(true)
    }
  }, [hasConsented])

  const closeBanner = useCallback(() => {
    setShowBanner(false)
  }, [])

  return {
    showBanner,
    showPreferences,
    openPreferences,
    closePreferences,
    closeBanner,
    setShowBanner,
    setShowPreferences
  }
}

export default useConsentStorage