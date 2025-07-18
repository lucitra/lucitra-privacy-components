/**
 * Unified Privacy Manager
 * 
 * Single component that can render as banner, modal, dashboard, or embedded
 * Replaces CookieConsentBanner, SimplePrivacyNotice, GranularConsentModal, etc.
 */

import React from 'react';
import { 
  Modal, 
  Paper, 
  Title, 
  Text, 
  Button, 
  Group, 
  Stack, 
  Card, 
  Switch,
  Alert,
  Divider,
  Grid,
  Progress,
  Badge
} from '@mantine/core';
import { 
  IconShield, 
  IconDatabase, 
  IconBrain, 
  IconUsers, 
  IconCheck, 
  IconX, 
  IconSettings, 
  IconLock, 
  IconEye,
  IconCookieMan,
  IconDownload
} from '@tabler/icons-react';
import PropTypes from 'prop-types';
import { useUnifiedPrivacy } from './UnifiedPrivacyContext';

// Icon mapping
const ICON_MAP = {
  IconShield,
  IconDatabase,
  IconBrain,
  IconUsers,
  IconCheck,
  IconX,
  IconSettings,
  IconLock,
  IconEye,
  IconCookieMan,
  IconDownload
};

const PrivacyBanner = ({ onAcceptAll, onRejectAll, onCustomize }) => {
  const { config } = useUnifiedPrivacy();
  
  if (config.variant === 'simple') {
    return (
      <div style={{
        position: 'fixed',
        [config.position]: 0,
        left: 0,
        right: 0,
        backgroundColor: config.ui.colors.background,
        color: config.ui.colors.text,
        padding: '16px',
        zIndex: 1000,
        border: `2px solid ${config.ui.colors.primary}`,
        borderLeft: 0,
        borderRight: 0,
        borderBottom: config.position === 'bottom' ? 0 : `2px solid ${config.ui.colors.primary}`,
        borderTop: config.position === 'top' ? 0 : `2px solid ${config.ui.colors.primary}`
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Group justify="space-between" align="center">
            <Group gap="lg">
              <IconCookieMan size={24} color={config.ui.colors.primary} />
              <div>
                <Text fw={600} c={config.ui.colors.text}>
                  {config.branding.title}
                </Text>
                <Text size="sm" c={config.ui.colors.secondary}>
                  We use cookies for functionality and analytics. Choose your preferences.
                </Text>
              </div>
            </Group>
            <Group gap="sm">
              <Button
                onClick={onAcceptAll}
                style={{
                  backgroundColor: config.ui.colors.primary,
                  color: config.ui.colors.background,
                  border: `1px solid ${config.ui.colors.primary}`
                }}
                size="sm"
              >
                Accept All
              </Button>
              <Button
                onClick={onCustomize}
                variant="outline"
                style={{
                  backgroundColor: config.ui.colors.background,
                  color: config.ui.colors.primary,
                  border: `1px solid ${config.ui.colors.primary}`
                }}
                size="sm"
              >
                Customize
              </Button>
              <Button
                onClick={onRejectAll}
                variant="outline"
                style={{
                  backgroundColor: config.ui.colors.background,
                  color: config.ui.colors.secondary,
                  border: `1px solid ${config.ui.colors.secondary}`
                }}
                size="sm"
              >
                Essential Only
              </Button>
            </Group>
          </Group>
        </div>
      </div>
    );
  }
  
  // Detailed banner for complex scenarios
  return (
    <div style={{
      position: 'fixed',
      [config.position]: 0,
      left: 0,
      right: 0,
      backgroundColor: config.ui.colors.background,
      padding: '24px',
      zIndex: 1000,
      border: `2px solid ${config.ui.colors.primary}`,
      borderLeft: 0,
      borderRight: 0
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Grid align="center" gutter="lg">
          <Grid.Col span={8}>
            <Group gap="lg" align="flex-start">
              <IconCookieMan size={32} color={config.ui.colors.primary} style={{ marginTop: 4, flexShrink: 0 }} />
              <div>
                <Title order={3} c={config.ui.colors.text} mb="xs">
                  {config.branding.title}
                </Title>
                <Text c={config.ui.colors.secondary} size="sm" mb="sm">
                  {config.branding.subtitle}
                </Text>
                <Text c={config.ui.colors.secondary} size="xs">
                  View our{' '}
                  <a href={config.branding.privacyPolicyUrl} style={{ color: config.ui.colors.accent }}>
                    Privacy Policy
                  </a>{' '}
                  and{' '}
                  <a href={config.branding.cookiePolicyUrl} style={{ color: config.ui.colors.accent }}>
                    Cookie Policy
                  </a>
                </Text>
              </div>
            </Group>
          </Grid.Col>
          
          <Grid.Col span={4}>
            <Group justify="flex-end" gap="sm">
              <Button
                onClick={onAcceptAll}
                leftSection={<IconCheck size={16} />}
                style={{
                  backgroundColor: config.ui.colors.primary,
                  color: config.ui.colors.background,
                  border: `2px solid ${config.ui.colors.primary}`
                }}
              >
                Accept All
              </Button>
              <Button
                onClick={onCustomize}
                leftSection={<IconSettings size={16} />}
                variant="outline"
                style={{
                  backgroundColor: config.ui.colors.background,
                  color: config.ui.colors.primary,
                  border: `1px solid ${config.ui.colors.primary}`
                }}
              >
                Customize
              </Button>
              <Button
                onClick={onRejectAll}
                leftSection={<IconX size={16} />}
                variant="outline"
                style={{
                  backgroundColor: config.ui.colors.background,
                  color: config.ui.colors.secondary,
                  border: `1px solid ${config.ui.colors.secondary}`
                }}
              >
                Essential Only
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </div>
    </div>
  );
};

const PrivacyModal = ({ opened, onClose, onSave }) => {
  const { config, categories, consentData, updateConsent } = useUnifiedPrivacy();
  const consents = consentData?.consents || {};
  
  const handleToggle = (category) => {
    const categoryConfig = categories[category];
    if (categoryConfig.required) return; // Can't toggle required categories
    
    updateConsent(category, !consents[category], { source: 'modal_toggle' });
  };
  
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={null}
      size="lg"
      centered
      styles={{
        modal: {
          backgroundColor: config.ui.colors.background,
          border: `2px solid ${config.ui.colors.primary}`,
          borderRadius: 0
        },
        header: {
          backgroundColor: config.ui.colors.background,
          borderBottom: `1px solid ${config.ui.colors.secondary}`,
          padding: '24px 24px 16px'
        },
        body: {
          padding: '0 24px 24px',
          backgroundColor: config.ui.colors.background
        }
      }}
    >
      <Stack gap="lg">
        {/* Header */}
        <Group justify="space-between" align="flex-start">
          <Group>
            <IconShield size={24} color={config.ui.colors.primary} />
            <Title order={2} c={config.ui.colors.text}>{config.branding.title}</Title>
          </Group>
          <Button
            variant="subtle"
            onClick={onClose}
            size="xs"
            style={{ color: config.ui.colors.secondary }}
          >
            <IconX size={16} />
          </Button>
        </Group>
        
        {/* Introduction */}
        <Stack gap="sm">
          <Text c={config.ui.colors.secondary}>
            {config.branding.subtitle}
          </Text>
          
          {config.ui.showProgress && (
            <Alert
              icon={<IconLock color={config.ui.colors.primary} />}
              style={{
                backgroundColor: '#f8f9fa',
                border: `1px solid ${config.ui.colors.secondary}`,
                borderRadius: 0
              }}
            >
              <Text fw={600} c={config.ui.colors.text} size="sm">Privacy Promise:</Text>
              <Text c={config.ui.colors.secondary} size="sm">
                All data stays on our servers. No third-party tracking. No data sales.
              </Text>
            </Alert>
          )}
        </Stack>
        
        {/* Categories */}
        <Stack gap="md">
          {Object.entries(categories).map(([key, category]) => {
            const IconComponent = ICON_MAP[category.icon] || IconShield;
            const isEnabled = consents[key];
            
            return (
              <Card 
                key={key} 
                style={{
                  border: isEnabled ? `2px solid ${config.ui.colors.primary}` : `1px solid ${config.ui.colors.secondary}`,
                  borderRadius: 0,
                  backgroundColor: isEnabled ? '#f8f9fa' : config.ui.colors.background
                }}
                p="md"
              >
                <Group justify="space-between" align="flex-start">
                  <div style={{ flex: 1 }}>
                    <Group gap="sm" mb="xs">
                      <IconComponent size={20} color={config.ui.colors.primary} />
                      <Text fw={600} c={config.ui.colors.text}>{category.name}</Text>
                      {category.required && (
                        <Badge
                          style={{
                            backgroundColor: config.ui.colors.primary,
                            color: config.ui.colors.background
                          }}
                          size="xs"
                        >
                          REQUIRED
                        </Badge>
                      )}
                    </Group>
                    
                    <Text size="sm" c={config.ui.colors.secondary} mb="xs">
                      {category.description}
                    </Text>
                    
                    {config.ui.showExamples && (
                      <details>
                        <summary style={{ cursor: 'pointer', fontSize: '12px', color: config.ui.colors.secondary }}>
                          Examples ({category.examples.length})
                        </summary>
                        <Stack gap="xs" mt="xs" pl="md">
                          {category.examples.map((example, index) => (
                            <Text key={index} size="xs" c={config.ui.colors.secondary}>• {example}</Text>
                          ))}
                        </Stack>
                      </details>
                    )}
                  </div>
                  
                  <Switch
                    checked={isEnabled}
                    onChange={() => handleToggle(key)}
                    disabled={category.required}
                    color="dark"
                    size="md"
                    style={{ marginLeft: '16px' }}
                  />
                </Group>
              </Card>
            );
          })}
        </Stack>
        
        <Divider style={{ borderColor: config.ui.colors.secondary }} />
        
        {/* Save Button */}
        <Group justify="center">
          <Button
            onClick={onSave}
            leftSection={<IconCheck size={16} />}
            style={{
              backgroundColor: config.ui.colors.primary,
              color: config.ui.colors.background,
              border: `2px solid ${config.ui.colors.primary}`
            }}
          >
            Save Preferences
          </Button>
        </Group>
        
        <Text size="xs" c={config.ui.colors.secondary} ta="center">
          You can change these settings anytime in your privacy preferences.
        </Text>
      </Stack>
    </Modal>
  );
};

const PrivacyDashboard = () => {
  const { 
    config, 
    categories, 
    consentData, 
    updateConsent, 
    exportData, 
    clearAllData 
  } = useUnifiedPrivacy();
  
  const consents = consentData?.consents || {};
  const totalCategories = Object.keys(categories).length;
  const enabledCategories = Object.values(consents).filter(Boolean).length;
  const completionPercentage = (enabledCategories / totalCategories) * 100;
  
  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `privacy-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <Paper 
      p="xl" 
      style={{ 
        backgroundColor: config.ui.colors.background, 
        border: `2px solid ${config.ui.colors.primary}`,
        borderRadius: 0 
      }}
    >
      <Stack gap="xl">
        {/* Header */}
        <Group justify="center" mb="lg">
          <div style={{ 
            backgroundColor: config.ui.colors.primary,
            padding: '12px',
            borderRadius: 0,
            border: `1px solid ${config.ui.colors.primary}`
          }}>
            <IconShield size={32} color={config.ui.colors.background} />
          </div>
        </Group>
        
        <div style={{ textAlign: 'center' }}>
          <Title order={1} mb="sm" c={config.ui.colors.text}>
            Privacy Dashboard
          </Title>
          <Text c={config.ui.colors.secondary}>
            Manage your privacy preferences and data
          </Text>
        </div>

        {/* Status Overview */}
        <Card 
          style={{ 
            border: `1px solid ${config.ui.colors.secondary}`, 
            backgroundColor: config.ui.colors.background,
            borderRadius: 0
          }} 
          p="lg"
        >
          <Group justify="space-between" mb="md">
            <Group>
              <IconShield size={24} color={config.ui.colors.primary} />
              <Title order={3} c={config.ui.colors.text}>Current Status</Title>
            </Group>
            <Badge
              style={{ 
                backgroundColor: '#f3f4f6', 
                color: config.ui.colors.text,
                border: `1px solid ${config.ui.colors.secondary}`
              }}
            >
              {completionPercentage.toFixed(0)}% Configured
            </Badge>
          </Group>
          
          <Progress 
            value={completionPercentage} 
            mb="sm"
            style={{ 
              backgroundColor: '#f3f4f6',
              border: `1px solid ${config.ui.colors.secondary}`
            }}
          />
          
          <Text size="sm" c={config.ui.colors.secondary}>
            {enabledCategories} of {totalCategories} privacy categories enabled
          </Text>
          
          {consentData?.timestamp && (
            <Text size="xs" c={config.ui.colors.secondary} mt="xs">
              Last updated: {new Date(consentData.timestamp).toLocaleString()}
            </Text>
          )}
        </Card>

        {/* Privacy Categories */}
        <Stack gap="md">
          <Title order={4} c={config.ui.colors.text}>Privacy Categories</Title>
          
          {Object.entries(categories).map(([key, category]) => {
            const IconComponent = ICON_MAP[category.icon] || IconShield;
            const isEnabled = consents[key];
            
            return (
              <Card 
                key={key} 
                p="md"
                style={{
                  border: isEnabled ? `2px solid ${config.ui.colors.primary}` : `1px solid ${config.ui.colors.secondary}`,
                  backgroundColor: isEnabled ? '#f8f9fa' : config.ui.colors.background,
                  borderRadius: 0
                }}
              >
                <Group justify="space-between" mb="sm">
                  <Group>
                    <IconComponent size={24} color={config.ui.colors.primary} />
                    <div>
                      <Text fw={600} c={config.ui.colors.text}>{category.name}</Text>
                      {category.required && (
                        <Badge
                          style={{ 
                            backgroundColor: config.ui.colors.primary, 
                            color: config.ui.colors.background,
                            marginTop: '2px'
                          }}
                          size="xs"
                        >
                          REQUIRED
                        </Badge>
                      )}
                    </div>
                  </Group>
                  
                  <Switch
                    checked={isEnabled}
                    onChange={(event) => updateConsent(key, event.currentTarget.checked, { source: 'dashboard' })}
                    disabled={category.required}
                    color="dark"
                    size="md"
                  />
                </Group>
                
                <Text size="sm" mb="sm" c={config.ui.colors.secondary}>
                  {category.description}
                </Text>
                
                <details>
                  <summary style={{ cursor: 'pointer', fontSize: '12px', color: config.ui.colors.secondary }}>
                    Examples ({category.examples.length})
                  </summary>
                  <Stack gap="xs" mt="xs" pl="md">
                    {category.examples.map((example, index) => (
                      <Text key={index} size="xs" c={config.ui.colors.secondary}>• {example}</Text>
                    ))}
                  </Stack>
                </details>
              </Card>
            );
          })}
        </Stack>

        {/* Data Management */}
        <Divider style={{ borderColor: config.ui.colors.secondary }} />
        
        <Group justify="center" gap="sm">
          <Button
            variant="subtle"
            size="sm"
            onClick={handleExport}
            leftSection={<IconDownload size={14} />}
            style={{ color: config.ui.colors.text }}
          >
            Export My Data
          </Button>
          <Button
            variant="subtle"
            size="sm"
            onClick={() => {
              if (confirm('Are you sure you want to clear all privacy data? This action cannot be undone.')) {
                clearAllData();
              }
            }}
            leftSection={<IconX size={14} />}
            style={{ color: config.ui.colors.secondary }}
          >
            Clear All Data
          </Button>
        </Group>

        {/* Privacy Information */}
        <Alert 
          icon={<IconLock color={config.ui.colors.primary} />}
          style={{
            backgroundColor: '#f8f9fa',
            border: `1px solid ${config.ui.colors.secondary}`,
            borderRadius: 0
          }}
        >
          <Text fw={600} mb="xs" c={config.ui.colors.text}>Your Privacy Rights</Text>
          <Text size="sm" c={config.ui.colors.secondary}>
            You can change these preferences at any time. We use industry-standard security measures 
            to protect your data. All cookies are set with Secure and SameSite attributes for maximum security.
          </Text>
        </Alert>
      </Stack>
    </Paper>
  );
};

export const UnifiedPrivacyManager = ({ 
  mode = 'banner', // banner | modal | dashboard | embedded
  onConsentChange,
  ...props 
}) => {
  const { 
    config: _config,
    categories,
    showBanner,
    setShowBanner,
    showModal,
    setShowModal,
    updateAllConsents,
    openCustomization
  } = useUnifiedPrivacy();
  
  const handleAcceptAll = () => {
    const allConsents = {};
    Object.keys(categories).forEach(key => {
      allConsents[key] = true;
    });
    
    updateAllConsents(allConsents, { source: 'accept_all' });
    setShowBanner(false);
    setShowModal(false);
    onConsentChange?.(allConsents);
  };
  
  const handleRejectAll = () => {
    const essentialOnly = {};
    Object.keys(categories).forEach(key => {
      essentialOnly[key] = categories[key].required || false;
    });
    
    updateAllConsents(essentialOnly, { source: 'reject_all' });
    setShowBanner(false);
    setShowModal(false);
    onConsentChange?.(essentialOnly);
  };
  
  const handleCustomize = () => {
    openCustomization();
  };
  
  const handleSaveModal = () => {
    setShowModal(false);
    setShowBanner(false);
  };
  
  // Render based on mode
  switch (mode) {
    case 'banner':
      return showBanner ? (
        <PrivacyBanner
          onAcceptAll={handleAcceptAll}
          onRejectAll={handleRejectAll}
          onCustomize={handleCustomize}
          {...props}
        />
      ) : null;
      
    case 'modal':
      return (
        <PrivacyModal
          opened={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveModal}
          {...props}
        />
      );
      
    case 'dashboard':
      return <PrivacyDashboard {...props} />;
      
    case 'embedded':
      return (
        <div>
          {showBanner && (
            <PrivacyBanner
              onAcceptAll={handleAcceptAll}
              onRejectAll={handleRejectAll}
              onCustomize={handleCustomize}
            />
          )}
          <PrivacyModal
            opened={showModal}
            onClose={() => setShowModal(false)}
            onSave={handleSaveModal}
          />
        </div>
      );
      
    default:
      console.warn(`Unknown privacy mode: ${mode}`);
      return null;
  }
};

UnifiedPrivacyManager.propTypes = {
  mode: PropTypes.oneOf(['banner', 'modal', 'dashboard', 'embedded']),
  onConsentChange: PropTypes.func
};

export default UnifiedPrivacyManager;