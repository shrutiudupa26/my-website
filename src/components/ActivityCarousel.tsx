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
  const [touchStart, setTouchStart] = useState<number | null>(null);
  
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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  return (
    <div className="relative">
      <div 
        className="relative min-h-[6rem] h-auto rounded-lg overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Arrows - Hidden on mobile */}
        <button
          onClick={prevSlide}
          className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-primary hover:opacity-80 transition-opacity duration-300"
          aria-label="Previous slide"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-4 h-4 text-light"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full bg-primary hover:opacity-80 transition-opacity duration-300"
          aria-label="Next slide"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className="w-4 h-4 text-light"
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
            className="flex flex-col items-start justify-center p-4 sm:p-5 bg-light/5 backdrop-blur-sm rounded-lg"
          >
            <span className="block text-sm sm:text-base font-medium mb-2 text-accent/95">
              {formatDate(activities[currentIndex].date)}
            </span>
            <p className="text-sm sm:text-base font-body leading-relaxed w-full text-light/85">
              {activities[currentIndex].activity}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicators */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
          {activities.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-2 bg-accent/85' : 'bg-light/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 