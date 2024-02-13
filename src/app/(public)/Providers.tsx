'use client';

import '@mantine/core/styles.css';
import React, { ReactNode, useState } from 'react';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ColorSchemeContext from '../contexts/ColorSchemeContext';
import MainShellwNav from './MainShellwNav';
import { MeetupDataProvider } from '../contexts/MeetupContext';

function AppShellContainer({ children }: { children: ReactNode }) {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

  const colorSchemeContextValue: any = {
    colorScheme,
    onChange: setColorScheme,
  };

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeContext.Provider value={colorSchemeContextValue}>
        <MantineProvider theme={{ colorScheme } as MantineThemeOverride}>
          <MeetupDataProvider>
            <MainShellwNav>{children}</MainShellwNav>
          </MeetupDataProvider>
        </MantineProvider>
      </ColorSchemeContext.Provider>
    </QueryClientProvider>
  );
}

export default AppShellContainer;
