import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getProjects } from '@/lib/notion';

// Import the client component dynamically
const ProjectsGrid = dynamic(() => import('@/components/ProjectsGrid'), {
  ssr: true // Enable server-side rendering
});

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
      
      <ProjectsGrid initialProjects={projects} />
    </div>
  );
} 