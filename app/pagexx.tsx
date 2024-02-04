/* import {
  AppShell,
  Box,
  Burger,
  Group,
  Input,
  NavLink,
  Skeleton,
  NavLink as MantineLink,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IconActivity, IconCards, IconStack, IconStack2 } from '@tabler/icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup } from '@fortawesome/free-solid-svg-icons';

export function AppShellWrapper() {
  const navigate = useNavigate();

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const [active, setActive] = useState(0); // Use null or the index of the default active link
  const data = [
    { icon: IconStack2, label: 'Decks', path: '/' },
    { icon: IconCards, label: 'Add Card', path: '/addcard' }, // Adjust path as needed
    { icon: IconActivity, label: 'Study Cards', path: '/studycards' }, // Adjust path as needed
  ];

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      leftSection={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => {
        setActive(index);
        navigate(item.path);
      }}
      color="lime"
      style={{ cursor: 'pointer' }}
    />
  ));

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <div className="flex items-center gap-5">
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
            <h2 className="text-gray-500">mission cards</h2>
          </div>
          <Input placeholder="Search" />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="sm">
        <Box>{items}</Box>
      </AppShell.Navbar>
      <AppShell.Main className="p-0">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
 */
