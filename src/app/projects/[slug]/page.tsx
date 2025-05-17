import Image from 'next/image';
import Link from 'next/link';
import { ProjectData, getProjects } from '@/lib/notion';
import { notFound } from 'next/navigation';

function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace any non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

async function getProjectBySlug(slug: string): Promise<ProjectData | null> {
  const projects = await getProjects();
  return projects.find(project => createSlug(project.title) === slug) || null;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Back Link */}
      <Link 
        href="/projects"
        className="inline-flex items-center text-accent hover:text-accent/80 mb-8 transition-colors"
      >
        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Projects
      </Link>

      {/* Project Header */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-accent mb-6 text-center">
          {project.title}
        </h1>
        
        {project.image && (
          <div className="max-w-xl mx-auto px-4">
            <div className="relative h-[160px] sm:h-[180px] md:h-[200px] rounded-xl overflow-hidden mb-8">
              <Image
                src={project.image}
                alt={project.title || 'Project image'}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </div>
        )}
      </header>

      {/* Project Content */}
      <div className="space-y-12 max-w-2xl mx-auto px-4">
        {/* Description */}
        <section>
          <h2 className="text-2xl font-heading font-semibold text-accent/90 mb-4">
            About the Project
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg leading-relaxed text-light/90 text-justify">
              {project.description}
            </p>
          </div>
        </section>

        {/* Links */}
        {project.github && (
          <section className="pt-8 border-t border-light/10">
            <Link 
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 
                       bg-accent text-dark rounded-lg font-medium text-lg
                       transition-all hover:bg-accent/90"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
              </svg>
              View Source on GitHub
            </Link>
          </section>
        )}
      </div>
    </main>
  );
} 