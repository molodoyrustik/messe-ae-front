import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { projectsApi } from '@/lib/api/projects';
import { ProjectsFilters } from '@/types/api';

export const useProjects = (filters?: ProjectsFilters) => {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: () => projectsApi.getProjects(filters),
  });
};

export const useInfiniteProjects = (filters?: Omit<ProjectsFilters, 'page'>) => {
  return useInfiniteQuery({
    queryKey: ['infinite-projects', filters],
    queryFn: ({ pageParam = 1 }) => {
      
      return projectsApi.getProjects({
        ...filters,
        page: pageParam,
        pageSize: 12,
      }).then(response => {
        return response;
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const totalPages = lastPage.meta.pagination.pageCount;
      const hasNext = currentPage < totalPages;
      
      // Return next page number if there are more pages, otherwise undefined
      return hasNext ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
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