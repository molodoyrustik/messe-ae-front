import type { MetadataRoute } from "next";
import { articlesApi } from "@/lib/api/articles";
import { categoriesApi } from "@/lib/api/categories";
import { projectsApi } from "@/lib/api/projects";
import { buildProjectPath } from "@/lib/project-url";
import { isIndexableEnvironment, normalizeCanonicalPath, toAbsoluteUrl } from "@/lib/seo";
import type { ApiResponse } from "@/types/api";

const SITEMAP_PAGE_SIZE = 100;
/** Must match `src/app/articles/page/[page]/page.tsx` listing page size. */
const ARTICLES_LISTING_PAGE_SIZE = 7;

type PaginatedCollection<T> = ApiResponse<T[]>;

async function fetchAllPages<T>(
  fetchPage: (page: number, pageSize: number) => Promise<PaginatedCollection<T>>
): Promise<T[]> {
  const items: T[] = [];
  let page = 1;

  while (true) {
    const response = await fetchPage(page, SITEMAP_PAGE_SIZE);
    items.push(...response.data);

    const { pageCount } = response.meta.pagination;
    if (page >= pageCount || pageCount === 0) {
      break;
    }

    page += 1;
  }

  return items;
}

export type SitemapPathConfig = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified?: Date;
};

/** All static app routes except `/ui-kit` (dev-only). */
export const STATIC_SITEMAP_PATHS: SitemapPathConfig[] = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.9 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/articles", changeFrequency: "weekly", priority: 0.8 },
  { path: "/manifestos", changeFrequency: "monthly", priority: 0.7 },
  { path: "/careers", changeFrequency: "monthly", priority: 0.7 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.4 },
];

const toSitemapEntry = ({
  path,
  changeFrequency,
  priority,
  lastModified,
}: SitemapPathConfig): MetadataRoute.Sitemap[number] => ({
  url: toAbsoluteUrl(path),
  lastModified: lastModified ?? new Date(),
  changeFrequency,
  priority,
});

const dedupeByUrl = (entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap => {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.url)) {
      return false;
    }
    seen.add(entry.url);
    return true;
  });
};

export async function buildSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  if (!isIndexableEnvironment()) {
    return [];
  }

  const staticEntries = STATIC_SITEMAP_PATHS.map(toSitemapEntry);
  const dynamicEntries: MetadataRoute.Sitemap = [];

  try {
    const projects = await fetchAllPages((page, pageSize) =>
      projectsApi.getProjects({ page, pageSize })
    );

    dynamicEntries.push(
      ...projects.map((project) => ({
        url: toAbsoluteUrl(buildProjectPath(project)),
        lastModified: new Date(project.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    );
  } catch (error) {
    console.error("Error fetching projects for sitemap:", error);
  }

  try {
    const articlesPageMeta = await articlesApi.getArticles({
      page: 1,
      pageSize: 1,
      sort: "createDate:desc",
    });
    const totalArticles = articlesPageMeta.meta.pagination.total;
    const totalListingPages = Math.ceil(totalArticles / ARTICLES_LISTING_PAGE_SIZE);

    for (let page = 2; page <= totalListingPages; page += 1) {
      dynamicEntries.push({
        url: toAbsoluteUrl(normalizeCanonicalPath(`/articles/page/${page}`)),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }

    const articles = await fetchAllPages((page, pageSize) =>
      articlesApi.getArticles({ page, pageSize, sort: "createDate:desc" })
    );

    dynamicEntries.push(
      ...articles
        .filter((article) => Boolean(article.slug?.trim()))
        .map((article) => ({
          url: toAbsoluteUrl(normalizeCanonicalPath(`/articles/${article.slug}`)),
          lastModified: new Date(article.updatedAt),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }))
    );
  } catch (error) {
    console.error("Error fetching articles for sitemap:", error);
  }

  try {
    const categories = await fetchAllPages((page, pageSize) =>
      categoriesApi.getCategories({ page, pageSize, sort: "title:asc" })
    );

    dynamicEntries.push(
      ...categories
        .filter((category) => Boolean(category.slug?.trim()))
        .map((category) => ({
          url: toAbsoluteUrl(
            normalizeCanonicalPath(`/articles/categories/${category.slug}`)
          ),
          lastModified: new Date(category.updatedAt),
          changeFrequency: "weekly" as const,
          priority: 0.6,
        }))
    );
  } catch (error) {
    console.error("Error fetching categories for sitemap:", error);
  }

  return dedupeByUrl([...staticEntries, ...dynamicEntries]);
}
