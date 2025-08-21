import { Metadata } from 'next';
import {
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material';
import Header from '@/components/Header';
import FooterSection from '@/components/landing/FooterSection';
import ArticleCard from '@/components/ArticleCard';
import BigArticle from '@/components/BigArticle';
import CategoriesSection from '@/components/CategoriesSection';
import ArticleListItem from '@/components/ArticleListItem';
import ArticlesInfiniteList from '@/components/ArticlesInfiniteList';
import { articlesApi } from '@/lib/api/articles';
import { formatArticleDate } from '@/utils/date';
import Link from 'next/link';

// ISR - revalidate every 300 seconds (5 minutes) 
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Messe.ae Blog - Exhibition Stand Insights & Industry Updates',
  description: 'Explore the latest exhibition stand trends, expert insights, and industry updates in our blog, featuring innovative designs and event solutions.',
  openGraph: {
    title: 'Messe.ae Blog - Exhibition Stand Insights & Industry Updates',
    description: 'Explore the latest exhibition stand trends, expert insights, and industry updates in our blog, featuring innovative designs and event solutions.',
    url: 'https://messe.ae/articles',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Messe.ae Blog - Exhibition Stand Insights & Industry Updates',
    description: 'Explore the latest exhibition stand trends, expert insights, and industry updates in our blog.',
  },
};

export default async function ArticlesPage() {
  let data;
  let error;

  try {
    // Load first 7 articles for main page (1 for big + 6 for grid)
    data = await articlesApi.getArticles({ 
      page: 1, 
      pageSize: 7 
    });
  } catch (e) {
    error = e;
    console.error('Error loading articles:', e);
  }

  if (error || !data?.data.length) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
        <Header />
        <Container maxWidth="xl" sx={{ px: { xs: '1rem', md: '2.5rem' }, pt: { xs: '1.5rem', md: '3.75rem' }, pb: { xs: '3rem', md: '6rem' } }}>
          <Typography variant="body1" color="error" sx={{ textAlign: 'center', py: '3rem' }}>
            Failed to load articles. Please try again later.
          </Typography>
        </Container>
        <FooterSection />
      </Box>
    );
  }

  const latestArticle = data.data[0];
  const articles = data.data.slice(1);
  const hasMore = data.meta.pagination.pageCount > 1;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <Header />
      
      {/* Main Content */}
      <Container maxWidth="xl" sx={{ px: { xs: '1rem', md: '2.5rem' }, pt: { xs: '1.5rem', md: '3.75rem' }, pb: { xs: '3rem', md: '6rem' } }}>
        <Box sx={{ mx: 'auto' }}>
          
          {/* Page Header */}
          <Box sx={{ mb: { xs: '2rem', md: '3rem' } }}>
            <Typography
              variant="h1"
              data-id="articles-page-title"
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 700,
                fontSize: { xs: '2.25rem', md: '3.375rem' },
                lineHeight: { xs: '2.75rem', md: '3.75rem' },
                letterSpacing: '0',
                color: '#262626',
                mb: { xs: '0.5rem', md: '0.75rem' },
              }}
            >
              Messe.ae blog
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 400,
                fontSize: { xs: '0.875rem', md: '1rem' },
                lineHeight: { xs: '1.25rem', md: '1.5rem' },
                letterSpacing: '0.02rem',
                color: '#000',
                maxWidth: '50rem',
              }}
            >
              Explore the latest exhibition stand trends, expert insights, and industry updates in our blog, featuring innovative designs and event solutions.
            </Typography>
          </Box>

          {/* Big Article and Categories Section */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: '2rem',
            mb: { xs: '0rem', md: '2.5rem' },
            width: '100%'
          }}>
            <Box data-id="big-article-container" sx={{ flex: { xs: '1 1 100%', md: '1 1 auto' }, minWidth: 0 }}>
              <BigArticle article={{
                id: latestArticle.id,
                slug: latestArticle.slug,
                title: latestArticle.title,
                excerpt: latestArticle.text.substring(0, 150) + '...',
                publishDate: formatArticleDate(latestArticle.createDate),
                readTime: '5 min',
                category: latestArticle.category?.title || 'Articles',
                image: latestArticle.image?.url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop',
              }} />
            </Box>
            <Box data-id="categories-section-container" sx={{ 
              flexShrink: 0,
              width: { xs: '100%', md: '20rem' }
            }}>
              <CategoriesSection />
            </Box>
          </Box>

          {/* Articles Grid - Desktop */}
          <Box
            data-id="articles-grid-desktop"
            sx={{
              display: { xs: 'none', md: 'grid' },
              width: '100%',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
            }}
          >
            {articles.map((article) => (
              <ArticleCard key={article.id} article={{
                id: article.id,
                slug: article.slug,
                title: article.title,
                excerpt: article.text.substring(0, 150) + '...',
                publishDate: formatArticleDate(article.createDate),
                readTime: '5 min',
                category: article.category?.title || 'Articles',
                image: article.image?.url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
              }} />
            ))}
          </Box>

          {/* Articles List - Mobile */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              width: '100%',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '0.25rem',
              mt: '1.5rem', // 24px margin from categories
            }}
          >
            {/* Top Articles heading */}
            <Typography
              sx={{
                color: '#262626',
                fontFamily: 'Roboto',
                fontSize: '1rem',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: '1.5rem',
                letterSpacing: '0.02rem',
                mb: '1rem',
              }}
            >
              Top Articles
            </Typography>
            
            {/* Articles container */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '0.75rem',
                alignSelf: 'stretch',
              }}
            >
              {articles.map((article, index) => (
                <ArticleListItem 
                  key={article.id} 
                  article={{
                    id: article.id,
                    slug: article.slug,
                    title: article.title,
                    excerpt: article.text.substring(0, 150) + '...',
                    publishDate: formatArticleDate(article.createDate),
                    readTime: '5 min',
                    category: article.category?.title || 'Articles',
                    image: article.image?.url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
                  }}
                  isLast={index === articles.length - 1}
                />
              ))}
            </Box>
          </Box>

          {/* Infinite Scroll Articles */}
          {hasMore && <ArticlesInfiniteList />}
        </Box>
      </Container>

      <FooterSection />
    </Box>
  );
}