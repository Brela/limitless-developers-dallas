'use client';

import '@mantine/core/styles.css';
import React, { ReactNode, useState } from 'react';
import { MantineProvider, ColorSchemeScript, AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link'; // Import Link from Next.js
import Image from 'next/image';
import { theme } from '../theme';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import classes from './page.module.css';
import useWindowSize from '@/hooks/use-window-size';

const AppShellContainer = ({ children }: { children: ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(0);

  const { isMobile, isDesktop } = useWindowSize();

  const navItems = [
    { href: '/', label: 'Hub' },
    // { href: '/pastEvents', label: 'Past Events' },
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify={isMobile ? 'space-between' : ''}>
          {isDesktop && (
            <Image src="/LDD.png" width={150} height={50} alt="Picture of the author" />
          )}
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {isMobile ? (
            // This ensures the image is on the right in mobile view
            <Group>
              <Image src="/LDD.png" width={150} height={50} alt="Picture of the author" />
            </Group>
          ) : (
            // Other elements for desktop or additional conditional content
            <Group justify="flex-end" style={{ flex: 1 }}>
              <Group ml="xl" gap={0} visibleFrom="sm">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className={classes.control}>
                    {item.label}
                  </Link>
                ))}
              </Group>
            </Group>
          )}
        </Group>
        {/* <ColorSchemeToggle /> */}
      </AppShell.Header>

      {/* MOBILE NAV */}
      <AppShell.Navbar py="md" px={4}>
        {/* Use Next.js Link components */}
        {navItems.map((item) => (
          <div
            role="button"
            tabIndex={0}
            onClick={() => toggle()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Prevent scrolling on space press
                toggle();
              }
            }}
            className={classes.control}
          >
            <Link href={item.href}>{item.label}</Link>
          </div>
        ))}
        {/*
        <div>
          <Link href="/blog" className={classes.control} onClick={() => toggle}>
            Blog
          </Link>
        </div>
        <div>
          <Link href="/contacts" className={classes.control} onClick={() => toggle}>
            Contacts
          </Link>
        </div>
        <div>
          <Link href="/support" className={classes.control} onClick={() => toggle}>
            Support
          </Link>
        </div> */}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AppShellContainer;
