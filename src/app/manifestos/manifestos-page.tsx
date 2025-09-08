'use client';

import {
  Box,
  Container,
  Typography,
  Card,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Header from '@/components/Header';
import FooterSection from '@/components/landing/FooterSection';
import DownloadIcon from '@/components/icons/DownloadIcon';

const manifestos = [
  // { title: 'Quality Policy', file: null },
  { title: 'Health and safety Policy', file: '/manifestos/Health and Safety Policy Statement.pdf' },
  { title: 'Environment Policy', file: '/manifestos/Environmental Policy Statement.pdf' },
  { title: 'Worker welfare commitment', file: '/manifestos/Worker Welfare Commitment.pdf' },
  { title: 'Anti-corruption Policy', file: '/manifestos/Anticorruption Policy Statement.pdf' },
  // { title: 'Environment Audit', file: null },
];


export default function ManifestosPageContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <>
      <Header />
      
      <Box sx={{ pt: { xs: '1.5rem', md: '3.75rem' }, pb: { xs: '2.5rem', md: '4.25rem' } }}>
        <Container maxWidth="xl" sx={{ px: { xs: '1rem', md: '2.5rem' } }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.25rem', md: '3.375rem' },
              lineHeight: { xs: '2.75rem', md: '4rem' },
              fontWeight: 700,
              mb: { xs: '1rem', md: '0.75rem' },
              color: 'grey.800'
            }}
          >
            Ethical business manifestos
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              mb: { xs: '1.5rem', md: '2.5rem' },
              color: '#000000',
              fontSize: { xs: '14px', md: '16px' },
              lineHeight: { xs: '18px', md: '24px' },
              letterSpacing: '0.02em'
            }}
          >
            At messe.ae, we are guided by strong ethical values in everything we do. We hold ourselves accountable to the highest standards of integrity, fairness, and responsibility — towards people, partners, and the planet. Ethical conduct is not just a principle for us, it is the foundation of every project we deliver.
          </Typography>
          
          {isMobile ? (
            // Mobile layout - single column
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {manifestos.map((manifesto, index) => (
                <Card
                  key={index}
                  sx={{
                    p: '12px',
                    border: '2px solid #A2A9D0',
                    boxShadow: 'none',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    width: '100%'
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: 'grey.800',
                      fontSize: '16px',
                      lineHeight: '24px',
                      letterSpacing: '0.025em'
                    }}
                  >
                    {manifesto.title}
                  </Typography>
                  
                  <Button
                    variant="text"
                    endIcon={<DownloadIcon />}
                    component={manifesto.file ? 'a' : 'button'}
                    href={manifesto.file || undefined}
                    download={manifesto.file ? true : undefined}
                    target={manifesto.file ? '_blank' : undefined}
                    disabled={!manifesto.file}
                    sx={{
                      justifyContent: 'flex-start',
                      p: 0,
                      fontSize: '12px',
                      lineHeight: '16px',
                      letterSpacing: '0.04em',
                      color: manifesto.file ? 'primary.main' : 'grey.400',
                      textTransform: 'none',
                      textDecoration: 'none',
                      '&:hover': {
                        backgroundColor: 'transparent'
                      },
                      '&.Mui-disabled': {
                        color: 'grey.400'
                      },
                      '& .MuiButton-endIcon': {
                        ml: '4px',
                        '& svg': {
                          width: '16px',
                          height: '16px'
                        }
                      }
                    }}
                  >
                    Download
                  </Button>
                </Card>
              ))}
            </Box>
          ) : (
            // Desktop layout - 2 rows x 3 columns with CSS Grid
            <Box 
              sx={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(280px, 1fr))',
                gap: 4,
                justifyContent: 'start'
              }}
            >
              {manifestos.map((manifesto, index) => (
                <Card
                  key={index}
                  sx={{
                    p: '1.5rem 2rem',
                    border: '2px solid #A2A9D0',
                    boxShadow: 'none',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '1.5rem',
                    minWidth: '280px'
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: 'grey.800',
                      fontSize: '24px',
                      lineHeight: '28px',
                      letterSpacing: '0.025em'
                    }}
                  >
                    {manifesto.title}
                  </Typography>
                  
                  <Button
                    variant="text"
                    endIcon={<DownloadIcon />}
                    component={manifesto.file ? 'a' : 'button'}
                    href={manifesto.file || undefined}
                    download={manifesto.file ? true : undefined}
                    target={manifesto.file ? '_blank' : undefined}
                    disabled={!manifesto.file}
                    sx={{
                      justifyContent: 'flex-start',
                      p: '4px 5px',
                      height: '32px',
                      fontSize: '16px',
                      lineHeight: '24px',
                      letterSpacing: '0.025em',
                      color: manifesto.file ? 'primary.main' : 'grey.400',
                      textTransform: 'none',
                      textDecoration: 'none',
                      '&:hover': {
                        backgroundColor: 'transparent'
                      },
                      '&.Mui-disabled': {
                        color: 'grey.400'
                      },
                      '& .MuiButton-endIcon': {
                        ml: '8px',
                        '& svg': {
                          width: '18px',
                          height: '18px'
                        }
                      }
                    }}
                  >
                    Download
                  </Button>
                </Card>
              ))}
            </Box>
          )}
        </Container>
      </Box>
      
      <FooterSection />
    </>
  );
}
