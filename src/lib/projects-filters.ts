import type { ProjectsFilters } from '@/types/api';

export const PROJECT_SIZE_RANGES = [
  { label: '< 50 m²', value: { min: 0, max: 49 } },
  { label: '50 - 100 m²', value: { min: 50, max: 100 } },
  { label: '101 - 300 m²', value: { min: 101, max: 300 } },
  { label: '> 300 m²', value: { min: 301, max: 999999 } },
] as const;

export type ProjectsUrlState = {
  clients: string[];
  sizes: string[];
  types: string[];
  page: number;
};

const getParam = (
  searchParams: Record<string, string | string[] | undefined>,
  key: string
): string | undefined => {
  const value = searchParams[key];
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
};

export const parseProjectsSearchParams = (
  searchParams: Record<string, string | string[] | undefined>
): ProjectsUrlState => {
  const clientsParam = getParam(searchParams, 'clients');
  const sizesParam = getParam(searchParams, 'sizes');
  const typesParam = getParam(searchParams, 'types');
  const pageParam = getParam(searchParams, 'page');

  return {
    clients: clientsParam ? clientsParam.split(',') : [],
    sizes: sizesParam ? sizesParam.split(',') : [],
    types: typesParam ? typesParam.split(',') : [],
    page: pageParam ? parseInt(pageParam, 10) : 1,
  };
};

export const buildProjectsFiltersFromUrlState = (
  state: ProjectsUrlState
): ProjectsFilters => {
  const filters: ProjectsFilters = {
    page: state.page,
    pageSize: 12,
  };

  if (state.clients.length > 0) {
    filters.clientSlugs = state.clients;
  }

  if (state.sizes.length > 0) {
    const ranges = state.sizes
      .map((label) => PROJECT_SIZE_RANGES.find((range) => range.label === label))
      .filter(Boolean);

    if (ranges.length > 0) {
      filters.sizeRanges = ranges.map((range) => range!.value);
    }
  }

  if (state.types.length > 0) {
    filters.constructionTypes = state.types;
  }

  return filters;
};

export const hasActiveProjectFilters = (state: ProjectsUrlState): boolean =>
  state.clients.length > 0 || state.sizes.length > 0 || state.types.length > 0;

export const buildProjectsSearchUrl = (
  pathname: string,
  state: ProjectsUrlState
): string => {
  const params = new URLSearchParams();

  if (state.clients.length > 0) {
    params.set('clients', state.clients.join(','));
  }

  if (state.sizes.length > 0) {
    params.set('sizes', state.sizes.join(','));
  }

  if (state.types.length > 0) {
    params.set('types', state.types.join(','));
  }

  if (state.page > 1) {
    params.set('page', state.page.toString());
  }

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
};
