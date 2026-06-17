import { describe, it, expect } from 'vitest';
import {
  PROJECT_SIZE_RANGES,
  parseProjectsSearchParams,
  buildProjectsFiltersFromUrlState,
  buildProjectsSearchUrl,
  hasActiveProjectFilters,
} from '@/lib/projects-filters';

describe('projects-filters', () => {
  it('parses empty search params', () => {
    expect(parseProjectsSearchParams({})).toEqual({
      clients: [],
      sizes: [],
      types: [],
      page: 1,
    });
  });

  it('parses filter search params', () => {
    expect(
      parseProjectsSearchParams({
        clients: 'siemens-healthineers',
        sizes: '50 - 100 m²',
        types: 'double-decker',
        page: '3',
      })
    ).toEqual({
      clients: ['siemens-healthineers'],
      sizes: ['50 - 100 m²'],
      types: ['double-decker'],
      page: 3,
    });
  });

  it('builds API filters from URL state', () => {
    const filters = buildProjectsFiltersFromUrlState({
      clients: ['kaspersky'],
      sizes: ['101 - 300 m²'],
      types: ['events'],
      page: 2,
    });

    expect(filters).toEqual({
      page: 2,
      pageSize: 12,
      clientSlugs: ['kaspersky'],
      sizeRanges: [{ min: 101, max: 300 }],
      constructionTypes: ['events'],
    });
  });

  it('builds canonical search URLs', () => {
    expect(
      buildProjectsSearchUrl('/projects', {
        clients: ['red-hat'],
        sizes: [],
        types: [],
        page: 1,
      })
    ).toBe('/projects?clients=red-hat');
  });

  it('detects active filters', () => {
    expect(
      hasActiveProjectFilters({
        clients: [],
        sizes: [],
        types: [],
        page: 1,
      })
    ).toBe(false);

    expect(
      hasActiveProjectFilters({
        clients: ['siemens-healthineers'],
        sizes: [],
        types: [],
        page: 1,
      })
    ).toBe(true);
  });

  it('keeps desktop size range boundaries non-overlapping', () => {
    for (let i = 0; i < PROJECT_SIZE_RANGES.length - 1; i += 1) {
      const current = PROJECT_SIZE_RANGES[i];
      const next = PROJECT_SIZE_RANGES[i + 1];
      expect(next.value.min - current.value.max).toBe(1);
    }
  });
});
