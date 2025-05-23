'use client';

import { ProjectData } from '@/lib/notion';
import ProjectCard from './ProjectCard';

interface ProjectsGridProps {
  initialProjects: ProjectData[];
}

const ProjectsGrid = ({ initialProjects }: ProjectsGridProps) => {
  return (
    <>
      {initialProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {initialProjects.map((project) => (
            <div 
              key={project.id} 
              className="backdrop-blur-sm bg-primary-light/30 rounded-lg transition-all duration-300 hover:bg-primary-light/40"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <p 
          className="text-center text-xl font-body"
          style={{ color: 'var(--color-light)' }}
        >
          Projects coming soon...
        </p>
      )}
    </>
  );
};

export default ProjectsGrid; 