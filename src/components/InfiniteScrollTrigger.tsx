import { useEffect, useRef } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface InfiniteScrollTriggerProps {
  onIntersect: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
}

export default function InfiniteScrollTrigger({
  onIntersect,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
}: InfiniteScrollTriggerProps) {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage && !isLoading) {
          onIntersect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    observer.observe(trigger);

    return () => {
      observer.unobserve(trigger);
    };
  }, [onIntersect, hasNextPage, isFetchingNextPage, isLoading]);

  if (!hasNextPage && !isFetchingNextPage && !isLoading) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography
          sx={{
            fontFamily: 'Roboto',
            fontSize: '1rem',
            fontWeight: 400,
            color: '#666',
          }}
        >
          All projects loaded
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={triggerRef}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
        minHeight: '80px',
      }}
    >
      {(isFetchingNextPage || isLoading) && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={24} />
          <Typography
            sx={{
              fontFamily: 'Roboto',
              fontSize: '1rem',
              fontWeight: 400,
              color: '#666',
            }}
          >
            Loading more projects...
          </Typography>
        </Box>
      )}
    </Box>
  );
}