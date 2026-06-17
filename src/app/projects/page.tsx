import { Box, Container, Typography } from '@mui/material';
import Header from '@/components/Header';
import FooterSection from '@/components/landing/FooterSection';
import ProjectCard from '@/components/projects/ProjectCard';
import ProjectsFilters from '@/components/projects/ProjectsFilters';
import ProjectsPagination from '@/components/projects/ProjectsPagination';
import { projectsApi } from '@/lib/api/projects';
import { clientsApi } from '@/lib/api/clients';
import { createMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { getBreadcrumbSchema } from '@/lib/structured-data';
import {
  buildProjectsFiltersFromUrlState,
  parseProjectsSearchParams,
} from '@/lib/projects-filters';

export const revalidate = 300;

export const metadata = createMetadata({
  title: 'Exhibition Stand Portfolio | Messe.ae Projects',
  description:
    'Explore Messe projects — exhibition stand builder & contractor in Dubai & UAE. See our custom exhibition stand designs for trade shows and events worldwide.',
  path: '/projects',
  keywords: ['exhibition stand portfolio', 'trade show booth showcase', 'messe.ae projects'],
});

const projectsBreadcrumbSchema = getBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
]);

interface ProjectsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const resolvedSearchParams = await searchParams;
  const urlState = parseProjectsSearchParams(resolvedSearchParams);
  const filters = buildProjectsFiltersFromUrlState(urlState);

  let projectsData;
  let clientsData;
  let error: unknown;

  try {
    [projectsData, clientsData] = await Promise.all([
      projectsApi.getProjects(filters),
      clientsApi.getClientsWithProjectCounts(),
    ]);
  } catch (e) {
    error = e;
    console.error('Error loading projects page:', e);
  }

  if (error || !projectsData || !clientsData) {
    return (
      <>
        <JsonLd data={projectsBreadcrumbSchema} />
        <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
          <Header />
          <Container
            maxWidth="xl"
            sx={{
              px: { xs: '1rem', md: '2.5rem' },
              pt: { xs: '1.5rem', md: '3.75rem' },
              pb: { xs: '3rem', md: '6rem' },
            }}
          >
            <Typography variant="body1" color="error" sx={{ textAlign: 'center', py: '3rem' }}>
              Failed to load projects. Please try again later.
            </Typography>
          </Container>
          <FooterSection />
        </Box>
      </>
    );
  }

  const projects = projectsData.data;
  const pageCount = projectsData.meta.pagination.pageCount;

  return (
    <>
      <JsonLd data={projectsBreadcrumbSchema} />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />

        <Container
          maxWidth="xl"
          sx={{
            flex: 1,
            px: { xs: '1rem', md: '2.5rem' },
            pt: { xs: '1.5rem', md: '3.75rem' },
            pb: { xs: 5, md: 7.5 },
          }}
        >
          <ProjectsFilters clients={clientsData.data} urlState={urlState} />

          {projects.length > 0 ? (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                },
                gap: { xs: 2, md: 3 },
                mb: 4,
              }}
            >
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" sx={{ mb: 2, color: '#666' }}>
                No projects found
              </Typography>
              <Typography variant="body1" sx={{ color: '#999' }}>
                Try adjusting your filters or search query
              </Typography>
            </Box>
          )}

          <ProjectsPagination urlState={urlState} pageCount={pageCount} />
        </Container>

        <FooterSection />
      </Box>
    </>
  );
}
