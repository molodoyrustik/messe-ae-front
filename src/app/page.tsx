import HomePage from "@/components/landing/HomePage";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Messe.ae - Exhibition Stand Builder & Designer in UAE",
  description:
    "Messe is an exhibition stand builder & contractor in Dubai specializing in custom exhibition stand design and production across the UAE and internationally.",
  path: "/",
  keywords: ["exhibition stand builder UAE", "exhibition stand designer Dubai"],
});

export default function Page() {
  return <HomePage />;
}
