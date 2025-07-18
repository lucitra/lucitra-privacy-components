/**
 * Cookie Manager - Legacy Stories
 * 
 * Demonstrates the low-level cookie utilities that remain
 * For full privacy UI, see the Unified Privacy System stories
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Stack, Container, Alert, Group, Badge, Text, Button, Code } from '@mantine/core';
import { IconCookieMan, IconShield, IconDatabase, IconCheck } from '@tabler/icons-react';

import { useCookieManager } from './CookieManager';

export default {
  title: 'Privacy/Cookie Utilities',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Cookie Utilities

**Low-level cookie management utilities**

This demonstrates the low-level cookie utilities for advanced use cases:
- Raw cookie management functions
- Cross-domain cookie utilities  
- GDPR compliance utilities
- Audit trail functionality

For complete privacy UI components, see: \`Privacy/Unified System\`
        `
      }
    }
  }
};

// Live Cookie Demo
export const LiveCookieDemo = {
  name: 'Low-Level Cookie Utilities',
  render: function Render() {
    const { 
      cookieManager, 
      _consentState, 
      _hasConsent, 
      generateComplianceReport 
    } = useCookieManager();
    
    const [allCookies, setAllCookies] = useState({});
    const [complianceReport, setComplianceReport] = useState(null);
    
    // Refresh cookie data
    const refreshData = useCallback(() => {
      setAllCookies(cookieManager.getAllLucitraCookies());
      setComplianceReport(generateComplianceReport());
    }, [cookieManager, generateComplianceReport]);
    
    useEffect(() => {
      refreshData();
      
      // Listen for consent changes
      const handleConsentChange = (_event) => {
        refreshData();
      };
      
      window.addEventListener('lucitraConsentChange', handleConsentChange);
      
      return () => {
        window.removeEventListener('lucitraConsentChange', handleConsentChange);
      };
    }, [refreshData]);
    
    // Demo functions
    const setTestCookie = () => {
      cookieManager.setCookie('lucitra_test_cookie', 'test_value_' + Date.now(), {
        days: 1
      });
      refreshData();
    };
    
    const deleteTestCookie = () => {
      cookieManager.deleteCookie('lucitra_test_cookie');
      refreshData();
    };
    
    return (
      <Container size="xl" py="xl">
        <Alert mb="xl" color="yellow" icon={<IconCookieMan />}>
          <Group justify="space-between">
            <div>
              <Text fw={600}>Cookie Management Utilities</Text>
              <Text size="sm">
                Low-level cookie functions for advanced use cases
              </Text>
            </div>
            <Badge color="blue" size="lg">Utilities</Badge>
          </Group>
        </Alert>
        
        <Stack gap="xl">
          
          {/* Live Cookie Data */}
          <Alert color="green" icon={<IconDatabase />}>
            <Group justify="space-between" mb="md">
              <Text fw={600}>Current Cookies in Browser</Text>
              <Group gap="sm">
                <Button size="xs" onClick={setTestCookie}>Set Test Cookie</Button>
                <Button size="xs" onClick={deleteTestCookie} color="red">Delete Test</Button>
                <Button size="xs" onClick={refreshData}>Refresh</Button>
              </Group>
            </Group>
            
            {Object.keys(allCookies).length > 0 ? (
              <Code block style={{ fontSize: '11px', maxHeight: '200px', overflow: 'auto' }}>
                {JSON.stringify(allCookies, null, 2)}
              </Code>
            ) : (
              <Text size="sm" c="dimmed">No Lucitra cookies found</Text>
            )}
          </Alert>
          
          {/* Compliance Report */}
          {complianceReport && (
            <Alert color="purple" icon={<IconShield />}>
              <Text fw={600} mb="xs">Compliance Status</Text>
              <Text size="sm">
                Cookies Enabled: {complianceReport.cookiesEnabled ? 'Yes' : 'No'} |
                Total Cookies: {complianceReport.totalCookies} |
                Audit Events: {complianceReport.auditEvents} |
                Cross-Domain: {complianceReport.crossDomainEnabled ? 'Enabled' : 'Disabled'}
              </Text>
            </Alert>
          )}
          
          {/* API Examples */}
          <Alert color="gray">
            <Text fw={600} mb="xs">Available Utility Functions</Text>
            <Code block style={{ fontSize: '11px' }}>
{`// Low-level cookie utilities
const { cookieManager } = useCookieManager();

// Set a cookie
cookieManager.setCookie('name', 'value', { days: 30 });

// Get a cookie  
const value = cookieManager.getCookie('name');

// Delete a cookie
cookieManager.deleteCookie('name');

// Get all Lucitra cookies
const allCookies = cookieManager.getAllLucitraCookies();

// Cross-domain sync
cookieManager.syncAcrossDomains();`}
            </Code>
          </Alert>
        </Stack>
      </Container>
    );
  }
};

// Cross-Domain Demo
export const CrossDomainDemo = {
  name: 'Cross-Domain Cookie Utilities',
  render: function Render() {
    const { cookieManager } = useCookieManager();
    const [syncStatus, setSyncStatus] = useState('Ready');
    
    const testCrossDomainSync = () => {
      setSyncStatus('Syncing...');
      
      // Simulate cross-domain sync
      cookieManager.syncAcrossDomains();
      
      setTimeout(() => {
        setSyncStatus('Synced');
        setTimeout(() => setSyncStatus('Ready'), 2000);
      }, 1000);
    };
    
    return (
      <Container size="xl" py="xl">
        <Alert mb="xl" color="teal" icon={<IconShield />}>
          <Text fw={600}>Cross-Domain Cookie Utilities</Text>
          <Text size="sm">
            Low-level utilities for consent synchronization across *.lucitra.ai subdomains
          </Text>
        </Alert>
        
        <Stack gap="lg">
          
          <Text>
            This demo shows the underlying cookie utilities for cross-domain functionality:
          </Text>
          
          <ul>
            <li>app.lucitra.ai (main 3D platform)</li>
            <li>docs.lucitra.ai (documentation)</li>
            <li>blog.lucitra.ai (marketing site)</li>
            <li>marketplace.lucitra.ai (asset store)</li>
          </ul>
          
          <Group>
            <Button 
              onClick={testCrossDomainSync}
              loading={syncStatus === 'Syncing...'}
              color={syncStatus === 'Synced' ? 'green' : 'blue'}
            >
              {syncStatus === 'Synced' ? 'Synced!' : 'Test Cross-Domain Sync'}
            </Button>
          </Group>
          
          <Alert color="blue">
            <Text fw={600} mb="xs">How it works:</Text>
            <Text size="sm">
              1. Consent is stored with domain=.lucitra.ai<br/>
              2. All subdomains can read the consent cookie<br/>
              3. Changes sync automatically across tabs/domains<br/>
              4. Users only need to consent once across all properties
            </Text>
          </Alert>
          
          <Alert color="purple">
            <Text fw={600} mb="xs">Implementation Example:</Text>
            <Code block style={{ fontSize: '11px' }}>
{`// Cross-domain cookie setup
cookieManager.setCookie('consent', data, {
  domain: '.lucitra.ai',  // Available to all subdomains
  secure: true,
  sameSite: 'Lax'
});

// Sync across domains
cookieManager.syncAcrossDomains();`}
            </Code>
          </Alert>
        </Stack>
      </Container>
    );
  }
};

// Compliance Features Demo
export const ComplianceDemo = {
  name: 'GDPR Compliance Utilities',
  render: function Render() {
    const { 
      _cookieManager, 
      clearAllCookies, 
      exportUserData, 
      _generateComplianceReport 
    } = useCookieManager();
    
    const [exportData, setExportData] = useState(null);
    const [auditTrail, setAuditTrail] = useState([]);
    
    const handleExportData = () => {
      const data = exportUserData();
      setExportData(data);
    };
    
    const handleClearAllData = () => {
      clearAllCookies(false); // Don't keep essential cookies
      setExportData(null);
      setAuditTrail([]);
    };
    
    const showAuditTrail = () => {
      try {
        const audit = JSON.parse(localStorage.getItem('lucitra_cookie_audit') || '[]');
        setAuditTrail(audit.slice(-10)); // Show last 10 events
      } catch {
        setAuditTrail([]);
      }
    };
    
    return (
      <Container size="xl" py="xl">
        <Alert mb="xl" color="green" icon={<IconShield />}>
          <Text fw={600}>GDPR Compliance Utilities</Text>
          <Text size="sm">
            Low-level functions for data rights: access, portability, erasure, and audit trails
          </Text>
        </Alert>
        
        <Stack gap="lg">
          
          <Group gap="sm">
            <Button onClick={handleExportData} leftSection={<IconDatabase size={16} />}>
              Export My Data (GDPR Article 20)
            </Button>
            <Button color="red" onClick={handleClearAllData} leftSection={<IconDatabase size={16} />}>
              Delete All Data (Right to Erasure)
            </Button>
            <Button variant="outline" onClick={showAuditTrail}>
              Show Audit Trail
            </Button>
          </Group>
          
          {exportData && (
            <Alert color="blue">
              <Text fw={600} mb="xs">Exported Data (GDPR Article 20)</Text>
              <Code block style={{ fontSize: '10px', maxHeight: '300px', overflow: 'auto' }}>
                {JSON.stringify(exportData, null, 2)}
              </Code>
            </Alert>
          )}
          
          {auditTrail.length > 0 && (
            <Alert color="purple">
              <Text fw={600} mb="xs">Recent Audit Events</Text>
              <Stack gap="xs">
                {auditTrail.map((event, index) => (
                  <Text key={index} size="xs" family="monospace">
                    {new Date(event.timestamp).toLocaleTimeString()}: {event.action}
                  </Text>
                ))}
              </Stack>
            </Alert>
          )}
          
          <Alert color="gray">
            <Text fw={600} mb="xs">Available GDPR Functions</Text>
            <Code block style={{ fontSize: '11px' }}>
{`// GDPR utility functions
const { exportUserData, clearAllCookies } = useCookieManager();

// Export user data (Article 20)
const data = exportUserData();

// Delete all data (Right to Erasure)
clearAllCookies(false);

// Get compliance report
const report = generateComplianceReport();`}
            </Code>
          </Alert>
        </Stack>
      </Container>
    );
  }
}