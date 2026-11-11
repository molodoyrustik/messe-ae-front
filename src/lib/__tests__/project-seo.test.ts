import { describe, expect, it } from "vitest";
import type { Project } from "@/types/api";
import { buildProjectDescription, buildProjectTitle } from "../project-seo";

const makeProject = (overrides: Partial<Project> = {}): Project => ({
  id: 1,
  documentId: "abc123",
  title: "",
  slug: "",
  description: "",
  constructionType: "double-decker",
  eventType: "exhibition",
  eventName: "ADIPEC",
  eventDate: "2024-11-04",
  totalSize: 120,
  createdAt: "",
  updatedAt: "",
  publishedAt: "",
  referringCompany: null,
  client: { name: "Siemens Energy" } as Project["client"],
  ...overrides,
});

describe("buildProjectTitle", () => {
  it("includes client, size, event and year so same-client projects differ", () => {
    expect(buildProjectTitle(makeProject())).toBe(
      "Siemens Energy 120 m² Exhibition Stand at ADIPEC 2024"
    );
    expect(
      buildProjectTitle(makeProject({ eventName: "WETEX", eventDate: "2013-10-01", totalSize: 54.5 }))
    ).toBe("Siemens Energy 54.5 m² Exhibition Stand at WETEX 2013");
  });

  it("does not repeat the brand suffix added by the layout template", () => {
    expect(buildProjectTitle(makeProject())).not.toContain("Messe.ae");
  });

  it("omits missing size and date", () => {
    expect(
      buildProjectTitle(makeProject({ totalSize: undefined, eventDate: "" }))
    ).toBe("Siemens Energy Exhibition Stand at ADIPEC");
  });
});

describe("buildProjectDescription", () => {
  it("prefers the CMS description", () => {
    expect(buildProjectDescription(makeProject({ description: "  Real text. " }))).toBe(
      "Real text."
    );
  });

  it("builds a specific fallback from project fields", () => {
    expect(buildProjectDescription(makeProject())).toBe(
      "Custom 120 m² double-decker exhibition stand designed and built by Messe.ae for Siemens Energy at ADIPEC 2024. Exhibition stand design, production and installation in Dubai, UAE and worldwide."
    );
  });
});
