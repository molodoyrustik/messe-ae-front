import type { MetadataRoute } from "next";
import { SITE_URL, isIndexableEnvironment } from "@/lib/seo";

/** Single source for /robots.txt — do not add public/robots.txt */
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
      disallow: ["/api/", "/_next/", "/ui-kit"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
