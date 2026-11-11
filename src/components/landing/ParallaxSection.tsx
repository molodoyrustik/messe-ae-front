'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, Container, useTheme, useMediaQuery } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

type ParallaxSectionProps = {
  className?: string;
};

export default function ParallaxSection({ className = '' }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const isMobileQuery = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);
  
  // Только для мобильных - Framer Motion параллакс
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Увеличенные трансформации для мобильных, чтобы эффект был похож на десктопный fixed
  const mobileBackgroundY = useTransform(scrollYProgress, [0, 1], ['-60%', '60%']);
  const mobileContentY = useTransform(scrollYProgress, [0, 1], ['15%', '-15%']);
  
  // Эффекты появления текста
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <Box
      ref={sectionRef}
      component="section"
      className={className}
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '25rem', md: '37.5rem' },
        overflow: 'hidden',
        mt: 0,
        mb: 0,
      }}
    >
      {/* ДЕСКТОП - CSS Background Fixed */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage: `
            linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.40) 82.25%),
            url('/parallax-bg-1920.webp')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed', // Классический CSS параллакс для десктопа
        }}
      />

      {/* МОБАЙЛ - Framer Motion параллакс */}
      <Box
        component={motion.div}
        style={isMobile ? {
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          y: mobileBackgroundY, // Увеличенный сдвиг для мобильных
        } : {}}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: '-30%', // Увеличенная область для компенсации движения
            backgroundImage: `
              linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.40) 82.25%),
              url('/parallax-bg-mobile.webp')
            `,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </Box>

      {/* Content */}
      <Container 
        maxWidth="xl" 
        sx={{ 
          px: { xs: '1rem', md: '2.5rem' },
          height: '100%',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <Box
          component={motion.div}
          style={
            isMobile
              ? {
                  position: "absolute",
                  bottom: "3.75rem",
                  opacity: textOpacity,
                  y: mobileContentY,
                }
              : {
                  position: "absolute",
                  bottom: "3.75rem",
                }
          }
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Roboto",
              fontSize: { xs: "2rem", md: "3.375rem" },
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: { xs: "2.25rem", md: "3.75rem" },
              color: "rgba(255, 255, 255, 0.80)",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: { md: "scale(1.02)" },
              },
            }}
          >
            Why messe.ae only?
          </Typography>
        </Box>
      </Container>

      {/* Overlay for better text readability */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.3) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
}