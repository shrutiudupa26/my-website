'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FloatingElements = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Create an array of elements with different properties and shapes
  const elements = [
    // Row 1 (0% from top)
    { shape: 'sparkle4', size: 35, color: 'var(--color-primary)', opacity: 0.22, speed: 15, left: 5, top: 0, rotate: 15 },
    { shape: 'sparkle4', size: 40, color: 'var(--color-secondary)', opacity: 0.2, speed: 18, left: 17, top: 0, rotate: 30 },
    { shape: 'sparkle4', size: 38, color: 'var(--color-dark)', opacity: 0.21, speed: 20, left: 29, top: 0, rotate: 45 },
    { shape: 'sparkle4', size: 42, color: 'var(--color-accent)', opacity: 0.23, speed: 17, left: 41, top: 0, rotate: 20 },
    { shape: 'sparkle4', size: 36, color: 'var(--color-primary)', opacity: 0.2, speed: 22, left: 53, top: 0, rotate: 35 },
    { shape: 'sparkle4', size: 40, color: 'var(--color-secondary)', opacity: 0.21, speed: 19, left: 65, top: 0, rotate: 25 },
    { shape: 'sparkle4', size: 35, color: 'var(--color-dark)', opacity: 0.22, speed: 21, left: 77, top: 0, rotate: 40 },
    { shape: 'sparkle4', size: 38, color: 'var(--color-accent)', opacity: 0.2, speed: 16, left: 89, top: 0, rotate: 15 },

    // Row 2 (12.5% from top)
    { shape: 'sparkle4', size: 40, color: 'var(--color-accent)', opacity: 0.21, speed: 18, left: 5, top: 12.5, rotate: 25 },
    { shape: 'sparkle4', size: 35, color: 'var(--color-primary)', opacity: 0.2, speed: 20, left: 17, top: 12.5, rotate: 35 },
    { shape: 'sparkle4', size: 42, color: 'var(--color-secondary)', opacity: 0.22, speed: 17, left: 29, top: 12.5, rotate: 15 },
    { shape: 'sparkle4', size: 38, color: 'var(--color-dark)', opacity: 0.21, speed: 19, left: 41, top: 12.5, rotate: 30 },
    { shape: 'sparkle4', size: 40, color: 'var(--color-accent)', opacity: 0.23, speed: 16, left: 53, top: 12.5, rotate: 45 },
    { shape: 'sparkle4', size: 36, color: 'var(--color-primary)', opacity: 0.2, speed: 21, left: 65, top: 12.5, rotate: 20 },
    { shape: 'sparkle4', size: 42, color: 'var(--color-secondary)', opacity: 0.22, speed: 18, left: 77, top: 12.5, rotate: 35 },
    { shape: 'sparkle4', size: 35, color: 'var(--color-dark)', opacity: 0.21, speed: 20, left: 89, top: 12.5, rotate: 25 },

    // Row 3 (25% from top)
    { shape: 'sparkle4', size: 38, color: 'var(--color-dark)', opacity: 0.22, speed: 19, left: 5, top: 25, rotate: 30 },
    { shape: 'sparkle4', size: 40, color: 'var(--color-accent)', opacity: 0.21, speed: 17, left: 17, top: 25, rotate: 20 },
    { shape: 'sparkle4', size: 35, color: 'var(--color-primary)', opacity: 0.2, speed: 21, left: 29, top: 25, rotate: 40 },
    { shape: 'sparkle4', size: 42, color: 'var(--color-secondary)', opacity: 0.23, speed: 18, left: 41, top: 25, rotate: 15 },
    { shape: 'sparkle4', size: 38, color: 'var(--color-dark)', opacity: 0.21, speed: 20, left: 53, top: 25, rotate: 35 },
    { shape: 'sparkle4', size: 40, color: 'var(--color-accent)', opacity: 0.22, speed: 16, left: 65, top: 25, rotate: 25 },
    { shape: 'sparkle4', size: 36, color: 'var(--color-primary)', opacity: 0.2, speed: 19, left: 77, top: 25, rotate: 45 },
    { shape: 'sparkle4', size: 42, color: 'var(--color-secondary)', opacity: 0.21, speed: 17, left: 89, top: 25, rotate: 30 },

    // Row 4 (37.5% from top)
    { shape: 'sparkle4', size: 35, color: 'var(--color-secondary)', opacity: 0.21, speed: 20, left: 5, top: 37.5, rotate: 35 },
    { shape: 'sparkle4', size: 38, color: 'var(--color-dark)', opacity: 0.22, speed: 18, left: 17, top: 37.5, rotate: 25 },
    { shape: 'sparkle4', size: 40, color: 'var(--color-accent)', opacity: 0.2, speed: 21, left: 29, top: 37.5, rotate: 15 },
    { shape: 'sparkle4', size: 35, color: 'var(--color-primary)', opacity: 0.23, speed: 17, left: 41, top: 37.5, rotate: 40 },
    { shape: 'sparkle4', size: 42, color: 'var(--color-secondary)', opacity: 0.21, speed: 19, left: 53, top: 37.5, rotate: 20 },
    { shape: 'sparkle4', size: 38, color: 'var(--color-dark)', opacity: 0.22, speed: 16, left: 65, top: 37.5, rotate: 35 },
    { shape: 'sparkle4', size: 40, color: 'var(--color-accent)', opacity: 0.2, speed: 20, left: 77, top: 37.5, rotate: 30 },
    { shape: 'sparkle4', size: 36, color: 'var(--color-primary)', opacity: 0.21, speed: 18, left: 89, top: 37.5, rotate: 45 },

    // Row 5 (50% from top)
    { shape: 'sparkle4', size: 42, color: 'var(--color-primary)', opacity: 0.22, speed: 17, left: 5, top: 50, rotate: 20 },
    { shape: 'sparkle4', size: 35, color: 'var(--color-secondary)', opacity: 0.21, speed: 19, left: 17, top: 50, rotate: 40 },
    { shape: 'sparkle4', size: 38, color: 'var(--color-dark)', opacity: 0.2, speed: 21, left: 29, top: 50, rotate: 25 },
    { shape: 'sparkle4', size: 40, color: 'var(--color-accent)', opacity: 0.23, speed: 18, left: 41, top: 50, rotate: 35 },
    { shape: 'sparkle4', size: 35, color: 'var(--color-primary)', opacity: 0.21, speed: 20, left: 53, top: 50, rotate: 15 },
    { shape: 'sparkle4', size: 42, color: 'var(--color-secondary)', opacity: 0.22, speed: 16, left: 65, top: 50, rotate: 45 },
    { shape: 'sparkle4', size: 38, color: 'var(--color-dark)', opacity: 0.2, speed: 19, left: 77, top: 50, rotate: 30 },
    { shape: 'sparkle4', size: 40, color: 'var(--color-accent)', opacity: 0.21, speed: 17, left: 89, top: 50, rotate: 20 },

    // Row 6 (62.5% from top)
    { shape: 'sparkle4', size: 36, color: 'var(--color-accent)', opacity: 0.21, speed: 20, left: 5, top: 62.5, rotate: 35 },
    { shape: 'sparkle4', size: 42, color: 'var(--color-primary)', opacity: 0.22, speed: 18, left: 17, top: 62.5, rotate: 25 },
    { shape: 'sparkle4', size: 35, color: 'var(--color-secondary)', opacity: 0.2, speed: 21, left: 29, top: 62.5, rotate: 15 },
    { shape: 'sparkle4', size: 38, color: 'var(--color-dark)', opacity: 0.23, speed: 17, left: 41, top: 62.5, rotate: 40 },
    { shape: 'sparkle4', size: 40, color: 'var(--color-accent)', opacity: 0.21, speed: 19, left: 53, top: 62.5, rotate: 20 },
    { shape: 'sparkle4', size: 35, color: 'var(--color-primary)', opacity: 0.22, speed: 16, left: 65, top: 62.5, rotate: 35 },
    { shape: 'sparkle4', size: 42, color: 'var(--color-secondary)', opacity: 0.2, speed: 20, left: 77, top: 62.5, rotate: 30 },
    { shape: 'sparkle4', size: 38, color: 'var(--color-dark)', opacity: 0.21, speed: 18, left: 89, top: 62.5, rotate: 45 },

    // Row 7 (75% from top)
    { shape: 'sparkle4', size: 40, color: 'var(--color-dark)', opacity: 0.22, speed: 17, left: 5, top: 75, rotate: 20 },
    { shape: 'sparkle4', size: 36, color: 'var(--color-accent)', opacity: 0.21, speed: 19, left: 17, top: 75, rotate: 40 },
    { shape: 'sparkle4', size: 42, color: 'var(--color-primary)', opacity: 0.2, speed: 21, left: 29, top: 75, rotate: 25 },
    { shape: 'sparkle4', size: 35, color: 'var(--color-secondary)', opacity: 0.23, speed: 18, left: 41, top: 75, rotate: 35 },
    { shape: 'sparkle4', size: 38, color: 'var(--color-dark)', opacity: 0.21, speed: 20, left: 53, top: 75, rotate: 15 },
    { shape: 'sparkle4', size: 40, color: 'var(--color-accent)', opacity: 0.22, speed: 16, left: 65, top: 75, rotate: 45 },
    { shape: 'sparkle4', size: 35, color: 'var(--color-primary)', opacity: 0.2, speed: 19, left: 77, top: 75, rotate: 30 },
    { shape: 'sparkle4', size: 42, color: 'var(--color-secondary)', opacity: 0.21, speed: 17, left: 89, top: 75, rotate: 20 },

    // Row 8 (87.5% from top)
    { shape: 'sparkle4', size: 38, color: 'var(--color-secondary)', opacity: 0.21, speed: 20, left: 5, top: 87.5, rotate: 35 },
    { shape: 'sparkle4', size: 40, color: 'var(--color-dark)', opacity: 0.22, speed: 18, left: 17, top: 87.5, rotate: 25 },
    { shape: 'sparkle4', size: 36, color: 'var(--color-accent)', opacity: 0.2, speed: 21, left: 29, top: 87.5, rotate: 15 },
    { shape: 'sparkle4', size: 42, color: 'var(--color-primary)', opacity: 0.23, speed: 17, left: 41, top: 87.5, rotate: 40 },
    { shape: 'sparkle4', size: 35, color: 'var(--color-secondary)', opacity: 0.21, speed: 19, left: 53, top: 87.5, rotate: 20 },
    { shape: 'sparkle4', size: 38, color: 'var(--color-dark)', opacity: 0.22, speed: 16, left: 65, top: 87.5, rotate: 35 },
    { shape: 'sparkle4', size: 40, color: 'var(--color-accent)', opacity: 0.2, speed: 20, left: 77, top: 87.5, rotate: 30 },
    { shape: 'sparkle4', size: 35, color: 'var(--color-primary)', opacity: 0.21, speed: 18, left: 89, top: 87.5, rotate: 45 },

    // Corner elements with smaller sizes
    // Top Left Corner
    { shape: 'sparkle4', size: 25, color: 'var(--color-primary)', opacity: 0.2, speed: 15, left: 2, top: 2, rotate: 15 },
    { shape: 'sparkle4', size: 22, color: 'var(--color-secondary)', opacity: 0.21, speed: 17, left: 8, top: 8, rotate: 30 },
    
    // Top Right Corner
    { shape: 'sparkle4', size: 25, color: 'var(--color-dark)', opacity: 0.2, speed: 16, left: 92, top: 2, rotate: 25 },
    { shape: 'sparkle4', size: 22, color: 'var(--color-accent)', opacity: 0.21, speed: 18, left: 95, top: 8, rotate: 40 },
    
    // Bottom Left Corner
    { shape: 'sparkle4', size: 25, color: 'var(--color-accent)', opacity: 0.2, speed: 17, left: 2, top: 92, rotate: 20 },
    { shape: 'sparkle4', size: 22, color: 'var(--color-primary)', opacity: 0.21, speed: 19, left: 8, top: 95, rotate: 35 },
    
    // Bottom Right Corner
    { shape: 'sparkle4', size: 25, color: 'var(--color-secondary)', opacity: 0.2, speed: 18, left: 92, top: 92, rotate: 30 },
    { shape: 'sparkle4', size: 22, color: 'var(--color-dark)', opacity: 0.21, speed: 16, left: 95, top: 95, rotate: 45 }
  ];

  // Background elements with fixed positions and varied shapes (uniform distribution)
  const backgroundElements = [
    // Top Section
    { shape: 'sparkle4', size: 28, color: 'var(--color-primary)', left: 10, top: 10, rotate: 15 },
    { shape: 'sparkle4', size: 32, color: 'var(--color-secondary)', left: 30, top: 10, rotate: 30 },
    { shape: 'sparkle4', size: 30, color: 'var(--color-dark)', left: 50, top: 10, rotate: 45 },
    { shape: 'sparkle4', size: 34, color: 'var(--color-accent)', left: 70, top: 10, rotate: 20 },
    { shape: 'sparkle4', size: 28, color: 'var(--color-primary)', left: 90, top: 10, rotate: 35 },

    // Upper Middle Section
    { shape: 'sparkle4', size: 30, color: 'var(--color-secondary)', left: 20, top: 30, rotate: 25 },
    { shape: 'sparkle4', size: 34, color: 'var(--color-dark)', left: 40, top: 30, rotate: 40 },
    { shape: 'sparkle4', size: 28, color: 'var(--color-accent)', left: 60, top: 30, rotate: 15 },
    { shape: 'sparkle4', size: 32, color: 'var(--color-primary)', left: 80, top: 30, rotate: 30 },

    // Middle Section
    { shape: 'sparkle4', size: 34, color: 'var(--color-dark)', left: 10, top: 50, rotate: 35 },
    { shape: 'sparkle4', size: 28, color: 'var(--color-accent)', left: 30, top: 50, rotate: 20 },
    { shape: 'sparkle4', size: 32, color: 'var(--color-primary)', left: 50, top: 50, rotate: 45 },
    { shape: 'sparkle4', size: 30, color: 'var(--color-secondary)', left: 70, top: 50, rotate: 15 },
    { shape: 'sparkle4', size: 34, color: 'var(--color-dark)', left: 90, top: 50, rotate: 30 },

    // Lower Middle Section
    { shape: 'sparkle4', size: 28, color: 'var(--color-accent)', left: 20, top: 70, rotate: 40 },
    { shape: 'sparkle4', size: 32, color: 'var(--color-primary)', left: 40, top: 70, rotate: 25 },
    { shape: 'sparkle4', size: 30, color: 'var(--color-secondary)', left: 60, top: 70, rotate: 35 },
    { shape: 'sparkle4', size: 34, color: 'var(--color-dark)', left: 80, top: 70, rotate: 20 },

    // Bottom Section
    { shape: 'sparkle4', size: 32, color: 'var(--color-primary)', left: 10, top: 90, rotate: 30 },
    { shape: 'sparkle4', size: 30, color: 'var(--color-secondary)', left: 30, top: 90, rotate: 45 },
    { shape: 'sparkle4', size: 34, color: 'var(--color-dark)', left: 50, top: 90, rotate: 15 },
    { shape: 'sparkle4', size: 28, color: 'var(--color-accent)', left: 70, top: 90, rotate: 35 },
    { shape: 'sparkle4', size: 32, color: 'var(--color-primary)', left: 90, top: 90, rotate: 20 }
  ];

  // Helper function to get clip-path for different shapes
  const getShapeStyles = (shape: string) => {
    switch (shape) {
      case 'sparkle4':
        // Four-point sparkle
        return { 
          clipPath: `polygon(
            50% 0%, 45% 35%, 10% 50%, 45% 65%, 
            50% 100%, 55% 65%, 90% 50%, 55% 35%
          )`,
          filter: 'blur(0.3px)'
        };
      default:
        return { borderRadius: '50%' };
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Only render animations on the client side */}
      {isClient && (
        <>
          {elements.map((element, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={{
                width: element.size,
                height: element.size,
                left: `${element.left}%`,
                top: `${element.top}%`,
                transform: `rotate(${element.rotate}deg)`,
                opacity: element.opacity,
                ...getShapeStyles(element.shape),
                backgroundColor: element.color,
                boxShadow: '0 0 20px rgba(0,0,0,0.1)',
              }}
              animate={{
                y: [0, 10, 0],
                rotate: [element.rotate, element.rotate + 10, element.rotate],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3 + element.speed / 5,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            />
          ))}
          
          {/* Background elements with simpler animations */}
          {backgroundElements.map((element, index) => (
            <motion.div
              key={`bg-${index}`}
              className="absolute"
              style={{
                width: element.size,
                height: element.size,
                left: `${element.left}%`,
                top: `${element.top}%`,
                transform: `rotate(${element.rotate}deg)`,
                opacity: 0.12,
                ...getShapeStyles(element.shape),
                backgroundColor: element.color,
                filter: 'blur(0.5px)',
              }}
              animate={{
                y: [0, -8, 0],
                rotate: [element.rotate, element.rotate - 8, element.rotate],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default FloatingElements; 