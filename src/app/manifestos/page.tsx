import { Metadata } from 'next';
import ManifestosPageContent from './manifestos-page';

export const metadata: Metadata = {
  title: 'Company Policies & Manifestos | Messe.ae',
  description: 'View our company policies including Health & Safety, Environmental, Worker Welfare, and Anti-corruption statements. Download official policy documents.',
  openGraph: {
    title: 'Company Policies & Manifestos | Messe.ae',
    description: 'Access our comprehensive company policies and manifestos covering health & safety, environment, worker welfare, and anti-corruption standards.',
    url: 'https://messe.ae/manifestos',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Company Policies & Manifestos | Messe.ae',
    description: 'Access our comprehensive company policies and manifestos covering health & safety, environment, worker welfare, and anti-corruption standards.',
  },
};

export default function ManifestosPage() {
  return <ManifestosPageContent />;
}