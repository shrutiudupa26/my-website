import { getProfileData } from '@/lib/notion';
import Image from 'next/image';
import ActivityCarousel from '@/components/ActivityCarousel';
import { Metadata } from 'next';

export default async function Home() {
  try {
    const profile = await getProfileData();

    return (
      <div className="relative min-h-screen">
        {/* Hero Section */}
        <div className="w-full max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-40 items-stretch">
            {/* Left Column - Introduction */}
            <div className="flex flex-col justify-center w-full">
              <div className="flex flex-col">
                <div className="flex flex-col">
                  <p className="text-6xl md:text-7xl font-heading font-bold tracking-wider" style={{ color: 'var(--color-light)' }}>
                    I'M
                  </p>
                  <h1 className="text-6xl md:text-7xl font-heading font-bold tracking-wider" style={{ color: 'var(--color-light)' }}>
                    {profile.name.toUpperCase()}.
                  </h1>
                </div>
                <div className="w-full" style={{ width: 'fit-content' }}>
                  <p className="text-xl md:text-2xl font-body leading-relaxed mt-8 whitespace-pre-line" style={{ color: 'var(--color-light)' }}>
                    {profile.introduction}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="w-full flex justify-center md:justify-end items-stretch order-first md:order-last">
              {profile.profileImage ? (
                <div className="rounded-xl overflow-hidden shadow-2xl bg-primary-light/30 w-full aspect-[3/4]">
                  <img 
                    src={profile.profileImage} 
                    alt={profile.name}
                    className="w-full h-full hover:scale-105 transition-transform duration-300"
                    style={{ 
                      display: 'block',
                      objectFit: 'cover',
                      objectPosition: 'center top'
                    }}
                  />
                </div>
              ) : (
                <div className="w-full aspect-[3/4] rounded-xl flex items-center justify-center bg-primary-light/30">
                  <span className="text-light">Image not available</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Activities Carousel Section */}
        <div className="w-full max-w-6xl mx-auto px-4 pb-16">
          <div className="md:max-w-[50%]">
            <h2 
              className="text-2xl md:text-3xl font-heading mb-8"
              style={{ color: 'var(--color-light)', opacity: 0.85 }}
            >
              What's keeping me busy lately?
            </h2>
            <ActivityCarousel activities={profile.currentWork} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    // Handle error gracefully
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load profile data</p>
      </div>
    );
  }
} 