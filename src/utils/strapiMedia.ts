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

type StrapiImageLike = {
  url: string;
  width?: number;
  height?: number;
  formats?: Partial<Record<'large' | 'medium' | 'small' | 'thumbnail', { url: string; width: number; height: number }>>;
};

/**
 * Source for next/image: originals reach 4688px / 7MB, which only slows the
 * optimizer down, while the 1000px `large` format covers every layout we render.
 */
export const getStrapiImageSource = (image?: StrapiImageLike | null) => {
  if (!image?.url) {
    return null;
  }

  const source = image.formats?.large ?? image;

  return {
    src: resolveStrapiMediaUrl(source.url),
    width: source.width,
    height: source.height,
  };
};
