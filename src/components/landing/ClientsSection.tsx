'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  styled,
} from '@mui/material';

// Container for the carousel
const CarouselContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$isMobile',
})<{ $isMobile?: boolean }>(({ $isMobile = false }) => ({
  overflow: 'hidden',
  position: 'relative',
  height: $isMobile ? '32px' : '64px', // Mobile: 32px for better quality, Desktop: 64px
  width: '100%',
  isolation: 'isolate',
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  transform: 'translateZ(0)',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    width: $isMobile ? '1rem' : '100px', // Mobile uses 1rem (equal to screen padding)
    height: '100%',
    zIndex: 2,
    pointerEvents: 'none',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  },
  '&::before': {
    left: 0,
    background: 'linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))',
  },
  '&::after': {
    right: 0,
    background: 'linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))',
  },
}));

// Track that moves continuously
const CarouselTrack = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$isMobile' && prop !== 'direction' && prop !== 'duration',
})<{ direction?: 'left' | 'right'; duration?: number; $isMobile?: boolean }>(
  ({ direction = 'left', duration = 120, $isMobile = false }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: $isMobile ? '2rem' : '7.5rem', // Mobile: 2rem, Desktop: 7.5rem
    height: '100%',
    width: 'max-content',
    animation: direction === 'left' 
      ? `scrollLeft ${duration}s linear infinite`
      : `scrollRight ${duration}s linear infinite`,
    willChange: 'transform',
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    '&:hover': {
      animationPlayState: 'paused',
    },
    '@keyframes scrollLeft': {
      '0%': {
        transform: 'translateX(0)',
      },
      '100%': {
        transform: 'translateX(-50%)', // Move half the width (duplicate content)
      },
    },
    '@keyframes scrollRight': {
      '0%': {
        transform: 'translateX(-50%)',
      },
      '100%': {
        transform: 'translateX(0)',
      },
    },
  })
);



// Logo item container
const LogoItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$isMobile',
})<{ $isMobile?: boolean }>(({ $isMobile = false }) => ({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: $isMobile ? '32px' : '64px', // Increased mobile height for better quality
}));

const ClientsSection = () => {
  // Logo dimensions for preventing layout shift
  const logoSizes: Record<string, { width: number; height: number }> = {
    'abbott.png': { width: 466, height: 120 },
    'alstom.png': { width: 606, height: 120 },
    'amazon-web-services.png': { width: 201, height: 120 },
    'anduril.png': { width: 655, height: 120 },
    'aramco.png': { width: 379, height: 120 },
    'canon.png': { width: 536, height: 120 },
    'caterpillar.png': { width: 667, height: 120 },
    'damen.png': { width: 596, height: 120 },
    'diehl.png': { width: 693, height: 120 },
    'drager.png': { width: 298, height: 120 },
    'exxon-mobil.png': { width: 596, height: 120 },
    'genesis.png': { width: 555, height: 120 },
    'getinge.png': { width: 781, height: 120 },
    'halliburton.png': { width: 1556, height: 120 },
    'hapag-lloyd.png': { width: 778, height: 120 },
    'hensoldt.png': { width: 497, height: 120 },
    'infiniti.png': { width: 889, height: 120 },
    'jaguar.png': { width: 1293, height: 120 },
    'jeppesen.png': { width: 1157, height: 120 },
    'john-deere.png': { width: 600, height: 120 },
    'kaspersky.png': { width: 610, height: 120 },
    'knds.png': { width: 409, height: 120 },
    'konica-minolta.png': { width: 848, height: 120 },
    'krones.png': { width: 375, height: 120 },
    'linde.png': { width: 239, height: 120 },
    'linet.png': { width: 649, height: 120 },
    'lyondellbasell.png': { width: 347, height: 120 },
    'medela.png': { width: 628, height: 120 },
    'nissan.png': { width: 143, height: 120 },
    'nobel-biocare.png': { width: 736, height: 120 },
    'omv.png': { width: 423, height: 120 },
    'porsche.png': { width: 1596, height: 120 },
    'rational.png': { width: 478, height: 120 },
    'red-hat.png': { width: 467, height: 120 },
    'schneider-electric.png': { width: 574, height: 120 },
    'siemens.png': { width: 658, height: 120 },
    'siemens-energy.png': { width: 350, height: 120 },
    'siemens-healthineers.png': { width: 492, height: 120 },
    'visa.png': { width: 370, height: 120 },
  };

  // Filtered logos based on user's "Yes" list
  const approvedLogos = [
    { name: 'Abbott', filename: 'abbott.png' },
    { name: 'Alstom', filename: 'alstom.png' },
    { name: 'Amazon Web Services', filename: 'amazon-web-services.png' },
    { name: 'Anduril', filename: 'anduril.png' },
    { name: 'Aramco', filename: 'aramco.png' },
    { name: 'Canon', filename: 'canon.png' },
    { name: 'Caterpillar', filename: 'caterpillar.png' },
    { name: 'Damen', filename: 'damen.png' },
    { name: 'Diehl', filename: 'diehl.png' },
    { name: 'Drager', filename: 'drager.png' },
    { name: 'Exxon Mobil', filename: 'exxon-mobil.png' },
    { name: 'Genesis', filename: 'genesis.png' },
    { name: 'Getinge', filename: 'getinge.png' },
    { name: 'Halliburton', filename: 'halliburton.png' },
    { name: 'Hapag Lloyd', filename: 'hapag-lloyd.png' },
    { name: 'Hensoldt', filename: 'hensoldt.png' },
    { name: 'Infiniti', filename: 'infiniti.png' },
    { name: 'Jaguar', filename: 'jaguar.png' },
    { name: 'Jeppesen', filename: 'jeppesen.png' },
    { name: 'John Deere', filename: 'john-deere.png' },
    { name: 'Kaspersky', filename: 'kaspersky.png' },
    { name: 'KNDS', filename: 'knds.png' },
    { name: 'Konica Minolta', filename: 'konica-minolta.png' },
    { name: 'Krones', filename: 'krones.png' },
    { name: 'Linde', filename: 'linde.png' },
    { name: 'Linet', filename: 'linet.png' },
    { name: 'Lyondellbasell', filename: 'lyondellbasell.png' },
    { name: 'Medela', filename: 'medela.png' },
    { name: 'Nissan', filename: 'nissan.png' },
    { name: 'Nobel Biocare', filename: 'nobel-biocare.png' },
    { name: 'OMV', filename: 'omv.png' },
    { name: 'Porsche', filename: 'porsche.png' },
    { name: 'Rational', filename: 'rational.png' },
    { name: 'Red Hat', filename: 'red-hat.png' },
    { name: 'Schneider Electric', filename: 'schneider-electric.png' },
    { name: 'Siemens', filename: 'siemens.png' },
    { name: 'Siemens Energy', filename: 'siemens-energy.png' },
    { name: 'Siemens Healthineers', filename: 'siemens-healthineers.png' },
    { name: 'Visa', filename: 'visa.png' },
  ];

  // Split approved logos into desktop lines (2 lines)
  const midPoint = Math.ceil(approvedLogos.length / 2);
  const desktopLine1 = approvedLogos.slice(0, midPoint);
  const desktopLine2 = approvedLogos.slice(midPoint);

  // Split approved logos into mobile lines (3 lines)
  const mobileLineSize = Math.ceil(approvedLogos.length / 3);
  const mobileLine1 = approvedLogos.slice(0, mobileLineSize);
  const mobileLine2 = approvedLogos.slice(mobileLineSize, mobileLineSize * 2);
  const mobileLine3 = approvedLogos.slice(mobileLineSize * 2);

  // Create extended arrays for smooth looping
  const extendedDesktopLine1 = [...desktopLine1, ...desktopLine1];
  const extendedDesktopLine2 = [...desktopLine2, ...desktopLine2];
  const extendedMobileLine1 = [...mobileLine1, ...mobileLine1];
  const extendedMobileLine2 = [...mobileLine2, ...mobileLine2];
  const extendedMobileLine3 = [...mobileLine3, ...mobileLine3];

  const renderLogoLine = (logos: { name: string; filename: string }[], lineKey: string, direction: 'left' | 'right', duration: number = 120, isMobile: boolean = false) => {
    return (
    <CarouselContainer $isMobile={isMobile}>
      <CarouselTrack direction={direction} duration={duration} $isMobile={isMobile}>
        {logos.map((logo, index) => (
          <LogoItem key={`${lineKey}-${logo.filename}-${index}`} $isMobile={isMobile}>
            {(() => {
              const webpFilename = logo.filename.replace('.png', '.webp');
              const logoSize = logoSizes[logo.filename];
              
              if (isMobile) {
                return (
                  <Box
                    component="picture"
                    sx={{
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      component="source"
                      srcSet={`/client-logos/${webpFilename}`}
                      type="image/webp"
                    />
                    <Box
                      component="img"
                      src={`/client-logos/${logo.filename}`}
                      alt={logo.name}
                      loading="lazy"
                      width={logoSize.width}
                      height={logoSize.height}
                      sx={{
                        height: '28px',
                        width: 'auto',
                        maxWidth: '120px',
                        objectFit: 'contain',
                        filter: 'grayscale(100%) contrast(1.2)',
                        opacity: 0.9,
                        transition: 'all 0.3s ease',
                        imageRendering: '-webkit-optimize-contrast',
                        WebkitImageRendering: '-webkit-optimize-contrast',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)',
                      }}
                    />
                  </Box>
                );
              } else {
                return (
                  <Box
                    component="picture"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      height: { sm: '36px', md: '48px' },
                    }}
                  >
                    <Box
                      component="source"
                      srcSet={`/client-logos/${webpFilename}`}
                      type="image/webp"
                    />
                    <Box
                      component="img"
                      src={`/client-logos/${logo.filename}`}
                      alt={logo.name}
                      loading="lazy"
                      width={logoSize.width}
                      height={logoSize.height}
                      sx={{
                        height: { sm: '36px', md: '48px' },
                        width: 'auto',
                        maxWidth: { sm: '160px', md: '180px' },
                        objectFit: 'contain',
                        filter: 'grayscale(100%) contrast(1.2)',
                        opacity: 0.7,
                        transition: 'all 0.3s ease',
                        imageRendering: 'auto',
                        WebkitImageRendering: 'auto',
                        '&:hover': {
                          filter: 'grayscale(0%) contrast(1)',
                          opacity: 1,
                        },
                      }}
                    />
                  </Box>
                );
              }
            })()}
          </LogoItem>
        ))}
      </CarouselTrack>
    </CarouselContainer>
    );
  };

  return (
    <Box
      component="section"
      sx={{
        pt: { xs: '2.5rem', md: 8 }, // Mobile: 2.5rem, Desktop: 8 (64px)
        pb: { xs: 0, md: 8 }, // Mobile: 0, Desktop: 8 (64px)
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: '1rem', md: '2.5rem' } }}>
        {/* Section Title */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: { xs: 'flex-start', md: 'flex-start' }, // Mobile: left, Desktop: left
            textAlign: { xs: 'left', md: 'left' }, // Mobile: left, Desktop: left
            width: '100%',
            mb: { xs: '1rem', md: 6 }, // Mobile: 1rem, Desktop: 6 (48px)
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '0.75rem', sm: '1.5rem', md: 36 },
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: { xs: '1rem', sm: '1.75rem', md: 1.11 },
              letterSpacing: { xs: '0.03rem', sm: '0.01em', md: '-0.02em' },
              color: '#262626', // Direct color for grey.800
              textAlign: { xs: 'left', md: 'left' }, // Mobile: left, Desktop: left
              width: '100%',
            }}
          >
            <Box component="span" sx={{ color: '#262626', fontWeight: 400 }}>
              We build{' '}
            </Box>
            <Box 
              component="span" 
              sx={{ 
                color: '#656CAF',
                fontWeight: { xs: 400, md: 700 }, // Mobile: 400, Desktop: 700
              }}
            >
              partnerships
            </Box>
            <Box component="span" sx={{ color: '#262626', fontWeight: 400 }}>
              {' '}that always come back
            </Box>
          </Typography>
        </Box>

        {/* Desktop Layout - 2 Lines */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          {/* Desktop Line 1 - Left to Right */}
          {renderLogoLine(extendedDesktopLine1, 'desktop-line1', 'left', 180, false)}
          
          {/* Desktop Line 2 - Right to Left */}
          <Box sx={{ mt: '32px' }}>
            {renderLogoLine(extendedDesktopLine2, 'desktop-line2', 'right', 200, false)}
          </Box>
        </Box>

        {/* Mobile Layout - 3 Lines */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: { xs: '2.75rem', md: 0 } }}>
          {/* Mobile Line 1 - Left to Right */}
          {renderLogoLine(extendedMobileLine1, 'mobile-line1', 'left', 100, true)}
          
          {/* Mobile Line 2 - Right to Left */}
          <Box sx={{ mt: '0.25rem' }}>
            {renderLogoLine(extendedMobileLine2, 'mobile-line2', 'right', 120, true)}
          </Box>
          
          {/* Mobile Line 3 - Left to Right */}
          <Box sx={{ mt: '0.25rem' }}>
            {renderLogoLine(extendedMobileLine3, 'mobile-line3', 'left', 110, true)}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ClientsSection; 