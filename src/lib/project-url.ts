import type { Project } from "@/types/api";
import { formatTotalSizeForUrl } from "@/utils/projectSizes";
import { normalizeCanonicalPath } from "@/lib/seo";

export const buildClientSlug = (clientName?: string | null): string => {
  if (!clientName) {
    return "client";
  }

  return clientName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const buildProjectSlug = (project: Project): string => {
  const clientSlug = buildClientSlug(project.client?.name);
  const formattedSize = formatTotalSizeForUrl(project);
  return `${clientSlug}-${formattedSize}m2-${project.documentId}`;
};

export const buildProjectPath = (project: Project): string => {
  return normalizeCanonicalPath(`/projects/${buildProjectSlug(project)}`);
};
