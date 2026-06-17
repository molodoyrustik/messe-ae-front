import type { Metadata } from "next";

export const SITE_URL = "https://messe.ae";
export const METADATA_BASE = new URL(SITE_URL);

const DEFAULT_OG_IMAGE_PATH = "/og-image.jpg";
const DEFAULT_TWITTER_IMAGE_PATH = "/twitter-image.jpg";

export const DEFAULT_KEYWORDS = [
  "exhibition stand contractor Dubai",
  "exhibition stand contractor in uae",
  "exhibition stand builder Dubai",
  "exhibition stand builder UAE",
  "exhibition company Dubai",
  "exhibition stand",
  "exhibition display stand",
  "display stand exhibition",
  "stand in exhibition",
  "expo stand design",
  "exhibition stand design in dubai",
  "exhibition stand design",
  "design of exhibition stand",
  "exhibition design stand",
  "exhibition company UAE",
  "exhibition stand design UAE",
  "exhibition stand builder",
  "dubai exhibition stand contractor",
  "exhibition contractors in dubai",
  "expo stand builders",
  "exhibition builder dubai",
];

/** Production indexable deploys only — never emit messe.ae canonicals on preview/staging. */
export const isIndexableEnvironment = (): boolean => {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return false;
  }

  if (process.env.NEXT_PUBLIC_NOINDEX === "true") {
    return false;
  }

  const publicSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (publicSiteUrl) {
    try {
      const host = new URL(publicSiteUrl).hostname.toLowerCase();
      if (!isAllowedProductionHost(host)) {
        return false;
      }
    } catch {
      return false;
    }
  }

  return true;
};

const PRODUCTION_HOSTS = new Set(["messe.ae", "www.messe.ae"]);

export const isAllowedProductionHost = (hostname: string): boolean => {
  return PRODUCTION_HOSTS.has(hostname.toLowerCase());
};

/** Explicit allow — used on indexable pages so GSC never inherits a stray noindex. */
export const INDEXABLE_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
};

/** Dev, preview, 404, and ui-kit */
export const NOINDEX_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: false,
  follow: false,
};

export const getRootRobots = (): NonNullable<Metadata["robots"]> => {
  if (!isIndexableEnvironment()) {
    return NOINDEX_ROBOTS;
  }

  return {
    ...INDEXABLE_ROBOTS,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };
};

/**
 * Normalizes a site path for canonical alternates.
 * Strips query/hash, collapses duplicate slashes, enforces a single leading slash.
 */
export const normalizeCanonicalPath = (path: string): string => {
  const withoutQuery = path.split("?")[0]?.split("#")[0] ?? path;

  if (!withoutQuery || withoutQuery === "/") {
    return "/";
  }

  let normalized = withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery}`;
  normalized = normalized.replace(/\/{2,}/g, "/");

  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }

  return normalized;
};

export const canonicalAlternates = (
  path: string
): Pick<Metadata, "alternates"> | undefined => {
  if (!isIndexableEnvironment()) {
    return undefined;
  }

  return {
    alternates: {
      canonical: normalizeCanonicalPath(path),
    },
  };
};

export const toAbsoluteUrl = (path: string): string => {
  if (!path) {
    return SITE_URL;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalized = normalizeCanonicalPath(path);
  return normalized === "/" ? SITE_URL : `${SITE_URL}${normalized}`;
};

const DEFAULT_OG_IMAGE = toAbsoluteUrl(DEFAULT_OG_IMAGE_PATH);
const DEFAULT_TWITTER_IMAGE = toAbsoluteUrl(DEFAULT_TWITTER_IMAGE_PATH);

interface CreateMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  /** When false, omits canonical and sets noindex (404, ui-kit, etc.). Default true. */
  indexable?: boolean;
}

export const createMetadata = ({
  title,
  description,
  path,
  keywords = [],
  image,
  type = "website",
  indexable = true,
}: CreateMetadataOptions): Metadata => {
  const canonicalPath = normalizeCanonicalPath(path);
  const url = toAbsoluteUrl(canonicalPath);
  const resolvedImage = image ? toAbsoluteUrl(image) : DEFAULT_OG_IMAGE;
  const uniqueKeywords = Array.from(
    new Set(
      [...DEFAULT_KEYWORDS, ...keywords]
        .map((keyword) => keyword.trim())
        .filter((keyword) => keyword.length > 0)
    )
  );

  const shouldIndex = indexable && isIndexableEnvironment();

  return {
    title,
    description,
    keywords: uniqueKeywords,
    ...(shouldIndex ? canonicalAlternates(canonicalPath) : {}),
    robots: shouldIndex ? INDEXABLE_ROBOTS : NOINDEX_ROBOTS,
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: "Messe.ae",
      locale: "en_US",
      images: [{ url: resolvedImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [resolvedImage || DEFAULT_TWITTER_IMAGE],
    },
  };
};
