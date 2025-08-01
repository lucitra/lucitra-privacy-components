import React, { useState } from 'react'
import { 
  ModularButton, 
  ModularBadge, 
  ModularCard,
  AlertBox,
  TabButton,
  ProgressBar
} from '@lucitra/react-components'
import { IconInfoCircle, IconCheck, IconAlertTriangle, IconX } from '@tabler/icons-react'

export default {
  title: 'Design System/Complete Showcase',
}

export const CompleteDesignSystem = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [alertVisible, setAlertVisible] = useState(true)
  const [progress, setProgress] = useState(65)

  return (
    <div style={{ padding: 'var(--spacing-xl)', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ 
        fontFamily: 'var(--font-family-inter)', 
        fontSize: 'var(--font-size-xl)',
        marginBottom: 'var(--spacing-xl)'
      }}>
        Lucitra Privacy Components - Design System Showcase
      </h1>

      {/* Alert Example */}
      {alertVisible && (
        <AlertBox
          variant="info"
          icon={<IconInfoCircle size={20} />}
          title="Design Tokens Applied"
          closable
          onClose={() => setAlertVisible(false)}
          style={{ marginBottom: 'var(--spacing-lg)' }}
        >
          All components now use the unified design token system for consistent styling across light and dark themes.
        </AlertBox>
      )}

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '0', marginBottom: 'var(--spacing-lg)' }}>
        <TabButton
          active={activeTab === 'overview'}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </TabButton>
        <TabButton
          active={activeTab === 'components'}
          onClick={() => setActiveTab('components')}
        >
          Components
        </TabButton>
        <TabButton
          active={activeTab === 'tokens'}
          onClick={() => setActiveTab('tokens')}
        >
          Design Tokens
        </TabButton>
        <TabButton
          active={activeTab === 'examples'}
          onClick={() => setActiveTab('examples')}
        >
          Examples
        </TabButton>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <ModularCard variant="primary" padding="lg">
          <h2 style={{ marginBottom: 'var(--spacing-md)' }}>Design System Overview</h2>
          <p style={{ marginBottom: 'var(--spacing-md)', lineHeight: 'var(--line-height-md)' }}>
            The Lucitra Privacy Components library now fully implements design tokens for:
          </p>
          <ul style={{ paddingLeft: 'var(--spacing-lg)', marginBottom: 'var(--spacing-md)' }}>
            <li>Colors (semantic and palette-based)</li>
            <li>Typography (font families, sizes, weights)</li>
            <li>Spacing (consistent scale from 9xs to 16xl)</li>
            <li>Borders (widths and radii)</li>
            <li>Shadows and effects</li>
          </ul>
          <ModularButton variant="primary">
            View Documentation
          </ModularButton>
        </ModularCard>
      )}

      {activeTab === 'components' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          {/* Buttons Section */}
          <ModularCard variant="secondary">
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Buttons</h3>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap', marginBottom: 'var(--spacing-md)' }}>
              <ModularButton variant="primary">Primary</ModularButton>
              <ModularButton variant="secondary">Secondary</ModularButton>
              <ModularButton variant="outline">Outline</ModularButton>
              <ModularButton variant="ghost">Ghost</ModularButton>
              <ModularButton variant="link">Link</ModularButton>
            </div>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
              <ModularButton size="xs">XS</ModularButton>
              <ModularButton size="sm">SM</ModularButton>
              <ModularButton size="md">MD</ModularButton>
              <ModularButton size="lg">LG</ModularButton>
            </div>
          </ModularCard>

          {/* Badges Section */}
          <ModularCard variant="secondary">
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Badges</h3>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
              <ModularBadge variant="primary">Primary</ModularBadge>
              <ModularBadge variant="secondary">Secondary</ModularBadge>
              <ModularBadge variant="outline">Outline</ModularBadge>
              <ModularBadge variant="code">CODE</ModularBadge>
              <ModularBadge variant="status">Status</ModularBadge>
            </div>
          </ModularCard>

          {/* Progress Section */}
          <ModularCard variant="secondary">
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Progress Bars</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              <ProgressBar value={progress} label="Default Progress" showLabel />
              <ProgressBar value={75} variant="success" label="Success" showLabel striped />
              <ProgressBar value={45} variant="warning" label="Warning" showLabel animate />
              <ProgressBar value={25} variant="error" label="Error" showLabel striped animate />
              <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginTop: 'var(--spacing-sm)' }}>
                <ModularButton 
                  size="sm" 
                  onClick={() => setProgress(Math.max(0, progress - 10))}
                >
                  -10%
                </ModularButton>
                <ModularButton 
                  size="sm" 
                  onClick={() => setProgress(Math.min(100, progress + 10))}
                >
                  +10%
                </ModularButton>
              </div>
            </div>
          </ModularCard>

          {/* Alerts Section */}
          <ModularCard variant="secondary">
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Alerts</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
              <AlertBox variant="info" icon={<IconInfoCircle size={20} />} title="Info Alert">
                This is an informational message.
              </AlertBox>
              <AlertBox variant="success" icon={<IconCheck size={20} />} title="Success!">
                Operation completed successfully.
              </AlertBox>
              <AlertBox variant="warning" icon={<IconAlertTriangle size={20} />} title="Warning">
                Please review this important information.
              </AlertBox>
              <AlertBox variant="error" icon={<IconX size={20} />} title="Error" closable onClose={() => {}}>
                Something went wrong. Please try again.
              </AlertBox>
            </div>
          </ModularCard>
        </div>
      )}

      {activeTab === 'tokens' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
          {/* Colors */}
          <ModularCard variant="secondary">
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Color Tokens</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
              <ColorSwatch name="Primary" color="var(--color-primary-Black)" />
              <ColorSwatch name="Blue 500" color="var(--color-blue-500)" />
              <ColorSwatch name="Green 500" color="var(--color-green-500)" />
              <ColorSwatch name="Yellow 500" color="var(--color-yellow-500)" />
              <ColorSwatch name="Red 500" color="var(--color-red-500)" />
              <ColorSwatch name="Background" color="var(--color-background-Primary)" border />
            </div>
          </ModularCard>

          {/* Typography */}
          <ModularCard variant="secondary">
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Typography Scale</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
              <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>XL Bold</div>
              <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-semi-bold)' }}>LG Semi-bold</div>
              <div style={{ fontSize: 'var(--font-size-md)' }}>MD Regular</div>
              <div style={{ fontSize: 'var(--font-size-sm)' }}>SM Regular</div>
              <div style={{ fontSize: 'var(--font-size-xs)' }}>XS Regular</div>
            </div>
          </ModularCard>

          {/* Spacing */}
          <ModularCard variant="secondary">
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Spacing Scale</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
              <SpacingExample size="xs" />
              <SpacingExample size="sm" />
              <SpacingExample size="md" />
              <SpacingExample size="lg" />
              <SpacingExample size="xl" />
            </div>
          </ModularCard>
        </div>
      )}

      {activeTab === 'examples' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          {/* Privacy Card Example */}
          <ModularCard variant="accent">
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Privacy Settings Card</h3>
            <p style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-content-Secondary)' }}>
              Manage your data privacy preferences
            </p>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
              <ModularBadge variant="status" size="sm">GDPR Compliant</ModularBadge>
              <ModularBadge variant="primary" size="sm">Verified</ModularBadge>
            </div>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
              <ModularButton variant="primary" size="sm">
                Update Settings
              </ModularButton>
              <ModularButton variant="outline" size="sm">
                View Policy
              </ModularButton>
            </div>
          </ModularCard>

          {/* Status Card Example */}
          <ModularCard variant="status">
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>System Status</h3>
            <ProgressBar value={89} variant="success" label="Privacy Score" showLabel />
            <div style={{ marginTop: 'var(--spacing-md)' }}>
              <AlertBox variant="success" size="sm">
                All privacy checks passed
              </AlertBox>
            </div>
          </ModularCard>

          {/* Critical Alert Example */}
          <ModularCard variant="critical">
            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Action Required</h3>
            <AlertBox variant="error" icon={<IconAlertTriangle size={20} />}>
              Your consent preferences need to be updated to comply with new regulations.
            </AlertBox>
            <div style={{ marginTop: 'var(--spacing-md)' }}>
              <ModularButton variant="primary" fullWidth>
                Update Now
              </ModularButton>
            </div>
          </ModularCard>
        </div>
      )}
    </div>
  )
}

// Helper Components
const ColorSwatch = ({ name, color, border }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
    <div
      style={{
        width: '40px',
        height: '40px',
        backgroundColor: color,
        border: border ? `1px solid var(--color-border-Tertiary)` : 'none',
        borderRadius: 'var(--radius-sm)'
      }}
    />
    <span style={{ fontSize: 'var(--font-size-3xs)' }}>{name}</span>
  </div>
)

const SpacingExample = ({ size }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
    <div
      style={{
        height: '20px',
        backgroundColor: 'var(--color-blue-500)',
        width: `var(--spacing-${size})`,
        borderRadius: 'var(--radius-xs)'
      }}
    />
    <span style={{ fontSize: 'var(--font-size-3xs)', fontFamily: 'var(--font-family-roboto)' }}>
      --spacing-{size}
    </span>
  </div>
)