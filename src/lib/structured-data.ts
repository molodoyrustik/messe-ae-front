import { STRAPI_BASE_URL } from "@/lib/api/config";
import { buildProjectPath } from "@/lib/project-url";
import { SITE_URL, toAbsoluteUrl } from "@/lib/seo";
import type { Project } from "@/types/api";
import { formatProjectImageAlt } from "@/utils/projectImageAlt";

export const ORG_ID = `${SITE_URL}/#organization`;

const stripMarkdown = (markdown: string): string => {
  let text = markdown.replace(/#{1,6}\s+/g, "");
  text = text.replace(/\*{1,3}([^*]+)\*{1,3}/g, "$1");
  text = text.replace(/_{1,3}([^_]+)_{1,3}/g, "$1");
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, "");
  text = text.replace(/```[^`]*```/g, "");
  text = text.replace(/`([^`]+)`/g, "$1");
  text = text.replace(/^>\s+/gm, "");
  text = text.replace(/^[*+-]\s+/gm, "");
  text = text.replace(/^\d+\.\s+/gm, "");
  text = text.replace(/^-{3,}$/gm, "");
  text = text.replace(/\n{3,}/g, "\n\n");
  return text.trim();
};

export const resolveMediaUrl = (url?: string | null): string | undefined => {
  if (!url) return undefined;
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  if (STRAPI_BASE_URL) {
    return `${STRAPI_BASE_URL}${url}`;
  }
  return undefined;
};

export const publisherOrganization = {
  "@type": "Organization" as const,
  "@id": ORG_ID,
  name: "Messe.ae",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject" as const,
    url: toAbsoluteUrl("/messe-logo.svg"),
  },
};

export function getImageObjectSchema(input: {
  url: string;
  name?: string;
  caption?: string;
  width?: number;
  height?: number;
}): Record<string, unknown> {
  return {
    "@type": "ImageObject",
    "@id": `${input.url}#image`,
    contentUrl: input.url,
    url: input.url,
    ...(input.name && { name: input.name }),
    ...(input.caption && { caption: input.caption }),
    ...(input.width && { width: input.width }),
    ...(input.height && { height: input.height }),
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Messe.ae",
  alternateName: "Messe Exhibition Services",
  url: SITE_URL,
  logo: toAbsoluteUrl("/messe-logo.svg"),
  description:
    "Leading exhibition stand builder and designer in UAE. We create innovative exhibition stands, trade show displays, and event solutions worldwide.",
  foundingDate: "2004",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Dubai Industrial City, KJ Autopart complex, Office building, ground floor, left wing",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    postalCode: "118995",
    addressCountry: "AE",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+971-4-548-5887",
      contactType: "sales",
      email: "hello@messe.ae",
      areaServed: ["AE", "SA", "QA", "KW", "BH", "OM"],
      availableLanguage: ["English", "Arabic"],
    },
  ],
  sameAs: [
    "https://www.facebook.com/profile.php?id=61571709386052",
    "https://www.instagram.com/messe.ae/",
    "https://www.linkedin.com/company/messe-ae",
    "https://wa.me/971505588060",
  ],
  parentOrganization: {
    "@type": "Organization",
    name: "Expoglobal Group",
    url:
      process.env.NEXT_PUBLIC_PARENT_COMPANY_URL ||
      "https://expoglobal.group/",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Messe.ae",
  url: SITE_URL,
  publisher: { "@id": ORG_ID },
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/#exhibition-stand-service`,
  name: "Exhibition Stand Design & Construction",
  provider: { "@id": ORG_ID },
  serviceType: "Exhibition stand design and build",
  areaServed: [
    { "@type": "City", name: "Dubai" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Place", name: "Worldwide" },
  ],
  description:
    "Professional exhibition stand design and construction services for trade shows and events worldwide.",
  offers: {
    "@type": "Offer",
    priceRange: "$$$",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}/#footer-section`,
      servicePhone: "+971-4-548-5887",
      availableLanguage: ["English", "Arabic"],
    },
  },
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}/#localbusiness`,
  name: "Messe.ae",
  url: SITE_URL,
  logo: toAbsoluteUrl("/messe-logo.svg"),
  image: [
    toAbsoluteUrl("/projects/projects_01.jpg"),
    toAbsoluteUrl("/projects/projects_02.jpg"),
    toAbsoluteUrl("/projects/projects_03.jpg"),
  ],
  description:
    "Exhibition stand contractor in Dubai. Custom exhibition stand design, production and build for trade shows across the UAE and internationally.",
  telephone: "+971-4-548-5887",
  email: "hello@messe.ae",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Dubai Industrial City, KJ Autopart complex, Office building, ground floor, left wing",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    postalCode: "118995",
    addressCountry: "AE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.2048,
    longitude: 55.2708,
  },
  hasMap: "https://maps.app.goo.gl/Dyyt7RWEGjV6pQ1X9",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Dubai" },
    { "@type": "Country", name: "United Arab Emirates" },
  ],
  sameAs: organizationSchema.sameAs,
  parentOrganization: { "@id": ORG_ID },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Exhibition & Trade Show Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Exhibition Stand Design",
          provider: { "@id": ORG_ID },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Stand Fabrication & Build",
          provider: { "@id": ORG_ID },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Project Management & On-site Support",
          provider: { "@id": ORG_ID },
        },
      },
    ],
  },
};

export function getBreadcrumbSchema(
  items: Array<{ name: string; path: string }>
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

export function getArticleSchema(article: {
  title: string;
  description: string;
  image?: string;
  publishedDate: string;
  modifiedDate?: string;
  slug: string;
}): Record<string, unknown> {
  const pagePath = `/articles/${article.slug}`;
  const pageUrl = toAbsoluteUrl(pagePath);
  const headline = stripMarkdown(article.title);
  const resolvedImage = article.image
    ? article.image.startsWith("http")
      ? article.image
      : resolveMediaUrl(article.image)
    : undefined;

  const primaryImage = getImageObjectSchema({
    url: resolvedImage ?? toAbsoluteUrl("/og-image.jpg"),
    name: headline,
  });

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline,
    description: article.description,
    image: primaryImage,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
    author: publisherOrganization,
    publisher: publisherOrganization,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
    },
  };
}

export function getProjectSchema(project: Project): Record<string, unknown> {
  const pagePath = buildProjectPath(project);
  const pageUrl = toAbsoluteUrl(pagePath);
  const clientName = project.client?.name?.trim() || "Exhibition stand project";
  const name = project.eventName
    ? `${clientName} exhibition stand at ${project.eventName}`
    : `${clientName} exhibition stand`;

  const imageObjects = (project.images ?? [])
    .map((image, index) => {
      const url = resolveMediaUrl(image.url);
      if (!url) return null;
      return getImageObjectSchema({
        url,
        name: formatProjectImageAlt(project, index),
        width: image.width,
        height: image.height,
      });
    })
    .filter((item): item is Record<string, unknown> => item !== null);

  const description =
    project.description?.trim() ||
    `Custom exhibition stand for ${clientName}${project.eventName ? ` at ${project.eventName}` : ""} by Messe.ae.`;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${pageUrl}#project`,
    name,
    description,
    url: pageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    creator: publisherOrganization,
    provider: publisherOrganization,
    ...(project.eventDate && { dateCreated: project.eventDate }),
    ...(project.eventName && {
      locationCreated: {
        "@type": "Place",
        name: project.eventName,
      },
    }),
    ...(imageObjects.length > 0 && {
      image:
        imageObjects.length === 1 ? imageObjects[0] : imageObjects,
    }),
    about: {
      "@type": "Thing",
      name: clientName,
    },
    genre: "Exhibition stand case study",
    inLanguage: "en",
  };
}

const withoutContext = (schema: Record<string, unknown>) => {
  const { "@context": _context, ...node } = schema;
  void _context;
  return node;
};

/** Combine multiple schema nodes in one script tag (valid JSON-LD). */
export function toJsonLdGraph(
  ...nodes: Record<string, unknown>[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.map(withoutContext),
  };
}
