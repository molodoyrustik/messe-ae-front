import { describe, expect, it, vi, afterEach } from "vitest";
import { STATIC_SITEMAP_PATHS, buildSitemapEntries } from "../sitemap-data";
import { buildProjectPath, buildProjectSlug } from "../project-url";
import type { Project } from "@/types/api";

describe("STATIC_SITEMAP_PATHS", () => {
  it("includes all static app routes except ui-kit", () => {
    const paths = STATIC_SITEMAP_PATHS.map((entry) => entry.path);

    expect(paths).toEqual([
      "/",
      "/about",
      "/projects",
      "/articles",
      "/manifestos",
      "/careers",
      "/privacy-policy",
      "/cookie-policy",
    ]);
    expect(paths).not.toContain("/ui-kit");
  });
});

describe("buildProjectSlug", () => {
  it("matches the project detail URL format", () => {
    const project = {
      documentId: "abc123",
      client: { name: "Acme Corp" },
      totalSize: 150,
    } as Project;

    expect(buildProjectSlug(project)).toBe("acme-corp-150m2-abc123");
    expect(buildProjectPath(project)).toBe("/projects/acme-corp-150m2-abc123");
  });
});

describe("buildSitemapEntries", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns an empty sitemap outside production", async () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    await expect(buildSitemapEntries()).resolves.toEqual([]);
  });
});
