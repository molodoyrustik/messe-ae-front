import CookiePolicyPage from '@/components/CookiePolicyPage';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Cookie Policy',
  description:
    'Learn how Messe.ae uses cookies and similar technologies to improve exhibition stand services and on-site experiences.',
  path: '/cookie-policy',
  keywords: ['cookie policy', 'tracking technologies', 'privacy compliance'],
});

export default function CookiePolicy() {
  return <CookiePolicyPage />;
}
