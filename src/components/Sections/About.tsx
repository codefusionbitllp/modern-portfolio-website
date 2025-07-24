/**
 * @copyright © 2025 CodeFusion Bit LLP. All rights reserved.
 * @website https://www.codefusionbit.com
 * @contact info@codefusionbit.com
 * @author Technical Project Manager / Team Lead / Developer: Hitesh Sapra https://fullstack.hiteshsapra.com
 * @github https://github.com/codefusionbitllp
 * @license MIT
 * @file About.tsx
 */


import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Title,
  Text,
  Group,
  Stack,
  Card,
  Progress,
  Badge,
  Timeline,
  Grid,
  Box,
  Transition,
  Center,
  ThemeIcon, Button
} from '@mantine/core';
import {
  IconCode,
  IconDatabase,
  IconDeviceMobile,
  IconWorld,
  IconAward,
  IconCalendar,
  IconTrendingUp,
  IconCoffee,
} from '@tabler/icons-react';
import { Skill, Experience, Education, PersonalInfo } from '../../types';

interface AboutProps {
  skills: Skill[];
  experience: Experience[];
  education?: Education[];
  personalInfo?: PersonalInfo;
}

const About: React.FC<AboutProps> = ({
  skills,
  experience,
  education,
  personalInfo = {
    yearsOfExperience: 5,
    projectsCompleted: 50,
    happyClients: 30,
    coffeeCups: 1000
  }
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    yearsOfExperience: 0,
    projectsCompleted: 0,
    happyClients: 0,
    coffeeCups: 0
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  // Add this state inside your About component (after the existing useState declarations)
  const [expandedAchievements, setExpandedAchievements] = useState<{ [key: string]: boolean }>({});

  // Function to toggle achievements visibility
  const toggleAchievements = (expId: string) => {
    setExpandedAchievements(prev => ({
      ...prev,
      [expId]: !prev[expId]
    }));
  };

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

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setCounters({
          yearsOfExperience: Math.floor(personalInfo.yearsOfExperience * progress),
          projectsCompleted: Math.floor(personalInfo.projectsCompleted * progress),
          happyClients: Math.floor(personalInfo.happyClients * progress),
          coffeeCups: Math.floor(personalInfo.coffeeCups * progress),
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setCounters(personalInfo);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
    return undefined;
  }, [isVisible, personalInfo]);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'frontend':
      case 'front-end':
        return IconWorld;
      case 'backend':
      case 'back-end':
        return IconDatabase;
      case 'mobile':
        return IconDeviceMobile;
      case 'tools':
      case 'devops':
        return IconCode;
      default:
        return IconCode;
    }
  };

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'expert': return 'green';
      case 'advanced': return 'blue';
      case 'intermediate': return 'yellow';
      case 'beginner': return 'gray';
      default: return 'blue';
    }
  };

  const getSkillLevelValue = (level: string) => {
    switch (level) {
      case 'expert': return 95;
      case 'advanced': return 80;
      case 'intermediate': return 60;
      case 'beginner': return 40;
      default: return 60;
    }
  };

  const statsData = [
    { icon: IconCalendar, value: counters.yearsOfExperience, label: 'Years Experience', color: 'blue' },
    { icon: IconTrendingUp, value: counters.projectsCompleted, label: 'Projects Completed', color: 'violet' },
    { icon: IconAward, value: counters.happyClients, label: 'Happy Clients', color: 'green' },
    { icon: IconCoffee, value: counters.coffeeCups, label: 'Cups of Coffee', color: 'orange' },
  ];

  return (
    <Box
      component="section"
      id="about"
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
              About Me
            </Title>
            <Text size="xl" c="dimmed" ta="center" maw={600}>
              Passionate developer with a love for creating innovative digital solutions
            </Text>
          </Stack>
        </Center>

        {/* Stats Grid */}
        <Transition mounted={isVisible} transition="fade-up" duration={1000}>
          {(styles) => (
            <Grid mb={60} style={styles}>
              {statsData.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Grid.Col key={index} span={{ base: 6, md: 3 }}>
                    <Card
                      padding="xl"
                      shadow="sm"
                      withBorder
                      style={{
                        transition: 'all 0.3s ease',
                        textAlign: 'center',
                        height: '100%',
                        backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-6))',
                        borderColor: 'light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
                      }}
                      styles={{
                        root: {
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: 'var(--mantine-shadow-lg)',
                            borderColor: 'light-dark(var(--mantine-color-gray-4), var(--mantine-color-dark-3))',
                          }
                        }
                      }}
                    >
                      <Center mb="md">
                        <ThemeIcon size={64} color={stat.color} variant="light">
                          <Icon size={32} />
                        </ThemeIcon>
                      </Center>
                      <Text
                        size="3rem"
                        fw={700}
                        mb="xs"
                        c="light-dark(var(--mantine-color-gray-9), var(--mantine-color-white))"
                      >
                        {stat.value}+
                      </Text>
                      <Text size="sm" c="dimmed">
                        {stat.label}
                      </Text>
                    </Card>
                  </Grid.Col>
                );
              })}
            </Grid>
          )}
        </Transition>

        <Grid>
          {/* Experience & Education Section */}
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Transition mounted={isVisible} transition="slide-left" duration={1000} timingFunction="ease">
              {(styles) => (
                <Stack gap="xl" style={styles}>
                  {/* Education */}
                  {education && education.length > 0 && (
                    <>
                      <Group gap="md">
                        <ThemeIcon size={40} color="cyan">
                          <IconAward size={24} />
                        </ThemeIcon>
                        <Title order={3} c="cyan">
                          Education
                        </Title>
                      </Group>

                      <Stack gap="md">
                        {education.map((edu) => (
                          <Card
                            key={edu.id}
                            padding="lg"
                            withBorder
                            style={{
                              backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-6))',
                              borderColor: 'light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
                            }}
                          >
                            <Group justify="space-between" align="flex-start" mb="xs">
                              <Title
                                order={4}
                                size="lg"
                                c="light-dark(var(--mantine-color-gray-9), var(--mantine-color-white))"
                              >
                                {edu.degree} in {edu.field}
                              </Title>
                              <Text size="sm" c="dimmed">
                                {edu.duration}
                              </Text>
                            </Group>

                            <Text c="cyan" fw={500} mb="xs">
                              {edu.institution}
                            </Text>

                            {edu.gpa && (
                              <Text
                                size="sm"
                                c="light-dark(var(--mantine-color-gray-7), var(--mantine-color-gray-3))"
                              >
                                GPA: {edu.gpa}
                              </Text>
                            )}
                          </Card>
                        ))}
                      </Stack>
                    </>
                  )}
                  
                  {/* Experience */}
                  <Group gap="md" mt={education && education.length > 0 ? "xl" : 0}>
                    <ThemeIcon size={40} color="violet">
                      <IconAward size={24} />
                    </ThemeIcon>
                    <Title order={3} c="violet">
                      Experience
                    </Title>
                  </Group>

                  <Timeline active={experience.length} bulletSize={24} lineWidth={2} color="violet">
                    {experience.map((exp) => (
                      <Timeline.Item key={exp.id} bullet={<IconAward size={12} />}>
                        <Card
                          padding="lg"
                          withBorder
                          style={{
                            backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-6))',
                            borderColor: 'light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
                          }}
                        >
                          <Group justify="space-between" align="flex-start" mb="xs">
                            <Title
                              order={4}
                              size="lg"
                              c="light-dark(var(--mantine-color-gray-9), var(--mantine-color-white))"
                            >
                              {exp.position}
                            </Title>
                            <Text size="sm" c="dimmed">
                              {exp.duration}
                            </Text>
                          </Group>

                          <Text c="violet" fw={500} mb="md">
                            {exp.company}
                          </Text>

                          <Text
                            mb="md"
                            style={{ lineHeight: 1.6 }}
                            c="light-dark(var(--mantine-color-gray-7), var(--mantine-color-gray-3))"
                          >
                            {exp.description}
                          </Text>

                          <Group gap="xs" mb="md" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            {exp.achievements && exp.achievements.length > 0 && (
                              <>
                                <Group gap="xs" align="center" style={{ width: '100%' }}>
                                  <Text size="sm" c="dimmed">
                                    Activity and Responsibility:
                                  </Text>
                                </Group>
                                <Box>
                                  <ul style={{
                                    margin: 0,
                                    paddingLeft: '16px',
                                    color: 'var(--mantine-color-gray-6)'
                                  }}>
                                    {(expandedAchievements[exp.id] ? exp.achievements : exp.achievements.slice(0, 2))
                                      .map((achievement, index) => (
                                        <li key={index} style={{
                                          marginBottom: '4px',
                                          fontSize: '14px',
                                          lineHeight: 1.5
                                        }}>
                                          {achievement}
                                        </li>
                                      ))}
                                  </ul>
                                  {exp.achievements.length > 2 && (
                                    <Button
                                      variant="subtle"
                                      size="xs"
                                      onClick={() => toggleAchievements(exp.id)}
                                      style={{ marginLeft: 'auto' }}
                                    >
                                      {expandedAchievements[exp.id] ? 'Show Less' : `${exp.achievements.length - 2} Show More`}
                                    </Button>
                                  )}
                                </Box>
                              </>
                            )}
                          </Group>

                          {exp.technologies && exp.technologies.length > 0 && (
                            <Group gap="xs">
                              {exp.technologies.map((tech, techIndex) => (
                                <Badge
                                  key={techIndex}
                                  size="sm"
                                  variant="light"
                                  color="gray"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </Group>
                          )}
                        </Card>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </Stack>
              )}
            </Transition>
          </Grid.Col>
          
          {/* Skills Section */}
          <Grid.Col span={{ base: 12, lg: 6 }}>
            <Transition mounted={isVisible} transition="slide-right" duration={1000} timingFunction="ease">
              {(styles) => (
                <Stack gap="xl" style={styles}>
                  <Group gap="md">
                    <ThemeIcon size={40} color="blue">
                      <IconCode size={24} />
                    </ThemeIcon>
                    <Title order={3} c="blue">
                      Skills & Technologies
                    </Title>
                  </Group>

                  <Stack gap="xl">
                    {skills.map((skillGroup, index) => {
                      const IconComponent = getCategoryIcon(skillGroup.category);
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
                          <Group gap="md" mb="md">
                            <ThemeIcon size={32} color="blue" variant="light">
                              <IconComponent size={20} />
                            </ThemeIcon>
                            <Title
                              order={4}
                              c="light-dark(var(--mantine-color-gray-9), var(--mantine-color-white))"
                            >
                              {skillGroup.category}
                            </Title>
                          </Group>

                          <Stack gap="md">
                            {skillGroup.items.map((skill, skillIndex) => (
                              <Box key={skillIndex}>
                                <Group justify="space-between" mb="xs">
                                  <Text
                                    fw={500}
                                    c="light-dark(var(--mantine-color-gray-8), var(--mantine-color-gray-2))"
                                  >
                                    {typeof skill === 'string' ? skill : skill.name}
                                  </Text>
                                  {typeof skill !== 'string' && skill.level && (
                                    <Badge
                                      size="sm"
                                      color={getSkillLevelColor(skill.level)}
                                      variant="light"
                                    >
                                      {skill.level}
                                    </Badge>
                                  )}
                                </Group>

                                {typeof skill !== 'string' && skill.level && (
                                  <Progress
                                    value={isVisible ? getSkillLevelValue(skill.level) : 0}
                                    color={getSkillLevelColor(skill.level)}
                                    size="sm"
                                    animated
                                    style={{
                                      transition: 'all 1s ease',
                                      transitionDelay: `${300 + skillIndex * 100}ms`
                                    }}
                                  />
                                )}
                              </Box>
                            ))}
                          </Stack>
                        </Card>
                      );
                    })}
                  </Stack>
                </Stack>
              )}
            </Transition>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;