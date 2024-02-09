'use client';

import '@mantine/core/styles.css';
import React, { ReactNode, useState } from 'react';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { usePathname } from 'next/navigation';

import useWindowSize from '@/src/_hooks/use-window-size';

import ColorSchemeContext from '../../_contexts/ColorSchemeContext';
import MainShellwNav from './MainShellwNav';
import { MeetupDataProvider } from '../../_contexts/MeetupContext';

const AppShellContainer = ({ children }: { children: ReactNode }) => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

  const colorSchemeContextValue: any = {
    colorScheme,
    onChange: setColorScheme,
  };

  return (
    <ColorSchemeContext.Provider value={colorSchemeContextValue}>
      <MantineProvider theme={{ colorScheme } as MantineThemeOverride}>
        <MeetupDataProvider>
          <MainShellwNav>{children}</MainShellwNav>
        </MeetupDataProvider>
      </MantineProvider>
    </ColorSchemeContext.Provider>
  );
};

export default AppShellContainer;
