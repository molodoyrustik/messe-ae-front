import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/api/config', () => ({
  STRAPI_BASE_URL: 'https://steadfast-beauty-abdbb5f016.strapiapp.com',
}));

import { getStrapiImageSource, resolveStrapiMediaUrl } from '@/utils/strapiMedia';

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

describe('getStrapiImageSource', () => {
  it('returns null without an image', () => {
    expect(getStrapiImageSource()).toBeNull();
    expect(getStrapiImageSource({ url: '' })).toBeNull();
  });

  it('prefers the large format with its dimensions', () => {
    expect(
      getStrapiImageSource({
        url: '/uploads/original.png',
        width: 4688,
        height: 3125,
        formats: { large: { url: '/uploads/large_original.png', width: 1000, height: 667 } },
      })
    ).toEqual({
      src: 'https://steadfast-beauty-abdbb5f016.strapiapp.com/uploads/large_original.png',
      width: 1000,
      height: 667,
    });
  });

  it('falls back to the original when no large format exists', () => {
    expect(
      getStrapiImageSource({ url: 'https://cdn.example.com/small.png', width: 800, height: 600 })
    ).toEqual({ src: 'https://cdn.example.com/small.png', width: 800, height: 600 });
  });
});
