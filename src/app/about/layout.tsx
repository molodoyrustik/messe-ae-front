import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/structured-data";

const aboutBreadcrumbSchema = getBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "About us", path: "/about" },
]);

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={aboutBreadcrumbSchema} />
      {children}
    </>
  );
}
