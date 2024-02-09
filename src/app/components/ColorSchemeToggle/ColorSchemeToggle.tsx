'use client';

import { Button, Group, useMantineColorScheme } from '@mantine/core';
import { IconBrightnessHalf } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <div className="">
      <Button onClick={() => toggleColorScheme()}>
        <IconBrightnessHalf
          size={24}
          className={colorScheme === 'light' ? 'text-gray-800' : 'text-white'}
        />
      </Button>
      {/*    <Button onClick={() => setColorScheme('light')}>Light</Button>
      <Button onClick={() => setColorScheme('dark')}>Dark</Button>
      <Button onClick={() => setColorScheme('auto')}>Auto</Button> */}
    </div>
  );
}
