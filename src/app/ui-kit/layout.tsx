import type { ReactNode } from 'react';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'UI Kit | Messe.ae Design System Showcase',
  description:
    'Review Messe.ae design tokens, components, and typography guidelines in the interactive UI kit for our Next.js + MUI project.',
  path: '/ui-kit',
  keywords: ['ui kit', 'design system', 'messe.ae components'],
  indexable: false,
});

export default function UIKitLayout({ children }: { children: ReactNode }) {
  return children;
}
