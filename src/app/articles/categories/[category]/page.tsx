import {
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material';
import Header from '@/components/Header';
import FooterSection from '@/components/landing/FooterSection';
import ArticleCard from '@/components/ArticleCard';
import SmallArticleCard from '@/components/SmallArticleCard';
import { categoriesApi } from '@/lib/api/categories';
import { articlesApi } from '@/lib/api/articles';
import { notFound } from 'next/navigation';
import { formatArticleDate } from '@/utils/date';
import Link from 'next/link';
import { NOINDEX_ROBOTS, createMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { getBreadcrumbSchema } from '@/lib/structured-data';

// ISR - revalidate every 300 seconds (5 minutes)
export const revalidate = 300;

// Generate static params for categories
export async function generateStaticParams() {
  try {
    // Generate paths for all categories
    const response = await categoriesApi.getCategories({ pageSize: 100 });
    console.log('generateStaticParams categories: Found', response.data.length, 'categories');
    
    const validCategories = response.data.filter(category => {
      const hasSlug = Boolean(category.slug && category.slug.trim());
      if (!hasSlug) {
        console.warn('Category missing slug:', { id: category.id, title: category.title });
      }
      return hasSlug;
    });
    
    console.log('generateStaticParams categories: Valid categories with slugs:', validCategories.length);
    
    return validCategories.map((category) => ({
      category: category.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for categories:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  
  try {
    const categoryResponse = await categoriesApi.getCategoryBySlug(category);
    const categoryData = categoryResponse.data;

    return createMetadata({
      title: `${categoryData.title} Articles | Messe.ae Blog`,
      description:
        categoryData.description ||
        `Read Messe articles on ${categoryData.title.toLowerCase()} — exhibition stand design, industry trends, and event solutions in Dubai & UAE. Insights for businesses and event organizers.`,
      path: `/articles/categories/${category}`,
      keywords: [
        `${categoryData.title} articles`,
        'messe.ae blog category',
        'exhibition stand insights',
      ],
    });
  } catch (error) {
    console.error('Error fetching category metadata:', error);
    return {
      title: 'Category Not Found | Messe.ae Blog',
      description: 'The requested article category could not be found on the Messe.ae blog.',
      robots: NOINDEX_ROBOTS,
    };
  }
}

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = await params;
  const { page: pageParam } = await searchParams;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  
  let categoryData;
  let articlesData;
  let error: unknown = null;

  try {
    // Fetch category and initial articles
    const [categoryResponse, articlesResponse] = await Promise.all([
      categoriesApi.getCategoryBySlug(category),
      articlesApi.getArticles({ 
        categorySlug: category,
        page: currentPage, 
        pageSize: 6 
      })
    ]);
    
    categoryData = categoryResponse.data;
    articlesData = articlesResponse;
  } catch (e) {
    error = e;
    console.error('Error loading category page:', e);
  }

  if (error || !categoryData) {
    notFound();
  }

  const articles = articlesData?.data || [];
  const hasMore = articlesData ? currentPage < articlesData.meta.pagination.pageCount : false;
  const hasPrevious = currentPage > 1;

  const categoryBreadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Articles', path: '/articles' },
    {
      name: categoryData.title,
      path: `/articles/categories/${category}`,
    },
  ]);

  return (
    <>
      <JsonLd data={categoryBreadcrumbSchema} />
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <Header />
      
      {/* Main Content */}
      <Container maxWidth="xl" sx={{ px: { xs: '1rem', md: '2.5rem' }, pt: { xs: '1.5rem', md: '3.75rem' }, pb: { xs: '3rem', md: '6rem' } }}>
        <Box sx={{ mx: 'auto' }}>
          
          {/* Page Header */}
          <Box sx={{ mb: { xs: '2rem', md: '3rem' } }}>
            <Typography
              variant="h1"
              data-id="category-page-title"
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
              {categoryData.title}
            </Typography>
            <Typography
              variant="body1"
              data-id="category-page-description"
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
              {categoryData.description || `Explore our ${categoryData.title.toLowerCase()} articles and insights.`}
            </Typography>
          </Box>

          {/* No articles state */}
          {articles.length === 0 && (
            <Box sx={{ textAlign: 'center', py: '3rem' }}>
              <Typography variant="h5" sx={{ mb: 2, color: '#666' }}>
                No articles found in this category
              </Typography>
              <Typography variant="body1" sx={{ color: '#999', mb: 3 }}>
                Check back later for new content or browse other categories.
              </Typography>
              <Button
                component={Link}
                href="/articles"
                variant="outlined"
                sx={{
                  color: '#656CAF',
                  borderColor: '#656CAF',
                  '&:hover': {
                    backgroundColor: '#656CAF',
                    color: '#FFFFFF',
                  },
                }}
              >
                Browse All Articles
              </Button>
            </Box>
          )}

          {/* Content */}
          {articles.length > 0 && (
            <>
              {/* Articles Grid - Desktop */}
              <Box
                data-id="category-articles-grid"
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
                    category: article.category?.title || categoryData.title,
                    image: article.image?.url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
                  }} />
                ))}
              </Box>

              {/* Articles Grid - Mobile */}
              <Box
                sx={{
                  display: { xs: 'flex', md: 'none' },
                  width: '100%',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '1.5rem',
                }}
              >
                {articles.map((article) => (
                  <SmallArticleCard key={article.id} article={{
                    id: article.id,
                    slug: article.slug,
                    title: article.title,
                    excerpt: article.text.substring(0, 150) + '...',
                    publishDate: formatArticleDate(article.createDate),
                    readTime: '5 min',
                    category: article.category?.title || categoryData.title,
                    image: article.image?.url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
                  }} />
                ))}
              </Box>

              {/* Pagination Controls */}
              {(hasMore || hasPrevious) && (
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: { xs: '3rem', md: '3.75rem' } }}>
                  {hasPrevious && (
                    <Button
                      component={Link}
                      href={currentPage === 2 ? `/articles/categories/${category}` : `/articles/categories/${category}?page=${currentPage - 1}`}
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
                      Previous
                    </Button>
                  )}
                  {hasMore && (
                    <Button
                      component={Link}
                      href={`/articles/categories/${category}?page=${currentPage + 1}`}
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
                      Next
                    </Button>
                  )}
                </Box>
              )}
            </>
          )}

        </Box>
      </Container>

      <FooterSection />
    </Box>
    </>
  );
}
