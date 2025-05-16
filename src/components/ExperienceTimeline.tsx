'use client';

import { ExperienceData } from '@/lib/notion';
import { motion } from 'framer-motion';

interface ExperienceTimelineProps {
  experiences: ExperienceData[];
}

// Helper function to format dates (optional, but good for consistency)
const formatDateRange = (startDate: string, endDate: string | null) => {
  if (startDate === 'N/A') return 'Date N/A'; // Handle N/A start date
  const start = new Date(startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  if (!endDate || endDate === 'N/A') return `${start} - Present`;
  const end = new Date(endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  return `${start} - ${end}`;
};

export default function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  // Colors from your theme
  const timelineColor = 'var(--color-light)'; // Changed to match text color
  const dateColor = 'var(--color-accent)'; // Cream for dates
  const textColor = 'var(--color-light)'; // Cream for main text
  const companyAndTitleColor = 'var(--color-accent)';

  return (
    <div className="relative max-w-3xl mx-auto px-4">
      {/* Central Timeline Line */}
      <div 
        className="absolute top-0 bottom-0 left-1/2 w-1 h-full -translate-x-1/2"
        style={{ 
          backgroundColor: timelineColor,
          opacity: 0.4, // More transparent line
          zIndex: 0 
        }}
        aria-hidden="true"
      />

      {experiences.map((exp, index) => {
        // For item 0, 2, 4... content block is on the RIGHT of the line.
        // For item 1, 3, 5... content block is on the LEFT of the line.
        const isContentOnRight = index % 2 === 0; 

        return (
          <motion.div
            key={exp.id}
            className="relative mb-10 md:mb-16" // Main wrapper for one item
            initial={{ opacity: 0, x: isContentOnRight ? -30 : 30 }} // Slide from opposite side
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            {/* Timeline Point */}
            <div 
              className="absolute w-5 h-5 rounded-full border-2 shadow-md"
              style={{ 
                backgroundColor: timelineColor,
                borderColor: timelineColor,
                opacity: 1, // Fully opaque circle
                zIndex: 2,
                left: '50%',
                top: '0.25rem',
                transform: 'translateX(-40%)',
              }} 
            />

            {/* Flex container for spacer and actual content */}
            <div className={`md:flex ${isContentOnRight ? 'md:flex-row' : 'md:flex-row-reverse'} items-start`}>
              {/* Spacer Div - pushes content to one side */}
              <div className="hidden md:block md:w-1/2"></div> {/* Adjust padding/margin on content if direct spacing is needed */}
              
              {/* Actual Content Block */}
              <div className={`w-full md:w-1/2 ${isContentOnRight ? 'md:pl-10' : 'md:pr-10'}`}>
                <div className={`${isContentOnRight ? 'text-left' : 'text-left md:text-right'}`}>
                  <p className="text-sm font-body font-semibold mb-1 pt-0.5" style={{ color: dateColor }}> {/* Added pt for alignment with dot */}
                    {formatDateRange(exp.workStartDate, exp.workEndDate)}
                  </p>
                  <h3 className="text-xl md:text-2xl font-heading font-semibold mb-2" style={{ color: companyAndTitleColor }}>
                    {exp.workTitle && exp.workTitle !== 'N/A' ? exp.workTitle : ''}
                    {exp.workTitle && exp.workTitle !== 'N/A' && exp.workCompany && exp.workCompany !== 'N/A' ? ', ' : ''}
                    {exp.workCompany && exp.workCompany !== 'N/A' ? exp.workCompany : 'Company N/A'}
                  </h3>
                  <p 
                    className={`text-sm md:text-base font-body leading-relaxed text-justify`} 
                    style={{ color: textColor, opacity: 0.8 }}
                  >
                    {exp.workDescription}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
} 