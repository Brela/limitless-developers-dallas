import '@mantine/core/styles.css';
import React, { useState } from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../../theme';
import '../index.css';
import { ColorSchemeToggle } from '@/app/_components/ColorSchemeToggle/ColorSchemeToggle';
import AppShellContainer from './AppShell';

export const metadata = {
  title: 'Limitless Developers Dallas',
  description: 'Your hub for tech meetups Dallas',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AppShellContainer>{children}</AppShellContainer>
        </MantineProvider>
      </body>
    </html>
  );
}
