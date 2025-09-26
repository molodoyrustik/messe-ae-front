import React, { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { unstable_cache } from 'next/cache';
import ProjectsPageContent from './page-content';
import { createMetadata } from '@/lib/seo';
import { projectsApi } from '@/lib/api/projects';
import { clientsApi } from '@/lib/api/clients';

// ISR - revalidate every 300 seconds (5 minutes) 
export const revalidate = 300;

export const metadata = createMetadata({
  title: 'Exhibition Stand Portfolio | Messe.ae Projects',
  description:
    'Explore Messe projects — exhibition stand builder & contractor in Dubai & UAE. See our custom exhibition stand designs for trade shows and events worldwide.',
  path: '/projects',
  keywords: ['exhibition stand portfolio', 'trade show booth showcase', 'messe.ae projects'],
});

const getInitialProjects = unstable_cache(
  async () => projectsApi.getProjects({ page: 1, pageSize: 12 }),
  ['projects:initial'],
  { revalidate: 300, tags: ['projects'] }
);

const getInitialClients = unstable_cache(
  async () => clientsApi.getClientsWithProjectCounts(),
  ['clients:with-counts'],
  { revalidate: 86400, tags: ['clients'] }
);

export default async function ProjectsPage() {
  const [initialProjects, initialClients] = await Promise.all([
    getInitialProjects(),
    getInitialClients(),
  ]);

  return (
    <Suspense 
      fallback={
        <Box sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <CircularProgress />
        </Box>
      }
    >
      <ProjectsPageContent
        initialProjects={initialProjects}
        initialClients={initialClients}
      />
    </Suspense>
  );
}
