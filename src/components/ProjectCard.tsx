'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectData } from '@/lib/notion';

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace any non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

interface ProjectCardProps {
  project: ProjectData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Create URL-friendly slug from project title
  const projectSlug = createSlug(project.title);

  return (
    <Link 
      href={`/projects/${projectSlug}`}
      className="block"
    >
      <div 
        className="relative group rounded-lg overflow-hidden shadow-md transition-all duration-300 h-64 hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Project Image */}
        <div className="absolute inset-0">
          {project.image && !imageError ? (
            <Image 
              src={project.image}
              alt={project.title || 'Project image'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : ''}`}
              onError={() => setImageError(true)}
              priority
            />
          ) : (
            <div className="w-full h-full bg-primary/20 flex items-center justify-center">
              <span className="text-accent">No image available</span>
            </div>
          )}
        </div>

        {/* Overlay */}
        <div 
          className={`absolute inset-0 transition-opacity duration-300 ${
            isHovered ? 'opacity-90' : 'opacity-0'
          }`}
          style={{ backgroundColor: 'var(--color-primary)' }}
        ></div>

        {/* Hover Content */}
        <div 
          className={`absolute inset-0 flex flex-col justify-end p-5 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h3 className="text-xl font-heading font-semibold mb-2 text-accent">
            {project.title || 'Untitled Project'}
          </h3>
          
          <div className="text-sm font-body font-medium mt-1 text-accent">
            View project details →
          </div>
        </div>
      </div>
    </Link>
  );
} 