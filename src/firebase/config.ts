/**
 * @copyright © 2025 CodeFusion Bit LLP. All rights reserved.
 * @website https://www.codefusionbit.com
 * @contact info@codefusionbit.com
 * @author Technical Project Manager / Team Lead / Developer: Hitesh Sapra https://fullstack.hiteshsapra.com
 * @github https://github.com/codefusionbitllp
 * @license MIT
 * @file config.ts
 */


import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  connectFirestoreEmulator,
} from 'firebase/firestore'; // Changed from 'firebase/database'
import { 
  getAuth, 
  connectAuthEmulator 
} from 'firebase/auth';
import { 
  getStorage, 
  connectStorageEmulator 
} from 'firebase/storage';
import { 
  getAnalytics,
  isSupported as isAnalyticsSupported 
} from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialize Analytics
let analytics: any = null;
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  isAnalyticsSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    console.log('Analytics not supported');
  });
}

export { analytics };

// Connect to emulators in development
if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_USE_EMULATORS === 'true') {
  try {
    const hostname = window.location.hostname || 'localhost';
    connectFirestoreEmulator(db, hostname, 8080);
    connectAuthEmulator(auth, `http://${hostname}:9099`);
    connectStorageEmulator(storage, hostname, 9199);
  } catch (error) {
    console.log('Emulators already connected');
  }
}

// Export collections
export const collections = {
  PORTFOLIO: 'portfolioWeb',  
  PORTFOLIO_PROFILE: 'profile',
  PROJECTS: 'portfolioWeb/profile/projects',
  EXPERIENCE: 'portfolioWeb/profile/experience',
  EDUCATION: 'portfolioWeb/profile/education',
  SKILLS: 'portfolioWeb/profile/skills',
  TESTIMONIALS: 'testimonials',
  BLOGS: 'blogs',
  CONTACTS: 'contacts',
  ANALYTICS: 'analytics',
} as const;


export type CollectionName = typeof collections[keyof typeof collections];
export default app;