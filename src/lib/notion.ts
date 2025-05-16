import { Client } from '@notionhq/client';
import { BlogPost } from '@/types/blog';

if (!process.env.NOTION_API_KEY) {
  throw new Error('Missing NOTION_API_KEY');
}

if (!process.env.NOTION_DATABASE_ID) {
  throw new Error('Missing NOTION_DATABASE_ID');
}

export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export interface ProfileData {
  name: string;
  title: string;
  introduction: string;
  profileImage: string;
  currentWork: {
    date: string;
    activity: string;
  }[];
}

export interface ExperienceData {
  id: string;
  workCompany: string;
  workTitle: string;
  workStartDate: string;
  workEndDate: string | null;
  workDescription: string;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  github: string;
}

export interface BlogPostData {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishedAt: string;
  tags: string[];
  externalLink?: string;
}

export async function getProfileData(): Promise<ProfileData> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: 'PageType',
        select: {
          equals: 'MainProfile',
        },
      },
    });

    const page = response.results[0];
    if (!page) throw new Error('Profile data not found for PageType: MainProfile');

    const properties = (page as any).properties;
    
    // Safely access properties with fallbacks
    const name = properties.Name?.title?.[0]?.plain_text || 'Your Name';
    const title = properties.JobTitle?.rich_text?.[0]?.plain_text || 'Your Title';
    const introduction = properties.IntroText?.rich_text?.[0]?.plain_text || 'Your introduction';
    const profileImage = properties.ProfileImage?.files?.[0]?.file?.url || '/default-profile.jpg';
    
    // Handle WhatsKeepingMeBusyLately with proper error checking
    let currentWork = [];
    try {
      const busyText = properties.WhatsKeepingMeBusyLately?.rich_text?.[0]?.plain_text;
      if (busyText) {
        currentWork = busyText.split('\n').map((item: string) => {
          const [date, ...activityParts] = item.split(' - ');
          return {
            date: date?.trim() || 'No date',
            activity: activityParts.join(' - ').trim() || 'No activity'
          };
        });
      }
    } catch (error) {
      currentWork = [{
        date: 'Today',
        activity: 'Setting up the website'
      }];
    }

    return {
      name,
      title,
      introduction,
      profileImage,
      currentWork
    };
  } catch (error) {
    // Return default data if there's an error
    return {
      name: 'Your Name',
      title: 'Your Title',
      introduction: 'Welcome to my website!',
      profileImage: '/default-profile.jpg',
      currentWork: [{
        date: 'Today',
        activity: 'Setting up the website'
      }]
    };
  }
}

export async function getExperiences(): Promise<ExperienceData[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: { 
      property: 'PageType',
      select: {
        equals: 'Experience',
      },
    },
    sorts: [
      {
        property: 'WorkStartDate',
        direction: 'descending',
      },
    ],
  });

  const experiences = response.results.map((page: any, index: number) => {
    const properties = page.properties;

    const processedData: ExperienceData = {
      id: page.id,
      workCompany: properties.WorkCompany?.rich_text?.[0]?.plain_text || 'N/A',
      workTitle: properties.WorkTitle?.rich_text?.[0]?.plain_text || 'N/A',
      workStartDate: properties.WorkStartDate?.rich_text?.[0]?.plain_text || 'N/A',
      workEndDate: properties.WorkEndDate?.rich_text?.[0]?.plain_text ? properties.WorkEndDate.rich_text[0].plain_text : null,
      workDescription: properties.WorkDescription?.rich_text?.[0]?.plain_text || 'No description provided.',
    };

    return processedData;
  });

  // Sort experiences by start date (most recent first)
  return experiences.sort((a, b) => {
    // Handle 'N/A' cases
    if (a.workStartDate === 'N/A') return 1;  // Move N/A to the end
    if (b.workStartDate === 'N/A') return -1; // Move N/A to the end
    
    // Convert dates to timestamps for comparison
    const dateA = new Date(a.workStartDate).getTime();
    const dateB = new Date(b.workStartDate).getTime();
    
    // Sort in descending order (most recent first)
    return dateB - dateA;
  });
}

export async function getProjects(): Promise<ProjectData[]> {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: 'PageType',
      select: {
        equals: 'Projects',
      },
    },
  });
  
  // Disable console.log temporarily
  const originalConsoleLog = console.log;
  console.log = () => {};
  
  const projects = response.results.map((page: any, index: number) => {
    const properties = page.properties;

    const processedData: ProjectData = {
      id: page.id,
      title: properties.ProjectTitle?.rich_text?.[0]?.plain_text || 'N/A',
      description: properties["Project Description"]?.rich_text?.[0]?.plain_text || 'No description provided.',
      image: properties.ProjectImage?.files?.[0]?.file?.url || '',
      technologies: properties.ProjectTechnologies?.multi_select?.map((tech: any) => tech.name) || [],
      link: properties.ProjectLink?.url || '',
      github: properties.ProjectGithub?.url || '',
    };

    return processedData;
  });

  // Restore console.log
  console.log = originalConsoleLog;

  return projects;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: 'PageType',
        select: {
          equals: 'Blog'
        }
      },
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
    });

    return response.results
      .map((page: any) => {
        const properties = page.properties;
        
        try {
          const title = properties["ArticleTitle"].rich_text[0].plain_text;
          const url = properties["ArticleURL"].url;
          
          return {
            title,
            url,
            platform: getPlatformFromUrl(url),
          } as BlogPost;
        } catch (error) {
          return {
            title: 'Error loading post',
            url: '#',
            platform: 'medium'
          } as BlogPost;
        }
      })
      .filter((post): post is BlogPost => Boolean(post.title) && post.url !== '#');
  } catch (error) {
    return [];
  }
}

function getPlatformFromUrl(url: string): 'medium' | 'linkedin' {
  if (url.includes('medium.com')) {
    return 'medium';
  }
  if (url.includes('linkedin.com')) {
    return 'linkedin';
  }
  // Default to medium if unknown
  return 'medium';
} 