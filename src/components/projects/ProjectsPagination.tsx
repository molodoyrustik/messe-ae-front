import React from 'react';
import Link from 'next/link';
import { Box, Button, Typography } from '@mui/material';
import {
  type ProjectsUrlState,
  buildProjectsSearchUrl,
} from '@/lib/projects-filters';

interface ProjectsPaginationProps {
  urlState: ProjectsUrlState;
  pageCount: number;
}

export default function ProjectsPagination({
  urlState,
  pageCount,
}: ProjectsPaginationProps) {
  const { page: currentPage } = urlState;

  if (pageCount <= 1) {
    return null;
  }

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1).filter((page) => {
    if (pageCount <= 5) return true;
    if (page === 1 || page === pageCount) return true;
    return Math.abs(page - currentPage) <= 1;
  });

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4 }}>
      <Button
        component={Link}
        href={buildProjectsSearchUrl('/projects', { ...urlState, page: currentPage - 1 })}
        variant="outlined"
        disabled={currentPage === 1}
        sx={{
          minWidth: { xs: '36px', md: '40px' },
          height: { xs: '36px', md: '40px' },
          p: 0,
        }}
      >
        ←
      </Button>

      {pages.map((page, index, array) => (
        <React.Fragment key={page}>
          {index > 0 && array[index - 1] !== page - 1 && (
            <Typography sx={{ mx: 1, alignSelf: 'center' }}>...</Typography>
          )}
          <Button
            component={Link}
            href={buildProjectsSearchUrl('/projects', { ...urlState, page })}
            variant={page === currentPage ? 'contained' : 'outlined'}
            sx={{
              minWidth: { xs: '36px', md: '40px' },
              height: { xs: '36px', md: '40px' },
              p: 0,
            }}
          >
            {page}
          </Button>
        </React.Fragment>
      ))}

      <Button
        component={Link}
        href={buildProjectsSearchUrl('/projects', { ...urlState, page: currentPage + 1 })}
        variant="outlined"
        disabled={currentPage === pageCount}
        sx={{
          minWidth: { xs: '36px', md: '40px' },
          height: { xs: '36px', md: '40px' },
          p: 0,
        }}
      >
        →
      </Button>
    </Box>
  );
}
