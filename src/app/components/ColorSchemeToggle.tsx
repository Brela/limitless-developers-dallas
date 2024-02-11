'use client';

import { Button, Group, useMantineColorScheme } from '@mantine/core';
import { IconBrightnessHalf } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export function ColorSchemeToggle() {
  const { toggleColorScheme } = useMantineColorScheme();
  const [lightMode, setLightMode] = useState(false);

  useEffect(() => {
    // Access localStorage only when the component is mounted on the client side
    const mode = localStorage.getItem('color-scheme');
    setLightMode(mode === 'light');
  }, []);

  const toggle = () => {
    // Toggle color scheme logic
    const newMode = !lightMode ? 'dark' : 'light';
    localStorage.setItem('color-scheme', newMode); // Update localStorage with the new mode
    toggleColorScheme(); // Use Mantine's toggleColorScheme function
    setLightMode(!lightMode); // Update local state
  };
  return (
    <div className="">
      <Button onClick={() => toggle()}>
        <IconBrightnessHalf size={24} className={lightMode ? 'text-gray-800' : 'text-white'} />
      </Button>
      {/*    <Button onClick={() => setColorScheme('light')}>Light</Button>
      <Button onClick={() => setColorScheme('dark')}>Dark</Button>
      <Button onClick={() => setColorScheme('auto')}>Auto</Button> */}
    </div>
  );
}
