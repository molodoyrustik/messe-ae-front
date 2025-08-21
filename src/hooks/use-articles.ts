import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { articlesApi } from '@/lib/api/articles';
import { ArticlesFilters } from '@/types/api';

export const useArticles = (filters?: ArticlesFilters) => {
  return useQuery({
    queryKey: ['articles', filters],
    queryFn: () => articlesApi.getArticles(filters),
    staleTime: 60 * 1000, // 1 minute
  });
};

export const useInfiniteArticles = (filters?: Omit<ArticlesFilters, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['infinite-articles', filters],
    queryFn: ({ pageParam = 2 }) => {
      // Start from page 2 since page 1 (7 articles) is loaded on server
      return articlesApi.getArticles({
        ...filters,
        page: pageParam,
        pageSize: 7, // Keep consistent pageSize with server
      }).then(response => {
        return response;
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      // We start from page 2, so current page = allPages.length + 1
      const currentPage = allPages.length + 1; 
      const totalPages = lastPage.meta.pagination.pageCount;
      const hasNext = currentPage < totalPages;
      
      // Return next page number if there are more pages, otherwise undefined
      return hasNext ? currentPage + 1 : undefined;
    },
    initialPageParam: 2,
    staleTime: 60 * 1000, // 1 minute
  });
};

export const useArticle = (slug: string) => {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: () => articlesApi.getArticleBySlug(slug),
    enabled: !!slug,
    staleTime: 60 * 1000, // 1 minute
  });
};