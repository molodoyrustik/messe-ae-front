import JsonLd from "@/components/JsonLd";
import { createMetadata } from "@/lib/seo";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata = createMetadata({
  title: "Careers | Join Our Exhibition Stand Team in Dubai",
  description:
    "Explore open positions at Messe.ae and join our exhibition stand experts in Dubai. View current roles, responsibilities, and benefits.",
  path: "/careers",
  keywords: ["messe.ae careers", "exhibition jobs dubai", "join messe.ae team"],
});

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
