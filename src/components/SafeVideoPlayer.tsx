'use client';

import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

interface SafeVideoPlayerProps {
  src: string;
  mobileSrc?: string;
  poster?: string;
  mobilePoster?: string;
  captions?: string;
}

export const SafeVideoPlayer = ({
  src,
  mobileSrc,
  poster,
  mobilePoster,
  captions,
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
        aspectRatio: isMobile ? '9/16' : '16/9', // Maintain aspect ratio to prevent rerenders
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Высокоприоритетный poster для улучшения LCP */}
      {currentPoster && (
        <Image
          src={currentPoster}
          alt="Video poster"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
          quality={75}
          style={{
            objectFit: 'cover',
            opacity: isVideoLoaded ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      )}
      
      {/* Видео с отложенной загрузкой - только для клиента */}
      {typeof window !== 'undefined' && shouldLoadVideo && (
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
          {captions && (
            <track
              kind="captions"
              src={captions}
              srcLang="en"
              label="English"
              default
            />
          )}
          Your browser does not support the video tag.
        </video>
      )}
    </Box>
  );
};