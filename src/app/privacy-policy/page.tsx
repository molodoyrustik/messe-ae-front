import PrivacyPolicyPage from '@/components/PrivacyPolicyPage';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Privacy Policy',
  description:
    'Understand how Messe.ae collects, uses, and protects personal data for exhibition stand projects in the UAE and worldwide.',
  path: '/privacy-policy',
  keywords: ['privacy policy', 'data protection', 'messe.ae privacy'],
});

export default function PrivacyPolicy() {
  return <PrivacyPolicyPage />;
}
