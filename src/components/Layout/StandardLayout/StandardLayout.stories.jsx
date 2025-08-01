import React from 'react';
import { StandardPage, StandardPageContainer, StandardHeader, StandardHeroSection } from './index';
import { ModularButton, ModularCard } from '../../Privacy/UI';

export default {
  title: 'Layout/StandardLayout',
  component: StandardPage,
};

const Logo = () => (
  <div style={{ fontSize: '24px', fontWeight: 'bold' }}>LUCITRA PRIVACY</div>
);

const navigationItems = [
  { label: 'Home', href: '#' },
  { label: 'Privacy Tools', href: '#' },
  { label: 'Documentation', href: '#' },
  { label: 'Contact', href: '#' },
];

const headerActions = (
  <>
    <ModularButton variant="outlined" size="small">Sign In</ModularButton>
    <ModularButton variant="primary" size="small">Get Started</ModularButton>
  </>
);

export const FullPageWithVideo = () => (
  <StandardPage
    header={{
      logo: <Logo />,
      navigationItems,
      actions: headerActions,
      transparent: true
    }}
    hero={{
      videoSrc: 'https://www.w3schools.com/html/mov_bbb.mp4',
      videoPoster: 'https://via.placeholder.com/1920x1080',
      title: 'Privacy-First Components',
      subtitle: 'Build compliant applications with our privacy-focused component library',
      actions: (
        <>
          <ModularButton variant="primary" size="large">Get Started</ModularButton>
          <ModularButton variant="outlined" size="large" style={{ color: 'white', borderColor: 'white' }}>Learn More</ModularButton>
        </>
      )
    }}
  >
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
      <h2 style={{ marginBottom: '24px' }}>Features</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        <ModularCard title="Cookie Consent">
          <p>GDPR and CCPA compliant cookie consent management with customizable UI.</p>
        </ModularCard>
        
        <ModularCard title="Data Governance">
          <p>AI training consent and data classification tools for enterprise compliance.</p>
        </ModularCard>
        
        <ModularCard title="Privacy Budget">
          <p>Visualize and manage privacy budget allocation across your applications.</p>
        </ModularCard>
      </div>

      <h2 style={{ marginBottom: '24px' }}>Consistent Layout System</h2>
      <p>
        This layout system provides a consistent structure for all privacy-related interfaces.
        With 16px padding on left and right, 12px on top, and 24px on bottom, plus a subtle grey border,
        it creates a clean, professional appearance that works across all privacy components.
      </p>
    </div>
  </StandardPage>
);

export const PageWithoutVideo = () => (
  <StandardPage
    header={{
      logo: <Logo />,
      navigationItems,
      actions: headerActions,
      transparent: false
    }}
    showBorder={true}
  >
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 16px 0' }}>
      <h1 style={{ marginBottom: '24px' }}>Privacy Documentation</h1>
      <p>
        This example shows the StandardPage component without a hero video section. 
        Perfect for documentation pages, privacy policies, and other text-heavy content.
      </p>
    </div>
  </StandardPage>
);

export const ContainerOnly = () => (
  <StandardPageContainer showBorder={true}>
    <div style={{ padding: '80px 16px' }}>
      <h2>StandardPageContainer Example</h2>
      <p>
        This shows just the container component with the grey border box. 
        Notice the 16px left/right padding, 12px top padding, and 24px bottom padding.
      </p>
    </div>
  </StandardPageContainer>
);

export const HeaderOnly = () => (
  <div style={{ height: '200px', position: 'relative', background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)' }}>
    <StandardHeader
      logo={<Logo />}
      navigationItems={navigationItems}
      actions={headerActions}
      transparent={true}
    />
  </div>
);

export const HeroSectionOnly = () => (
  <StandardHeroSection
    videoSrc="https://www.w3schools.com/html/mov_bbb.mp4"
    videoPoster="https://via.placeholder.com/1920x1080"
    title="Privacy-First Development"
    subtitle="Build applications that respect user privacy from the ground up"
    actions={
      <>
        <ModularButton variant="primary" size="large">View Components</ModularButton>
        <ModularButton variant="outlined" size="large" style={{ color: 'white', borderColor: 'white' }}>Read Docs</ModularButton>
      </>
    }
  />
);