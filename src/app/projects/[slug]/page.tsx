import React from 'react';
import {
  Box,
  Container,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import Header from '@/components/Header';
import FooterSection from '@/components/landing/FooterSection';
import { projectsApi } from '@/lib/api/projects';
import { notFound } from 'next/navigation';
import { STRAPI_BASE_URL } from '@/lib/api/config';
import { ProjectResponse } from '@/types/api';
import { formatProjectSizeDisplay, formatTotalSizeForUrl, hasDisplaySize } from '@/utils/projectSizes';
import { createMetadata } from '@/lib/seo';
import ProjectImageGallery from '@/components/projects/ProjectImageGallery';

// ISR - revalidate every 300 seconds (5 minutes)
export const revalidate = 300;

// Generate static params for popular projects
export async function generateStaticParams() {
  try {
    // Generate paths for first 50 projects
    const response = await projectsApi.getProjects({ pageSize: 50 });
    console.log('generateStaticParams: Projects count:', response.data.length);
    
    // Generate slugs dynamically since projects don't have a slug field in Strapi
    const slugs = response.data.map(project => {
      const clientSlug = project.client?.name
        ? project.client.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
        : 'client';
      const formattedSize = formatTotalSizeForUrl(project);
      const slug = `${clientSlug}-${formattedSize}m2-${project.documentId}`;
      
      return { slug };
    });
    
    console.log('generateStaticParams: Generated slugs for', slugs.length, 'projects');
    
    return slugs;
  } catch (error) {
    console.error('Error generating static params for projects:', error);
    return [];
  }
}

// Generate metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    // Extract documentId from slug
    const extractDocumentId = (slug: string) => {
      const parts = slug.split('-');
      return parts[parts.length - 1];
    };
    
    const documentId = extractDocumentId(slug);
    const response = await projectsApi.getProjectById(documentId);
    const project = response.data;
    
    const description =
      project.description ||
      `Custom exhibition stand for ${project.client?.name || 'our client'} at ${project.eventName || 'a leading trade show'}.`;

    const coverImage = project.images?.[0]?.url
      ? project.images[0].url.startsWith('http')
        ? project.images[0].url
        : STRAPI_BASE_URL
        ? `${STRAPI_BASE_URL}${project.images[0].url}`
        : undefined
      : undefined;

    const keywords = [
      project.client?.name || '',
      project.eventName || '',
      project.constructionType || '',
      'exhibition stand case study',
    ].filter(Boolean);

    return createMetadata({
      title: `${project.client?.name || 'Project'} Exhibition Stand | Messe.ae`,
      description,
      path: `/projects/${slug}`,
      keywords,
      image: coverImage,
      type: 'article',
    });
  } catch (error) {
    console.error('Error fetching project metadata:', error);
    return createMetadata({
      title: 'Project Not Found | Messe.ae',
      description: 'The requested project case study could not be found.',
      path: `/projects/${slug}`,
    });
  }
}

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  
  // Extract documentId from the slug (format: client-name-150m2-documentId)
  const extractDocumentId = (slug: string) => {
    const parts = slug.split('-');
    return parts[parts.length - 1]; // documentId is always the last part
  };
  
  const documentId = extractDocumentId(slug);
  
  let data: ProjectResponse | null = null;
  let clientProjectsCount = 0;
  let error: unknown = null;

  try {
    // Fetch the main project
    data = await projectsApi.getProjectById(documentId);
    
    // Fetch client projects count if client exists
    if (data.data.client?.slug) {
      try {
        const clientProjectsData = await projectsApi.getProjects({
          clientSlug: data.data.client.slug,
          pageSize: 1, // We only need the count
        });
        clientProjectsCount = clientProjectsData.meta.pagination.total || 0;
      } catch (clientError) {
        console.error('Error fetching client projects count:', clientError);
        // Non-fatal error, continue with count = 0
      }
    }
  } catch (e) {
    error = e;
    console.error('Error loading project:', e);
  }

  if (error || !data) {
    notFound();
  }

  const project = data.data;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#FFFFFF' }}>
      <Header />
      
      <Container maxWidth="xl" sx={{ px: { xs: '1rem', md: '2.5rem' }, pt: { xs: '1.5rem', md: '3.75rem' }, pb: 8 }}>
       
          {/* Project Title - using client name */}
          <Typography
            component="h1"
            sx={{
              fontFamily: 'Roboto',
              fontWeight: 700,
              fontSize: { xs: '2.25rem', md: '3.375rem' },
              lineHeight: { xs: '2.75rem', md: '4rem' },
              letterSpacing: '0.02125rem',
              color: '#262626',
              mb: 2,
            }}
          >
            {project.client?.name || 'Client Name'}
          </Typography>

          {/* Number of projects */}
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.25, mb: 3 }}>
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 400,
                fontSize: '1rem',
                lineHeight: '1.5rem',
                letterSpacing: '0.02em',
                color: '#000000',
              }}
            >
              Number of projects:
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontWeight: 700,
                fontSize: '1rem',
                lineHeight: '1.5rem',
                letterSpacing: '0.02em',
                color: '#000000',
              }}
            >
              {clientProjectsCount}
            </Typography>
          </Box>

          {/* Client Description */}
          <Box sx={{ mb: 4, maxWidth: 1359 }}>
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontSize: '1rem',
                lineHeight: '1.5rem',
                letterSpacing: '0.02rem',
              }}
            >
              {(() => {
                const description = project.description || project.client?.description || '';
                const clientName = project.client?.name || '';
                
                // Check if client name exists in description (case-insensitive)
                if (clientName && description.toLowerCase().includes(clientName.toLowerCase())) {
                  // Find the actual client name in description with original casing
                  const regex = new RegExp(`(${clientName})`, 'gi');
                  const parts = description.split(regex);
                  return (
                    <>
                      {parts.map((part, index) => {
                        // Check if this part matches the client name (case-insensitive)
                        const isClientName = part.toLowerCase() === clientName.toLowerCase();
                        
                        return (
                          <React.Fragment key={index}>
                            {isClientName ? (
                              project.client?.link?.trim() ? (
                                <Link 
                                  href={project.client.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{ textDecoration: 'none' }}
                                >
                                  <Typography
                                    component="span"
                                    sx={{
                                      fontWeight: 700,
                                      color: '#656CAF',
                                      textDecoration: 'underline',
                                      textDecorationStyle: 'solid',
                                      textDecorationSkipInk: 'none',
                                      cursor: 'pointer',
                                      '&:hover': {
                                        color: '#4C53A2',
                                        textDecorationColor: '#4C53A2',
                                      },
                                    }}
                                  >
                                    {part}
                                  </Typography>
                                </Link>
                              ) : (
                                <Typography
                                  component="span"
                                  sx={{
                                    fontWeight: 700,
                                    color: '#656CAF',
                                    textDecoration: 'underline',
                                    textDecorationStyle: 'solid',
                                    textDecorationSkipInk: 'none',
                                  }}
                                >
                                  {part}
                                </Typography>
                              )
                            ) : (
                              <Typography
                                component="span"
                                sx={{
                                  fontWeight: 400,
                                  color: '#000000',
                                }}
                              >
                                {part}
                              </Typography>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </>
                  );
                } else {
                  // If client name not found in description, just show the description
                  return (
                    <Typography
                      component="span"
                      sx={{
                        fontWeight: 400,
                        color: '#000000',
                      }}
                    >
                      {description}
                    </Typography>
                  );
                }
              })()}
            </Typography>
          </Box>

          {/* Images Gallery Section */}
          {project.images && project.images.length > 0 && (
            <Box sx={{ position: 'relative', width: '100%', mb: 6 }}>
              {/* Info bar above images */}
              <Box 
                sx={{ 
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  mb: { xs: 2, md: 3.5 },
                  gap: { xs: 1.5, sm: 2, md: 0 },
                  width: '100%',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                  <Typography
                    sx={{
                      fontFamily: 'Roboto',
                      fontWeight: 700,
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      lineHeight: { xs: '1.5rem', md: '1.75rem' },
                      letterSpacing: '0.02em',
                      color: '#656CAF',
                    }}
                  >
                    Exhibition:
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      lineHeight: { xs: '1.5rem', md: '1.75rem' },
                      letterSpacing: '0.02em',
                      color: '#000000',
                    }}
                  >
                    {project.eventName}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                  <Typography
                    sx={{
                      fontFamily: 'Roboto',
                      fontWeight: 700,
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      lineHeight: { xs: '1.5rem', md: '1.75rem' },
                      letterSpacing: '0.02em',
                      color: '#656CAF',
                    }}
                  >
                    Year:
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      lineHeight: { xs: '1.5rem', md: '1.75rem' },
                      letterSpacing: '0.02em',
                      color: '#000000',
                    }}
                  >
                    {new Date(project.eventDate).getFullYear()}
                  </Typography>
                </Box>

                {hasDisplaySize(project) && (
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.25 }}>
                    <Typography
                      sx={{
                        fontFamily: 'Roboto',
                        fontWeight: 700,
                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                        lineHeight: { xs: '1.5rem', md: '1.75rem' },
                        letterSpacing: '0.02em',
                        color: '#656CAF',
                      }}
                    >
                      Space:
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                      <Typography
                        sx={{
                          fontFamily: 'Roboto',
                          fontWeight: 400,
                          fontSize: { xs: '1.25rem', md: '1.5rem' },
                          lineHeight: { xs: '1.5rem', md: '1.75rem' },
                          letterSpacing: '0.02em',
                          color: '#000000',
                        }}
                      >
                        {formatProjectSizeDisplay(project)} m
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: 'Roboto',
                          fontWeight: 400,
                          fontSize: { xs: '0.875rem', md: '1.05rem' },
                          lineHeight: 1,
                          color: '#000000',
                          verticalAlign: 'super',
                          position: 'relative',
                          top: '-0.3em',
                        }}
                      >
                        2
                      </Typography>
                    </Box>
                  </Box>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                  <Typography
                    sx={{
                      fontFamily: 'Roboto',
                      fontWeight: 700,
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      lineHeight: { xs: '1.5rem', md: '1.75rem' },
                      letterSpacing: '0.02em',
                      color: '#656CAF',
                    }}
                  >
                    Client:
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      lineHeight: { xs: '1.5rem', md: '1.75rem' },
                      letterSpacing: '0.02em',
                      color: '#000000',
                    }}
                  >
                    {project.referringCompany || project.client?.name}
                  </Typography>
                </Box>
              </Box>

              {/* All project images */}
              <ProjectImageGallery
                images={project.images}
                projectTitle={project.title || project.client?.name || 'Project image'}
              />
            </Box>
          )}
      </Container>

      <FooterSection />
    </Box>
  );
}
