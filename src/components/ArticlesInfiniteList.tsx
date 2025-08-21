'use client';

import React from 'react';
import { Box } from '@mui/material';
import ArticleCard from '@/components/ArticleCard';
import ArticleListItem from '@/components/ArticleListItem';
import InfiniteScrollTrigger from '@/components/InfiniteScrollTrigger';
import { useInfiniteArticles } from '@/hooks/use-articles';
import { formatArticleDate } from '@/utils/date';
import { ArticlesFilters } from '@/types/api';

interface ArticlesInfiniteListProps {
  filters?: Omit<ArticlesFilters, 'page'>;
}

export default function ArticlesInfiniteList({ filters }: ArticlesInfiniteListProps) {
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteArticles(filters);

  // Flatten all pages into single array and skip first article (BigArticle equivalent)
  const allArticles = data?.pages.flatMap(page => 
    page.data.slice(1) // Skip first article from each page (BigArticle equivalent)
  ) || [];

  return (
    <>
      {/* Desktop Grid */}
      <Box
        data-id="articles-infinite-grid-desktop"
        sx={{
          display: { xs: 'none', md: 'grid' },
          width: '100%',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem',
          mt: '2.5rem',
        }}
      >
        {allArticles.map((article) => (
          <ArticleCard 
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
          />
        ))}
      </Box>

      {/* Mobile List */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          width: '100%',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.75rem',
          mt: '1.5rem',
        }}
      >
        {allArticles.map((article) => (
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
            isLast={false} // Never last in infinite scroll
          />
        ))}
      </Box>

      {/* Infinite Scroll Trigger */}
      <InfiniteScrollTrigger
        onIntersect={() => fetchNextPage()}
        hasNextPage={!!hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
        contentType="articles"
      />
    </>
  );
}