import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { projectsApi } from '@/lib/api/projects';
import { ProjectsFilters, ProjectsResponse, ProjectResponse } from '@/types/api';

type ProjectsQueryOptions = Omit<
  UseQueryOptions<ProjectsResponse, Error, ProjectsResponse, [string, ProjectsFilters | undefined]>,
  'queryKey' | 'queryFn'
>;

export const useProjects = (filters?: ProjectsFilters, options?: ProjectsQueryOptions) => {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: () => projectsApi.getProjects(filters),
    ...options,
  });
};

export const useProjectBySlug = (slug: string) => {
  return useQuery<ProjectResponse, Error>({
    queryKey: ['project', slug],
    queryFn: () => projectsApi.getProjectBySlug(slug),
    enabled: !!slug,
  });
};

export const useProject = (documentId: string) => {
  return useQuery<ProjectResponse, Error>({
    queryKey: ['project', documentId],
    queryFn: () => projectsApi.getProjectById(documentId),
    enabled: !!documentId,
  });
};
