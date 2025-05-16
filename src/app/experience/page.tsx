import { getExperiences, ExperienceData } from '@/lib/notion';
import ExperienceTimeline from '@/components/ExperienceTimeline';

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <div className="py-12 md:py-20">
      <h1 
        className="text-4xl sm:text-5xl md:text-6xl font-heading mb-12 md:mb-16 text-center"
        style={{ color: 'var(--color-accent)' }} // Using cream color from globals
      >
        Milestone Map
      </h1>
      {experiences.length > 0 ? (
        <div className="backdrop-blur-sm bg-primary-light/20 rounded-lg p-6 max-w-4xl mx-auto text-justify">
          <ExperienceTimeline experiences={experiences} />
        </div>
      ) : (
        <p 
          className="text-center text-xl font-body"
          style={{ color: 'var(--color-light)' }} // Using cream color for text
        >
          Experience highlights coming soon...
        </p>
      )}
    </div>
  );
} 