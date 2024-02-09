import { useMantineColorScheme } from '@mantine/core';

function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useMantineColorScheme();

  // Define the boolean flags based on the current color scheme
  const lightMode = colorScheme === 'light';
  const darkMode = colorScheme === 'dark';

  // Return the original hook's return values along with the new boolean flags
  return {
    colorScheme,
    setColorScheme,
    toggleColorScheme,
    lightMode,
    darkMode,
  };
}

export default useColorScheme;
