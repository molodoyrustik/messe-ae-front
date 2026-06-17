import type { Metadata, Viewport } from "next";
import { METADATA_BASE, getRootRobots } from "@/lib/seo";
import ThemeProvider from "@/components/ThemeProvider";
import QueryProvider from "@/components/QueryProvider";
import EmotionRegistry from "@/lib/emotion-registry";
import { MobileMenuProvider } from "@/contexts/MobileMenuContext";
import { Roboto } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import MetaPixel from "@/components/MetaPixel";
import { ResourceHints } from "@/components/ResourceHints";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Messe.ae - Exhibition Stand Builder & Designer in UAE",
    template: "%s | Messe.ae",
  },
  description:
    "Messe is an exhibition stand builder & contractor in Dubai specializing in custom exhibition stand design and production across the UAE and internationally.",
  keywords:
    "exhibition stand builder UAE, exhibition stand designer Dubai, trade show displays, event solutions, exhibition contractor",
  authors: [{ name: "Messe.ae" }],
  creator: "Messe.ae",
  publisher: "Messe.ae",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: METADATA_BASE,
  openGraph: {
    title: "Messe.ae - Exhibition Stand Builder & Designer in UAE",
    description:
      "Messe is an exhibition stand builder & contractor in Dubai specializing in custom exhibition stand design and production across the UAE and internationally.",
    url: "https://messe.ae",
    siteName: "Messe.ae",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // You'll need to add this image
        width: 1200,
        height: 630,
        alt: "Messe.ae - Exhibition Stand Builder & Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Messe.ae - Exhibition Stand Builder & Designer in UAE",
    description:
      "Messe is an exhibition stand builder & contractor in Dubai specializing in custom exhibition stand design and production across the UAE and internationally.",
    images: ["/twitter-image.jpg"], // You'll need to add this image
    creator: "@messeae",
  },
  robots: getRootRobots(),
  verification: {
    google: "google-site-verification-code", // Add your Google verification code
    yandex: "yandex-verification-code", // Add if needed
  },
  category: "business",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="emotion-insertion-point" content="" />
        <ResourceHints />
        <GoogleAnalytics />
        <MetaPixel />
      </head>
      <body className={roboto.className}>
        <EmotionRegistry>
          <QueryProvider>
            <ThemeProvider>
              <MobileMenuProvider>{children}</MobileMenuProvider>
            </ThemeProvider>
          </QueryProvider>
        </EmotionRegistry>
      </body>
    </html>
  );
}
