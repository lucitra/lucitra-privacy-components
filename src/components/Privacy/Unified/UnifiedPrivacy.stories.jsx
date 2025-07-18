/**
 * Unified Privacy Stories
 * 
 * Comprehensive demo of the unified privacy system
 * Shows all modes and configuration options
 */

import React, { useState } from 'react';
import { 
  Container, 
  Title, 
  Text, 
  Button, 
  Group, 
  Stack, 
  Card,
  Alert,
  Tabs,
  Code,
  Badge
} from '@mantine/core';
import { IconDatabase, IconEye, IconSettings, IconBrain, IconShield } from '@tabler/icons-react';
import { UnifiedPrivacyProvider, UnifiedPrivacyManager, useUnifiedPrivacy } from './index';

export default {
  title: 'Privacy/Unified System',
  component: UnifiedPrivacyManager,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Unified privacy management system that replaces all fragmented cookie consent components. Single component, fully configurable for all use cases.'
      }
    }
  }
};

// Test panel for demonstrating tracking
const TestingPanel = () => {
  const { 
    canTrack,
    trackAnalytics, 
    trackMarketing, 
    trackAITraining,
    consentData,
    exportData,
    clearAllData,
    setShowBanner,
    setShowModal
  } = useUnifiedPrivacy();
  
  const [lastEvent, setLastEvent] = useState(null);
  
  const testTracking = (category, eventName) => {
    let success = false;
    
    switch (category) {
      case 'analytics':
        success = trackAnalytics(eventName, { source: 'test' });
        break;
      case 'marketing':
        success = trackMarketing(eventName, { source: 'test' });
        break;
      case 'ai_training':
        success = trackAITraining(eventName, { source: 'test' });
        break;
    }
    
    setLastEvent({
      category,
      eventName,
      success,
      timestamp: new Date().toISOString()
    });
  };
  
  return (
    <Card
      style={{
        border: '1px solid #e5e7eb',
        backgroundColor: 'white',
        borderRadius: 0
      }}
      p="md"
    >
      <Group justify="space-between" mb="md">
        <Group>
          <IconDatabase size={20} color="black" />
          <Title order={4} c="black">Privacy Testing Panel</Title>
        </Group>
      </Group>
      
      <Stack gap="sm" mb="lg">
        <Button
          onClick={() => testTracking('analytics', 'test_analytics_event')}
          fullWidth
          style={{
            backgroundColor: canTrack('analytics') ? 'black' : 'white',
            color: canTrack('analytics') ? 'white' : 'gray',
            border: canTrack('analytics') ? '2px solid black' : '1px solid gray'
          }}
          disabled={!canTrack('analytics')}
        >
          Test Analytics {!canTrack('analytics') && '(Disabled)'}
        </Button>
        
        <Button
          onClick={() => testTracking('marketing', 'test_marketing_event')}
          fullWidth
          style={{
            backgroundColor: canTrack('marketing') ? 'black' : 'white',
            color: canTrack('marketing') ? 'white' : 'gray',
            border: canTrack('marketing') ? '2px solid black' : '1px solid gray'
          }}
          disabled={!canTrack('marketing')}
        >
          Test Marketing {!canTrack('marketing') && '(Disabled)'}
        </Button>
        
        <Button
          onClick={() => testTracking('ai_training', 'test_ai_training_event')}
          fullWidth
          style={{
            backgroundColor: canTrack('ai_training') ? 'black' : 'white',
            color: canTrack('ai_training') ? 'white' : 'gray',
            border: canTrack('ai_training') ? '2px solid black' : '1px solid gray'
          }}
          disabled={!canTrack('ai_training')}
        >
          Test AI Training {!canTrack('ai_training') && '(Disabled)'}
        </Button>
      </Stack>
      
      {lastEvent && (
        <Alert
          style={{
            backgroundColor: lastEvent.success ? '#f0f9ff' : '#fef2f2',
            border: `1px solid ${lastEvent.success ? '#3b82f6' : '#ef4444'}`,
            borderRadius: 0
          }}
          mb="md"
        >
          <Text size="sm" fw={600}>
            {lastEvent.success ? '✓' : '✗'} {lastEvent.eventName}
          </Text>
          <Text size="xs" c="gray.7">
            Category: {lastEvent.category} | {lastEvent.success ? 'Tracked' : 'Blocked'} | 
            {new Date(lastEvent.timestamp).toLocaleTimeString()}
          </Text>
        </Alert>
      )}
      
      <Group gap="xs" mb="md">
        <Button
          size="xs"
          variant="outline"
          onClick={() => setShowBanner(true)}
          style={{ color: 'black', border: '1px solid black' }}
        >
          Show Banner
        </Button>
        <Button
          size="xs"
          variant="outline"
          onClick={() => setShowModal(true)}
          style={{ color: 'black', border: '1px solid black' }}
        >
          Show Modal
        </Button>
        <Button
          size="xs"
          variant="outline"
          onClick={() => {
            const data = exportData();
            console.log('Exported Data:', data);
            alert('Data exported to console');
          }}
          style={{ color: 'black', border: '1px solid black' }}
        >
          Export Data
        </Button>
        <Button
          size="xs"
          variant="outline"
          onClick={() => {
            if (confirm('Clear all privacy data?')) {
              clearAllData();
            }
          }}
          style={{ color: 'gray', border: '1px solid gray' }}
        >
          Reset
        </Button>
      </Group>
      
      {consentData && (
        <div>
          <Text size="xs" fw={600} mb="xs">Current Consent State:</Text>
          <Code block style={{ fontSize: '10px' }}>
            {JSON.stringify(consentData.consents, null, 2)}
          </Code>
        </div>
      )}
    </Card>
  );
};

// Status display component
const StatusDisplay = () => {
  const { consentData, hasConsent, config } = useUnifiedPrivacy();
  
  return (
    <Card
      style={{
        border: '1px solid #e5e7eb',
        backgroundColor: 'white',
        borderRadius: 0
      }}
      p="md"
    >
      <Group justify="space-between" mb="sm">
        <Group>
          <IconShield size={20} color="black" />
          <Title order={4} c="black">Privacy Status</Title>
        </Group>
        <Badge 
          color={hasConsent ? 'green' : 'yellow'}
          style={{ backgroundColor: hasConsent ? '#22c55e' : '#f59e0b', color: 'white' }}
        >
          {hasConsent ? 'Configured' : 'Needs Setup'}
        </Badge>
      </Group>
      
      <Stack gap="xs">
        <Text size="sm">
          <strong>Mode:</strong> {config.mode}
        </Text>
        <Text size="sm">
          <strong>Variant:</strong> {config.variant}
        </Text>
        <Text size="sm">
          <strong>Last Updated:</strong> {consentData?.timestamp ? new Date(consentData.timestamp).toLocaleString() : 'Never'}
        </Text>
        <Text size="sm">
          <strong>Categories:</strong> {Object.keys(config.categories).length}
        </Text>
      </Stack>
    </Card>
  );
};

// Main demo wrapper
const UnifiedPrivacyDemo = ({ config, mode }) => {
  return (
    <UnifiedPrivacyProvider 
      config={config}
      onConsentChange={(data) => console.log('Consent changed:', data)}
      onEvent={(event) => console.log('Event tracked:', event)}
      debug={true}
    >
      <Container size="xl" p="xl">
        <Stack gap="xl">
          <div style={{ textAlign: 'center' }}>
            <Title order={1} mb="sm">Unified Privacy System Demo</Title>
            <Text c="gray.7" mb="lg">
              Single component system for all privacy needs - banner, modal, dashboard
            </Text>
            <Text size="sm" c="blue.6">
              Check the browser console for tracking events and state changes
            </Text>
          </div>
          
          <Group align="flex-start" gap="xl">
            <div style={{ flex: 1 }}>
              <StatusDisplay />
            </div>
            <div style={{ flex: 1 }}>
              <TestingPanel />
            </div>
          </Group>
          
          <UnifiedPrivacyManager mode={mode} />
        </Stack>
      </Container>
    </UnifiedPrivacyProvider>
  );
};

// Stories
export const Banner = () => (
  <UnifiedPrivacyDemo 
    mode="banner"
    config={{
      mode: 'banner',
      variant: 'simple',
      compliance: { showOnFirstVisit: true }
    }}
  />
);

export const DetailedBanner = () => (
  <UnifiedPrivacyDemo 
    mode="banner"
    config={{
      mode: 'banner',
      variant: 'detailed',
      compliance: { showOnFirstVisit: true },
      branding: {
        title: 'Cookie Preferences',
        subtitle: 'We use cookies to enhance your 3D platform experience',
        privacyPolicyUrl: '/privacy',
        cookiePolicyUrl: '/cookies'
      }
    }}
  />
);

export const Modal = () => (
  <UnifiedPrivacyDemo 
    mode="embedded"
    config={{
      compliance: { showOnFirstVisit: false },
      behavior: { customizePreselection: 'all_true' }
    }}
  />
);

export const Dashboard = () => (
  <UnifiedPrivacyDemo 
    mode="dashboard"
    config={{
      compliance: { showOnFirstVisit: false }
    }}
  />
);

export const CustomTheme = () => (
  <UnifiedPrivacyDemo 
    mode="banner"
    config={{
      mode: 'banner',
      variant: 'detailed',
      compliance: { showOnFirstVisit: true },
      ui: {
        colors: {
          primary: '#3b82f6',
          secondary: '#6b7280',
          accent: '#8b5cf6',
          background: '#ffffff',
          text: '#1f2937'
        }
      },
      branding: {
        title: 'Your Privacy Matters',
        subtitle: 'Customize how we use cookies and data',
        companyName: 'Custom Corp'
      }
    }}
  />
);

export const ConfigurationExample = () => {
  const [activeTab, setActiveTab] = useState('banner');
  
  const customCategories = {
    essential: {
      name: 'Essential',
      description: 'Required for basic platform functionality',
      required: true,
      icon: 'IconShield',
      examples: ['Authentication', 'Session management', 'Security']
    },
    analytics: {
      name: 'Usage Analytics',
      description: 'Help us understand how you use our platform',
      required: false,
      icon: 'IconDatabase',
      examples: ['Page views', 'Feature usage', 'Performance tracking']
    },
    personalization: {
      name: 'Personalization',
      description: 'Customize your experience based on preferences',
      required: false,
      icon: 'IconUsers',
      examples: ['Recommended content', 'UI preferences', 'Saved searches']
    },
    ai_improvement: {
      name: 'AI Model Training',
      description: 'Help improve our AI with anonymized data',
      required: false,
      icon: 'IconBrain',
      examples: ['Model training', 'Algorithm improvement', 'Quality assurance']
    }
  };
  
  return (
    <UnifiedPrivacyProvider 
      config={{
        categories: customCategories,
        compliance: { showOnFirstVisit: true },
        behavior: { customizePreselection: 'all_true' },
        ui: {
          showExamples: true,
          showProgress: true
        }
      }}
      debug={true}
    >
      <Container size="xl" p="xl">
        <Stack gap="xl">
          <div style={{ textAlign: 'center' }}>
            <Title order={1} mb="sm">Custom Configuration Example</Title>
            <Text c="gray.7" mb="lg">
              Custom categories, themes, and behaviors
            </Text>
          </div>
          
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab value="banner">Banner</Tabs.Tab>
              <Tabs.Tab value="modal">Modal</Tabs.Tab>
              <Tabs.Tab value="dashboard">Dashboard</Tabs.Tab>
            </Tabs.List>
            
            <Tabs.Panel value="banner" pt="md">
              <UnifiedPrivacyManager mode="banner" />
            </Tabs.Panel>
            
            <Tabs.Panel value="modal" pt="md">
              <UnifiedPrivacyManager mode="modal" />
            </Tabs.Panel>
            
            <Tabs.Panel value="dashboard" pt="md">
              <UnifiedPrivacyManager mode="dashboard" />
            </Tabs.Panel>
          </Tabs>
          
          <Group align="flex-start" gap="xl">
            <div style={{ flex: 1 }}>
              <StatusDisplay />
            </div>
            <div style={{ flex: 1 }}>
              <TestingPanel />
            </div>
          </Group>
        </Stack>
      </Container>
    </UnifiedPrivacyProvider>
  );
};