'use client';

import { useEffect, useState } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import type { SyntheticEvent } from 'react';
import { Project } from '@/types/api';
import { STRAPI_BASE_URL } from '@/lib/api/config';
import { formatProjectSizeDisplay, formatTotalSizeForUrl, hasDisplaySize } from '@/utils/projectSizes';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const baseImage = project.images?.[0];

  const preferredFormat =
    baseImage?.formats?.medium ||
    baseImage?.formats?.small ||
    baseImage?.formats?.thumbnail ||
    baseImage?.formats?.large;

  const rawImageUrl = preferredFormat?.url || baseImage?.url;

  const imageUrl = rawImageUrl && !rawImageUrl.startsWith('http')
    ? `${STRAPI_BASE_URL}${rawImageUrl}`
    : rawImageUrl;

  const shouldOptimize = Boolean(preferredFormat);

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);

  useEffect(() => {
    setIsImageLoaded(false);
    setHasImageError(false);
  }, [imageUrl]);

  const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    if ((event.currentTarget as HTMLImageElement)?.complete) {
      setIsImageLoaded(true);
    }
  };

  const handleImageError = () => {
    setIsImageLoaded(true);
    setHasImageError(true);
  };

  // Create SEO-friendly URL slug
  const createProjectUrl = () => {
    const clientSlug = project.client?.name
      ? project.client.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
      : 'client';
    const formattedSize = formatTotalSizeForUrl(project);
    const size = `${formattedSize}m2`;
    return `/projects/${clientSlug}-${size}-${project.documentId}`;
  };



  return (
    <Box
      component={Link}
      href={createProjectUrl()}
      sx={{
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
        '&:hover': {
          '& img': {
            transform: 'scale(1.05)',
          },
        },
      }}
    >
      {imageUrl ? (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: 240, md: 328 },
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          {!isImageLoaded && (
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            />
          )}
          {hasImageError ? (
            <Box
              component="img"
              src={imageUrl}
              alt={project.client?.name || project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <Image
              src={imageUrl}
              alt={project.client?.name || project.title}
              fill
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: 'cover',
                borderRadius: '4px',
                transition: 'transform 0.3s ease',
              }}
              onLoad={handleImageLoad}
              onError={handleImageError}
              unoptimized={!shouldOptimize}
            />
          )}
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            height: { xs: 240, md: 328 },
            backgroundColor: '#E9EAF4',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No Image
          </Typography>
        </Box>
      )}
      
      <Box sx={{ display: 'flex', gap: 2.5, flexDirection: 'row' }}>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontSize: { xs: 20, md: 24 },
                lineHeight: '28px',
                letterSpacing: '0.01em',
                color: '#000000',
              }}
            >
              Client:
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontSize: { xs: 20, md: 24 },
                fontWeight: 700,
                lineHeight: '28px',
                letterSpacing: '0.01em',
                color: '#262626',
                flex: 1,
              }}
            >
              {project.client?.name || 'Unknown'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontSize: 16,
                lineHeight: '24px',
                letterSpacing: '0.02em',
                color: '#000000',
              }}
            >
              {project.eventType === 'exhibition' ? 'Exhibition' : 'Event'}:
            </Typography>
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontSize: 16,
                fontWeight: 700,
                lineHeight: '24px',
                letterSpacing: '0.02em',
                color: '#000000',
                flex: 1,
              }}
            >
              {project.eventName || 'N/A'}
            </Typography>
          </Box>
        </Box>
        
        {hasDisplaySize(project) && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontSize: 16,
                fontWeight: 700,
                lineHeight: '24px',
                letterSpacing: '0.02em',
                color: '#000000',
                textAlign: 'right',
              }}
            >
              {formatProjectSizeDisplay(project)} m<sup>2</sup>
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
