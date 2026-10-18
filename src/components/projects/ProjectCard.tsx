import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types/api';
import { buildProjectPath } from '@/lib/project-url';
import { getStrapiImageSource } from '@/utils/strapiMedia';
import { formatProjectSizeDisplay, hasDisplaySize } from '@/utils/projectSizes';
import { formatProjectImageAlt } from '@/utils/projectImageAlt';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const image = getStrapiImageSource(project.images?.[0]);

  return (
    <Box
      component={Link}
      href={buildProjectPath(project)}
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
      {image ? (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: 240, md: 328 },
            '& img': {
              objectFit: 'cover',
              borderRadius: '4px',
              transition: 'transform 0.3s ease',
            },
          }}
        >
          <Image
            src={image.src}
            alt={formatProjectImageAlt(project, 0)}
            fill
            sizes="(max-width: 599px) 100vw, (max-width: 899px) 50vw, 33vw"
            quality={80}
          />
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