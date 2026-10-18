import JsonLd from "@/components/JsonLd";
import { createMetadata } from "@/lib/seo";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata = createMetadata({
  title: "Ethical Business Manifestos & Policies",
  description:
    "Messe manifestos — our principles on sustainability, labor welfare, and innovation in exhibition stand design and contracting across Dubai, UAE, and globally.",
  path: "/manifestos",
  keywords: ["ethical manifestos", "messe.ae policies", "sustainability commitments"],
});

const manifestosBreadcrumbSchema = getBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Manifestos", path: "/manifestos" },
]);

export default function ManifestosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={manifestosBreadcrumbSchema} />
      {children}
    </>
  );
}
