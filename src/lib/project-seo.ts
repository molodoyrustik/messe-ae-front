import type { Project } from "@/types/api";
import { formatTotalSizeForUrl } from "@/utils/projectSizes";

const getEventYear = (project: Project): string | null => {
  if (!project.eventDate) {
    return null;
  }

  const year = new Date(project.eventDate).getUTCFullYear();
  return Number.isNaN(year) ? null : year.toString();
};

const getSizeLabel = (project: Project): string | null => {
  const size = formatTotalSizeForUrl(project);
  return size === "0" ? null : `${size} m²`;
};

/**
 * Projects of the same client share the client name, so the title must carry
 * event, year and size to stay unique (Siemens Industrial alone has 20+ projects).
 * The " | Messe.ae" suffix comes from the root layout title template.
 */
export const buildProjectTitle = (project: Project): string => {
  const clientName = project.client?.name || "Custom";
  const size = getSizeLabel(project);
  const year = getEventYear(project);
  const event = [project.eventName, year].filter(Boolean).join(" ");

  const stand = [clientName, size, "Exhibition Stand"].filter(Boolean).join(" ");
  return event ? `${stand} at ${event}` : stand;
};

export const buildProjectDescription = (project: Project): string => {
  if (project.description?.trim()) {
    return project.description.trim();
  }

  const clientName = project.client?.name || "our client";
  const size = getSizeLabel(project);
  const year = getEventYear(project);

  const standParts = ["Custom", size, project.constructionType, "exhibition stand"]
    .filter(Boolean)
    .join(" ");
  const event = project.eventName
    ? ` at ${project.eventName}${year ? ` ${year}` : ""}`
    : "";

  return `${standParts} designed and built by Messe.ae for ${clientName}${event}. Exhibition stand design, production and installation in Dubai, UAE and worldwide.`;
};
