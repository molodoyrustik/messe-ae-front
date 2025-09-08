import { Metadata } from 'next';
import CareersPageContent from './careers-page';

export const metadata: Metadata = {
  title: 'Careers & Job Opportunities | Messe.ae',
  description: 'Join our team at Messe.ae! Explore exciting career opportunities in exhibition design, project management, engineering, and operations in Dubai, UAE.',
  openGraph: {
    title: 'Careers & Job Opportunities | Messe.ae',
    description: 'Join our growing team in Dubai! We offer opportunities in exhibition design, project management, engineering, and operations. Apply now for available positions.',
    url: 'https://messe.ae/careers',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers & Job Opportunities | Messe.ae',
    description: 'Join our growing team in Dubai! We offer opportunities in exhibition design, project management, engineering, and operations.',
  },
};

export default function CareersPage() {
  return <CareersPageContent />;
}