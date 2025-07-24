/**
 * @copyright © 2025 CodeFusion Bit LLP. All rights reserved.
 * @website https://www.codefusionbit.com
 * @contact info@codefusionbit.com
 * @author Technical Project Manager / Team Lead / Developer: Hitesh Sapra https://fullstack.hiteshsapra.com
 * @github https://github.com/codefusionbitllp
 * @license MIT
 * @file MainHeader.tsx
 */


import React, { useState, useEffect } from 'react';
import {
  Container,
  Group,
  Button,
  Burger,
  Drawer,
  Stack,
  Title,
  Progress,
  Box,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDownload } from '@tabler/icons-react';
import { NavigationItem } from '../../types';
import ThemeToggle from '../../helper/ThemeToggle';

interface HeaderProps {
  navigation: NavigationItem[];
  activeSection: string;
  onSectionChange: (section: string) => void;
  logoText?: string;
  resumeUrl?: string;
  scrollToSection: (sectionId: string) => void;
}

const MainHeader: React.FC<HeaderProps> = ({
  navigation,
  activeSection,
  onSectionChange,
  logoText = 'Portfolio',
  resumeUrl,
  scrollToSection,
}) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Header height constant
  const HEADER_HEIGHT = 80;

  // Function to calculate scroll progress
  const calculateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    // Debug logs (remove these after testing)
    console.log('Scroll calculation:', { scrollTop, docHeight, progress });
    
    setIsScrolled(scrollTop > 50);
    setScrollProgress(Math.min(100, Math.max(0, progress))); // Ensure 0-100 range
  };

  useEffect(() => {
    // Calculate initial scroll progress on mount
    calculateScrollProgress();

    // More immediate scroll handler - no RAF for testing
    const handleScroll = () => {
      calculateScrollProgress();
    };

    // Add scroll listener with more frequent updates
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also listen for resize events
    window.addEventListener('resize', calculateScrollProgress, { passive: true });
    
    // Update on load
    window.addEventListener('load', calculateScrollProgress);

    // Force update after a short delay for dynamic content
    const timeoutId = setTimeout(calculateScrollProgress, 500);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateScrollProgress);
      window.removeEventListener('load', calculateScrollProgress);
    };
  }, []);

  // Also update progress when active section changes (navigation)
  useEffect(() => {
    // Small delay to ensure DOM has updated after navigation
    const timeoutId = setTimeout(() => {
      calculateScrollProgress();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [activeSection]);

  const handleNavClick = (item: NavigationItem) => {
    console.log('Nav item clicked:', item);

    if (item.external) {
      window.open(item.href, '_blank');
      return;
    }

    // Extract section ID from href
    const sectionId = item.href.replace('#', '');
    console.log('Extracted section ID:', sectionId);

    // Update active section immediately for better UX
    onSectionChange(sectionId);

    // Close mobile menu
    close();

    // Add small delay to ensure state updates, then scroll
    setTimeout(() => {
      console.log('Calling scrollToSection with:', sectionId);
      scrollToSection(sectionId);
      
      // Update progress after scroll
      setTimeout(calculateScrollProgress, 150);
    }, 50);
  };

  const handleLogoClick = () => {
    console.log('Logo clicked - scrolling to home');
    onSectionChange('home');
    close();

    setTimeout(() => {
      scrollToSection('home');
      
      // Update progress after scroll
      setTimeout(calculateScrollProgress, 150);
    }, 50);
  };

  return (
    <>
      <Box
        component="header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: `${HEADER_HEIGHT}px`,
          zIndex: 1000,
          backgroundColor: isScrolled
            ? 'light-dark(rgba(255, 255, 255, 0.95), rgba(0, 0, 0, 0.95))'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: isScrolled
            ? '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))'
            : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Scroll Progress Bar - TRULY IMMEDIATE */}
        <Progress
          value={scrollProgress}
          size="xs"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            // Remove transition to make it instant
          }}
          color="blue"
          animated
          // Force re-render on every change
          key={scrollProgress}
        />

        <Container size="lg" h="100%">
          <Group h="100%" justify="space-between">
            {/* Logo */}
            <Title
              order={2}
              style={{
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                background: 'linear-gradient(45deg, var(--mantine-color-blue-6), var(--mantine-color-cyan-6))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onClick={handleLogoClick}
            >
              {logoText}
            </Title>

            {/* Desktop Navigation */}
            <Group gap="md" visibleFrom="md">
              {navigation.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'light' : 'subtle'}
                  color={activeSection === item.id ? 'blue' : 'gray'}
                  onClick={() => handleNavClick(item)}
                  style={{
                    transition: 'all 0.3s ease',
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        transform: 'translateY(-2px)',
                      }
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}

              <ThemeToggle />

              {resumeUrl && (
                <Button
                  component="a"
                  href={resumeUrl}
                  download
                  leftSection={<IconDownload size={16} />}
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan' }}
                  style={{
                    transition: 'all 0.3s ease',
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 'var(--mantine-shadow-lg)',
                      }
                    }
                  }}
                >
                  Resume
                </Button>
              )}
            </Group>

            {/* Mobile Menu */}
            <Group gap="sm" hiddenFrom="md">
              <ThemeToggle />
              <Burger opened={opened} onClick={toggle} />
            </Group>
          </Group>
        </Container>
      </Box>

      {/* Mobile Drawer - ONLY ADDED TOP MARGIN */}
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size="sm"
        title={
          <Title
            order={3}
            style={{
              background: 'linear-gradient(45deg, var(--mantine-color-blue-6), var(--mantine-color-cyan-6))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Menu
          </Title>
        }
        styles={{
          header: {
            borderBottom: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
          },
          // ONLY ADDITION: Top margin for overlay and content
          overlay: {
            marginTop: `${HEADER_HEIGHT}px`,
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          },
          content: {
            marginTop: `${HEADER_HEIGHT}px`,
            height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          },
        }}
      >
        <Stack gap="md" p="md">
          {navigation.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? 'light' : 'subtle'}
              color={activeSection === item.id ? 'blue' : 'gray'}
              onClick={() => handleNavClick(item)}
              fullWidth
              size="lg"
              justify="flex-start"
            >
              {item.label}
            </Button>
          ))}
          {resumeUrl && (
            <Button
              component="a"
              href={resumeUrl}
              download
              leftSection={<IconDownload size={16} />}
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              fullWidth
              size="lg"
              mt="md"
            >
              Download Resume
            </Button>
          )}
        </Stack>
      </Drawer>
    </>
  );
};

export default MainHeader;