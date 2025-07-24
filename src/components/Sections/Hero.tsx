/**
 * @copyright © 2025 CodeFusion Bit LLP. All rights reserved.
 * @website https://www.codefusionbit.com
 * @contact info@codefusionbit.com
 * @author Technical Project Manager / Team Lead / Developer: Hitesh Sapra https://fullstack.hiteshsapra.com
 * @github https://github.com/codefusionbitllp
 * @license MIT
 * @file Hero.tsx
 */


import React, { useState, useEffect } from 'react';
import {
  Container,
  Text,
  Button,
  Group,
  Stack,
  Box,
  Avatar,
  Badge,
  ActionIcon,
  Transition,
} from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconDownload,
  IconChevronDown,
  IconCode,
  IconMapPin,
} from '@tabler/icons-react';
import { Profile } from '../../types';

import ScatterText from '../Layout/ScatterText';

interface HeroProps {
  profile: Profile;
  scrollToSection: (sectionId: string) => void;
}


const Hero: React.FC<HeroProps> = ({ profile, scrollToSection }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Trigger animation on mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleScrollToWork = () => {
    scrollToSection('projects');
  };

  const handleScrollToContact = () => {
    scrollToSection('contact');
  };

  return (
    <Box
      component="section"
      id="home"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-9))',
        paddingTop: '80px', // Add padding to account for fixed header
      }}
    >
      {/* Animated Background */}
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, light-dark(rgba(37, 99, 235, 0.03), rgba(37, 99, 235, 0.15)) 0%, transparent 50%),
            radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, light-dark(rgba(168, 85, 247, 0.02), rgba(168, 85, 247, 0.1)) 0%, transparent 50%)
          `,
          transition: 'background 0.3s ease',
        }}
      />

      {/* Floating Particles */}
      <Box style={{ position: 'absolute', inset: 0 }}>
        {[...Array(15)].map((_, i) => (
          <Box
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              backgroundColor: 'light-dark(rgba(37, 99, 235, 0.6), rgba(37, 99, 235, 0.6))',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </Box>

      {/* Grid Pattern */}
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 'light-dark(0.1, 0.03)',
          backgroundImage: `
            linear-gradient(light-dark(rgba(37, 99, 235, 0.3), rgba(37, 99, 235, 0.3)) 1px, transparent 1px),
            linear-gradient(90deg, light-dark(rgba(37, 99, 235, 0.3), rgba(37, 99, 235, 0.3)) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
        }}
      />

      {/* Main Content */}
      <Container size="lg" style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <Stack align="center" gap="xl" style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '40px' }}>
          {/* Avatar with Status */}
          <Transition mounted={isLoaded} transition="fade" duration={1000}>
            {(styles) => (
              <Box style={styles} pos="relative">
                <Avatar
                  src={profile.avatar}
                  alt={profile.name}
                  size={160}
                  style={{
                    border: '4px solid var(--mantine-color-blue-5)',
                    boxShadow: '0 0 40px rgba(37, 99, 235, 0.3)',
                    transition: 'all 0.5s ease',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 0 60px rgba(37, 99, 235, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 0 40px rgba(37, 99, 235, 0.3)';
                  }}
                />
                
                {/* Status Indicator */}
                {profile.availableForWork && (
                  <Badge
                    color="green"
                    variant="filled"
                    size="sm"
                    style={{
                      position: 'absolute',
                      bottom: 16,
                      right: 16,
                      animation: 'pulse 2s infinite',
                    }}
                  >
                    
                  </Badge>
                )}
              </Box>
            )}
          </Transition>

          {/* Name with Gradient and Scatter Animation */}
          <Transition mounted={isLoaded} transition="slide-up" duration={1000} timingFunction="ease">
            {(styles) => (
              <Box style={styles}>
                <ScatterText
                  style={{
                    fontSize: '3.5rem',
                    fontWeight: 700,
                    lineHeight: 1.2,
                    background: 'linear-gradient(45deg, var(--mantine-color-blue-6), var(--mantine-color-cyan-6))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    display: 'inline-block',
                    textAlign: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                >
                  {profile.name}
                </ScatterText>
              </Box>
            )}
          </Transition>

          {/* Title & Location */}
          <Transition mounted={isLoaded} transition="slide-up" duration={1000} timingFunction="ease">
            {(styles) => (
              <Stack gap="sm" align="center" style={styles}>
                <Text 
                  size="xl" 
                  fw={500} 
                  c="light-dark(var(--mantine-color-gray-7), var(--mantine-color-gray-2))"
                >
                  {profile.title}
                </Text>
                
                {profile.location && (
                  <Group gap="xs" justify="center">
                    <IconMapPin 
                      size={16} 
                      color="light-dark(var(--mantine-color-gray-6), var(--mantine-color-gray-4))" 
                    />
                    <Text size="sm" c="dimmed">
                      {profile.location}
                    </Text>
                  </Group>
                )}
              </Stack>
            )}
          </Transition>

          {/* Bio */}
          <Transition mounted={isLoaded} transition="fade" duration={1000} timingFunction="ease">
            {(styles) => (
              <Text
                size="lg"
                c="dimmed"
                maw={600}
                style={{ ...styles, lineHeight: 1.6 }}
              >
                {profile.bio}
              </Text>
            )}
          </Transition>

          {/* Status Badge */}
          {profile.availableForWork && (
            <Transition mounted={isLoaded} transition="slide-up" duration={1000} timingFunction="ease">
              {(styles) => (
                <Badge
                  size="lg"
                  variant="gradient"
                  gradient={{ from: 'green', to: 'teal' }}
                  style={styles}
                  leftSection={
                    <Box
                      w={8}
                      h={8}
                      style={{ 
                        backgroundColor: 'white',
                        borderRadius: '50%', 
                        animation: 'pulse 2s infinite' 
                      }}
                    />
                  }
                >
                  Available for work
                </Badge>
              )}
            </Transition>
          )}

          {/* Social Links */}
          <Transition mounted={isLoaded} transition="slide-up" duration={1000} timingFunction="ease">
            {(styles) => (
              <Group gap="md" justify="center" style={styles}>
                <ActionIcon
                  size="xl"
                  variant="subtle"
                  color="gray"
                  component="a"
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  styles={{
                    root: {
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px) scale(1.1)',
                        color: 'var(--mantine-color-blue-4)',
                      },
                    },
                  }}
                >
                  <IconBrandGithub size={28} />
                </ActionIcon>
                
                <ActionIcon
                  size="xl"
                  variant="subtle"
                  color="gray"
                  component="a"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  styles={{
                    root: {
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px) scale(1.1)',
                        color: 'var(--mantine-color-blue-4)',
                      },
                    },
                  }}
                >
                  <IconBrandLinkedin size={28} />
                </ActionIcon>
                
                <ActionIcon
                  size="xl"
                  variant="subtle"
                  color="gray"
                  component="a"
                  href={`mailto:${profile.email}`}
                  styles={{
                    root: {
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px) scale(1.1)',
                        color: 'var(--mantine-color-blue-4)',
                      },
                    },
                  }}
                >
                  <IconMail size={28} />
                </ActionIcon>
              </Group>
            )}
          </Transition>

          {/* CTA Buttons */}
          <Transition mounted={isLoaded} transition="slide-up" duration={1000} timingFunction="ease">
            {(styles) => (
              <Group gap="md" justify="center" style={styles}>
                <Button
                  size="lg"
                  variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan' }}
                  leftSection={<IconCode size={20} />}
                  onClick={handleScrollToWork}
                  styles={{
                    root: {
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 10px 30px rgba(37, 99, 235, 0.4)',
                      },
                    },
                  }}
                >
                  View My Work
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  color="blue"
                  leftSection={<IconMail size={20} />}
                  onClick={handleScrollToContact}
                  styles={{
                    root: {
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        backgroundColor: 'light-dark(rgba(37, 99, 235, 0.05), rgba(37, 99, 235, 0.1))',
                      },
                    },
                  }}
                >
                  Get In Touch
                </Button>
                
                {profile.resume && (
                  <Button
                    size="lg"
                    variant="subtle"
                    color="gray"
                    leftSection={<IconDownload size={20} />}
                    component="a"
                    href={profile.resume}
                    download
                    styles={{
                      root: {
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          backgroundColor: 'light-dark(rgba(0, 0, 0, 0.05), rgba(255, 255, 255, 0.1))',
                        },
                      },
                    }}
                  >
                    Download Resume
                  </Button>
                )}
              </Group>
            )}
          </Transition>

          {/* Mobile Scroll Indicator - shown only on mobile */}
          <Transition mounted={isLoaded} transition="slide-up" duration={1000} timingFunction="ease">
            {(styles) => (
              <Stack align="center" gap="xs" style={styles} mt="xl" hiddenFrom="md">
                <Text size="xs" c="light-dark(gray.6, gray.4)" style={{ opacity: 0.8 }}>
                  Scroll to explore
                </Text>
                <ActionIcon
                  variant="light"
                  color="blue"
                  size="md"
                  onClick={handleScrollToWork}
                  styles={{
                    root: {
                      animation: 'bounce 2s infinite',
                      transition: 'all 0.3s ease',
                      backgroundColor: 'light-dark(rgba(37, 99, 235, 0.1), rgba(37, 99, 235, 0.2))',
                      color: 'light-dark(var(--mantine-color-blue-7), var(--mantine-color-blue-4))',
                      '&:hover': {
                        backgroundColor: 'light-dark(rgba(37, 99, 235, 0.15), rgba(37, 99, 235, 0.3))',
                        color: 'light-dark(var(--mantine-color-blue-8), var(--mantine-color-cyan-4))',
                        transform: 'scale(1.1)',
                      },
                    },
                  }}
                >
                  <IconChevronDown size={20} />
                </ActionIcon>
              </Stack>
            )}
          </Transition>
        </Stack>
      </Container>

      {/* Scroll Indicator positioned at bottom of viewport */}
      <Transition mounted={isLoaded} transition="fade" duration={1500} timingFunction="ease">
        {(styles) => (
          <Box
            style={{
              ...styles,
              position: 'absolute',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 20,
            }}
            // Hide on mobile and small screens to prevent overlap
            visibleFrom="md"
          >
            <Stack align="center" gap="xs" style={{ cursor: 'pointer' }} onClick={handleScrollToWork}>
              <Text 
                size="xs" 
                c="light-dark(gray.6, gray.4)"
                style={{
                  transition: 'all 0.3s ease',
                  opacity: 0.8,
                }}
              >
                Scroll to explore
              </Text>
              <ActionIcon
                variant="light"
                color="blue"
                size="lg"
                styles={{
                  root: {
                    animation: 'bounce 2s infinite',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'light-dark(rgba(37, 99, 235, 0.1), rgba(37, 99, 235, 0.2))',
                    color: 'light-dark(var(--mantine-color-blue-7), var(--mantine-color-blue-4))',
                    '&:hover': {
                      backgroundColor: 'light-dark(rgba(37, 99, 235, 0.15), rgba(37, 99, 235, 0.3))',
                      color: 'light-dark(var(--mantine-color-blue-8), var(--mantine-color-cyan-4))',
                      transform: 'scale(1.1)',
                    },
                  },
                }}
              >
                <IconChevronDown size={24} />
              </ActionIcon>
            </Stack>
          </Box>
        )}
      </Transition>

      {/* Decorative Elements */}
      <Box
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: 80,
          height: 80,
          border: '2px solid light-dark(rgba(37, 99, 235, 0.3), rgba(37, 99, 235, 0.2))',
          borderRadius: '50%',
          animation: 'pulse 3s infinite',
        }}
      />
      <Box
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: 60,
          height: 60,
          border: '2px solid light-dark(rgba(168, 85, 247, 0.3), rgba(168, 85, 247, 0.2))',
          borderRadius: '50%',
          animation: 'pulse 3s infinite 1s',
        }}
      />
      <Box
        style={{
          position: 'absolute',
          top: '50%',
          left: '5%',
          width: 8,
          height: 8,
          backgroundColor: 'light-dark(rgba(236, 72, 153, 0.6), rgba(236, 72, 153, 0.4))',
          borderRadius: '50%',
          animation: 'ping 4s infinite 2s',
        }}
      />
      <Box
        style={{
          position: 'absolute',
          top: '30%',
          right: '15%',
          width: 12,
          height: 12,
          backgroundColor: 'light-dark(rgba(6, 182, 212, 0.6), rgba(6, 182, 212, 0.4))',
          borderRadius: '50%',
          animation: 'ping 4s infinite 0.5s',
        }}
      />

      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
            40%, 43% { transform: translateY(-8px); }
            70% { transform: translateY(-4px); }
            90% { transform: translateY(-2px); }
          }
          
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          
          @keyframes ping {
            75%, 100% { transform: scale(2); opacity: 0; }
          }
        `}
      </style>
    </Box>
  );
};

export default Hero;