/**
 * Unified Privacy Provider
 * 
 * Single provider that handles all privacy state management, storage, and tracking
 * Consolidates functionality from GranularAnalytics, CookieManager, and PrivacyProvider
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { UnifiedPrivacyContext } from './UnifiedPrivacyContext';
import { mergeConfig, getCategoryKeys } from './privacyConfig';

class UnifiedPrivacyManager {
  constructor(config) {
    this.config = config;
    this.listeners = new Set();
    this.isInitialized = false;
    this.sessionId = null;
    
    this.init();
  }
  
  init() {
    // Check if cookies are enabled
    if (!this.areCookiesEnabled()) {
      console.warn('Cookies are disabled in this browser');
      return;
    }
    
    // Load existing consent
    const existingConsent = this.loadConsentFromStorage();
    if (existingConsent && existingConsent.timestamp) {
      this.isInitialized = true;
      if (this.hasValidConsent(existingConsent.consents)) {
        this.sessionId = this.getOrCreateSession();
      }
    }
  }
  
  // Storage Management
  areCookiesEnabled() {
    try {
      document.cookie = 'test=1; SameSite=Lax';
      const enabled = document.cookie.indexOf('test=1') !== -1;
      document.cookie = 'test=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      return enabled;
    } catch (e) {
      return false;
    }
  }
  
  loadConsentFromStorage() {
    try {
      // Try localStorage first for richer data
      const stored = localStorage.getItem('lucitra_privacy_consent');
      if (stored) {
        const parsed = JSON.parse(stored);
        
        // Validate stored data structure
        if (parsed.version && parsed.consents && parsed.timestamp) {
          return parsed;
        }
      }
      
      // Fallback to cookies for basic consent
      const cookieConsent = this.getCookie(this.config.storage.cookieName);
      if (cookieConsent) {
        const parsed = JSON.parse(decodeURIComponent(cookieConsent));
        return {
          consents: parsed.consents || {},
          timestamp: parsed.timestamp,
          version: '1.0'
        };
      }
    } catch (e) {
      console.warn('Failed to load consent data:', e);
    }
    
    return null;
  }
  
  saveConsentToStorage(data) {
    const consentData = {
      ...data,
      version: '2.0',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      config: {
        categories: Object.keys(this.config.categories),
        compliance: this.config.compliance.frameworks
      }
    };
    
    try {
      // Save to localStorage for full data
      localStorage.setItem('lucitra_privacy_consent', JSON.stringify(consentData));
      
      // Save to cookie for cross-domain/simple access
      if (this.config.storage.type === 'cookies' || this.config.storage.type === 'both') {
        const cookieData = {
          consents: data.consents,
          timestamp: consentData.timestamp
        };
        
        this.setCookie(
          this.config.storage.cookieName,
          encodeURIComponent(JSON.stringify(cookieData)),
          this.config.storage.expireDays
        );
      }
      
      // Notify listeners
      this.notifyListeners('consent_updated', consentData);
      
      // Trigger browser event for cross-tab sync
      window.dispatchEvent(new CustomEvent('lucitraPrivacyChange', {
        detail: { type: 'consent_updated', data: consentData }
      }));
      
      return true;
    } catch (e) {
      console.error('Failed to save consent data:', e);
      return false;
    }
  }
  
  setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    
    let cookieString = `${name}=${value}`;
    cookieString += `; expires=${expires.toUTCString()}`;
    cookieString += `; path=${this.config.storage.path}`;
    
    if (this.config.storage.domain) {
      cookieString += `; domain=${this.config.storage.domain}`;
    }
    
    if (this.config.storage.secure) {
      cookieString += `; Secure`;
    }
    
    cookieString += `; SameSite=${this.config.storage.sameSite}`;
    
    document.cookie = cookieString;
  }
  
  getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === name) {
        return value;
      }
    }
    return null;
  }
  
  // Consent Management
  hasValidConsent(consents) {
    // Check if user has made any consent choices
    return Object.values(consents).some(consent => consent !== null);
  }
  
  canTrack(category, consents) {
    return consents[category] === true;
  }
  
  updateConsent(category, granted, metadata = {}) {
    const currentData = this.loadConsentFromStorage() || { consents: {} };
    
    const updatedConsents = {
      ...currentData.consents,
      [category]: granted
    };
    
    return this.saveConsentToStorage({
      consents: updatedConsents,
      metadata: {
        ...currentData.metadata,
        [category]: {
          timestamp: new Date().toISOString(),
          source: metadata.source || 'user_interaction',
          ...metadata
        }
      }
    });
  }
  
  updateAllConsents(consents, metadata = {}) {
    return this.saveConsentToStorage({
      consents,
      metadata: {
        timestamp: new Date().toISOString(),
        source: metadata.source || 'bulk_update',
        ...metadata
      }
    });
  }
  
  // Session Management
  getOrCreateSession() {
    if (!this.canTrack('essential', this.loadConsentFromStorage()?.consents || {})) {
      return null;
    }
    
    let sessionData = this.getCookie('lucitra_session');
    
    if (sessionData) {
      try {
        const parsed = JSON.parse(decodeURIComponent(sessionData));
        if (Date.now() - parsed.lastActivity < 30 * 60 * 1000) {
          this.updateSessionActivity(parsed);
          return parsed.id;
        }
      } catch (e) {
        console.warn('Invalid session cookie');
      }
    }
    
    return this.createNewSession();
  }
  
  createNewSession() {
    const sessionId = `ls_${Date.now().toString(36)}_${Math.random().toString(36).substring(2)}`;
    const sessionData = {
      id: sessionId,
      created: Date.now(),
      lastActivity: Date.now()
    };
    
    this.setCookie('lucitra_session', encodeURIComponent(JSON.stringify(sessionData)), 1);
    return sessionId;
  }
  
  updateSessionActivity(sessionData) {
    sessionData.lastActivity = Date.now();
    this.setCookie('lucitra_session', encodeURIComponent(JSON.stringify(sessionData)), 1);
  }
  
  // Tracking Methods
  track(eventName, properties = {}, category = 'analytics') {
    const consentData = this.loadConsentFromStorage();
    if (!consentData || !this.canTrack(category, consentData.consents)) {
      return false;
    }
    
    const event = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      name: eventName,
      properties: this.sanitizeProperties(properties),
      category: category,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      consent: {
        version: consentData.version,
        timestamp: consentData.timestamp
      }
    };
    
    this.sendEvent(event);
    return true;
  }
  
  sanitizeProperties(props) {
    const sanitized = { ...props };
    const piiFields = ['email', 'name', 'phone', 'ip', 'password'];
    piiFields.forEach(field => delete sanitized[field]);
    return sanitized;
  }
  
  async sendEvent(event) {
    try {
      // In a real implementation, this would send to your analytics endpoint
      if (this.config.debug) {
        console.log('Privacy Event:', event);
      }
      
      // Notify listeners for real-time updates
      this.notifyListeners('event_tracked', event);
    } catch (error) {
      console.warn('Analytics event failed:', error);
    }
  }
  
  // Data Management
  exportUserData() {
    const consentData = this.loadConsentFromStorage();
    const sessionData = this.getCookie('lucitra_session');
    
    return {
      consent: consentData,
      session: sessionData ? JSON.parse(decodeURIComponent(sessionData)) : null,
      exported: new Date().toISOString(),
      version: '2.0'
    };
  }
  
  clearAllData() {
    // Clear localStorage
    localStorage.removeItem('lucitra_privacy_consent');
    
    // Clear cookies
    this.setCookie(this.config.storage.cookieName, '', -1);
    this.setCookie('lucitra_session', '', -1);
    
    // Reset state
    this.isInitialized = false;
    this.sessionId = null;
    
    // Notify listeners
    this.notifyListeners('data_cleared', {});
  }
  
  // Event System
  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }
  
  notifyListeners(type, data) {
    this.listeners.forEach(callback => {
      try {
        callback({ type, data });
      } catch (e) {
        console.error('Privacy listener error:', e);
      }
    });
  }
}

export const UnifiedPrivacyProvider = ({ 
  children, 
  config = {},
  onConsentChange,
  onEvent,
  debug = false
}) => {
  const mergedConfig = mergeConfig({ ...config, debug });
  const managerRef = useRef();
  
  // Initialize manager
  if (!managerRef.current) {
    managerRef.current = new UnifiedPrivacyManager(mergedConfig);
  }
  
  // State management
  const [consentData, setConsentData] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load initial state
  useEffect(() => {
    const manager = managerRef.current;
    
    const loadInitialState = () => {
      const data = manager.loadConsentFromStorage();
      setConsentData(data);
      
      // Show banner if no consent and configured to show
      if (!data?.timestamp && mergedConfig.compliance.showOnFirstVisit) {
        setShowBanner(true);
      }
      
      setIsLoading(false);
    };
    
    loadInitialState();
    
    // Listen for privacy events
    const unsubscribe = manager.addListener((event) => {
      if (event.type === 'consent_updated') {
        setConsentData(event.data);
        onConsentChange?.(event.data);
      } else if (event.type === 'event_tracked') {
        onEvent?.(event.data);
      }
    });
    
    // Listen for cross-tab changes
    const handleStorageChange = (e) => {
      if (e.detail?.type === 'consent_updated') {
        loadInitialState();
      }
    };
    
    window.addEventListener('lucitraPrivacyChange', handleStorageChange);
    
    return () => {
      unsubscribe();
      window.removeEventListener('lucitraPrivacyChange', handleStorageChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // Context methods
  const updateConsent = useCallback((category, granted, metadata) => {
    return managerRef.current.updateConsent(category, granted, metadata);
  }, []);
  
  const updateAllConsents = useCallback((consents, metadata) => {
    return managerRef.current.updateAllConsents(consents, metadata);
  }, []);
  
  const canTrack = useCallback((category) => {
    const consents = consentData?.consents || {};
    return managerRef.current.canTrack(category, consents);
  }, [consentData]);
  
  const hasConsent = useCallback(() => {
    const consents = consentData?.consents || {};
    return managerRef.current.hasValidConsent(consents);
  }, [consentData]);
  
  const track = useCallback((eventName, properties, category) => {
    return managerRef.current.track(eventName, properties, category);
  }, []);
  
  const exportData = useCallback(() => {
    return managerRef.current.exportUserData();
  }, []);
  
  const clearAllData = useCallback(() => {
    managerRef.current.clearAllData();
    setConsentData(null);
    setShowBanner(true);
  }, []);
  
  const openCustomization = useCallback(() => {
    // Apply customization preselection behavior
    if (mergedConfig.behavior.customizePreselection === 'all_true') {
      const allTrue = {};
      getCategoryKeys(mergedConfig.categories).forEach(key => {
        allTrue[key] = true;
      });
      updateAllConsents(allTrue, { source: 'customize_preselection' });
    }
    
    setShowModal(true);
    setShowBanner(false);
  }, [mergedConfig, updateAllConsents]);
  
  // Context value
  const contextValue = {
    // Configuration
    config: mergedConfig,
    categories: mergedConfig.categories,
    
    // State
    consentData,
    isLoading,
    hasConsent: hasConsent(),
    
    // UI State
    showBanner,
    setShowBanner,
    showModal,
    setShowModal,
    openCustomization,
    
    // Methods
    updateConsent,
    updateAllConsents,
    canTrack,
    track,
    exportData,
    clearAllData,
    
    // Tracking shortcuts
    trackAnalytics: (event, props) => track(event, props, 'analytics'),
    trackMarketing: (event, props) => track(event, props, 'marketing'),
    trackAITraining: (event, props) => track(event, props, 'ai_training'),
    
    // Manager access for advanced use cases
    manager: managerRef.current
  };
  
  return (
    <UnifiedPrivacyContext.Provider value={contextValue}>
      {children}
    </UnifiedPrivacyContext.Provider>
  );
};