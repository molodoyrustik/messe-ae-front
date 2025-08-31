'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useState, useEffect, useRef, useCallback } from 'react';

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
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const currentSrc = isMobile && mobileSrc ? mobileSrc : src;
  const currentPoster = isMobile && mobilePoster ? mobilePoster : poster;

  // Отложенная загрузка видео после первого рендера для улучшения LCP
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoadVideo(true);
    }, 100); // Небольшая задержка для улучшения LCP

    return () => clearTimeout(timer);
  }, []);

  // Автовоспроизведение видео после загрузки
  const playVideo = useCallback(async () => {
    if (videoRef.current && isVideoLoaded) {
      try {
        await videoRef.current.play();
      } catch (error) {
        console.log('Autoplay blocked:', error);
      }
    }
  }, [isVideoLoaded]);

  useEffect(() => {
    if (isVideoLoaded) {
      playVideo();
    }
  }, [isVideoLoaded, playVideo]);

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
      {/* Высокоприоритетный poster для улучшения LCP */}
      {!isVideoLoaded && currentPoster && (
        <Box
          component="img"
          src={currentPoster}
          alt="Video poster"
          fetchPriority="high"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
      
      {/* Видео с отложенной загрузкой */}
      {shouldLoadVideo && (
        <video
          ref={videoRef}
          poster={currentPoster}
          loop
          muted
          playsInline
          autoPlay
          preload="none"
          onLoadedData={handleLoadedData}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isVideoLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          <source src={currentSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </Box>
  );
};