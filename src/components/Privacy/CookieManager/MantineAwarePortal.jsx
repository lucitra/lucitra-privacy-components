/**
 * MantineAwarePortal
 * 
 * A component that provides MantineProvider context to portaled content
 * This ensures that components using createPortal maintain access to Mantine's theme and context
 */

import React from 'react';
import { createPortal } from 'react-dom';
import { MantineProvider, useMantineTheme } from '@mantine/core';

export const MantineAwarePortal = ({ children, target = document.body }) => {
  // Always call useMantineTheme at the top level - no conditional calling
  const theme = useMantineTheme();
  
  // Use the current theme from the parent MantineProvider
  const wrappedChildren = (
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  );
  
  return createPortal(wrappedChildren, target);
};

export default MantineAwarePortal;