import { describe, expect, it, vi, afterEach } from "vitest";
import {
  canonicalAlternates,
  createMetadata,
  isIndexableEnvironment,
  normalizeCanonicalPath,
  toAbsoluteUrl,
} from "../seo";

describe("normalizeCanonicalPath", () => {
  it("returns root for empty paths", () => {
    expect(normalizeCanonicalPath("")).toBe("/");
    expect(normalizeCanonicalPath("/")).toBe("/");
  });

  it("strips query parameters and hashes", () => {
    expect(normalizeCanonicalPath("/articles?page=2")).toBe("/articles");
    expect(normalizeCanonicalPath("/about#team")).toBe("/about");
  });

  it("collapses duplicate slashes and trailing slashes", () => {
    expect(normalizeCanonicalPath("//projects//foo//")).toBe("/projects/foo");
    expect(normalizeCanonicalPath("projects/bar")).toBe("/projects/bar");
  });
});

describe("toAbsoluteUrl", () => {
  it("always uses https://messe.ae", () => {
    expect(toAbsoluteUrl("/about")).toBe("https://messe.ae/about");
    expect(toAbsoluteUrl("/")).toBe("https://messe.ae");
  });
});

describe("canonicalAlternates", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns relative canonical paths on production", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    expect(canonicalAlternates("/projects/demo")).toEqual({
      alternates: { canonical: "/projects/demo" },
    });
  });

  it("omits canonical on preview deployments", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    expect(canonicalAlternates("/about")).toBeUndefined();
  });
});

describe("createMetadata", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("uses relative canonical paths resolved via metadataBase", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    const metadata = createMetadata({
      title: "About",
      description: "About page",
      path: "/about",
    });

    expect(metadata.alternates).toEqual({ canonical: "/about" });
    expect(metadata.robots).toEqual({ index: true, follow: true });
  });

  it("skips canonical for non-indexable pages", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    const metadata = createMetadata({
      title: "404",
      description: "Missing",
      path: "/missing",
      indexable: false,
    });

    expect(metadata.alternates).toBeUndefined();
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });
});

describe("isIndexableEnvironment", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("rejects non-production Vercel environments", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    expect(isIndexableEnvironment()).toBe(false);
  });

  it("rejects mismatched public site URLs", () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://staging.messe.ae");
    expect(isIndexableEnvironment()).toBe(false);
  });
});
