'use client';

import { useMantineColorScheme } from '@mantine/core';

export default function getColorMode() {
  const { colorScheme } = useMantineColorScheme();
  console.log(colorScheme);
  // const mode = localStorage.getItem('color-scheme');

  // Define the boolean flags based on the current color scheme
  const lightMode = colorScheme === 'light';
  const darkMode = colorScheme === 'dark';

  return { lightMode, darkMode };
}
