import { Metadata } from 'next';
import HomePage from './home-page';

export const metadata: Metadata = {
  title: 'Exhibition Stand Builder & Designer in UAE | Messe.ae',
  description: 'Leading exhibition stand builder and designer in UAE. We create innovative exhibition stands, trade show displays, and event solutions worldwide. 20+ years of expertise.',
  openGraph: {
    title: 'Messe.ae - Exhibition Stand Builder & Designer in UAE',
    description: 'Leading exhibition stand builder and designer in UAE. We create innovative exhibition stands, trade show displays, and event solutions worldwide.',
    url: 'https://messe.ae',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Messe.ae - Exhibition Stand Builder & Designer in UAE',
    description: 'Leading exhibition stand builder and designer in UAE. We create innovative exhibition stands, trade show displays, and event solutions worldwide.',
  },
};

export default function Page() {
  return <HomePage />;
}