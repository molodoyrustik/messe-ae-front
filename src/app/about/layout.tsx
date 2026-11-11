import JsonLd from "@/components/JsonLd";
import { createMetadata } from "@/lib/seo";
import { getBreadcrumbSchema } from "@/lib/structured-data";

export const metadata = createMetadata({
  title: "About Us | Exhibition Stand Builder & Designer in Dubai",
  description:
    "Learn about Messe — exhibition stand company in Dubai & UAE. Our team designs and builds custom exhibition stands for global trade shows and events.",
  path: "/about",
  keywords: ["about messe.ae", "expoglobal group", "exhibition stand team"],
});

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
