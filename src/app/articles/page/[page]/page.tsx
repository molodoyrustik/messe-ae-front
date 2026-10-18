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
import { articlesApi } from '@/lib/api/articles';
import { formatArticleDate } from '@/utils/date';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createMetadata } from '@/lib/seo';

// ISR - revalidate every 300 seconds (5 minutes)
export const revalidate = 300;

// Generate static params for article pages
export async function generateStaticParams() {
  try {
    // Get total articles count
    const response = await articlesApi.getArticles({ pageSize: 1 });
    const totalArticles = response.meta.pagination.total;
    const articlesPerPage = 7; // 7 articles per page
    const totalPages = Math.ceil(totalArticles / articlesPerPage);
    
    console.log('generateStaticParams articles/page: Total articles:', totalArticles, 'Total pages:', totalPages);
    
    // Generate pages 2 through totalPages (page 1 is handled by /articles)
    const pages = [];
    for (let i = 2; i <= Math.min(totalPages, 10); i++) { // Limit to 10 pages for build time
      pages.push({ page: i.toString() });
    }
    
    console.log('generateStaticParams articles/page: Generated pages:', pages.map(p => p.page));
    return pages;
  } catch (error) {
    console.error('Error generating static params for article pages:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const pageNumber = parseInt(page, 10);

  return createMetadata({
    title: `Blog | Exhibition Stand Insights — Page ${pageNumber}`,
    description: `Read Messe articles on exhibition stand design, industry trends, and event solutions in Dubai & UAE. Page ${pageNumber} insights for businesses and event organizers.`,
    path: `/articles/page/${pageNumber}`,
    keywords: [
      `messe.ae blog page ${pageNumber}`,
      'exhibition stand articles',
      'event strategy insights',
    ],
  });
}

interface PageProps {
  params: Promise<{ page: string }>;
}

export default async function ArticlesPageWithPagination({ params }: PageProps) {
  const { page } = await params;
  const currentPage = parseInt(page, 10);
  
  if (isNaN(currentPage) || currentPage < 2) {
    notFound();
  }
  
  let allArticles;
  let totalPages = 0;
  let error: unknown = null;

  try {
    // Load all articles from page 1 to current page (cumulative)
    const articlesPerPage = 7;
    const totalArticlesToShow = currentPage * articlesPerPage;
    
    const response = await articlesApi.getArticles({ 
      page: 1, 
      pageSize: totalArticlesToShow 
    });
    
    allArticles = response.data;
    totalPages = Math.ceil(response.meta.pagination.total / articlesPerPage);
  } catch (e) {
    error = e;
    console.error('Error loading articles page:', e);
  }

  if (error || !allArticles || currentPage > totalPages) {
    notFound();
  }

  // First article is big article (only show on accumulated view)
  const latestArticle = allArticles[0];
  const restArticles = allArticles.slice(1);
  const hasMore = currentPage < totalPages;

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
            
            {/* Page indicator */}
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                sx={{
                  fontFamily: 'Roboto',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#656CAF',
                }}
              >
                Showing articles 1-{allArticles.length}
              </Typography>
              <Box sx={{ fontSize: '0.875rem', color: '#999' }}>•</Box>
              <Typography
                sx={{
                  fontFamily: 'Roboto',
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: '#666',
                }}
              >
                Page {currentPage}
              </Typography>
            </Box>
          </Box>

          {/* Big Article and Categories Section - always show */}
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

          {/* All other articles in grid/list */}
          {restArticles.length > 0 && (
            <>
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
                {restArticles.map((article) => (
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
                  mt: '1.5rem',
                }}
              >
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
                  All Articles
                </Typography>
                
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    alignSelf: 'stretch',
                  }}
                >
                  {restArticles.map((article, index) => (
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
                      isLast={index === restArticles.length - 1}
                    />
                  ))}
                </Box>
              </Box>
            </>
          )}

          {/* Load More Button */}
          {hasMore && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: '3rem', md: '3.75rem' } }}>
              <Button
                component={Link}
                href={`/articles/page/${currentPage + 1}`}
                variant="outlined"
                sx={{
                  color: '#656CAF',
                  borderColor: '#656CAF',
                  fontFamily: 'Roboto',
                  fontWeight: 400,
                  fontSize: '1rem',
                  lineHeight: '1.5rem',
                  letterSpacing: '0.02em',
                  px: '2rem',
                  py: '0.75rem',
                  borderRadius: '0.5rem',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#656CAF',
                    color: '#FFFFFF',
                    borderColor: '#656CAF',
                  },
                }}
              >
                Load more
              </Button>
            </Box>
          )}
        </Box>
      </Container>

      <FooterSection />
    </Box>
  );
} 
