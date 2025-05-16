'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center py-16">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <h1 
            className="text-8xl font-heading font-bold mb-4"
            style={{ color: 'var(--color-light)' }}
          >
            404
          </h1>
          <h2 
            className="text-3xl font-heading mb-6"
            style={{ color: 'var(--color-light)', opacity: 0.9 }}
          >
            Page Not Found
          </h2>
          <p 
            className="text-xl font-body mb-12 max-w-lg"
            style={{ color: 'var(--color-light)', opacity: 0.7 }}
          >
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link 
            href="/"
            className="inline-block px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:-translate-y-1"
            style={{ 
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-light)',
              boxShadow: '0 4px 14px 0 rgba(211, 125, 199, 0.25)'
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 