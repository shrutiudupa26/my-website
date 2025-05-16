'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

interface NavigationProps {
  name: string;
}

export default function Navigation({ name }: NavigationProps) {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <nav style={{ 
      position: 'fixed', 
      top: 0, 
      width: '100%', 
      backgroundColor: 'var(--color-primary)',
      backdropFilter: 'blur(4px)',
      zIndex: 50,
      borderBottom: '1px solid var(--color-light, rgba(250, 240, 230, 0.3))'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link href="/" style={{ 
              color: 'var(--color-light)', 
              fontFamily: 'var(--font-heading)', 
              fontSize: '1.25rem',
              fontWeight: 'bold'
            }}>
              {name}
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                style={{ 
                  position: 'relative', 
                  color: 'var(--color-light)', 
                  transition: 'color 0.2s',
                  fontFamily: 'var(--font-body)'
                }}
                onMouseEnter={() => setHoveredItem(item.path)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {item.name}
                {pathname === item.path && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: '-1.5px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: 'var(--color-light)'
                    }}
                    layoutId="underline"
                  />
                )}
                {hoveredItem === item.path && pathname !== item.path && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      bottom: '-1.5px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: 'var(--color-light, rgba(250, 240, 230, 0.5))'
                    }}
                    layoutId="hover-underline"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 