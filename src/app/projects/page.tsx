import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Box, CircularProgress } from '@mui/material';
import ProjectsHybridContent from './ProjectsHybridContent';
import { projectsApi } from '@/lib/api/projects';

// ISR - revalidate every 300 seconds (5 minutes) 
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Our Projects - Exhibition Stands Portfolio | Messe.ae',
  description: 'Explore our portfolio of exhibition stands and displays. From small booths to large pavilions, discover our work across Dubai, UAE and worldwide.',
  openGraph: {
    title: 'Our Projects - Exhibition Stands Portfolio | Messe.ae',
    description: 'Browse through our extensive portfolio of custom exhibition stands, trade show booths, and display solutions delivered across various industries.',
    url: 'https://messe.ae/projects',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Projects - Exhibition Stands Portfolio | Messe.ae',
    description: 'Browse through our extensive portfolio of custom exhibition stands, trade show booths, and display solutions.',
  },
};

export default async function ProjectsPage() {
  // Load first 12 projects on server (no filters)
  let initialProjects = null;
  let error: Error | null = null;

  try {
    const response = await projectsApi.getProjects({
      page: 1,
      pageSize: 12,
    });
    initialProjects = response;
  } catch (e) {
    error = e instanceof Error ? e : new Error('Failed to load projects');
    console.error('Error loading initial projects:', e);
  }

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
      <ProjectsHybridContent 
        initialProjects={initialProjects}
        serverError={error}
      />
    </Suspense>
  );
}