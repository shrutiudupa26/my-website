import { Client } from '@notionhq/client';
import { BlogPost } from '@/types/blog';
import { cacheImage } from './imageCache';
import type { 
  PageObjectResponse,
  PartialPageObjectResponse,
  DatabaseObjectResponse,
  PartialDatabaseObjectResponse
} from '@notionhq/client/build/src/api-endpoints';

if (!process.env.NOTION_API_KEY) {
  throw new Error('Missing NOTION_API_KEY');
}

if (!process.env.NOTION_DATABASE_ID) {
  throw new Error('Missing NOTION_DATABASE_ID');
}

type PropertyType = PageObjectResponse['properties'][string];

// Helper function to safely get text content from Notion properties
function getTextContent(property: PropertyType | undefined): string {
  if (!property) return '';
  
  if (property.type === 'title') {
    return property.title[0]?.plain_text || '';
  }
  if (property.type === 'rich_text') {
    return property.rich_text[0]?.plain_text || '';
  }
  return '';
}

// Helper function to get URL from file property
function getFileUrl(property: PropertyType | undefined): string {
  if (!property || property.type !== 'files') return '';
  const file = property.files[0];
  if (!file) return '';
  return 'file' in file ? file.file.url : file.external.url;
}

// Helper function to get URL from url property
function getUrl(property: PropertyType | undefined): string {
  if (!property || property.type !== 'url') return '';
  return property.url || '';
}

// Helper function to get multi-select values
function getMultiSelect(property: PropertyType | undefined): string[] {
  if (!property || property.type !== 'multi_select') return [];
  return property.multi_select.map(item => item.name);
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
  bio?: string;
  contactText?: string;
  github?: string;
  linkedin?: string;
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

type NotionResponse = PageObjectResponse | PartialPageObjectResponse | DatabaseObjectResponse | PartialDatabaseObjectResponse;

function isFullPage(page: NotionResponse): page is PageObjectResponse {
  return 'properties' in page;
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

    const page = response.results[0] as PageObjectResponse;
    if (!page) throw new Error('Profile data not found for PageType: MainProfile');

    const properties = page.properties;
    
    const name = getTextContent(properties.Name) || 'Your Name';
    const title = getTextContent(properties.JobTitle) || 'Your Title';
    const introduction = getTextContent(properties.IntroText) || 'Your introduction';
    const notionProfileImage = getFileUrl(properties.ProfileImage);
    const bio = getTextContent(properties.Bio) || '';
    const contactText = getTextContent(properties.ContactText) || '';
    const github = getTextContent(properties.Github) || '';
    const linkedin = getTextContent(properties.Linkedin) || '';
    
    // Cache the profile image
    const profileImage = notionProfileImage ? 
      await cacheImage(notionProfileImage, `profile-${page.id}`) : 
      '/default-profile.jpg';
    
    const currentWork = [];
    try {
      const busyText = getTextContent(properties.WhatsKeepingMeBusyLately);
      if (busyText) {
        busyText.split('\n').forEach(item => {
          const [date, ...activityParts] = item.split(' - ');
          currentWork.push({
            date: date?.trim() || 'No date',
            activity: activityParts.join(' - ').trim() || 'No activity'
          });
        });
      }
    } catch (error) {
      console.error('Error parsing current work:', error);
      currentWork.push({
        date: 'Today',
        activity: 'Setting up the website'
      });
    }

    return {
      name,
      title,
      introduction,
      profileImage,
      currentWork,
      bio,
      contactText,
      github,
      linkedin
    };
  } catch (error) {
    console.error('Error fetching profile data:', error);
    throw error;
  }
}

export async function getExperiences(): Promise<ExperienceData[]> {
  try {
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

    const experiences = response.results
      .filter(isFullPage)
      .map(page => {
        const properties = page.properties;
        return {
          id: page.id,
          workCompany: getTextContent(properties.WorkCompany) || 'N/A',
          workTitle: getTextContent(properties.WorkTitle) || 'N/A',
          workStartDate: getTextContent(properties.WorkStartDate) || 'N/A',
          workEndDate: getTextContent(properties.WorkEndDate) || null,
          workDescription: getTextContent(properties.WorkDescription) || 'No description provided.',
        };
      });

    return experiences.sort((a, b) => {
      if (a.workStartDate === 'N/A') return 1;
      if (b.workStartDate === 'N/A') return -1;
      return new Date(b.workStartDate).getTime() - new Date(a.workStartDate).getTime();
    });
  } catch (error) {
    console.error('Error fetching experiences:', error);
    throw error;
  }
}

export async function getProjects(): Promise<ProjectData[]> {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: 'PageType',
        select: {
          equals: 'Projects',
        },
      },
    });

    const projects = await Promise.all(
      response.results
        .filter(isFullPage)
        .map(async (page) => {
          const properties = page.properties;
          const projectLink = getUrl(properties.ProjectLink) || '';
          const notionImageUrl = getFileUrl(properties.ProjectImage);
          
          // Cache the image and get its local path
          const imageUrl = await cacheImage(notionImageUrl, page.id);

          return {
            id: page.id,
            title: getTextContent(properties.ProjectTitle) || 'N/A',
            description: getTextContent(properties['Project Description']) || 'No description provided.',
            image: imageUrl,
            technologies: getMultiSelect(properties.ProjectTechnologies),
            link: projectLink,
            github: projectLink,
          };
        })
    );

    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
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
      .filter(isFullPage)
      .map(page => {
        const properties = page.properties;
        try {
          const title = getTextContent(properties.ArticleTitle);
          const url = getUrl(properties.ArticleURL);
          
          if (!title || !url) return null;
          
          return {
            title,
            url,
            platform: getPlatformFromUrl(url),
          };
        } catch (error) {
          console.error('Error parsing blog post:', error);
          return null;
        }
      })
      .filter((post): post is BlogPost => post !== null);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

function getPlatformFromUrl(url: string): 'medium' | 'linkedin' {
  if (url.includes('medium.com')) return 'medium';
  if (url.includes('linkedin.com')) return 'linkedin';
  return 'medium';
} 