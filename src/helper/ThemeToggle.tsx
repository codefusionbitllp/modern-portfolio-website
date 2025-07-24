/**
 * @copyright © 2025 CodeFusion Bit LLP. All rights reserved.
 * @website https://www.codefusionbit.com
 * @contact info@codefusionbit.com
 * @author Technical Project Manager / Team Lead / Developer: Hitesh Sapra https://fullstack.hiteshsapra.com
 * @github https://github.com/codefusionbitllp
 * @license MIT
 * @file ThemeToggle.tsx
 */


import React from 'react';
import { Button, Group, Text } from '@mantine/core';
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';
import { useMantineColorScheme } from '@mantine/core';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const getIcon = () => {
    switch (colorScheme) {
      case 'light': 
        return <IconSun size={20} style={{ color: 'var(--mantine-color-yellow-5)' }} />;
      case 'dark': 
        return <IconMoon size={20} style={{ color: 'var(--mantine-color-blue-4)' }} />;
      case 'auto': 
        return <IconDeviceDesktop size={20} style={{ color: 'var(--mantine-color-violet-4)' }} />;
      default: 
        return <IconDeviceDesktop size={20} style={{ color: 'var(--mantine-color-violet-4)' }} />;
    }
  };

  const getLabel = () => {
    switch (colorScheme) {
      case 'light': return 'Light';
      case 'dark': return 'Dark';
      case 'auto': return 'Auto';
      default: return 'Auto';
    }
  };

  const toggleTheme = () => {
    const themes = ['auto', 'light', 'dark'] as const;
    const currentIndex = themes.indexOf(colorScheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setColorScheme(themes[nextIndex]);
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="subtle"
      color="gray"
      className={className}
      leftSection={getIcon()}
      style={{
        transition: 'all 0.3s ease',
      }}
      styles={{
        root: {
          '&:hover': {
            backgroundColor: 'light-dark(var(--mantine-color-gray-1), var(--mantine-color-dark-6))',
            transform: 'scale(1.05)',
          }
        }
      }}
      title={`Current: ${getLabel()} mode - Click to change`}
    >
      <Group gap="xs">
        <Text size="sm" fw={500} visibleFrom="sm">
          {getLabel()}
        </Text>
      </Group>
    </Button>
  );
};

export default ThemeToggle;