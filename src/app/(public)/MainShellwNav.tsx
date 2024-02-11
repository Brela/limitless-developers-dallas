'use client';

import '@mantine/core/styles.css';
import React, { ReactNode, useState } from 'react';
import { AppShell, Burger, Group, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link'; // Import Link from Next.js
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import classes from './page.module.css';
import useWindowSize from '@/src/app/hooks/use-window-size';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle';
import getColorMode from '../utils/getColorMode';

function MainShellwNav({ children }: { children: ReactNode }) {
  const { lightMode, darkMode } = getColorMode();

  const pathname = usePathname();
  const [opened, { toggle }] = useDisclosure();
  const [active, setActive] = useState(pathname);

  const { isMobile, isDesktop } = useWindowSize();

  const navItems = [
    { href: '/', label: 'Hub' },
    { href: '/about', label: 'About' },
    // { href: '/pastEvents', label: 'Past Events' },
    // { href: '/blog', label: 'Blog' },
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
            <Image
              src={lightMode ? '/ldd-logo-black.png' : '/ldd-logo-white.png'}
              priority
              width={133}
              height={60}
              alt="Picture of the author"
            />
          )}
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {isMobile ? (
            // This ensures the image is on the right in mobile view
            <Group>
              <Image
                src={lightMode ? '/ldd-logo-black.png' : '/ldd-logo-white.png'}
                priority
                width={128}
                height={50}
                alt="Picture of the author"
              />
            </Group>
          ) : (
            // Other elements for desktop or additional conditional content
            <Group justify="flex-end" style={{ flex: 1 }}>
              <Group ml="xl" gap={0} visibleFrom="sm">
                {navItems.map((item, index) => (
                  <Link href={item.href} key={index}>
                    <div
                      key={item.href}
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        setActive(item.href);
                        toggle();
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault(); // Prevent scrolling on space press
                          setActive(item.href);
                          toggle();
                        }
                      }}
                      // className={`${classes.control} ${item.href === active ? `${darkMode ? 'text-[#90ee90] ' : 'text-[#5fcf5f] '} font-bold` : ''}`}
                      className={`${classes.control} ${item.href === active ? `${darkMode ? 'text-[#90ee90] ' : 'text-[#5fcf5f] '} font-bold` : ''}`}
                    >
                      {item.label}
                    </div>
                  </Link>
                ))}
              </Group>
            </Group>
          )}
          <ColorSchemeToggle />
        </Group>
      </AppShell.Header>

      {/* MOBILE NAV */}
      <AppShell.Navbar py="md" px={4}>
        {/* Use Next.js Link components */}
        {navItems.map((item, index) => (
          <div
            key={item.href}
            role="button"
            tabIndex={0}
            onClick={() => {
              setActive(item.href);
              toggle();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Prevent scrolling on space press
                setActive(item.href);
                toggle();
              }
            }}
            className={`${classes.control} ${item.href === active ? `${darkMode ? 'text-[#90ee90] ' : 'text-[#5fcf5f] '} font-bold` : ''}`}
          >
            <Link href={item.href}>{item.label}</Link>
          </div>
        ))}
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default MainShellwNav;
