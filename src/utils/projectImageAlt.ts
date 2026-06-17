import { Project } from "@/types/api";
import { formatProjectSizeDisplay } from "@/utils/projectSizes";

/** Alt for project images — built from Strapi project fields (no per-image alt in CMS). */
export function formatProjectImageAlt(
  project: Project,
  imageIndex = 0
): string {
  const client = project.client?.name?.trim();
  const event = project.eventName?.trim();
  const size = formatProjectSizeDisplay(project);
  const sizePart = size ? `${size} sqm ` : "";

  if (client && event) {
    return `${client} ${sizePart}exhibition stand at ${event} by Messe.ae`
      .replace(/\s+/g, " ")
      .trim();
  }

  if (client) {
    return `${client} ${sizePart}exhibition stand by Messe.ae`
      .replace(/\s+/g, " ")
      .trim();
  }

  return `Exhibition stand image ${imageIndex + 1} by Messe.ae`;
}
