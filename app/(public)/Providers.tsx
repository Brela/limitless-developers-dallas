'use client';

import '@mantine/core/styles.css';
import React, { ReactNode, useState } from 'react';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { usePathname } from 'next/navigation';

import useWindowSize from '@/app/_hooks/use-window-size';

import ColorSchemeContext from '../_contexts/ColorSchemeContext';
import MainShellwNav from './MainShellwNav';

const AppShellContainer = ({ children }: { children: ReactNode }) => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

  const colorSchemeContextValue: any = {
    colorScheme,
    onChange: setColorScheme,
  };

  return (
    <ColorSchemeContext.Provider value={colorSchemeContextValue}>
      <MantineProvider theme={{ colorScheme } as MantineThemeOverride}>
        <MainShellwNav>{children}</MainShellwNav>
      </MantineProvider>
    </ColorSchemeContext.Provider>
  );
};

export default AppShellContainer;
