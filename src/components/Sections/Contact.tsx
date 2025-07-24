/**
 * @copyright © 2025 CodeFusion Bit LLP. All rights reserved.
 * @website https://www.codefusionbit.com
 * @contact info@codefusionbit.com
 * @author Technical Project Manager / Team Lead / Developer: Hitesh Sapra https://fullstack.hiteshsapra.com
 * @github https://github.com/codefusionbitllp
 * @license MIT
 * @file Contact.tsx
 */


import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Title,
  Text,
  Group,
  Stack,
  Card,
  TextInput,
  Textarea,
  Select,
  Button,
  Grid,
  Box,
  Transition,
  Center,
  ThemeIcon,
  ActionIcon,
  Alert,
  Anchor,
  Accordion,
} from '@mantine/core';
import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconSend,
  IconCheck,
  IconX,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconCalendar,
  IconClock,
} from '@tabler/icons-react';
import { ContactForm, Profile } from '../../types';
import { PortfolioService } from '../../firebase/database';

interface ContactProps {
  profile: Profile;
}

interface FormState extends ContactForm {
  budget: string;
  timeline: string;
}

const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    budget: '',
    timeline: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormState> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormState) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await PortfolioService.submitContactForm(formData);
      
      if (response.success) {
        setSubmitStatus('success');
        setFormData({
          name: '', email: '', subject: '', message: '',
          company: '', budget: '', timeline: '',
        });
        
        await PortfolioService.trackEvent({
          action: 'contact_form_submit',
          category: 'engagement',
          label: 'contact_page',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const budgetOptions = [
    { value: '', label: 'Select budget range' },
    { value: 'under-5k', label: 'Under $5,000' },
    { value: '5k-10k', label: '$5,000 - $10,000' },
    { value: '10k-25k', label: '$10,000 - $25,000' },
    { value: '25k-50k', label: '$25,000 - $50,000' },
    { value: 'over-50k', label: 'Over $50,000' },
    { value: 'discuss', label: 'Let\'s discuss' },
  ];

  const timelineOptions = [
    { value: '', label: 'Select timeline' },
    { value: 'asap', label: 'ASAP' },
    { value: '1-month', label: 'Within 1 month' },
    { value: '2-3-months', label: '2-3 months' },
    { value: '3-6-months', label: '3-6 months' },
    { value: 'flexible', label: 'Flexible' },
  ];

  const contactInfo = [
    {
      icon: IconMail,
      title: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
      color: 'blue',
    },
    ...(profile.phone ? [{
      icon: IconPhone,
      title: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phone}`,
      color: 'green',
    }] : []),
    ...(profile.location ? [{
      icon: IconMapPin,
      title: 'Location',
      value: profile.location,
      color: 'violet',
    }] : []),
    {
      icon: IconClock,
      title: 'Availability',
      value: profile.availableForWork ? 'Available for new projects' : 'Currently busy',
      color: profile.availableForWork ? 'green' : 'orange',
    },
  ];

  const socialLinks = [
    { icon: IconBrandGithub, url: profile.github, label: 'GitHub' },
    { icon: IconBrandLinkedin, url: profile.linkedin, label: 'LinkedIn' },
    ...(profile.x ? [{ icon: IconBrandX, url: profile.x, label: 'X' }] : []),
  ];

  const faqData = [
    {
      question: "What's your typical response time?",
      answer: "I usually respond to inquiries within 24 hours during business days."
    },
    {
      question: "Do you work with startups?",
      answer: "Absolutely! I love working with startups and helping them bring their innovative ideas to life."
    },
    {
      question: "What's your development process?",
      answer: "I follow an agile approach with regular communication, iterative development, and user feedback integration."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, I offer maintenance packages and ongoing support for all projects I develop."
    },
  ];

  return (
    <Box 
      component="section" 
      id="contact" 
      py={80} 
      ref={sectionRef}
      style={{
        backgroundColor: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-7))',
      }}
    >
      <Container size="lg">
        {/* Section Header */}
        <Center mb={60}>
          <Stack align="center" gap="md">
            <Title 
              order={2} 
              size="3rem" 
              ta="center"
              style={{
                background: 'linear-gradient(45deg, var(--mantine-color-blue-6), var(--mantine-color-cyan-6))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Get In Touch
            </Title>
            <Text size="xl" c="dimmed" ta="center" maw={600}>
              Ready to start your next project? Let's create something amazing together
            </Text>
          </Stack>
        </Center>

        <Grid>
          {/* Contact Information */}
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Transition mounted={isVisible} transition="slide-right" duration={1000}>
              {(styles) => (
                <Stack gap="xl" style={styles}>
                  {/* Intro */}
                  <Box>
                    <Title 
                      order={3} 
                      mb="md"
                      c="light-dark(var(--mantine-color-gray-9), var(--mantine-color-white))"
                    >
                      Let's discuss your project
                    </Title>
                    <Text c="dimmed" size="lg" style={{ lineHeight: 1.6 }}>
                      I'm always excited to work on new projects and help bring your ideas to life. 
                      Whether you need a complete web application, mobile app, or just want to chat 
                      about technology, feel free to reach out!
                    </Text>
                  </Box>

                  {/* Contact Details */}
                  <Stack gap="md">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon;
                      return (
                        <Card 
                          key={index} 
                          padding="lg" 
                          withBorder
                          style={{
                            backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-6))',
                            borderColor: 'light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
                          }}
                        >
                          <Group gap="md">
                            <ThemeIcon size={48} color={info.color} variant="light">
                              <Icon size={24} />
                            </ThemeIcon>
                            <Box style={{ flex: 1 }}>
                              <Text 
                                fw={600} 
                                mb="xs"
                                c="light-dark(var(--mantine-color-gray-9), var(--mantine-color-white))"
                              >
                                {info.title}
                              </Text>
                              {info.href ? (
                                <Anchor 
                                  href={info.href}
                                  c={info.color}
                                  style={{ 
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease'
                                  }}
                                >
                                  {info.value}
                                </Anchor>
                              ) : (
                                <Text c={info.color} fw={500}>
                                  {info.value}
                                </Text>
                              )}
                            </Box>
                          </Group>
                        </Card>
                      );
                    })}
                  </Stack>

                  {/* Social Links */}
                  <Box>
                    <Title 
                      order={4} 
                      mb="md"
                      c="light-dark(var(--mantine-color-gray-9), var(--mantine-color-white))"
                    >
                      Connect with me
                    </Title>
                    <Group gap="md">
                      {socialLinks.map((social, index) => {
                        const Icon = social.icon;
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
                                }
                              }
                            }}
                          >
                            <Icon size={24} />
                          </ActionIcon>
                        );
                      })}
                    </Group>
                  </Box>

                  {/* Calendar Link */}
                  <Card 
                    padding="lg" 
                    withBorder
                    style={{
                      background: 'light-dark(var(--mantine-color-blue-0), var(--mantine-color-blue-9))',
                      borderColor: 'light-dark(var(--mantine-color-blue-3), var(--mantine-color-blue-7))',
                    }}
                  >
                    <Group gap="md" mb="md">
                      <ThemeIcon size={32} color="blue">
                        <IconCalendar size={20} />
                      </ThemeIcon>
                      <Title 
                        order={4}
                        c="light-dark(var(--mantine-color-gray-9), var(--mantine-color-white))"
                      >
                        Schedule a call
                      </Title>
                    </Group>
                    <Text 
                      mb="md"
                      c="light-dark(var(--mantine-color-gray-7), var(--mantine-color-gray-3))"
                    >
                      Prefer to talk? Schedule a free 30-minute consultation call.
                    </Text>
                    <Button 
                      variant="gradient" 
                      gradient={{ from: 'blue', to: 'cyan' }}
                    >
                      Book a Call
                    </Button>
                  </Card>
                </Stack>
              )}
            </Transition>
          </Grid.Col>

          {/* Contact Form */}
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Transition mounted={isVisible} transition="slide-left" duration={1000} timingFunction="ease">
              {(styles) => (
                <Card 
                  padding="xl" 
                  withBorder 
                  style={{
                    ...styles,
                    backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-6))',
                    borderColor: 'light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
                  }}
                >
                  <form onSubmit={handleSubmit}>
                    <Stack gap="md">
                      {/* Name & Email Row */}
                      <Grid>
                        <Grid.Col span={6}>
                          <TextInput
                            label="Name *"
                            placeholder="Your full name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name')(e.target.value)}
                            error={errors.name}
                            size="md"
                          />
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <TextInput
                            label="Email *"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email')(e.target.value)}
                            error={errors.email}
                            size="md"
                          />
                        </Grid.Col>
                      </Grid>

                      {/* Company & Subject Row */}
                      <Grid>
                        <Grid.Col span={6}>
                          <TextInput
                            label="Company"
                            placeholder="Your company name"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company')(e.target.value)}
                            size="md"
                          />
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <TextInput
                            label="Subject *"
                            placeholder="Project inquiry"
                            value={formData.subject}
                            onChange={(e) => handleInputChange('subject')(e.target.value)}
                            error={errors.subject}
                            size="md"
                          />
                        </Grid.Col>
                      </Grid>

                      {/* Budget & Timeline Row */}
                      <Grid>
                        <Grid.Col span={6}>
                          <Select
                            label="Budget"
                            placeholder="Select budget range"
                            data={budgetOptions}
                            value={formData.budget}
                            onChange={(value) => handleInputChange('budget')(value || '')}
                            size="md"
                          />
                        </Grid.Col>
                        <Grid.Col span={6}>
                          <Select
                            label="Timeline"
                            placeholder="Select timeline"
                            data={timelineOptions}
                            value={formData.timeline}
                            onChange={(value) => handleInputChange('timeline')(value || '')}
                            size="md"
                          />
                        </Grid.Col>
                      </Grid>

                      {/* Message Field */}
                      <Textarea
                        label="Message *"
                        placeholder="Tell me about your project, goals, and how I can help you achieve them..."
                        value={formData.message}
                        onChange={(e) => handleInputChange('message')(e.target.value)}
                        error={errors.message}
                        minRows={6}
                        size="md"
                      />

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        loading={isSubmitting}
                        leftSection={<IconSend size={20} />}
                        size="lg"
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'cyan' }}
                        fullWidth
                        mt="md"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>

                      {/* Success Alert */}
                      {submitStatus === 'success' && (
                        <Alert color="green" icon={<IconCheck size={16} />}>
                          <Text fw={600}>Message sent successfully!</Text>
                          <Text size="sm">I'll get back to you within 24 hours.</Text>
                        </Alert>
                      )}

                      {/* Error Alert */}
                      {submitStatus === 'error' && (
                        <Alert color="red" icon={<IconX size={16} />}>
                          <Text fw={600}>Failed to send message</Text>
                          <Text size="sm">Please try again or send an email directly.</Text>
                        </Alert>
                      )}

                      {/* Privacy Note */}
                      <Text size="xs" c="dimmed" ta="center">
                        Your information is secure and will only be used to respond to your inquiry.
                      </Text>
                    </Stack>
                  </form>
                </Card>
              )}
            </Transition>
          </Grid.Col>
        </Grid>

        {/* FAQ Section */}
        <Transition mounted={isVisible} transition="fade-up" duration={1000} timingFunction="ease">
          {(styles) => (
            <Box mt={80} style={styles}>
              <Center mb={40}>
                <Title 
                  order={3}
                  c="light-dark(var(--mantine-color-gray-9), var(--mantine-color-white))"
                >
                  Frequently Asked Questions
                </Title>
              </Center>
              
              <Container size="md">
                <Accordion defaultValue="0">
                  {faqData.map((faq, index) => (
                    <Accordion.Item key={index} value={index.toString()}>
                      <Accordion.Control>
                        <Text fw={600}>
                          {faq.question}
                        </Text>
                      </Accordion.Control>
                      <Accordion.Panel>
                        <Text c="dimmed">
                          {faq.answer}
                        </Text>
                      </Accordion.Panel>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Container>
            </Box>
          )}
        </Transition>
      </Container>
    </Box>
  );
};

export default Contact;