import ArticlePageClient from '@/components/ArticlePageClient';
import { Article } from '@/components/ArticleCard';
import { articlesApi } from '@/lib/api/articles';
import { notFound } from 'next/navigation';
import { formatArticleDate } from '@/utils/date';
import { NOINDEX_ROBOTS, createMetadata } from '@/lib/seo';
import { STRAPI_BASE_URL } from '@/lib/api/config';
import JsonLd from '@/components/JsonLd';
import {
  getArticleSchema,
  getBreadcrumbSchema,
  resolveMediaUrl,
} from '@/lib/structured-data';

// ISR - revalidate every 60 seconds
export const revalidate = 60;

// Using SSR instead of SSG

// Helper function to strip markdown and get plain text
function stripMarkdown(markdown: string): string {
  // Remove headers
  let text = markdown.replace(/#{1,6}\s+/g, '');
  // Remove bold/italic
  text = text.replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1');
  text = text.replace(/_{1,3}([^_]+)_{1,3}/g, '$1');
  // Remove links
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  // Remove images
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '');
  // Remove code blocks
  text = text.replace(/```[^`]*```/g, '');
  text = text.replace(/`([^`]+)`/g, '$1');
  // Remove blockquotes
  text = text.replace(/^>\s+/gm, '');
  // Remove lists
  text = text.replace(/^[*+-]\s+/gm, '');
  text = text.replace(/^\d+\.\s+/gm, '');
  // Remove horizontal rules
  text = text.replace(/^-{3,}$/gm, '');
  // Clean up extra whitespace
  text = text.replace(/\n{3,}/g, '\n\n');
  text = text.trim();
  return text;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const response = await articlesApi.getArticleBySlug(slug);
    const article = response.data;
    
    // Strip markdown from title and use subtitle for description
    const plainTitle = stripMarkdown(article.title);
    const plainDescription = article.subtitle || stripMarkdown(article.text).substring(0, 160) + '...';
    
    const imageUrl = article.image?.url
      ? article.image.url.startsWith('http')
        ? article.image.url
        : STRAPI_BASE_URL
        ? `${STRAPI_BASE_URL}${article.image.url}`
        : undefined
      : undefined;

    const keywords = [
      plainTitle,
      article.category?.title ?? '',
      'messe.ae blog article',
    ].filter(Boolean);

    return createMetadata({
      title: plainTitle,
      description: plainDescription,
      path: `/articles/${article.slug}`,
      keywords,
      image: imageUrl,
      type: 'article',
    });
  } catch (error) {
    console.error('Error fetching article metadata:', error);
    return {
      title: 'Article Not Found | Messe.ae Blog',
      description: 'The requested article could not be found on the Messe.ae blog.',
      robots: NOINDEX_ROBOTS,
    };
  }
}

export async function generateStaticParams() {
  try {
    // Generate paths for first 50 articles
    const response = await articlesApi.getArticles({ pageSize: 50 });
    return response.data.map((article) => ({
      slug: article.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for articles:', error);
    return [];
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  
  try {
    // Fetch the current article
    const articleResponse = await articlesApi.getArticleBySlug(slug);
    const article = articleResponse.data;
    
    // Fetch related articles (latest 3 excluding current)
    const relatedResponse = await articlesApi.getArticles({ pageSize: 4 });
    const relatedArticles: Article[] = relatedResponse.data
      .filter(a => a.slug !== slug)
      .slice(0, 3)
      .map(a => ({
        id: a.id,
        slug: a.slug,
        title: a.title,
        excerpt: a.text.substring(0, 150) + '...',
        publishDate: formatArticleDate(a.createDate),
        readTime: '5 min',
        category: 'Design',
        image: a.image?.url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
      }));
    
    const plainTitle = stripMarkdown(article.title);
    const plainDescription =
      article.subtitle?.trim() ||
      stripMarkdown(article.text).substring(0, 160);
    const heroImage =
      resolveMediaUrl(article.image?.url) ||
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=800&fit=crop';

    const articleData = {
      slug: article.slug,
      title: article.title,
      subtitle: article.subtitle, // Now using subtitle from API
      author: 'Messe.ae Team',
      authorRole: 'Exhibition Experts',
      publishDate: formatArticleDate(article.createDate),
      readTime: '5 min',
      category: article.category?.title || 'Articles',
      heroImage,
      content: article.text,
    };

    const structuredData = [
      getArticleSchema({
        title: article.title,
        description: plainDescription,
        image: heroImage,
        publishedDate: article.publishedAt || article.createDate,
        modifiedDate: article.updatedAt,
        slug: article.slug,
      }),
      getBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Articles', path: '/articles' },
        { name: plainTitle, path: `/articles/${article.slug}` },
      ]),
    ];
    
    return (
      <>
        <JsonLd data={structuredData} />
        <ArticlePageClient
          articleData={articleData}
          relatedArticles={relatedArticles}
        />
      </>
    );
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}
