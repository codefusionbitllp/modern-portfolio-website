/**
 * @copyright © 2025 CodeFusion Bit LLP. All rights reserved.
 * @website https://www.codefusionbit.com
 * @contact info@codefusionbit.com
 * @author Technical Project Manager / Team Lead / Developer: Hitesh Sapra https://fullstack.hiteshsapra.com
 * @github https://github.com/codefusionbitllp
 * @license MIT
 * @file index.ts
 */


// Firebase Timestamp type
export interface FirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
}

// Profile Interface
export interface Profile {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  github: string;
  linkedin: string;
  x?: string;
  instagram?: string;
  avatar: string;
  resume?: string;
  location?: string;
  availableForWork: boolean;
  personalInfo?: PersonalInfo;
}

// Project Interface
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  image: string;
  images?: string[];
  liveUrl?: string;
  iosUrl?: string;
  androidUrl?: string;
  featured: boolean;
  category: 'web' | 'mobile' | 'desktop' | 'fullstack' | 'frontend' | 'backend' | 'other';
  status: 'completed' | 'in-progress' | 'planned';
  createdAt: Date | FirebaseTimestamp;
  updatedAt?: Date | FirebaseTimestamp;
  challenges?: string[];
  learnings?: string[];
  duration?: string;
  teamSize?: number;
  role?: string;
}

export interface PersonalInfo {
    coffeeCups: number;
    happyClients: number;
    projectsCompleted: number;
    yearsOfExperience: number;
}

// Skill Interface
export interface Skill {
  category: string;
  items: SkillItem[];
}

export interface SkillItem {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  years?: number;
  icon?: string;
}

// Experience Interface
export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  startDate: Date | FirebaseTimestamp;
  endDate?: Date | FirebaseTimestamp;
  description: string;
  achievements?: string[];
  technologies?: string[];
  location?: string;
  companyUrl?: string;
  logo?: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
}

// Education Interface
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  startDate: Date | FirebaseTimestamp;
  endDate?: Date | FirebaseTimestamp;
  gpa?: string;
  achievements?: string[];
  courses?: string[];
}

// Testimonial Interface
export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
  date: Date | FirebaseTimestamp;
  featured: boolean;
}

// Blog Post Interface
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  tags: string[];
  category: string;
  published: boolean;
  publishedAt?: Date | FirebaseTimestamp;
  createdAt: Date | FirebaseTimestamp;
  updatedAt?: Date | FirebaseTimestamp;
  readTime?: number;
  views?: number;
}

// Contact Form Interface
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  budget?: string;
  timeline?: string;
}

// Portfolio Data Interface
export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  education?: Education[];
  testimonials?: Testimonial[];
  blogs?: BlogPost[];
}

// Navigation Interface
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

// Social Links Interface
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username?: string;
}


// API Response Interface
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

