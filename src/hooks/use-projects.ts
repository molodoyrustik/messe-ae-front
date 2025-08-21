import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { projectsApi } from '@/lib/api/projects';
import { ProjectsFilters, ProjectsResponse } from '@/types/api';

export const useProjects = (filters?: ProjectsFilters) => {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: () => projectsApi.getProjects(filters),
  });
};

export const useInfiniteProjects = (
  filters?: Omit<ProjectsFilters, 'page'>,
  initialData?: ProjectsResponse
) => {
  // If we have filters, start from page 1 (ignore initial data)
  // If no filters and we have initial data, start from page 2
  const hasFilters = filters && Object.keys(filters).length > 0;
  const startPage = (!hasFilters && initialData) ? 2 : 1;
  
  return useInfiniteQuery({
    queryKey: ['infinite-projects', filters],
    queryFn: ({ pageParam = startPage }) => {
      return projectsApi.getProjects({
        ...filters,
        page: pageParam,
        pageSize: 12,
      }).then(response => {
        return response;
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      // Account for initial data offset when calculating next page
      const pageOffset = (!hasFilters && initialData) ? 1 : 0;
      const currentPage = allPages.length + pageOffset;
      const totalPages = lastPage.meta.pagination.pageCount;
      const hasNext = currentPage < totalPages;
      
      // Return next page number if there are more pages, otherwise undefined
      return hasNext ? currentPage + 1 : undefined;
    },
    initialPageParam: startPage,
    // Use initial data as first page if no filters
    initialData: (!hasFilters && initialData) ? {
      pages: [initialData],
      pageParams: [1],
    } : undefined,
  });
};

export const useProjectBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: () => projectsApi.getProjectBySlug(slug),
    enabled: !!slug,
  });
};

export const useProject = (documentId: string) => {
  return useQuery({
    queryKey: ['project', documentId],
    queryFn: () => projectsApi.getProjectById(documentId),
    enabled: !!documentId,
  });
};