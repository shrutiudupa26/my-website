import { getBlogPosts } from '@/lib/notion';
import BlogGrid from '@/components/BlogGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Personal Website',
  description: 'Read my latest articles and thoughts',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="flex-1">
      <div className="container py-8">
        <BlogGrid posts={posts} />
      </div>
    </main>
  );
} 