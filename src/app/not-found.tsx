import { Metadata } from 'next';
import { NOINDEX_ROBOTS } from '@/lib/seo';
import Link from 'next/link';
import { Box, Container, Typography, Button } from '@mui/material';
import Header from '@/components/Header';
import FooterSection from '@/components/landing/FooterSection';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
  robots: NOINDEX_ROBOTS,
};

export default function NotFound() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <Container maxWidth="xl" sx={{ flex: 1, pt: { xs: 3, md: 7.5 }, pb: { xs: 5, md: 7.5 } }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center' 
        }}>
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: 60, md: 120 },
              fontWeight: 700,
              color: '#656CAF',
              mb: 2
            }}
          >
            404
          </Typography>
          
          <Typography 
            variant="h2" 
            sx={{ 
              fontSize: { xs: 24, md: 36 },
              fontWeight: 700,
              color: '#262626',
              mb: 2
            }}
          >
            Page Not Found
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: { xs: 16, md: 20 },
              color: '#666666',
              mb: 4,
              maxWidth: 600
            }}
          >
            Sorry, the page you are looking for doesn&apos;t exist or has been moved.
          </Typography>
          
          <Link href="/" passHref legacyBehavior>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#656CAF',
                color: '#FFFFFF',
                px: 4,
                py: 1.5,
                fontSize: { xs: 16, md: 18 },
                '&:hover': {
                  backgroundColor: '#4C53A2',
                },
              }}
            >
              Back to Home
            </Button>
          </Link>
        </Box>
      </Container>
      
      <FooterSection />
    </Box>
  );
}