/**
 * @copyright © 2025 CodeFusion Bit LLP. All rights reserved.
 * @website https://www.codefusionbit.com
 * @contact info@codefusionbit.com
 * @author Technical Project Manager / Team Lead / Developer: Hitesh Sapra https://fullstack.hiteshsapra.com
 * @github https://github.com/codefusionbitllp
 * @license MIT
 * @file Projects.tsx
 */


import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Title,
  Text,
  Group,
  Stack,
  Card,
  Badge,
  Button,
  Grid,
  Box,
  Transition,
  Center,
  ActionIcon,
  Modal,
  Image,
  Paper,
  ThemeIcon,
  SimpleGrid,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import {
  IconExternalLink,
  IconBrandAndroid,
  IconBrandApple,
  IconUsers,
  IconCode,
  IconRocket,
  IconTarget,
  IconBulb,
  IconX,
} from '@tabler/icons-react';
import { Project } from '../../types';

interface ProjectsProps {
  projects: Project[];
  showFeaturedOnly?: boolean;
  maxProjects?: number;
}

const Projects: React.FC<ProjectsProps> = ({
  projects,
  showFeaturedOnly = false,
  maxProjects
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const categories = ['all', ...Array.from(new Set(projects.map(project => project.category)))];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let filtered = showFeaturedOnly
      ? projects.filter(project => project.featured)
      : projects;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    if (maxProjects) {
      filtered = filtered.slice(0, maxProjects);
    }

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, showFeaturedOnly, maxProjects]);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setModalOpened(true);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    setModalOpened(false);
  };


  return (
    <Box
      component="section"
      id="projects"
      py={100}
      ref={sectionRef}
      style={{
        background: 'linear-gradient(135deg, light-dark(#f8fafc, #0f172a) 0%, light-dark(#e2e8f0, #1e293b) 100%)',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <Container size="xl" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Center mb={80}>
          <Stack align="center" gap="xl">
            <Title
              order={1}
              size="4rem"
              ta="center"
              fw={900}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {showFeaturedOnly ? 'Featured' : 'My'} Projects
            </Title>
            <Text size="xl" c="dimmed" ta="center" maw={700}>
              A curated showcase of innovative solutions and creative implementations
            </Text>
          </Stack>
        </Center>

        {/* Category Filter */}
        {!showFeaturedOnly && (
          <Transition mounted={isVisible} transition="slide-up" duration={800}>
            {(styles) => (
              <Center mb={80} style={styles}>
                <Paper p="sm" radius="xl" style={{ backdropFilter: 'blur(20px)' }}>
                  <Group gap="xs">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? 'gradient' : 'subtle'}
                        gradient={selectedCategory === category ? { from: 'blue', to: 'violet' } : undefined}
                        onClick={() => setSelectedCategory(category)}
                        radius="xl"
                        size="md"
                        style={{ textTransform: 'capitalize' }}
                      >
                        {category === 'all' ? 'All Projects' : category}
                      </Button>
                    ))}
                  </Group>
                </Paper>
              </Center>
            )}
          </Transition>
        )}

        {/* Projects Grid */}
        <Transition mounted={isVisible} transition="fade-up" duration={1000}>
          {(styles) => (
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl" style={styles}>
              {filteredProjects.map((project, index) => (
                <Card
                  key={project.id}
                  padding={0}
                  radius="xl"
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.4s ease',
                    height: '100%',
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        transform: 'translateY(-12px) scale(1.02)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                      }
                    }
                  }}
                  onClick={() => openProjectModal(project)}
                >
                  <Card.Section pos="relative">
                    <Image src={project.image} alt={project.title} height={240} fit="cover" />

                    <Box
                      className="project-overlay"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(139, 92, 246, 0.9))',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Group gap="lg">
                        {project.liveUrl && (
                          <ActionIcon
                            component="a"
                            href={project.liveUrl}
                            target="_blank"
                            size="xl"
                            radius="xl"
                            variant="filled"
                            color="white"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <IconExternalLink size={20} />
                          </ActionIcon>
                        )}
                        {selectedProject?.androidUrl?.trim() && (
                          <ActionIcon
                            component="a"
                            href={project.androidUrl}
                            target="_blank"
                            size="xl"
                            radius="xl"
                            variant="filled"
                            color="white"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <IconBrandAndroid size={20} />
                          </ActionIcon>
                        )}
                        {selectedProject?.iosUrl?.trim() && (
                          <ActionIcon
                            component="a"
                            href={project.iosUrl}
                            target="_blank"
                            size="xl"
                            radius="xl"
                            variant="filled"
                            color="white"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <IconBrandApple size={20} />
                          </ActionIcon>
                        )}
                      </Group>
                    </Box>

                  </Card.Section>

                  <Stack gap="lg" p="xl">
                    <Title order={3} lineClamp={2} fw={700}>
                      {project.title}
                    </Title>
                    <Text c="dimmed" lineClamp={3} size="sm">
                      {project.description}
                    </Text>

                    <Group justify="space-between">
                      {project.teamSize && (
                        <Group gap="xs">
                          <ThemeIcon size="sm" variant="light" color="blue" radius="xl">
                            <IconUsers size={12} />
                          </ThemeIcon>
                          <Text size="xs" c="dimmed">
                            {project.teamSize} {project.teamSize === 1 ? 'person' : 'people'}
                          </Text>
                        </Group>
                      )}
                    </Group>

                    <Group gap="xs">
                      {project.tech.slice(0, 3).map((tech, techIndex) => (
                        <Badge key={techIndex} size="sm" variant="light">
                          {tech}
                        </Badge>
                      ))}
                      {project.tech.length > 3 && (
                        <Badge size="sm" variant="outline">
                          +{project.tech.length - 3}
                        </Badge>
                      )}
                    </Group>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          )}
        </Transition>

        {filteredProjects.length === 0 && (
          <Center py={100}>
            <Stack align="center" gap="lg">
              <ThemeIcon size={80} radius="xl" variant="light" color="gray">
                <IconTarget size={40} />
              </ThemeIcon>
              <Title order={3} c="dimmed">No projects found</Title>
              <Text size="lg" c="dimmed" ta="center">
                Try selecting a different category to see more projects.
              </Text>
            </Stack>
          </Center>
        )}
      </Container>

      {/* Project Modal */}
      <Modal
        opened={modalOpened}
        onClose={closeProjectModal}
        size="lg"
        radius="2xl"
        centered
        zIndex={10000}
        withCloseButton={false}
        overlayProps={{ backgroundOpacity: 0.7, blur: 20 }}
        styles={{
          content: {
            background: 'light-dark(rgba(255, 255, 255, 0.98), rgba(15, 23, 42, 0.98))',
            backdropFilter: 'blur(30px)',
            maxHeight: '90vh',
            overflow: 'hidden',
          },
          body: { padding: 0, height: '100%', overflow: 'hidden' },
        }}
      >
        {selectedProject && (
          <Box style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <Box p="lg" style={{ borderBottom: '1px solid light-dark(rgba(226, 232, 240, 0.3), rgba(51, 65, 85, 0.3))' }}>
              <Group justify="space-between" align="center">
                <Group gap="md">
                  <Box
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconRocket size={20} color="white" />
                  </Box>
                  <Stack gap="xs">
                    <Title order={3} fw={800}>
                      {selectedProject.title}
                    </Title>
                    <Group gap="sm">
                      <Badge variant="light" color="violet" style={{ textTransform: 'capitalize' }}>
                        {selectedProject.category}
                      </Badge>
                    </Group>
                  </Stack>
                </Group>

                <ActionIcon size="lg" radius="xl" variant="subtle" onClick={closeProjectModal}>
                  <IconX size={18} />
                </ActionIcon>
              </Group>
            </Box>

            {/* Content */}
            <Box
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1.5rem',
                maxHeight: 'calc(90vh - 120px)',
              }}
            >
              <Stack gap="lg">
                {/* Image */}
                <Box style={{ borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
                  {selectedProject.images && selectedProject.images.length > 1 ? (
                    <Carousel withIndicators height={300}>
                      {selectedProject.images.map((image, index) => (
                        <Carousel.Slide key={index}>
                          <Image src={image} alt={`${selectedProject.title} ${index + 1}`} height={300} fit="cover" />
                        </Carousel.Slide>
                      ))}
                    </Carousel>
                  ) : (
                    <Image src={selectedProject.image} alt={selectedProject.title} height={300} fit="cover" />
                  )}

                  <Group gap="sm" style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
                    {selectedProject?.liveUrl?.trim() && (
                      <Button
                        component="a"
                        href={selectedProject.liveUrl}
                        target="_blank"
                        leftSection={<IconExternalLink size={16} />}
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'cyan' }}
                        size="md"
                        radius="lg"
                      >
                        Web
                      </Button>
                    )}
                    {selectedProject?.androidUrl?.trim() && (
                      <Button
                        component="a"
                        href={selectedProject.androidUrl}
                        target="_blank"
                        leftSection={<IconBrandAndroid size={16} />}
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'cyan' }}
                        size="md"
                        radius="lg"
                      >
                        Android
                      </Button>
                    )}
                    {selectedProject?.iosUrl?.trim() && (
                      <Button
                        component="a"
                        href={selectedProject.iosUrl}
                        target="_blank"
                        leftSection={<IconBrandApple size={16} />}
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'cyan' }}
                        size="md"
                        radius="lg"
                      >
                        iOS
                      </Button>
                    )}
                  </Group>

                </Box>

                {/* Details Grid */}
                <Grid gutter="lg">
                  <Grid.Col span={{ base: 12, lg: 8 }}>
                    <Stack gap="lg">
                      <Paper p="lg" radius="lg">
                        <Group mb="lg">
                          <ThemeIcon size="lg" variant="gradient" gradient={{ from: 'blue', to: 'violet' }}>
                            <IconBulb size={20} />
                          </ThemeIcon>
                          <Title order={4}>Project Overview</Title>
                        </Group>
                        <Text size="md" c="dimmed" style={{ lineHeight: 1.7 }}>
                          {selectedProject.description}
                        </Text>
                      </Paper>

                      {/* Challenges & Learnings */}
                      {(selectedProject.challenges?.length || selectedProject.learnings?.length) && (
                        <Stack gap="lg">
                          {selectedProject.challenges && selectedProject.challenges.length > 0 && (
                            <Paper p="lg" radius="lg" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                              <Group mb="lg">
                                <ThemeIcon size="md" color="red" variant="light">
                                  <IconTarget size={16} />
                                </ThemeIcon>
                                <Title order={5} c="red">Challenges</Title>
                              </Group>
                              <Stack gap="sm">
                                {selectedProject.challenges.map((challenge, index) => (
                                  <Text key={index} size="sm" c="dimmed">• {challenge}</Text>
                                ))}
                              </Stack>
                            </Paper>
                          )}

                          {selectedProject.learnings && selectedProject.learnings.length > 0 && (
                            <Paper p="lg" radius="lg" style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                              <Group mb="lg">
                                <ThemeIcon size="md" color="teal" variant="light">
                                  <IconBulb size={16} />
                                </ThemeIcon>
                                <Title order={5} c="teal">Key Learnings</Title>
                              </Group>
                              <Stack gap="sm">
                                {selectedProject.learnings.map((learning, index) => (
                                  <Text key={index} size="sm" c="dimmed">• {learning}</Text>
                                ))}
                              </Stack>
                            </Paper>
                          )}
                        </Stack>
                      )}
                    </Stack>
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, lg: 4 }}>
                    <Stack gap="lg">
                      {/* Details */}
                      <Paper p="lg" radius="lg">
                        <Title order={5} mb="lg">Project Details</Title>
                        <Stack gap="md">
                          {selectedProject.role && (
                            <Group justify="space-between">
                              <Text c="dimmed">My Role:</Text>
                              <Text fw={600}>{selectedProject.role}</Text>
                            </Group>
                          )}
                          {selectedProject.teamSize && (
                            <Group justify="space-between">
                              <Text c="dimmed">Team Size:</Text>
                              <Text fw={600}>{selectedProject.teamSize} {selectedProject.teamSize === 1 ? 'person' : 'people'}</Text>
                            </Group>
                          )}
                        </Stack>
                      </Paper>

                      {/* Tech Stack */}
                      <Paper p="lg" radius="lg" style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                        <Group mb="lg">
                          <ThemeIcon size="md" color="blue" variant="light">
                            <IconCode size={16} />
                          </ThemeIcon>
                          <Title order={5} c="blue">Technologies</Title>
                        </Group>
                        <Group gap="xs">
                          {selectedProject.tech.map((tech, index) => (
                            <Badge key={index} variant="light" color="blue">
                              {tech}
                            </Badge>
                          ))}
                        </Group>
                      </Paper>
                    </Stack>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Box>
          </Box>
        )}
      </Modal>

      <style>
        {`
          .project-overlay:hover {
            opacity: 1 !important;
          }
          
          @media (max-width: 768px) {
            [data-mantine-modal-content] {
              width: 100vw !important;
              max-width: 100vw !important;
              margin: 0 !important;
              border-radius: 0 !important;
              max-height: 100vh !important;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default Projects;