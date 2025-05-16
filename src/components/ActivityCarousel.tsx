'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Activity {
  date: string;
  activity: string;
}

interface ActivityCarouselProps {
  activities: Activity[];
}

const formatDate = (dateStr: string) => {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      // If the date is not in a standard format, return the original string
      return dateStr;
    }
    
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  } catch (err) {
    console.error('Error in ActivityCarousel:', err);
    return null;
  }
};

export default function ActivityCarousel({ activities }: ActivityCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Auto-advance the carousel
  useEffect(() => {
    if (!isPaused && activities.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((current) => 
          current === activities.length - 1 ? 0 : current + 1
        );
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(timer);
    }
  }, [isPaused, activities.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((current) => 
      current === activities.length - 1 ? 0 : current + 1
    );
  }, [activities.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((current) => 
      current === 0 ? activities.length - 1 : current - 1
    );
  }, [activities.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <div 
        className="relative min-h-[5rem] h-auto"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full transition-opacity duration-300 hover:opacity-80"
          style={{ backgroundColor: 'var(--color-primary)' }}
          aria-label="Previous slide"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="var(--color-light)" 
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full transition-opacity duration-300 hover:opacity-80"
          style={{ backgroundColor: 'var(--color-primary)' }}
          aria-label="Next slide"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="var(--color-light)" 
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Carousel Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start justify-center px-5 py-4"
            style={{ 
              backgroundColor: 'rgba(211, 125, 199, 0.08)',
              backdropFilter: 'blur(3px)'
            }}
          >
            <span 
              className="block text-sm md:text-base font-medium mb-2"
              style={{ color: 'var(--color-accent)', opacity: 0.95 }}
            >
              {formatDate(activities[currentIndex].date)}
            </span>
            <p 
              className="text-sm md:text-base font-body leading-relaxed w-full"
              style={{ color: 'var(--color-light)', opacity: 0.85 }}
            >
              {activities[currentIndex].activity}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicators */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
          {activities.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-2' : ''
              }`}
              style={{ 
                backgroundColor: index === currentIndex 
                  ? 'var(--color-accent)' 
                  : 'var(--color-light)',
                opacity: index === currentIndex ? 0.85 : 0.3
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 