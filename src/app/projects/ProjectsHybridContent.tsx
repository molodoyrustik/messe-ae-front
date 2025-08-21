'use client';

import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
  IconButton,
  Button
} from '@mui/material';
import Header from '@/components/Header';
import FooterSection from '@/components/landing/FooterSection';
import ProjectCard from '@/components/projects/ProjectCard';
import ErrorBoundary from '@/components/ErrorBoundary';
import CombinedFilterPanel from '@/components/projects/CombinedFilterPanel';
import FilterIcon from '@/components/icons/FilterIcon';
import InfiniteScrollTrigger from '@/components/InfiniteScrollTrigger';
import { useInfiniteProjects } from '@/hooks/use-projects';
import { useClientsWithProjectCounts } from '@/hooks/use-clients';
import { ProjectsFilters, ProjectsResponse } from '@/types/api';

const sizeRanges = [
  { label: '< 50 m²', value: { min: 0, max: 49 } },
  { label: '50 - 100 m²', value: { min: 50, max: 100 } },
  { label: '101 - 300 m²', value: { min: 101, max: 300 } },
  { label: '> 300 m²', value: { min: 301, max: 999999 } },
];

interface ProjectsHybridContentProps {
  initialProjects?: ProjectsResponse | null;
  serverError?: Error | null;
}

export default function ProjectsHybridContent({ 
  initialProjects, 
  serverError 
}: ProjectsHybridContentProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  // Parse initial values from URL
  const initialParams = useMemo(() => {
    const clientsParam = searchParams.get('clients');
    const sizesParam = searchParams.get('sizes');
    const typesParam = searchParams.get('types');
    
    return {
      clients: clientsParam ? clientsParam.split(',') : [],
      sizes: sizesParam ? sizesParam.split(',') : [],
      types: typesParam ? typesParam.split(',') : [],
    };
  }, [searchParams]);
  
  const [filters, setFilters] = useState<Omit<ProjectsFilters, 'page' | 'pageSize'>>({});
  
  const [selectedClients, setSelectedClients] = useState<string[]>(initialParams.clients);
  const [selectedSizeRanges, setSelectedSizeRanges] = useState<string[]>(initialParams.sizes);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(initialParams.types);
  
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);
  const clientScrollRef = useRef<HTMLDivElement>(null);

  // Update URL when filters change
  const updateURL = useCallback((params: {
    clients?: string[];
    sizes?: string[];
    types?: string[];
  }) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    
    // Update or remove clients param
    if (params.clients !== undefined) {
      if (params.clients.length > 0) {
        newSearchParams.set('clients', params.clients.join(','));
      } else {
        newSearchParams.delete('clients');
      }
    }
    
    // Update or remove sizes param
    if (params.sizes !== undefined) {
      if (params.sizes.length > 0) {
        newSearchParams.set('sizes', params.sizes.join(','));
      } else {
        newSearchParams.delete('sizes');
      }
    }
    
    // Update or remove types param
    if (params.types !== undefined) {
      if (params.types.length > 0) {
        newSearchParams.set('types', params.types.join(','));
      } else {
        newSearchParams.delete('types');
      }
    }
    
    // Remove any existing page param since we're using infinite scroll
    newSearchParams.delete('page');
    
    const newURL = `${pathname}${newSearchParams.toString() ? `?${newSearchParams.toString()}` : ''}`;
    router.push(newURL, { scroll: false });
  }, [searchParams, pathname, router]);

  const { 
    data: projectsData, 
    isLoading: projectsLoading, 
    error: projectsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProjects(filters, initialProjects);
  const { data: clientsData, isLoading: clientsLoading } = useClientsWithProjectCounts();
  
  // Sync filters with URL params when they're set initially
  useEffect(() => {
    const newFilters: Omit<ProjectsFilters, 'page' | 'pageSize'> = {};
    
    // Add client filter if present
    if (initialParams.clients.length > 0) {
      newFilters.clientSlugs = initialParams.clients;
    }
    
    // Add size filter if present
    if (initialParams.sizes.length > 0) {
      const ranges = initialParams.sizes
        .map(label => sizeRanges.find(r => r.label === label))
        .filter(Boolean);
      if (ranges.length > 0) {
        newFilters.sizeRanges = ranges.map(r => r!.value);
      }
    }
    
    // Add type filter if present
    if (initialParams.types.length > 0) {
      newFilters.constructionTypes = initialParams.types;
    }
    
    setFilters(newFilters);
  }, [initialParams.clients, initialParams.sizes, initialParams.types]); // Dependencies for URL params
  
  // Enrich projects with client project counts
  const filteredProjects = useMemo(() => {
    if (!projectsData?.pages) {
      return [];
    }
    
    // Flatten all pages into one array
    const projects = projectsData.pages.flatMap(page => page.data);

    
    if (!clientsData?.data) return projects;
    
    // Create a map of client slugs to project counts
    const clientProjectCounts = new Map<string, number>();
    clientsData.data.forEach(client => {
      if (client.projectCount !== undefined) {
        clientProjectCounts.set(client.slug, client.projectCount);
      }
    });
    
    // Enrich each project's client with projectCount
    const enrichedProjects = projects.map(project => {
      if (project.client?.slug && clientProjectCounts.has(project.client.slug)) {
        return {
          ...project,
          client: {
            ...project.client,
            projectCount: clientProjectCounts.get(project.client.slug)
          }
        };
      }
      return project;
    });
    
    return enrichedProjects;
  }, [projectsData, clientsData]);
  
  // Use all clients for chips
  const filteredClientsForChips = useMemo(() => {
    if (!clientsData?.data) return [];
    return clientsData.data;
  }, [clientsData]);
  
  const hasActiveFilters = useMemo(() => {
    return selectedClients.length > 0 || selectedSizeRanges.length > 0 || selectedTypes.length > 0;
  }, [selectedClients, selectedSizeRanges, selectedTypes]);
  
  const activeFilterValues = useMemo(() => {
    const values: string[] = [];
    if (selectedClients.length > 0 && clientsData) {
      selectedClients.forEach(slug => {
        const client = clientsData.data.find(c => c.slug === slug);
        if (client) values.push(client.name);
      });
    }
    selectedSizeRanges.forEach(range => values.push(range));
    selectedTypes.forEach(type => {
      if (type === 'double-decker') values.push('Double-Deckers');
      if (type === 'events') values.push('Events');
    });
    return values;
  }, [selectedClients, selectedSizeRanges, selectedTypes, clientsData]);

  const handleClientToggle = (clientSlug: string) => {
    // Single select - if clicking same client, deselect it
    const newClients = selectedClients.includes(clientSlug) ? [] : [clientSlug];
    
    setSelectedClients(newClients);
    updateURL({ clients: newClients });
    
    const newFilters: Omit<ProjectsFilters, 'page' | 'pageSize'> = {
      ...filters,
      clientSlugs: newClients.length > 0 ? newClients : undefined,
    };
    setFilters(newFilters);
  };
  
  const handleSizeToggle = (sizeLabel: string) => {
    // Single select - if clicking same size, deselect it
    const newSizes = selectedSizeRanges.includes(sizeLabel) ? [] : [sizeLabel];
    
    setSelectedSizeRanges(newSizes);
    // Keep types when changing size
    updateURL({ sizes: newSizes, types: selectedTypes });
    
    const ranges = newSizes
      .map(label => sizeRanges.find(r => r.label === label))
      .filter(Boolean);
    
    const newFilters: Omit<ProjectsFilters, 'page' | 'pageSize'> = {
      ...filters,
      sizeRanges: ranges.length > 0 ? ranges.map(r => r!.value) : undefined,
      constructionTypes: selectedTypes.length > 0 ? selectedTypes : undefined, // Keep types
    };
    setFilters(newFilters);
  };
  
  const handleTypeToggle = (type: string) => {
    // Single select - if clicking same type, deselect it
    const newTypes = selectedTypes.includes(type) ? [] : [type];
    
    setSelectedTypes(newTypes);
    // Don't clear size ranges when selecting type - keep existing size filter
    updateURL({ types: newTypes, sizes: selectedSizeRanges });
    
    const ranges = selectedSizeRanges
      .map(label => sizeRanges.find(r => r.label === label))
      .filter(Boolean);
    
    const newFilters: Omit<ProjectsFilters, 'page' | 'pageSize'> = {
      ...filters,
      constructionTypes: newTypes.length > 0 ? newTypes : undefined,
      sizeRanges: ranges.length > 0 ? ranges.map(r => r!.value) : undefined, // Keep size ranges
    };
    setFilters(newFilters);
  };
  
  
  const handleClearFilters = () => {
    setSelectedClients([]);
    setSelectedSizeRanges([]);
    setSelectedTypes([]);
    updateURL({ clients: [], sizes: [], types: [] });
    setFilters({});
  };

  const handleClientScroll = useCallback(() => {
    if (clientScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = clientScrollRef.current;
      
      // Show left gradient if scrolled right
      setShowLeftGradient(scrollLeft > 5);
      
      // Show right gradient if not scrolled to the end
      setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }, []);

  // Check scroll position on mount and when clients data changes
  useEffect(() => {
    handleClientScroll();
  }, [clientsData, handleClientScroll]);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <Container maxWidth="xl" sx={{ flex: 1, px: { xs: '1rem', md: '2.5rem' }, pt: { xs: '1.5rem', md: '3.75rem' }, pb: { xs: 5, md: 7.5 } }}>
        {/* Error State */}
        {(projectsError || serverError) && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Failed to load projects. Please try again later.
            {serverError && !projectsError && ' (Server error during initial load)'}
          </Alert>
        )}
        
        {/* Header with Title and Filter Button (Mobile) */}
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: { xs: 'flex-start', md: 'center' },
            mb: { xs: 1.5, md: 4 },
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 2, md: 0 },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: 'Roboto',
                fontSize: { xs: '2.25rem', md: '3.375rem' },
                fontWeight: 700,
                lineHeight: { xs: '2.75rem', md: '4rem' },
                color: '#262626',
              }}
            >
              Our Projects
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontSize: { xs: '0.875rem', md: '1rem' },
                fontWeight: 400,
                lineHeight: { xs: '1.125rem', md: '1.5rem' },
                letterSpacing: '0.02rem',
                color: '#000',
                mt: { xs: 0.5, md: 0.75 },
                maxWidth: '1359px',
              }}
            >
              With 20 years of experience, messe.ae has successfully completed over 4,000 projects worldwide. As one of the leading{' '}
              <Box component="span" sx={{ fontWeight: 700 }}>
                exhibition stand builders in UAE
              </Box>
              , we deliver premium{' '}
              <Box component="span" sx={{ fontWeight: 700 }}>
                exhibition stand designs in Dubai and beyond
              </Box>
              . From tailored exhibition stands to creative display stand exhibition solutions, we bring innovation, quality, and expertise to every project. Recognized among top exhibitions companies in Dubai, messe.ae is your trusted exhibition stand contractor for outstanding exhibition design stand and impactful global presence.
            </Typography>
          </Box>
          
          {/* Mobile Filter Button */}
          {isMobile && (
            <IconButton
              onClick={() => setIsFilterPanelOpen(true)}
              sx={{
                backgroundColor: '#F5F5F5',
                borderRadius: '4px',
                width: '36px',
                height: '36px',
                position: 'relative',
                '&:hover': {
                  backgroundColor: '#E0E0E0',
                },
              }}
            >
              <FilterIcon />
              {hasActiveFilters && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#A64B66',
                  }}
                />
              )}
            </IconButton>
          )}
          
        </Box>
        
        {/* Desktop Filter Section */}
        {!isMobile && (
          <Box sx={{ mb: 4, mt: 4 }}>
            {/* Client Filters */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontFamily: 'Roboto',
                  fontSize: '1rem',
                  fontWeight: 700,
                  lineHeight: '1.5rem',
                  letterSpacing: '0.02rem',
                  color: '#000',
                  mb: 1,
                }}
              >
                Clients
              </Typography>
              <Box sx={{ position: 'relative' }}>
                {/* White background for All button */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 'calc(3rem + 1rem)',
                    backgroundColor: '#FFFFFF',
                    zIndex: 1,
                  }}
                />
                {/* Left gradient for smooth fade */}
                <Box
                  sx={{
                    position: 'absolute',
                    left: 'calc(3rem + 1rem)',
                    top: 0,
                    bottom: 0,
                    width: '10px',
                    background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0) 100%)',
                    pointerEvents: 'none',
                    zIndex: 1,
                    opacity: showLeftGradient ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                  }}
                />
                {/* All button - fixed position */}
                <Chip
                  label="All"
                  onClick={() => {
                    setSelectedClients([]);
                    updateURL({ clients: [] });
                    const newFilters: Omit<ProjectsFilters, 'page' | 'pageSize'> = {
                      ...filters,
                      clientSlugs: undefined,
                    };
                    setFilters(newFilters);
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                  sx={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    zIndex: 2,
                    px: 1.5,
                    py: 1,
                    backgroundColor: selectedClients.length === 0 ? '#656CAF' : '#E9EAF4',
                    color: selectedClients.length === 0 ? '#FFFFFF' : '#4C53A2',
                    fontFamily: 'Roboto',
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    lineHeight: '1.75rem',
                    letterSpacing: '0.01em',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: selectedClients.length === 0 ? '#4C53A2' : '#C7CAE3',
                    },
                    '& .MuiChip-label': {
                      px: 0,
                    },
                  }}
                />
                <Box 
                  ref={clientScrollRef}
                  onScroll={handleClientScroll}
                  sx={{ 
                    display: 'flex',
                    gap: 1.5,
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    pb: 1,
                    pl: 'calc(3rem + 1rem)', // Width of "All" button + gap
                    pr: '60px', // Space for gradient only
                    minHeight: '42px', // Prevent layout shift
                    '&::-webkit-scrollbar': {
                      display: 'none',
                    },
                  }}
                >
                  {clientsLoading && !clientsData ? (
                    // Show skeleton chips while loading
                    Array.from({ length: 8 }).map((_, index) => (
                      <Box
                        key={`skeleton-${index}`}
                        sx={{
                          height: '42px',
                          minWidth: `${80 + (index % 3) * 20}px`,
                          backgroundColor: '#E9EAF4',
                          borderRadius: '8px',
                          flexShrink: 0,
                          animation: 'pulse 1.5s ease-in-out infinite',
                          animationDelay: `${index * 0.1}s`,
                          '@keyframes pulse': {
                            '0%': {
                              opacity: 1,
                            },
                            '50%': {
                              opacity: 0.6,
                            },
                            '100%': {
                              opacity: 1,
                            },
                          },
                        }}
                      />
                    ))
                  ) : (
                    filteredClientsForChips.map((client) => (
                    <Chip
                      key={client.id}
                      label={client.name}
                      onClick={() => handleClientToggle(client.slug)}
                      onMouseDown={(e) => e.preventDefault()}
                      sx={{
                        px: 1.5,
                        py: 1,
                        backgroundColor: selectedClients.includes(client.slug) ? '#656CAF' : '#E9EAF4',
                        color: selectedClients.includes(client.slug) ? '#FFFFFF' : '#4C53A2',
                        fontFamily: 'Roboto',
                        fontSize: '1.5rem',
                        fontWeight: 400,
                        lineHeight: '1.75rem',
                        letterSpacing: '0.01em',
                        flexShrink: 0,
                        borderRadius: '8px',
                        '&:hover': {
                          backgroundColor: selectedClients.includes(client.slug) ? '#4C53A2' : '#C7CAE3',
                        },
                        '& .MuiChip-label': {
                          px: 0,
                        },
                      }}
                    />
                  ))
                  )}
                </Box>
                
                {/* Right Gradient Overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: '40px',
                    background: 'linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.3) 70%, rgba(255,255,255,0) 100%)',
                    pointerEvents: 'none',
                    opacity: showRightGradient ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                  }}
                />
              </Box>
            </Box>
            
            {/* Stand Size and Type Filters - Combined */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontFamily: 'Roboto',
                  fontSize: '1rem',
                  fontWeight: 700,
                  lineHeight: '1.5rem',
                  letterSpacing: '0.02rem',
                  color: '#000',
                  mb: 1,
                }}
              >
                Stand size
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                <Chip
                  label="All"
                  onClick={() => {
                    setSelectedSizeRanges([]);
                    // Keep types when clicking All
                    updateURL({ sizes: [], types: selectedTypes });
                    const newFilters: Omit<ProjectsFilters, 'page' | 'pageSize'> = {
                      ...filters,
                      sizeRanges: undefined,
                      constructionTypes: selectedTypes.length > 0 ? selectedTypes : undefined, // Keep types
                    };
                    setFilters(newFilters);
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                  sx={{
                    px: 1.5,
                    py: 1,
                    backgroundColor: selectedSizeRanges.length === 0 ? '#656CAF' : '#E9EAF4',
                    color: selectedSizeRanges.length === 0 ? '#FFFFFF' : '#4C53A2',
                    fontFamily: 'Roboto',
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    lineHeight: '1.75rem',
                    letterSpacing: '0.01em',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: selectedSizeRanges.length === 0 ? '#4C53A2' : '#C7CAE3',
                    },
                    '& .MuiChip-label': {
                      px: 0,
                    },
                  }}
                />
                {sizeRanges.map((range) => (
                  <Chip
                    key={range.label}
                    label={range.label}
                    onClick={() => handleSizeToggle(range.label)}
                    onMouseDown={(e) => e.preventDefault()}
                    sx={{
                      px: 1.5,
                      py: 1,
                      backgroundColor: selectedSizeRanges.includes(range.label) ? '#656CAF' : '#E9EAF4',
                      color: selectedSizeRanges.includes(range.label) ? '#FFFFFF' : '#4C53A2',
                      fontFamily: 'Roboto',
                      fontSize: '1.5rem',
                      fontWeight: 400,
                      lineHeight: '1.75rem',
                      letterSpacing: '0.01em',
                      borderRadius: '8px',
                      '&:hover': {
                        backgroundColor: selectedSizeRanges.includes(range.label) ? '#4C53A2' : '#C7CAE3',
                      },
                      '& .MuiChip-label': {
                        px: 0,
                      },
                    }}
                  />
                ))}
                <Chip
                  label="Double-Deckers"
                  onClick={() => handleTypeToggle('double-decker')}
                  onMouseDown={(e) => e.preventDefault()}
                  sx={{
                    px: 1.5,
                    py: 1,
                    backgroundColor: selectedTypes.includes('double-decker') ? '#656CAF' : '#E9EAF4',
                    color: selectedTypes.includes('double-decker') ? '#FFFFFF' : '#4C53A2',
                    fontFamily: 'Roboto',
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    lineHeight: '1.75rem',
                    letterSpacing: '0.01em',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: selectedTypes.includes('double-decker') ? '#4C53A2' : '#C7CAE3',
                    },
                    '& .MuiChip-label': {
                      px: 0,
                    },
                  }}
                />
                <Chip
                  label="Events"
                  onClick={() => handleTypeToggle('events')}
                  onMouseDown={(e) => e.preventDefault()}
                  sx={{
                    px: 1.5,
                    py: 1,
                    backgroundColor: selectedTypes.includes('events') ? '#656CAF' : '#E9EAF4',
                    color: selectedTypes.includes('events') ? '#FFFFFF' : '#4C53A2',
                    fontFamily: 'Roboto',
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    lineHeight: '1.75rem',
                    letterSpacing: '0.01em',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: selectedTypes.includes('events') ? '#4C53A2' : '#C7CAE3',
                    },
                    '& .MuiChip-label': {
                      px: 0,
                    },
                  }}
                />
              </Box>
            </Box>
            
            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="text"
                  onClick={handleClearFilters}
                  sx={{
                    color: '#656CAF',
                    textTransform: 'none',
                    fontFamily: 'Roboto',
                    fontSize: '1rem',
                    fontWeight: 700,
                    letterSpacing: '0.02rem',
                    p: 0,
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: '#4C53A2',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Clear all filters
                </Button>
              </Box>
            )}
          </Box>
        )}
        
        {/* Active Filters Display (Mobile) */}
        {isMobile && hasActiveFilters && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#262626' }}>
                Active filters ({activeFilterValues.length})
              </Typography>
              <Button
                variant="text"
                size="small"
                onClick={handleClearFilters}
                sx={{
                  color: '#656CAF',
                  textTransform: 'none',
                  fontSize: 12,
                  fontWeight: 700,
                  minWidth: 'auto',
                  p: 0.5,
                }}
              >
                Clear all
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {activeFilterValues.map((value, index) => (
                <Chip
                  key={index}
                  label={value}
                  size="small"
                  sx={{
                    backgroundColor: '#656CAF',
                    color: '#FFFFFF',
                    fontFamily: 'Roboto',
                    fontSize: 12,
                    height: '24px',
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
        
        {/* Loading State */}
        {projectsLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        )}
        
        {/* Projects Grid */}
        {!projectsLoading && filteredProjects.length > 0 && (
          <ErrorBoundary>
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
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </Box>
          </ErrorBoundary>
        )}
        
        {/* No Results */}
        {!projectsLoading && filteredProjects.length === 0 && !projectsError && !serverError && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" sx={{ mb: 2, color: '#666' }}>
              No projects found
            </Typography>
            <Typography variant="body1" sx={{ color: '#999' }}>
              Try adjusting your filters or search query
            </Typography>
          </Box>
        )}
        
        {/* Infinite Scroll Trigger */}
        {!projectsLoading && filteredProjects.length > 0 && (
          <InfiniteScrollTrigger
            onIntersect={() => {
              console.log('[INFINITE_SCROLL] Fetch next page triggered');
              fetchNextPage();
            }}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isLoading={projectsLoading}
          />
        )}
      </Container>
      
      <FooterSection />
      
      {/* Mobile Filter Panel */}
      {isMobile && clientsData && (
        <CombinedFilterPanel
          open={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
          clients={clientsData.data}
          selectedClients={selectedClients}
          selectedSizeRanges={selectedSizeRanges}
          selectedTypes={selectedTypes}
          onClientSelect={(slug) => slug ? handleClientToggle(slug) : null}
          onSizeSelect={(size) => size ? handleSizeToggle(size) : null}
          onTypeSelect={(type) => type ? handleTypeToggle(type) : null}
          onReset={handleClearFilters}
        />
      )}
    </Box>
  );
}