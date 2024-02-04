'use client';

import '@mantine/core/styles.css';
import React, { ReactNode, useState } from 'react';
import { MantineProvider, ColorSchemeScript, AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link'; // Import Link from Next.js
import { theme } from '../theme';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import classes from './page.module.css';

const AppShellContainer = ({ children }: { children: ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(0);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="flex-end" style={{ flex: 1 }}>
            <Group ml="xl" gap={0} visibleFrom="sm">
              {/* Use Next.js Link components */}
              <Link href="/" className={classes.control}>
                Home
              </Link>
              <Link href="/blog" className={classes.control}>
                Blog
              </Link>
              <Link href="/contacts" className={classes.control}>
                Contacts
              </Link>
              <Link href="/support" className={classes.control}>
                Support
              </Link>
            </Group>
          </Group>
        </Group>
        {/* <ColorSchemeToggle /> */}
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        {/* Use Next.js Link components */}
        <Link href="/" className={classes.control}>
          Home
        </Link>
        <Link href="/blog" className={classes.control}>
          Blog
        </Link>
        <Link href="/contacts" className={classes.control}>
          Contacts
        </Link>
        <Link href="/support" className={classes.control}>
          Support
        </Link>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AppShellContainer;
