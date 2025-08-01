import React from 'react'
import { ModularButton, ModularBadge } from '@lucitra/react-components'

export default {
  title: 'Design System/Design Tokens',
}

export const ButtonsWithTokens = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <h2 style={{ fontFamily: 'var(--font-family-inter)', marginBottom: 'var(--spacing-lg)' }}>
        Buttons with Design Tokens
      </h2>
      
      <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
        <ModularButton variant="primary">Primary Button</ModularButton>
        <ModularButton variant="secondary">Secondary Button</ModularButton>
        <ModularButton variant="outline">Outline Button</ModularButton>
        <ModularButton variant="ghost">Ghost Button</ModularButton>
        <ModularButton variant="link">Link Button</ModularButton>
      </div>

      <h3>Button Sizes</h3>
      <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
        <ModularButton size="xs">Extra Small</ModularButton>
        <ModularButton size="sm">Small</ModularButton>
        <ModularButton size="md">Medium</ModularButton>
        <ModularButton size="lg">Large</ModularButton>
      </div>

      <h3>Button States</h3>
      <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
        <ModularButton>Normal</ModularButton>
        <ModularButton active>Active</ModularButton>
        <ModularButton disabled>Disabled</ModularButton>
      </div>

      <h3>Tab Buttons</h3>
      <div style={{ display: 'flex', gap: '0' }}>
        <ModularButton variant="tab" active>Active Tab</ModularButton>
        <ModularButton variant="tab">Inactive Tab</ModularButton>
        <ModularButton variant="tab">Another Tab</ModularButton>
      </div>
    </div>
  )
}

export const BadgesWithTokens = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <h2 style={{ fontFamily: 'var(--font-family-inter)', marginBottom: 'var(--spacing-lg)' }}>
        Badges with Design Tokens
      </h2>
      
      <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
        <ModularBadge variant="primary">Primary</ModularBadge>
        <ModularBadge variant="secondary">Secondary</ModularBadge>
        <ModularBadge variant="outline">Outline</ModularBadge>
        <ModularBadge variant="code">CODE</ModularBadge>
        <ModularBadge variant="status">Status</ModularBadge>
        <ModularBadge>Default</ModularBadge>
      </div>

      <h3>Badge Sizes</h3>
      <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
        <ModularBadge size="xs">XS</ModularBadge>
        <ModularBadge size="sm">SM</ModularBadge>
        <ModularBadge size="md">MD</ModularBadge>
        <ModularBadge size="lg">LG</ModularBadge>
      </div>

      <h3>Badge Cases</h3>
      <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
        <ModularBadge uppercase>UPPERCASE</ModularBadge>
        <ModularBadge uppercase={false}>Normal Case</ModularBadge>
      </div>
    </div>
  )
}

export const SpacingScale = () => {
  const spacingSizes = [
    { name: '9xs', value: 'var(--spacing-9xs)' },
    { name: '8xs', value: 'var(--spacing-8xs)' },
    { name: '7xs', value: 'var(--spacing-7xs)' },
    { name: '6xs', value: 'var(--spacing-6xs)' },
    { name: '5xs', value: 'var(--spacing-5xs)' },
    { name: 'xs', value: 'var(--spacing-xs)' },
    { name: 'sm', value: 'var(--spacing-sm)' },
    { name: 'md', value: 'var(--spacing-md)' },
    { name: 'lg', value: 'var(--spacing-lg)' },
    { name: 'xl', value: 'var(--spacing-xl)' },
    { name: '2xl', value: 'var(--spacing-2xl)' },
    { name: '3xl', value: 'var(--spacing-3xl)' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <h2 style={{ fontFamily: 'var(--font-family-inter)', marginBottom: 'var(--spacing-lg)' }}>
        Spacing Scale
      </h2>
      
      {spacingSizes.map((size) => (
        <div key={size.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
          <span style={{ width: '60px', fontFamily: 'var(--font-family-roboto)', fontSize: 'var(--font-size-3xs)' }}>
            {size.name}:
          </span>
          <div
            style={{
              height: '20px',
              backgroundColor: 'var(--color-blue-500)',
              width: size.value,
              borderRadius: 'var(--radius-xs)',
            }}
          />
          <span style={{ fontSize: 'var(--font-size-4xs)', color: 'var(--color-content-Tertiary)' }}>
            {getComputedStyle(document.documentElement).getPropertyValue(`--spacing-${size.name}`)}
          </span>
        </div>
      ))}
    </div>
  )
}

export const ColorPalette = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
      <h2 style={{ fontFamily: 'var(--font-family-inter)', marginBottom: 'var(--spacing-lg)' }}>
        Design Token Colors
      </h2>
      
      <div>
        <h3>Primary Colors</h3>
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '100px',
              height: '100px',
              backgroundColor: 'var(--color-background-Primary)',
              border: '1px solid var(--color-border-Tertiary)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--spacing-xs)'
            }} />
            <small>Background Primary</small>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '100px',
              height: '100px',
              backgroundColor: 'var(--color-content-Primary)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--spacing-xs)'
            }} />
            <small style={{ color: 'var(--color-content-Primary)' }}>Content Primary</small>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '100px',
              height: '100px',
              backgroundColor: 'var(--color-blue-500)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--spacing-xs)'
            }} />
            <small>Blue 500</small>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '100px',
              height: '100px',
              backgroundColor: 'var(--color-neutral-600)',
              borderRadius: 'var(--radius-md)',
              marginBottom: 'var(--spacing-xs)'
            }} />
            <small>Neutral 600</small>
          </div>
        </div>
      </div>

      <div>
        <h3>Border Colors</h3>
        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
          <div style={{
            width: '100px',
            height: '60px',
            backgroundColor: 'var(--color-background-Primary)',
            border: `2px solid var(--color-border-Primary)`,
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'var(--font-size-4xs)'
          }}>
            Primary
          </div>
          <div style={{
            width: '100px',
            height: '60px',
            backgroundColor: 'var(--color-background-Primary)',
            border: `2px solid var(--color-border-Secondary)`,
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'var(--font-size-4xs)'
          }}>
            Secondary
          </div>
          <div style={{
            width: '100px',
            height: '60px',
            backgroundColor: 'var(--color-background-Primary)',
            border: `2px solid var(--color-border-Tertiary)`,
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'var(--font-size-4xs)'
          }}>
            Tertiary
          </div>
        </div>
      </div>
    </div>
  )
}

export const TypographyScale = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
      <h2 style={{ fontFamily: 'var(--font-family-inter)', marginBottom: 'var(--spacing-lg)' }}>
        Typography Scale
      </h2>
      
      <div className="text-xl-bold">Extra Large Bold Text</div>
      <div className="text-lg-semibold">Large Semibold Text</div>
      <div className="text-md-semibold">Medium Semibold Text</div>
      <div className="text-md-regular">Medium Regular Text</div>
      <div className="text-sm-regular">Small Regular Text</div>
      <div className="text-xs-regular">Extra Small Regular Text</div>
      <div className="text-2xs-regular">2X Small Regular Text</div>
      
      <h3>Font Families</h3>
      <div style={{ fontFamily: 'var(--font-family-inter)' }}>Inter Font Family</div>
      <div style={{ fontFamily: 'var(--font-family-roboto)' }}>Roboto Font Family</div>
    </div>
  )
}