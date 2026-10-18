'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Chip,
  useMediaQuery,
  useTheme,
  IconButton,
  Button,
} from '@mui/material';
import CombinedFilterPanel from '@/components/projects/CombinedFilterPanel';
import FilterIcon from '@/components/icons/FilterIcon';
import type { Client } from '@/types/api';
import {
  PROJECT_SIZE_RANGES,
  type ProjectsUrlState,
  buildProjectsSearchUrl,
  hasActiveProjectFilters,
} from '@/lib/projects-filters';

interface ProjectsFiltersProps {
  clients: Client[];
  urlState: ProjectsUrlState;
}

export default function ProjectsFilters({ clients, urlState }: ProjectsFiltersProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  const { clients: selectedClients, sizes: selectedSizeRanges, types: selectedTypes } =
    urlState;

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [showLeftGradient, setShowLeftGradient] = useState(false);
  const [showRightGradient, setShowRightGradient] = useState(true);
  const clientScrollRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback(
    (nextState: ProjectsUrlState) => {
      router.push(buildProjectsSearchUrl('/projects', nextState), { scroll: false });
    },
    [router]
  );

  const hasActiveFilters = hasActiveProjectFilters(urlState);

  const activeFilterValues = useMemo(() => {
    const values: string[] = [];

    selectedClients.forEach((slug) => {
      const client = clients.find((item) => item.slug === slug);
      if (client) {
        values.push(client.name);
      }
    });

    selectedSizeRanges.forEach((range) => values.push(range));
    selectedTypes.forEach((type) => {
      if (type === 'double-decker') values.push('Double-Deckers');
      if (type === 'events') values.push('Events');
    });

    return values;
  }, [selectedClients, selectedSizeRanges, selectedTypes, clients]);

  const handleClientToggle = (clientSlug: string) => {
    const newClients = selectedClients.includes(clientSlug) ? [] : [clientSlug];
    navigate({
      ...urlState,
      clients: newClients,
      page: 1,
    });
  };

  const handleSizeToggle = (sizeLabel: string) => {
    const newSizes = selectedSizeRanges.includes(sizeLabel) ? [] : [sizeLabel];
    navigate({
      ...urlState,
      sizes: newSizes,
      page: 1,
    });
  };

  const handleTypeToggle = (type: string) => {
    const newTypes = selectedTypes.includes(type) ? [] : [type];
    navigate({
      ...urlState,
      types: newTypes,
      page: 1,
    });
  };

  const handleClearFilters = () => {
    navigate({
      clients: [],
      sizes: [],
      types: [],
      page: 1,
    });
  };

  const handleClientScroll = useCallback(() => {
    if (clientScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = clientScrollRef.current;
      setShowLeftGradient(scrollLeft > 5);
      setShowRightGradient(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }, []);

  useEffect(() => {
    handleClientScroll();
  }, [clients, handleClientScroll]);

  return (
    <>
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
            With 20 years of experience, messe.ae has successfully completed over 4,000 projects
            worldwide. As one of the leading{' '}
            <Box component="span" sx={{ fontWeight: 700 }}>
              exhibition stand builders in UAE
            </Box>
            , we deliver premium{' '}
            <Box component="span" sx={{ fontWeight: 700 }}>
              exhibition stand designs in Dubai and beyond
            </Box>
            . From tailored exhibition stands to creative display stand exhibition solutions, we
            bring innovation, quality, and expertise to every project. Recognized among top
            exhibitions companies in Dubai, messe.ae is your trusted exhibition stand contractor
            for outstanding exhibition design stand and impactful global presence.
          </Typography>
        </Box>

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

      {!isMobile && (
        <Box sx={{ mb: 4, mt: 4 }}>
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
              <Box
                sx={{
                  position: 'absolute',
                  left: 'calc(3rem + 1rem)',
                  top: 0,
                  bottom: 0,
                  width: '10px',
                  background:
                    'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 30%, rgba(255,255,255,0) 100%)',
                  pointerEvents: 'none',
                  zIndex: 1,
                  opacity: showLeftGradient ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out',
                }}
              />
              <Chip
                label="All"
                onClick={() =>
                  navigate({
                    ...urlState,
                    clients: [],
                    page: 1,
                  })
                }
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
                  pl: 'calc(3rem + 1rem)',
                  pr: '60px',
                  minHeight: '42px',
                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                {clients.map((client) => (
                  <Chip
                    key={client.id}
                    label={client.name}
                    onClick={() => handleClientToggle(client.slug)}
                    onMouseDown={(e) => e.preventDefault()}
                    sx={{
                      px: 1.5,
                      py: 1,
                      backgroundColor: selectedClients.includes(client.slug)
                        ? '#656CAF'
                        : '#E9EAF4',
                      color: selectedClients.includes(client.slug) ? '#FFFFFF' : '#4C53A2',
                      fontFamily: 'Roboto',
                      fontSize: '1.5rem',
                      fontWeight: 400,
                      lineHeight: '1.75rem',
                      letterSpacing: '0.01em',
                      flexShrink: 0,
                      borderRadius: '8px',
                      '&:hover': {
                        backgroundColor: selectedClients.includes(client.slug)
                          ? '#4C53A2'
                          : '#C7CAE3',
                      },
                      '& .MuiChip-label': {
                        px: 0,
                      },
                    }}
                  />
                ))}
              </Box>
              <Box
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: '40px',
                  background:
                    'linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 20%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.3) 70%, rgba(255,255,255,0) 100%)',
                  pointerEvents: 'none',
                  opacity: showRightGradient ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out',
                }}
              />
            </Box>
          </Box>

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
                onClick={() =>
                  navigate({
                    ...urlState,
                    sizes: [],
                    page: 1,
                  })
                }
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
              {PROJECT_SIZE_RANGES.map((range) => (
                <Chip
                  key={range.label}
                  label={range.label}
                  onClick={() => handleSizeToggle(range.label)}
                  onMouseDown={(e) => e.preventDefault()}
                  sx={{
                    px: 1.5,
                    py: 1,
                    backgroundColor: selectedSizeRanges.includes(range.label)
                      ? '#656CAF'
                      : '#E9EAF4',
                    color: selectedSizeRanges.includes(range.label) ? '#FFFFFF' : '#4C53A2',
                    fontFamily: 'Roboto',
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    lineHeight: '1.75rem',
                    letterSpacing: '0.01em',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: selectedSizeRanges.includes(range.label)
                        ? '#4C53A2'
                        : '#C7CAE3',
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
                  backgroundColor: selectedTypes.includes('double-decker')
                    ? '#656CAF'
                    : '#E9EAF4',
                  color: selectedTypes.includes('double-decker') ? '#FFFFFF' : '#4C53A2',
                  fontFamily: 'Roboto',
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  lineHeight: '1.75rem',
                  letterSpacing: '0.01em',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: selectedTypes.includes('double-decker')
                      ? '#4C53A2'
                      : '#C7CAE3',
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

      {isMobile && (
        <CombinedFilterPanel
          open={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
          clients={clients}
          selectedClients={selectedClients}
          selectedSizeRanges={selectedSizeRanges}
          selectedTypes={selectedTypes}
          onClientSelect={(slug) => (slug ? handleClientToggle(slug) : null)}
          onSizeSelect={(size) => (size ? handleSizeToggle(size) : null)}
          onTypeSelect={(type) => (type ? handleTypeToggle(type) : null)}
          onReset={handleClearFilters}
        />
      )}
    </>
  );
}
