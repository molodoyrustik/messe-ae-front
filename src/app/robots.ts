import type { MetadataRoute } from "next";
import { SITE_URL, isIndexableEnvironment } from "@/lib/seo";

/**
 * Single source for /robots.txt — do not add public/robots.txt.
 * Never disallow /_next/: Googlebot needs JS/CSS to render and /_next/image for images.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexableEnvironment()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/ui-kit"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
