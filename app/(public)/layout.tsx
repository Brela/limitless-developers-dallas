import '@mantine/core/styles.css';
import React, { ReactNode } from 'react';
import { MantineProvider, ColorSchemeScript, MantineThemeOverride } from '@mantine/core';
import '../index.css';
import ColorSchemeContext from '../_contexts/ColorSchemeContext';
import { ColorSchemeToggle } from '@/app/_components/ColorSchemeToggle/ColorSchemeToggle';
import Providers from './Providers';

export const metadata: { title: string; description: string } = {
  title: 'Limitless Developers Dallas',
  description: 'Your hub for tech meetups Dallas',
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => (
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
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
