/**
 * @copyright © 2025 CodeFusion Bit LLP. All rights reserved.
 * @website https://www.codefusionbit.com
 * @contact info@codefusionbit.com
 * @author Technical Project Manager / Team Lead / Developer: Hitesh Sapra https://fullstack.hiteshsapra.com
 * @github https://github.com/codefusionbitllp
 * @license MIT
 * @file MainFooter.tsx
 */


import React from 'react';
import {
  Container,
  Group,
  Stack,
  Text,
  Title,
  ActionIcon,
  Button,
  Grid,
  Box,
  Anchor,
} from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
  IconHeartCode,
  IconArrowUp,
  IconBrandInstagram,
  IconExternalLink,
} from '@tabler/icons-react';
import { SocialLink } from '../../types';

interface FooterProps {
  socialLinks: SocialLink[];
  email: string;
  name: string;
  scrollToSection: (sectionId: string) => void;
  quickLinks?: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}

const MainFooter: React.FC<FooterProps> = ({
  socialLinks,
  email,
  name,
  scrollToSection,
  quickLinks = []
}) => {
  const currentYear = new Date().getFullYear();

  // Enhanced scroll function with fallbacks
  const handleScrollToSection = (sectionId: string) => {
    console.log('Footer: Scrolling to section:', sectionId);
    
    try {
      // First try using the provided scrollToSection function
      if (scrollToSection) {
        scrollToSection(sectionId);
      } else {
        // Fallback to native scroll behavior
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 80; // Height of fixed header
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    } catch (error) {
      console.error('Footer scroll error:', error);
      // Final fallback - basic scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleScrollToTop = () => {
    console.log('Footer: Scrolling to top');
    handleScrollToSection('home');
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github': return IconBrandGithub;
      case 'linkedin': return IconBrandLinkedin;
      case 'x': return IconBrandX;
      case 'instagram': return IconBrandInstagram;
      case 'email': return IconMail;
      default: return IconExternalLink;
    }
  };

  return (
    <Box
      component="footer"
      style={{
        position: 'relative',
        borderTop: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
        backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-8))',
      }}
    >
      {/* Background Pattern */}
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          background: 'linear-gradient(135deg, var(--mantine-color-blue-6), var(--mantine-color-violet-6))',
        }}
      />

      {/* Decorative Top Border */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '96px',
          height: '4px',
          background: 'linear-gradient(90deg, var(--mantine-color-blue-6), var(--mantine-color-violet-6))',
          borderRadius: '2px',
        }}
      />

      <Container size="lg" py={80} pos="relative">
        <Grid>
          {/* Brand Section */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="lg">
              <Box>
                <Title
                  order={3}
                  mb="md"
                  style={{
                    background: 'linear-gradient(45deg, var(--mantine-color-blue-6), var(--mantine-color-cyan-6))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {name}
                </Title>
                <Text c="dimmed" size="lg" style={{ lineHeight: 1.6 }}>
                  Crafting digital experiences with passion and precision. 
                  Let's build something amazing together.
                </Text>
              </Box>

              {/* Contact */}
              <Box>
                <Title order={4} mb="md" size="lg">
                  Get in Touch
                </Title>
                <Anchor
                  href={`mailto:${email}`}
                  c="blue"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <IconMail size={20} />
                  {email}
                </Anchor>
              </Box>
            </Stack>
          </Grid.Col>

          {/* Quick Links */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="lg">
              <Title order={4} size="lg">
                Quick Links
              </Title>
              <Stack gap="md">
                {quickLinks.map((link, index) => (
                  <Box key={index}>
                    {link.external ? (
                      <Anchor
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        c="dimmed"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          fontSize: '1.1rem',
                          fontWeight: 500,
                          transition: 'all 0.3s ease',
                          textDecoration: 'none',
                        }}
                        styles={{
                          root: {
                            '&:hover': {
                              color: 'var(--mantine-color-blue-4)',
                              transform: 'translateX(8px)',
                            }
                          }
                        }}
                      >
                        {link.label}
                        <IconExternalLink size={16} />
                      </Anchor>
                    ) : (
                      <Button
                        variant="subtle"
                        color="gray"
                        onClick={() => {
                          const sectionId = link.href.replace('#', '');
                          console.log('Quick link clicked:', sectionId);
                          handleScrollToSection(sectionId);
                        }}
                        size="lg"
                        justify="flex-start"
                        styles={{
                          root: {
                            padding: 0,
                            height: 'auto',
                            fontWeight: 500,
                            fontSize: '1.1rem',
                            backgroundColor: 'transparent',
                            '&:hover': {
                              color: 'var(--mantine-color-blue-4)',
                              transform: 'translateX(8px)',
                              backgroundColor: 'transparent',
                            }
                          }
                        }}
                      >
                        {link.label}
                      </Button>
                    )}
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Social Links & Back to Top */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="lg">
              <Title order={4} size="lg">
                Connect
              </Title>
              
              {/* Social Icons */}
              <Group gap="lg">
                {socialLinks.map((social, index) => {
                  const Icon = getSocialIcon(social.platform);
                  return (
                    <ActionIcon
                      key={index}
                      component="a"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="xl"
                      variant="light"
                      color="blue"
                      style={{
                        transition: 'all 0.3s ease',
                      }}
                      styles={{
                        root: {
                          '&:hover': {
                            transform: 'scale(1.1) translateY(-2px)',
                            boxShadow: 'var(--mantine-shadow-lg)',
                          }
                        }
                      }}
                      title={`Follow on ${social.platform}`}
                    >
                      <Icon size={24} />
                    </ActionIcon>
                  );
                })}
              </Group>

              {/* Back to Top Button - FIXED */}
              <Button
                variant="light"
                color="blue"
                leftSection={<IconArrowUp size={20} />}
                onClick={handleScrollToTop}
                size="lg"
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
                Back to top
              </Button>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Bottom Bar */}
      <Box style={{ borderTop: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))' }}>
        <Container size="lg" py="md">
          <Group justify="space-between" align="center" wrap="wrap">
            {/* Copyright */}
            <Text c="dimmed" size="md">
              &copy; {currentYear} CodeFusionBit LLP. All rights reserved.
            </Text>

            {/* Made with Love */}
            <Group gap="xs" c="dimmed">
              <Text size="md">Made with</Text>
              <IconHeartCode 
                size={16} 
                style={{ 
                  color: 'var(--mantine-color-red-5)',
                  animation: 'pulse 2s infinite'
                }} 
              />
              <Text size="md">using React, TypeScript & Mantine</Text>
            </Group>
          </Group>
        </Container>
      </Box>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </Box>
  );
};

export default MainFooter;