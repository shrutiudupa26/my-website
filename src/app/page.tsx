import { getProfileData, getExperiences, getProjects } from '@/lib/notion';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import ProjectsGrid from '@/components/ProjectsGrid';
import ActivityCarousel from '@/components/ActivityCarousel';
import Image from 'next/image';
import ContactSection from '@/components/ContactSection';
import SkillsSection from '@/components/SkillsSection';

export default async function Home() {
  const [profile, experiences, projects] = await Promise.all([
    getProfileData(),
    getExperiences(),
    getProjects()
  ]);

  return (
    <div className="space-y-32 py-20">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center scroll-mt-24">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center">
            {/* Left Column - Introduction */}
            <div className="flex flex-col justify-center w-full">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-wider text-light">
                    I&apos;M
                  </p>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-wider text-light">
                    {profile.name.toUpperCase()}.
                  </h1>
                </div>
                <div className="w-full">
                  <p className="text-lg sm:text-xl md:text-2xl font-body leading-relaxed mt-6 md:mt-8 whitespace-pre-line text-light">
                    {profile.introduction}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="w-full flex justify-center md:justify-end items-stretch order-first md:order-last">
              {profile.profileImage ? (
                <div className="rounded-xl overflow-hidden shadow-2xl bg-primary-light/30 w-full max-w-sm md:max-w-none aspect-[3/4]">
                  <Image 
                    src={profile.profileImage} 
                    alt={profile.name}
                    width={500}
                    height={667}
                    className="w-full h-full hover:scale-105 transition-transform duration-300 object-cover object-center-top"
                    priority
                  />
                </div>
              ) : (
                <div className="w-full max-w-sm md:max-w-none aspect-[3/4] rounded-xl flex items-center justify-center bg-primary-light/30">
                  <span className="text-light">Image not available</span>
                </div>
              )}
            </div>
          </div>

          {/* Activities Carousel Section */}
          <div className="mt-16 md:mt-24">
            <div className="md:max-w-[60%] lg:max-w-[50%]">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading mb-6 md:mb-8 text-light/85">
                What&apos;s keeping me busy lately?
              </h2>
              <ActivityCarousel activities={profile.currentWork} />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen scroll-mt-24">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading mb-12 md:mb-16 text-center" style={{ color: 'var(--color-accent)' }}>
          Milestone Map
        </h2>
        {experiences.length > 0 ? (
          <div className="backdrop-blur-sm bg-primary-light/20 rounded-lg p-6 max-w-4xl mx-auto text-justify">
            <ExperienceTimeline experiences={experiences} />
          </div>
        ) : (
          <p className="text-center text-xl font-body" style={{ color: 'var(--color-light)' }}>
            Experience highlights coming soon...
          </p>
        )}
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Projects Section */}
      <section id="projects" className="min-h-screen scroll-mt-24">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading mb-12 md:mb-16 text-center" style={{ color: 'var(--color-accent)' }}>
          Projects
        </h2>
        <ProjectsGrid initialProjects={projects} />
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
} 