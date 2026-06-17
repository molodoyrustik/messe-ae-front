import { STRAPI_BASE_URL } from '@/lib/api/config';

export const resolveStrapiMediaUrl = (url?: string | null): string => {
  if (!url) {
    return '';
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  return `${STRAPI_BASE_URL}${url}`;
};
