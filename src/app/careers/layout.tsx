import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema } from "@/lib/structured-data";

const careersBreadcrumbSchema = getBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Careers", path: "/careers" },
]);

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={careersBreadcrumbSchema} />
      {children}
    </>
  );
}
