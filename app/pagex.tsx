'use client';

import { useDisclosure } from '@mantine/hooks';
import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';

export default function HomePage() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <ColorSchemeToggle />
    </>
  );
}
