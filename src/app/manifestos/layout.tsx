import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/structured-data";

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
