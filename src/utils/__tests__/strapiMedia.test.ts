import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/api/config', () => ({
  STRAPI_BASE_URL: 'https://steadfast-beauty-abdbb5f016.strapiapp.com',
}));

import { resolveStrapiMediaUrl } from '@/utils/strapiMedia';

describe('resolveStrapiMediaUrl', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns empty string for missing url', () => {
    expect(resolveStrapiMediaUrl()).toBe('');
    expect(resolveStrapiMediaUrl(null)).toBe('');
  });

  it('returns absolute media urls unchanged', () => {
    const url = 'https://steadfast-beauty-abdbb5f016.media.strapiapp.com/image.png';
    expect(resolveStrapiMediaUrl(url)).toBe(url);
  });

  it('prefixes relative strapi paths', () => {
    expect(resolveStrapiMediaUrl('/uploads/image.png')).toBe(
      'https://steadfast-beauty-abdbb5f016.strapiapp.com/uploads/image.png'
    );
  });
});
