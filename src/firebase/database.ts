/**
 * @copyright © 2025 CodeFusion Bit LLP. All rights reserved.
 * @website https://www.codefusionbit.com
 * @contact info@codefusionbit.com
 * @author Technical Project Manager / Team Lead / Developer: Hitesh Sapra https://fullstack.hiteshsapra.com
 * @github https://github.com/codefusionbitllp
 * @license MIT
 * @file database.ts
 */


import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  type QueryConstraint
} from 'firebase/firestore';
import { db, collections, type CollectionName } from './config';
import {
  PortfolioData,
  Project,
  Experience,
  Education,
  Skill,
  Testimonial,
  ContactForm,
  ApiResponse,
} from '../types';

export class FirestoreService {
  static async getDocument<T>(
    collectionName: CollectionName,
    documentId: string
  ): Promise<T | null> {
    try {
      const docRef = doc(db, collectionName, documentId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as T;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching document:`, error);
      return null;
    }
  }

  static async getDocuments<T>(
    collectionName: CollectionName,
    constraints: QueryConstraint[] = []
  ): Promise<T[]> {
    try {
      let q;
      if (constraints.length > 0) {
        q = query(collection(db, collectionName), ...constraints);
      } else {
        q = collection(db, collectionName);
      }
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
    } catch (error) {
      console.error(`Error fetching documents:`, error);
      return [];
    }
  }

  static async addDocument<T>(
    collectionName: CollectionName,
    data: any
  ): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error) {
      console.error(`Error adding document:`, error);
      throw error;
    }
  }
}

export const PortfolioService = {
  async getPortfolioData(): Promise<PortfolioData | null> {
    try {
      const profile = await FirestoreService.getDocument(collections.PORTFOLIO, collections.PORTFOLIO_PROFILE);
      if (!profile) return null;

      const [projects, experience, education, skills] = await Promise.all([
        this.getProjects(),
        this.getExperience(),
        this.getEducation(),
        this.getSkills(),
      ]);

      return { profile, projects, experience, education, skills } as PortfolioData;
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      return null;
    }
  },

  async getProjects(): Promise<Project[]> {
    return FirestoreService.getDocuments<Project>(collections.PROJECTS, [
      orderBy('createdAt', 'desc')
    ]);
  },

  async getExperience(): Promise<Experience[]> {
    return FirestoreService.getDocuments<Experience>(collections.EXPERIENCE, [
      orderBy('startDate', 'desc')
    ]);
  },

  async getEducation(): Promise<Education[]> {
    return FirestoreService.getDocuments<Education>(collections.EDUCATION, [
      orderBy('startDate', 'desc')
    ]);
  },

  async getSkills(): Promise<Skill[]> {
    return FirestoreService.getDocuments<Skill>(collections.SKILLS);
  },

  async getTestimonials(): Promise<Testimonial[]> {
    return FirestoreService.getDocuments<Testimonial>(collections.TESTIMONIALS, [
      orderBy('date', 'desc')
    ]);
  },

  async submitContactForm(formData: ContactForm): Promise<ApiResponse<string>> {
    try {
      const id = await FirestoreService.addDocument(collections.CONTACTS, formData);
      return {
        success: true,
        data: id,
        message: 'Contact form submitted successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to submit contact form',
      };
    }
  },

  async trackEvent(event: any): Promise<void> {
    try {
      await FirestoreService.addDocument(collections.ANALYTICS, {
        ...event,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
        url: window.location.pathname,
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  },
};

export default PortfolioService;