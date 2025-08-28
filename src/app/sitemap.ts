import { MetadataRoute } from 'next';
import { projectsApi } from '@/lib/api/projects';
import { articlesApi } from '@/lib/api/articles';
import { formatTotalSizeForUrl } from '@/utils/projectSizes';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://messe.ae';
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/manifestos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Dynamic pages - Projects
  let projectPages: MetadataRoute.Sitemap = [];
  try {
    const projectsResponse = await projectsApi.getProjects({ pageSize: 100 });
    projectPages = projectsResponse.data.map((project) => {
      // Generate slug dynamically since projects don't have a slug field
      const clientSlug = project.client?.name
        ? project.client.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
        : 'client';
      const formattedSize = formatTotalSizeForUrl(project);
      const slug = `${clientSlug}-${formattedSize}m2-${project.documentId}`;
      
      return {
        url: `${baseUrl}/projects/${slug}`,
        lastModified: new Date(project.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      };
    });
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error);
  }

  // Dynamic pages - Articles
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const articlesResponse = await articlesApi.getArticles({ pageSize: 100 });
    articlePages = articlesResponse.data.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));
  } catch (error) {
    console.error('Error fetching articles for sitemap:', error);
  }

  return [...staticPages, ...projectPages, ...articlePages];
}