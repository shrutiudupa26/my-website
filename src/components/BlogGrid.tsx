'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

interface BlogPost {
  title: string;
  url: string;
  platform: 'medium' | 'linkedin';
  readingTime?: string;
}

interface BlogGridProps {
  posts: BlogPost[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  
  // Color schemes for different posts
  const colorSchemes = [
    {
      bg: 'rgba(130, 71, 229, 0.03)', // Purple
      bgHover: 'rgba(130, 71, 229, 0.08)',
      border: 'rgba(130, 71, 229, 0.1)',
      accent: 'rgb(130, 71, 229)',
      glow: 'rgba(130, 71, 229, 0.1)'
    },
    {
      bg: 'rgba(49, 151, 149, 0.03)', // Teal
      bgHover: 'rgba(49, 151, 149, 0.08)',
      border: 'rgba(49, 151, 149, 0.1)',
      accent: 'rgb(49, 151, 149)',
      glow: 'rgba(49, 151, 149, 0.1)'
    },
    {
      bg: 'rgba(239, 68, 68, 0.03)', // Red
      bgHover: 'rgba(239, 68, 68, 0.08)',
      border: 'rgba(239, 68, 68, 0.1)',
      accent: 'rgb(239, 68, 68)',
      glow: 'rgba(239, 68, 68, 0.1)'
    },
    {
      bg: 'rgba(59, 130, 246, 0.03)', // Blue
      bgHover: 'rgba(59, 130, 246, 0.08)',
      border: 'rgba(59, 130, 246, 0.1)',
      accent: 'rgb(59, 130, 246)',
      glow: 'rgba(59, 130, 246, 0.1)'
    },
    {
      bg: 'rgba(16, 185, 129, 0.03)', // Green
      bgHover: 'rgba(16, 185, 129, 0.08)',
      border: 'rgba(16, 185, 129, 0.1)',
      accent: 'rgb(16, 185, 129)',
      glow: 'rgba(16, 185, 129, 0.1)'
    },
    {
      bg: 'rgba(245, 158, 11, 0.03)', // Amber
      bgHover: 'rgba(245, 158, 11, 0.08)',
      border: 'rgba(245, 158, 11, 0.1)',
      accent: 'rgb(245, 158, 11)',
      glow: 'rgba(245, 158, 11, 0.1)'
    }
  ];

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'medium':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post, index) => {
            const colorScheme = colorSchemes[index % colorSchemes.length];
            
            return (
              <motion.div
                key={post.url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredPost(post.url)}
                onHoverEnd={() => setHoveredPost(null)}
              >
                <Link 
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group h-full"
                >
                  <motion.div 
                    className="h-full p-6 md:p-8 rounded-2xl backdrop-blur-[12px] transition-all duration-500"
                    style={{ 
                      backgroundColor: hoveredPost === post.url 
                        ? colorScheme.bgHover
                        : colorScheme.bg,
                      border: `1px solid ${colorScheme.border}`,
                      boxShadow: hoveredPost === post.url
                        ? `0 20px 40px rgba(0, 0, 0, 0.2), 0 15px 20px rgba(0, 0, 0, 0.1), inset 0 0 60px ${colorScheme.glow}`
                        : '0 10px 20px rgba(0, 0, 0, 0.1), 0 5px 10px rgba(0, 0, 0, 0.05)',
                      transform: hoveredPost === post.url ? 'translateY(-4px)' : 'translateY(0)'
                    }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div 
                        className="flex items-center space-x-3"
                        style={{ color: colorScheme.accent }}
                      >
                        {getPlatformIcon(post.platform)}
                      </div>
                      {post.readingTime && (
                        <span 
                          className="text-xs px-3 py-1.5 rounded-full transition-colors duration-300"
                          style={{ 
                            backgroundColor: colorScheme.bg,
                            color: colorScheme.accent,
                            backdropFilter: 'blur(5px)'
                          }}
                        >
                          {post.readingTime} min read
                        </span>
                      )}
                    </div>

                    <h3 
                      className="text-lg md:text-xl font-medium line-clamp-2 mb-6 transition-colors duration-300"
                      style={{ 
                        color: 'var(--color-light)',
                      }}
                    >
                      {post.title}
                    </h3>

                    <div 
                      className="flex items-center justify-end mt-auto opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                      style={{ color: colorScheme.accent }}
                    >
                      <span className="text-sm mr-2">Read post</span>
                      <svg 
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M17 8l4 4m0 0l-4 4m4-4H3" 
                        />
                      </svg>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 