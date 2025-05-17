import fs from 'fs';
import path from 'path';
import https from 'https';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const CACHED_IMAGES_DIR = path.join(PUBLIC_DIR, 'cached-images');

// Ensure the cached-images directory exists
if (!fs.existsSync(CACHED_IMAGES_DIR)) {
  fs.mkdirSync(CACHED_IMAGES_DIR, { recursive: true });
}

export async function cacheImage(imageUrl: string, projectId: string): Promise<string> {
  if (!imageUrl) return '';
  
  try {
    // Create a unique filename based on the project ID and original extension
    const extension = path.extname(new URL(imageUrl).pathname) || '.jpg';
    const filename = `${projectId}${extension}`;
    const localPath = path.join(CACHED_IMAGES_DIR, filename);
    const publicPath = `/cached-images/${filename}`;

    // If image already exists locally, return its path
    if (fs.existsSync(localPath)) {
      return publicPath;
    }

    // Download and save the image
    await new Promise((resolve, reject) => {
      https.get(imageUrl, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download image: ${response.statusCode}`));
          return;
        }

        const fileStream = fs.createWriteStream(localPath);
        response.pipe(fileStream);

        fileStream.on('finish', () => {
          fileStream.close();
          resolve(true);
        });

        fileStream.on('error', (err) => {
          fs.unlink(localPath, () => {}); // Clean up failed download
          reject(err);
        });
      }).on('error', reject);
    });

    return publicPath;
  } catch (error) {
    console.error('Error caching image:', error);
    return imageUrl; // Fallback to original URL if caching fails
  }
} 