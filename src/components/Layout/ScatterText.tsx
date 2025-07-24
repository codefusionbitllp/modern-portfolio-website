/**
 * @copyright © 2025 CodeFusion Bit LLP. All rights reserved.
 * @website https://www.codefusionbit.com
 * @contact info@codefusionbit.com
 * @author Technical Project Manager / Team Lead / Developer: Hitesh Sapra https://fullstack.hiteshsapra.com
 * @github https://github.com/codefusionbitllp
 * @license MIT
 * @file ScatterText.tsx
 */


import React, { useEffect, useRef } from 'react';

// Motion imports for scatter text animation
import { animate } from "motion";
import { useMotionValue } from "motion/react";

interface ScatterTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
  enableMobileTouch?: boolean;
  resetOnScroll?: boolean;
  scatterDistance?: number;
  springStiffness?: number;
  springDamping?: number;
}

const ScatterText: React.FC<ScatterTextProps> = ({ 
  children, 
  className,
  style,
  enableMobileTouch = true,
  resetOnScroll = true,
  scatterDistance = 0.3,
  springStiffness = 100,
  springDamping = 50
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const velocityX = useMotionValue(0);
  const velocityY = useMotionValue(0);
  const prevEvent = useRef(0);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Manual text splitting to preserve gradient
    const titleElement = containerRef.current.querySelector(".scatter-title") as HTMLElement;
    if (!titleElement) return;

    const text = titleElement.textContent || '';
    const chars = text.split('').map((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.className = 'split-char';
      span.style.display = 'inline-block';
      span.style.willChange = 'transform';
      span.style.cursor = 'pointer';
      // Keep the gradient on individual characters
      span.style.background = 'linear-gradient(45deg, var(--mantine-color-blue-6), var(--mantine-color-cyan-6))';
      span.style.webkitBackgroundClip = 'text';
      span.style.webkitTextFillColor = 'transparent';
      span.style.backgroundClip = 'text';
      return span;
    });

    charsRef.current = chars;
    titleElement.innerHTML = '';
    chars.forEach(char => titleElement.appendChild(char));
    
    const handlePointerMove = (event: PointerEvent) => {
      const now = performance.now();
      const timeSinceLastEvent = (now - prevEvent.current) / 1000;
      prevEvent.current = now;
      velocityX.set(event.movementX / timeSinceLastEvent);
      velocityY.set(event.movementY / timeSinceLastEvent);
    };

    // Reset characters to original position on scroll - IMMEDIATE
    const handleScroll = () => {
      if (!resetOnScroll) return;
      charsRef.current.forEach(char => {
        animate(
          char,
          {
            x: 0,
            y: 0,
          },
          { 
            type: "spring", 
            stiffness: 200, 
            damping: 30,
            duration: 0.01 // Instant reset
          }
        );
      });
    };

    // Function to calculate scatter distance without bounds - move anywhere!
    const calculateScatterDistance = (speed: number) => {
      // No bounds checking - characters can move anywhere
      const calculatedDistance = speed * scatterDistance;
      return Math.max(calculatedDistance, 30); // Just minimum 30px movement
    };

    // Scatter animation function - unlimited movement
    const scatterChar = (char: HTMLSpanElement) => {
      const speed = Math.sqrt(
        velocityX.get() * velocityX.get() +
        velocityY.get() * velocityY.get()
      );
      const angle = Math.atan2(velocityY.get(), velocityX.get());
      const distance = calculateScatterDistance(speed);

      animate(
        char,
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        },
        { type: "spring", stiffness: springStiffness, damping: springDamping }
      );
    };

    // Random scatter for mobile/touch devices - unlimited movement
    const randomScatter = (char: HTMLSpanElement) => {
      // Generate random angle
      const randomAngle = Math.random() * 2 * Math.PI;
      
      // Random distance between 50px and 300px - no bounds checking
      const randomDistance = 50 + Math.random() * 250;
      
      animate(
        char,
        {
          x: Math.cos(randomAngle) * randomDistance,
          y: Math.sin(randomAngle) * randomDistance,
        },
       { type: "spring", stiffness: 100, damping: 50 }
      );
    };

    document.addEventListener("pointermove", handlePointerMove);
    if (resetOnScroll) {
      window.addEventListener("scroll", handleScroll);
    }

    // Add interaction events to each character
    chars.forEach(char => {
      // Desktop hover effect - unlimited movement
      char.addEventListener('mouseenter', () => scatterChar(char));
      
      // Mobile touch events (if enabled)
      if (enableMobileTouch) {
        char.addEventListener('touchstart', (e) => {
          e.preventDefault(); // Prevent default touch behavior
          randomScatter(char);
        });
        
        // Click event for both desktop and mobile
        char.addEventListener('click', (e) => {
          e.preventDefault();
          randomScatter(char);
        });
      }
    });

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      if (resetOnScroll) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [children, resetOnScroll, scatterDistance, springStiffness, springDamping, enableMobileTouch, velocityX, velocityY]);

  return (
    <div className={className} style={style} ref={containerRef}>
      <h1 className="scatter-title" style={{ margin: 0 }}>{children}</h1>
      <ScatterStylesheet />
    </div>
  );
};

function ScatterStylesheet() {
  return (
    <style>{`
      .split-char {
        will-change: transform;
        display: inline-block;
        cursor: pointer;
        transition: opacity 0.2s ease;
      }
      
      .split-char:hover {
        opacity: 0.8;
      }
      
      @media (max-width: 768px) {
        .split-char {
          cursor: default;
        }
      }
    `}</style>
  );
}

export default ScatterText;