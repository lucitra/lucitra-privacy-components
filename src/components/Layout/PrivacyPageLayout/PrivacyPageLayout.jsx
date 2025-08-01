import React from 'react';
import PropTypes from 'prop-types';
import { StandardPage } from '@lucitra/react-components';
import { PrivacyProvider } from '../../Privacy/PrivacyProvider';
import { CookieConsentBanner } from '../../Privacy/CookieConsent';
import { LenisScrollProvider } from '../../Animation';

/**
 * Privacy-specific page layout that extends StandardPage
 * Includes privacy provider, cookie consent, and smooth scrolling
 */
export const PrivacyPageLayout = ({
  children,
  showCookieConsent = true,
  smoothScroll = true,
  privacyConfig,
  ...standardPageProps
}) => {
  const content = (
    <PrivacyProvider config={privacyConfig}>
      <StandardPage {...standardPageProps}>
        {children}
        {showCookieConsent && (
          <CookieConsentBanner
            position="bottom"
            onAcceptAll={() => console.log('Accepted all cookies')}
            onRejectAll={() => console.log('Rejected all cookies')}
          />
        )}
      </StandardPage>
    </PrivacyProvider>
  );

  return smoothScroll ? (
    <LenisScrollProvider>{content}</LenisScrollProvider>
  ) : (
    content
  );
};

PrivacyPageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  showCookieConsent: PropTypes.bool,
  smoothScroll: PropTypes.bool,
  privacyConfig: PropTypes.object,
  // All StandardPage props are also accepted
  header: PropTypes.node,
  hero: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
};