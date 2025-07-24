/**
 * @copyright © 2025 CodeFusion Bit LLP. All rights reserved.
 * @website https://www.codefusionbit.com
 * @contact info@codefusionbit.com
 * @author Technical Project Manager / Team Lead / Developer: Hitesh Sapra https://fullstack.hiteshsapra.com
 * @github https://github.com/codefusionbitllp
 * @license MIT
 * @file main.tsx
 */



import React from 'react';
import ReactDOM from 'react-dom/client';
import { ColorSchemeScript } from '@mantine/core';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* This script must be added before your app renders to prevent theme flickering */}
    <ColorSchemeScript defaultColorScheme="auto" />
    <App />
  </React.StrictMode>
);