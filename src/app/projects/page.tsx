import { getProjects } from '@/lib/notion';
import ProjectCard from '@/components/ProjectCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | My Portfolio',
  description: 'Explore my projects and development work',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="py-12 md:py-20">
      <h1 
        className="text-4xl sm:text-5xl md:text-6xl font-heading mb-12 md:mb-16 text-center"
        style={{ color: 'var(--color-accent)' }}
      >
        Projects
      </h1>
      
      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {projects.map((project) => (
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
    </div>
  );
} 