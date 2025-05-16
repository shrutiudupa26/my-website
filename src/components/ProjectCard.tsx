'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectData } from '@/lib/notion';

interface ProjectCardProps {
  project: ProjectData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div 
        className="relative group rounded-lg overflow-hidden shadow-md transition-all duration-300 h-64 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={openModal}
      >
        {/* Project Image */}
        <div className="absolute inset-0">
          {project.image ? (
            <Image 
              src={project.image}
              alt={project.title || 'Project image'}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : ''}`} 
              priority={false}
            />
          ) : (
            <div className="w-full h-full bg-primary/20 flex items-center justify-center">
              <span style={{ color: 'var(--color-accent)' }}>No image available</span>
            </div>
          )}
        </div>

        {/* Overlay that's always present but changes opacity on hover */}
        <div 
          className={`absolute inset-0 transition-opacity duration-300 ${
            isHovered ? 'opacity-90' : 'opacity-0'
          }`}
          style={{ backgroundColor: 'var(--color-primary)' }}
        ></div>

        {/* Hover Text Content - separate from the background overlay */}
        <div 
          className={`absolute inset-0 flex flex-col justify-end p-5 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h3 
            className="text-xl font-heading font-semibold mb-2"
            style={{ color: 'var(--color-accent)' }}
          >
            {project.title || 'Untitled Project'}
          </h3>
          
          <div 
            className="text-sm font-body font-medium mt-1"
            style={{ color: 'var(--color-accent)' }}
          >
            Click to view details
          </div>
        </div>
      </div>

      {/* Project Modal - Without Image */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div 
            className="bg-dark max-w-2xl w-full rounded-lg shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >            
            {/* Project Details */}
            <div className="p-6">
              <h2 
                className="text-2xl font-heading font-semibold mb-3"
                style={{ color: 'var(--color-accent)' }}
              >
                {project.title || 'Untitled Project'}
              </h2>
              
              <p 
                className="mb-4 font-body leading-relaxed"
                style={{ color: 'var(--color-light)' }}
              >
                {project.description || 'No description available.'}
              </p>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies?.map((tech, i) => (
                  <span 
                    key={i} 
                    className="text-xs font-body px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: 'rgba(250, 240, 230, 0.1)', 
                      color: 'var(--color-accent)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Links */}
              <div className="flex gap-4 mt-auto">
                {project.github && (
                  <Link 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-body font-medium py-2 px-4 rounded transition-colors"
                    style={{ 
                      backgroundColor: 'var(--color-accent)', 
                      color: 'var(--color-dark)'
                    }}
                  >
                    View on GitHub
                  </Link>
                )}
                
                {project.link && (
                  <Link 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-body font-medium py-2 px-4 rounded border transition-colors"
                    style={{ 
                      borderColor: 'var(--color-accent)',
                      color: 'var(--color-accent)'
                    }}
                  >
                    Live Demo
                  </Link>
                )}
                
                <button
                  onClick={closeModal}
                  className="text-sm font-body font-medium py-2 px-4 rounded border transition-colors ml-auto"
                  style={{ 
                    borderColor: 'var(--color-accent)',
                    color: 'var(--color-accent)'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 