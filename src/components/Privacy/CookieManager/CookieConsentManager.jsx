/**
 * Cookie Consent Manager
 * 
 * Consolidated component that handles both the simple privacy notice and granular consent modal
 * Provides MantineProvider context handling for reliable usage in any application
 */

import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Group, 
  Text, 
  Paper, 
  Modal, 
  Title,
  Stack, 
  Card, 
  Switch,
  Alert,
  Divider,
  MantineProvider,
  useMantineTheme
} from '@mantine/core';
import { IconCookieMan, IconShield, IconX, IconLock } from '@tabler/icons-react';
import { useGranularAnalytics } from './useGranularAnalytics';

const SimpleNoticeContent = ({ onCustomize }) => {
  const { 
    consentSettings, 
    updateConsent, 
    setShowConsentModal 
  } = useGranularAnalytics();
  
  const [showNotice, setShowNotice] = useState(false);
  
  useEffect(() => {
    // Show simple notice if no granular choice made
    const hasChoice = consentSettings.timestamp;
    if (!hasChoice) {
      setShowNotice(true);
    }
  }, [consentSettings]);
  
  const handleAccept = () => {
    updateConsent({
      essential: true,
      analytics: true,
      product: true,
      performance: true
    });
    setShowNotice(false);
  };
  
  const handleDecline = () => {
    updateConsent({
      essential: true,
      analytics: false,
      product: false,
      performance: false
    });
    setShowNotice(false);
  };
  
  const handleCustomize = () => {
    setShowNotice(false);
    if (onCustomize) {
      onCustomize();
    } else {
      setShowConsentModal(true);
    }
  };
  
  if (!showNotice || consentSettings.timestamp) return null;
  
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '16px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Paper
          p="lg"
          style={{
            backgroundColor: 'white',
            border: '2px solid black',
            borderRadius: 0
          }}
        >
          <Group justify="space-between" align="flex-start">
            <Group gap="lg" style={{ flex: 1 }}>
              <IconCookieMan size={24} color="black" style={{ flexShrink: 0, marginTop: '4px' }} />
              <div>
                <Text fw={600} c="black" mb="xs">
                  We use a single cookie
                </Text>
                <Text size="sm" c="gray.7">
                  Lucitra.ai uses one first-party cookie for analytics and platform functionality.
                  <br />
                  No third-party tracking. Complete privacy control.
                </Text>
              </div>
            </Group>
            
            <Group gap="sm" style={{ flexShrink: 0 }}>
              <Button
                onClick={handleAccept}
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  border: '2px solid black'
                }}
                size="sm"
              >
                Accept
              </Button>
              
              <Button
                onClick={handleDecline}
                variant="outline"
                style={{
                  backgroundColor: 'white',
                  color: 'gray',
                  border: '1px solid gray'
                }}
                size="sm"
              >
                Essential Only
              </Button>
              
              <Button
                onClick={handleCustomize}
                variant="subtle"
                style={{ color: 'black' }}
                size="sm"
              >
                Customize
              </Button>
            </Group>
          </Group>
        </Paper>
      </div>
    </div>
  );
};

const GranularModalContent = ({ showModal, onClose }) => {
  const { 
    consentSettings, 
    updateConsent, 
    categories
  } = useGranularAnalytics();
  
  const [tempSettings, setTempSettings] = useState(consentSettings);
  
  useEffect(() => {
    setTempSettings(consentSettings);
  }, [consentSettings]);
  
  const handleToggle = (category) => {
    if (category === 'essential') return; // Can't disable essential
    
    setTempSettings(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  const handleAcceptAll = () => {
    const allEnabled = Object.keys(categories).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    updateConsent(allEnabled);
    onClose();
  };
  
  const handleRejectAll = () => {
    updateConsent({
      essential: true,
      analytics: false,
      product: false,
      performance: false
    });
    onClose();
  };
  
  const handleSaveCustom = () => {
    updateConsent(tempSettings);
    onClose();
  };
  
  return (
    <Modal
      opened={showModal}
      onClose={onClose}
      title={null}
      size="lg"
      centered
      withinPortal={false} // We handle context ourselves
      styles={{
        modal: {
          backgroundColor: 'white',
          border: '2px solid black',
          borderRadius: 0
        },
        header: {
          backgroundColor: 'white',
          borderBottom: '1px solid gray',
          padding: '24px 24px 16px'
        },
        body: {
          padding: '0 24px 24px',
          backgroundColor: 'white'
        }
      }}
    >
      <Stack gap="lg">
        {/* Header */}
        <Group justify="space-between" align="flex-start">
          <Group>
            <IconShield size={24} color="black" />
            <Title order={2} c="black">Your Privacy Choices</Title>
          </Group>
          <Button
            variant="subtle"
            onClick={onClose}
            size="xs"
            style={{ color: 'gray' }}
          >
            <IconX size={16} />
          </Button>
        </Group>
        
        {/* Intro */}
        <Stack gap="sm">
          <Text c="gray.7">
            We use a single cookie to improve your 3D platform experience. 
            Choose what data you're comfortable sharing:
          </Text>
          
          <Alert
            icon={<IconLock color="black" />}
            style={{
              backgroundColor: '#f8f9fa',
              border: '1px solid gray',
              borderRadius: 0
            }}
          >
            <Text fw={600} c="black" size="sm">Privacy Promise:</Text>
            <Text c="gray.7" size="sm">
              All data stays on our servers. No third-party tracking. No data sales.
            </Text>
          </Alert>
        </Stack>
        
        {/* Categories */}
        <Stack gap="md">
          {Object.entries(categories).map(([key, category]) => (
            <Card 
              key={key} 
              style={{
                border: '1px solid gray',
                borderRadius: 0,
                backgroundColor: 'white'
              }}
              p="md"
            >
              <Group justify="space-between" align="flex-start">
                <div style={{ flex: 1 }}>
                  <Group gap="sm" mb="xs">
                    <Text fw={600} c="black">{category.name}</Text>
                    {category.required && (
                      <div style={{
                        backgroundColor: 'black',
                        color: 'white',
                        padding: '2px 6px',
                        fontSize: '10px',
                        fontWeight: 600
                      }}>
                        REQUIRED
                      </div>
                    )}
                  </Group>
                  
                  <Text size="sm" c="gray.7" mb="xs">
                    {category.description}
                  </Text>
                  
                  <Text size="xs" c="gray.6">
                    <span style={{ fontWeight: 600 }}>Examples:</span> {category.examples.join(', ')}
                  </Text>
                </div>
                
                <Switch
                  checked={tempSettings[key]}
                  onChange={() => handleToggle(key)}
                  disabled={category.required}
                  color="dark"
                  size="md"
                  style={{ marginLeft: '16px' }}
                />
              </Group>
            </Card>
          ))}
        </Stack>
        
        <Divider style={{ borderColor: 'gray' }} />
        
        {/* Actions */}
        <Group justify="center" gap="sm">
          <Button
            onClick={handleRejectAll}
            variant="outline"
            style={{
              backgroundColor: 'white',
              color: 'gray',
              border: '1px solid gray'
            }}
          >
            Essential Only
          </Button>
          
          <Button
            onClick={handleSaveCustom}
            style={{
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black'
            }}
          >
            Save Choices
          </Button>
          
          <Button
            onClick={handleAcceptAll}
            style={{
              backgroundColor: 'black',
              color: 'white',
              border: '2px solid black'
            }}
          >
            Accept All
          </Button>
        </Group>
        
        <Text size="xs" c="gray.6" ta="center">
          You can change these settings anytime in your privacy preferences.
        </Text>
      </Stack>
    </Modal>
  );
};

const ConsentManagerContent = () => {
  const [showModal, setShowModal] = useState(false);
  
  const handleOpenModal = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  return (
    <>
      <SimpleNoticeContent onCustomize={handleOpenModal} />
      <GranularModalContent showModal={showModal} onClose={handleCloseModal} />
    </>
  );
};

/**
 * Cookie Consent Manager
 * 
 * Consolidated component that handles both the simple privacy notice and granular consent modal
 * Automatically provides MantineProvider context for reliable usage in any application
 * 
 * @param {Object} props - Component props
 * @param {Object} [props.mantineProvider] - Custom Mantine theme to use
 */
export const CookieConsentManager = ({ 
  mantineProvider = null
}) => {
  // Always call useMantineTheme at the top level - no conditional calling
  useMantineTheme();
  
  // If a custom provider is specified, use it
  if (mantineProvider) {
    return (
      <MantineProvider theme={mantineProvider}>
        <ConsentManagerContent />
      </MantineProvider>
    );
  }
  
  // Otherwise, render normally (we're within a MantineProvider since useMantineTheme worked)
  return <ConsentManagerContent />;
};

export default CookieConsentManager;