/** 
 * @copyright © 2025 CodeFusion Bit LLP. All rights reserved.
 * @website https://www.codefusionbit.com
 * @contact info@codefusionbit.com
 * @author Technical Project Manager / Team Lead / Developer: Hitesh Sapra https://fullstack.hiteshsapra.com
 * @github https://github.com/codefusionbitllp
 * @license MIT
 * @file App.tsx
 */


// App.tsx - Fixed MantineProvider wrapping
import React, { useState, useEffect } from 'react';
import {
  MantineProvider,
  createTheme,
  Center,
  Text,
  Button,
  Stack,
  Box,
  localStorageColorSchemeManager,
} from '@mantine/core';
import { PortfolioService } from './firebase/database';
import { PortfolioData, NavigationItem, SocialLink } from './types';
import MainLoadingSpinner from './components/Effects/MainLoadingSpinner';

// Components
import Header from './components/Layout/MainHeader';
import Footer from './components/Layout/MainFooter';
import Hero from './components/Sections/Hero';
import About from './components/Sections/About';
import Projects from './components/Sections/Projects';
import Contact from './components/Sections/Contact';
import SplashCursor from './components/Effects/SplashCursor';

// Mantine theme configuration
const theme = createTheme({
  primaryColor: 'blue',
  fontFamily: 'Inter, system-ui, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: '700',
  },
  colors: {
    brand: [
      '#E3F2FD',
      '#BBDEFB',
      '#90CAF9',
      '#64B5F6',
      '#42A5F5',
      '#2196F3',
      '#1E88E5',
      '#1976D2',
      '#1565C0',
      '#0D47A1',
    ],
  },
  components: {
    Button: {
      styles: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    ActionIcon: {
      styles: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px) scale(1.05)',
          },
        },
      },
    },
    Card: {
      styles: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 'var(--mantine-shadow-lg)',
          },
        },
      },
    },
  },
});

// Color scheme manager
const colorSchemeManager = localStorageColorSchemeManager({
  key: 'portfolio-color-scheme',
});

// Navigation items
const navigation: NavigationItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

// Simplified scroll hook using native browser APIs
const useCustomScroll = () => {
  const scrollToSection = (sectionId: string) => {
    console.log(`Scrolling to: ${sectionId}`);
    
    try {
      const element = document.getElementById(sectionId);
      
      if (!element) {
        console.warn(`Element with id "${sectionId}" not found`);
        return;
      }

      // Get header height for offset
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 80;
      
      // Calculate target position
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = Math.max(0, elementPosition - headerHeight - 20);

      console.log(`Target position: ${offsetPosition}`);

      // Use native smooth scroll - works in all modern browsers
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

    } catch (error) {
      console.error('Scroll error:', error);
      
      // Fallback for older browsers
      const element = document.getElementById(sectionId);
      if (element) {
        console.log('Using fallback scroll');
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }
  };

  return { scrollToSection };
};

// Error component - Must be inside MantineProvider
const ErrorState: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
  <Center style={{ minHeight: '100vh' }}>
    <Stack align="center" gap="md" style={{ maxWidth: 400, textAlign: 'center' }}>
      <Text size="xl" c="red">⚠️</Text>
      <Text size="xl" fw={700}>Failed to load portfolio</Text>
      <Text c="dimmed">
        Sorry, there was an error loading the portfolio data. Please try again.
      </Text>
      <Button onClick={onRetry}>
        Try Again
      </Button>
    </Stack>
  </Center>
);

// Loading component - Must be inside MantineProvider
const LoadingState: React.FC = () => (
  <MainLoadingSpinner
    logoSrc="/images/hiteshsapra.png"
    logoAlt="Hitesh Sapra"
    brandName="Hitesh Sapra"
    message="🚀 Welcome to my portfolio."
  />
);

// Main content component
const AppContent: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollToSection } = useCustomScroll();

  // Load portfolio data
  const loadPortfolioData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await PortfolioService.getPortfolioData();

      if (data) {
        setPortfolioData(data);
      } else {
        console.log('Using mock data as fallback');
      }
    } catch (error) {
      console.error('Error loading portfolio data:', error);
      setError('Failed to load portfolio data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPortfolioData();
  }, []);

  // Enhanced scroll spy with improved detection
  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'contact'];
    
    const handleScroll = () => {
      // Get current scroll position
      const scrollPosition = window.scrollY + 100; // Add offset for header
      
      // Find which section is currently in view
      let currentSection = 'home';
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.pageYOffset;
          
          if (scrollPosition >= elementTop - 200) {
            currentSection = sectionId;
          }
        }
      }

      if (currentSection !== activeSection) {
        console.log(`Active section changed to: ${currentSection}`);
        setActiveSection(currentSection);
      }
    };

    // Use throttled scroll listener for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [activeSection]);

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Error state
  if (error && !portfolioData) {
    return <ErrorState onRetry={loadPortfolioData} />;
  }

  // No data state
  if (!portfolioData) {
    return <ErrorState onRetry={loadPortfolioData} />;
  }

  // Create social links from profile
  const socialLinks: SocialLink[] = [
    { platform: 'github', url: portfolioData.profile.github, icon: 'github' },
    { platform: 'linkedin', url: portfolioData.profile.linkedin, icon: 'linkedin' },
    ...(portfolioData.profile.x ? [{ platform: 'x', url: portfolioData.profile.x, icon: 'x' }] : []),
  ];

  // Quick links for footer
  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
    ...(portfolioData.profile.resume ? [{ label: 'Resume', href: portfolioData.profile.resume, external: true }] : []),
  ];

  return (
    <Box style={{ minHeight: '100vh' }}>
      <SplashCursor />
      
      {/* Header */}
      <Header
        navigation={navigation}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        logoText={portfolioData.profile.name}
        resumeUrl={portfolioData.profile.resume}
        scrollToSection={scrollToSection}
      />

      {/* Main Content */}
      <Box component="main">
        {/* Hero Section */}
        <Hero profile={portfolioData.profile} scrollToSection={scrollToSection} />

        {/* About Section */}
        <About
          skills={portfolioData.skills}
          experience={portfolioData.experience}
          education={portfolioData.education}
          personalInfo={portfolioData.profile.personalInfo}
        />

        {/* Projects Section */}
        <Projects projects={portfolioData.projects} />

        {/* Contact Section */}
        <Contact profile={portfolioData.profile} />
      </Box>

      {/* Footer */}
      <Footer
        socialLinks={socialLinks}
        email={portfolioData.profile.email}
        name={portfolioData.profile.name}
        quickLinks={quickLinks}
        scrollToSection={scrollToSection}
      />
    </Box>
  );
};

// Main App with MantineProvider wrapper
const App: React.FC = () => {
  return (
    <MantineProvider
      theme={theme}
      colorSchemeManager={colorSchemeManager}
      defaultColorScheme="auto"
    >
      <AppContent />
    </MantineProvider>
  );
};

export default App;