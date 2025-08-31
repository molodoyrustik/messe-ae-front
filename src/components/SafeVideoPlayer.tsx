'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useState, useEffect, useRef } from 'react';

interface SafeVideoPlayerProps {
  src: string;
  mobileSrc?: string;
  poster?: string;
  mobilePoster?: string;
}

export const SafeVideoPlayer = ({
  src,
  mobileSrc,
  poster,
  mobilePoster,
}: SafeVideoPlayerProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const currentSrc = isMobile && mobileSrc ? mobileSrc : src;
  const currentPoster = isMobile && mobilePoster ? mobilePoster : poster;

  // Автовоспроизведение видео
  useEffect(() => {
    if (videoRef.current) {
      const playVideo = async () => {
        try {
          await videoRef.current?.play();
        } catch (error) {
          console.log('Autoplay blocked:', error);
        }
      };
      
      if (isVideoLoaded) {
        playVideo();
      }
    }
  }, [isVideoLoaded]);

  const handleLoadedData = () => {
    setIsVideoLoaded(true);
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Видео */}
      <video
        ref={videoRef}
        poster={currentPoster}
        loop
        muted
        playsInline
        autoPlay
        preload="auto"
        onLoadedData={handleLoadedData}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      >
        <source src={currentSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Box>
  );
};