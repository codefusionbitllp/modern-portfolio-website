/**
 * @copyright © 2025 CodeFusion Bit LLP. All rights reserved.
 * @website https://www.codefusionbit.com
 * @contact info@codefusionbit.com
 * @author Technical Project Manager / Team Lead / Developer: Hitesh Sapra https://fullstack.hiteshsapra.com
 * @github https://github.com/codefusionbitllp
 * @license MIT
 * @file MainLoadingSpinner.tsx
 */


import React from 'react';
import {
  Box,
  Center,
  Text,
  Stack,
  RingProgress,
  Avatar,
  Transition,
  Container,
} from '@mantine/core';

interface LoadingSpinnerProps {
  logoSrc?: string;
  logoAlt?: string;
  brandName?: string;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  logoSrc = "/path-to-your-logo.jpg", // Replace with your actual logo path
  logoAlt = "Logo",
  brandName = "Hitesh Sapra",
  message = "Loading..."
}) => {
  return (
    <Box
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-9))',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Animated Background */}
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 30% 30%, light-dark(rgba(37, 99, 235, 0.02), rgba(37, 99, 235, 0.1)) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, light-dark(rgba(168, 85, 247, 0.01), rgba(168, 85, 247, 0.08)) 0%, transparent 50%)
          `,
          animation: 'pulse 3s ease-in-out infinite',
        }}
      />

      {/* Floating Particles */}
      <Box style={{ position: 'absolute', inset: 0 }}>
        {[...Array(8)].map((_, i) => (
          <Box
            key={i}
            style={{
              position: 'absolute',
              width: '3px',
              height: '3px',
              backgroundColor: 'light-dark(rgba(37, 99, 235, 0.3), rgba(37, 99, 235, 0.7))',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </Box>

      <Container size="xs" style={{ position: 'relative', zIndex: 10 }}>
        <Center>
          <Stack align="center" gap="xl">
            {/* Logo with Spinning Ring */}
            <Box style={{ position: 'relative' }}>
              {/* Outer spinning ring */}
              <RingProgress
                size={140}
                thickness={3}
                sections={[
                  { value: 25, color: 'blue.6' },
                  { value: 25, color: 'cyan.5' },
                  { value: 25, color: 'blue.4' },
                  { value: 25, color: 'cyan.6' },
                ]}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'spin 3s linear infinite',
                }}
              />

              {/* Inner pulsing ring */}
              <Box
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 120,
                  height: 120,
                  border: '2px solid var(--mantine-color-blue-2)',
                  borderRadius: '50%',
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />

              {/* Logo/Avatar */}
              <Avatar
                src={logoSrc}
                alt={logoAlt}
                size={100}
                style={{
                  border: '4px solid var(--mantine-color-blue-5)',
                  boxShadow: '0 0 30px rgba(37, 99, 235, 0.3)',
                  animation: 'glow 2s ease-in-out infinite alternate',
                }}
              />
            </Box>

            {/* Brand Name */}
            <Transition mounted={true} transition="fade" duration={1000}>
              {(styles) => (
                <Text
                  size="xl"
                  fw={700}
                  ta="center"
                  style={{
                    ...styles,
                    background: 'linear-gradient(45deg, var(--mantine-color-blue-6), var(--mantine-color-cyan-6))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'fadeInUp 1s ease-out',
                  }}
                >
                  {brandName}
                </Text>
              )}
            </Transition>

            {/* Loading Message */}
            <Stack align="center" gap="xs">
              <Text 
                size="sm" 
                c="dimmed" 
                ta="center"
                style={{
                  animation: 'fadeInUp 1s ease-out 0.5s both',
                }}
              >
                {message}
              </Text>
              
              {/* Loading dots */}
              <Box style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {[...Array(3)].map((_, i) => (
                  <Box
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      backgroundColor: 'var(--mantine-color-blue-5)',
                      borderRadius: '50%',
                      animation: `bounce 1.4s ease-in-out infinite`,
                      animationDelay: `${i * 0.16}s`,
                    }}
                  />
                ))}
              </Box>
            </Stack>
          </Stack>
        </Center>
      </Container>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes spin {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
          
          @keyframes pulse {
            0%, 100% { 
              opacity: 0.4; 
              transform: translate(-50%, -50%) scale(1);
            }
            50% { 
              opacity: 0.8; 
              transform: translate(-50%, -50%) scale(1.05);
            }
          }
          
          @keyframes glow {
            0% { 
              boxShadow: 0 0 20px rgba(37, 99, 235, 0.3);
            }
            100% { 
              boxShadow: 0 0 40px rgba(37, 99, 235, 0.6);
            }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          
          @keyframes bounce {
            0%, 80%, 100% { 
              transform: scale(0);
              opacity: 0.5;
            }
            40% { 
              transform: scale(1);
              opacity: 1;
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default LoadingSpinner;