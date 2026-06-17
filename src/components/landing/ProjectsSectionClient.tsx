'use client';

import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { ContactFormModal } from '@/components/ContactFormModal';
import { useMobileMenu } from '@/contexts/MobileMenuContext';
import { Project } from '@/types/api';
import { STRAPI_BASE_URL } from '@/lib/api/config';
import { trackModalOpen } from '@/lib/analytics';
import { formatProjectImageAlt } from '@/utils/projectImageAlt';

// Helper function to get full image URL
const getImageUrl = (url: string) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // For Strapi images that come with relative paths
  return `${STRAPI_BASE_URL}${url}`;
};

// Project categories configuration
const projectCategoriesConfig = [
  {
    id: 'small',
    title: '< 100 m',
    subtitle: '²',
    slug: 'under-100',
    filterUrl: '/projects?sizes=< 50 m²,50 - 100 m²',
  },
  {
    id: 'medium',
    title: '100 m - 300 m',
    subtitle: '²',
    slug: '100-300',
    filterUrl: '/projects?sizes=101 - 300 m²',
  },
  {
    id: 'large',
    title: '> 300 m',
    subtitle: '²',
    slug: 'over-300',
    filterUrl: '/projects?sizes=> 300 m²',
  },
  {
    id: 'double',
    title: 'Double-deckers',
    subtitle: '',
    slug: 'double-deckers',
    filterUrl: '/projects?types=double-decker',
  },
];

// Category type definition
interface ProjectCategory {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  filterUrl: string;
  projects: Project[];
}

// Project Card Component
const ProjectCard = ({ category, currentIndex, onNavigate }: {
  category: ProjectCategory;
  currentIndex: number;
  onNavigate: (direction: 'prev' | 'next') => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '280px', md: '480px' },
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          borderRadius: '4px',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
          filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          transformOrigin: 'center center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)',
            zIndex: 1,
          },
        }}
      >
      {/* Background Images with Slide Animation */}
      <Link href={category.filterUrl} style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
        {category.projects.length > 0 ? (
          category.projects.slice(0, 3).map((project, index) => (
            <Box
              key={project.id}
              sx={{
                position: 'absolute',
                inset: 0,
                opacity: index === currentIndex ? 1 : 0,
                transform: `translateX(${(index - currentIndex) * 100}%)`,
                transition: 'all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              {project.images && project.images.length > 0 ? (
                <Image
                  src={getImageUrl(project.images[0].url)}
                  alt={formatProjectImageAlt(project, 0)}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 300px, 400px"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#E0E0E0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    {project.title}
                  </Typography>
                </Box>
              )}
            </Box>
          ))
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: '#E0E0E0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No projects
            </Typography>
          </Box>
        )}
      </Link>

      {/* Title */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '12px', md: '20px' },
          left: { xs: '12px', md: '20px' },
          zIndex: 4,
          pointerEvents: 'none',
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '16px', md: '36px' },
            fontWeight: 700,
            lineHeight: { xs: '24px', md: '40px' },
            letterSpacing: { xs: '0.02em', md: '-0.02em' },
            color: '#FFFFFF',
          }}
        >
          {category.title}
          {category.subtitle && (
            <Typography
              component="sup"
              sx={{
                fontSize: { xs: '10px', md: '20px' },
                verticalAlign: 'super',
              }}
            >
              {category.subtitle}
            </Typography>
          )}
        </Typography>
      </Box>

      {/* Progress Indicators */}
      {category.projects.length > 1 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        >
          {category.projects.slice(0, 3).map((_, index) => (
            <Box
              key={index}
              sx={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                opacity: index === currentIndex ? 1 : 0.4,
                transition: 'opacity 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            />
          ))}
        </Box>
      )}

      </Box>
      
      {/* Navigation Buttons - Outside the scaling container */}
      {category.projects.length > 1 && (
      <>
        <Box
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('prev');
          }}
          sx={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 3,
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M30 36L18 24L30 12" stroke="white" strokeWidth={isHovered ? "3" : "2"} strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Box>

        <Box
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('next');
          }}
          sx={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 3,
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path d="M18 36L30 24L18 12" stroke="white" strokeWidth={isHovered ? "3" : "2"} strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Box>
      </>
      )}
    </Box>
  );
};

interface ProjectsSectionClientProps {
  projects: Project[];
}

const ProjectsSectionClient = ({ projects }: ProjectsSectionClientProps) => {
  // Track current project index for each category
  const [currentIndices, setCurrentIndices] = useState<Record<string, number>>(
    projectCategoriesConfig.reduce((acc, cat) => ({ ...acc, [cat.id]: 0 }), {})
  );
  
  // Modal state from context
  const { isModalOpen, setModalOpen } = useMobileMenu();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
  // Group projects by category
  const categorizedProjects = useMemo(() => {
    const categorized: Record<string, Project[]> = {
      small: [],
      medium: [],
      large: [],
      double: [],
    };
    
    projects.forEach(project => {
      // Check if it's a double-decker
      if (project.constructionType === 'double-decker') {
        categorized.double.push(project);
      } else {
        // Categorize by size - only if totalSize is defined
        const size = project.totalSize;
        if (!!size) {
          if (size < 100) {
            categorized.small.push(project);
          } else if (size >= 100 && size <= 300) {
            categorized.medium.push(project);
          } else if (size > 300) {
            categorized.large.push(project);
          }
        }
        // Projects without totalSize are skipped from size categories
      }
    });
    
    return categorized;
  }, [projects]);

  // Create categories with real project data
  const projectCategories = useMemo(() => {
    return projectCategoriesConfig.map(config => ({
      ...config,
      projects: categorizedProjects[config.id] || [],
    }));
  }, [categorizedProjects]);

  const handleNavigate = (categoryId: string, direction: 'prev' | 'next') => {
    const category = projectCategories.find(cat => cat.id === categoryId);
    if (!category) return;

    const currentIndex = currentIndices[categoryId];
    const projectCount = Math.min(category.projects.length, 3); // Max 3 projects per category
    let newIndex = currentIndex;

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % projectCount;
    } else {
      newIndex = currentIndex === 0 ? projectCount - 1 : currentIndex - 1;
    }

    setCurrentIndices(prev => ({ ...prev, [categoryId]: newIndex }));
  };

  return (
    <Box
      component="section"
      sx={{
        pt: { xs: 4, md: 0 },
        pb: { xs: 4, md: '6.25rem' },
        backgroundColor: { xs: '#F5F5F5', md: '#FFFFFF' },
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: '1rem', md: '2.5rem' } }}>
        {/* Section Title */}
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: '24px', md: '48px' },
            fontWeight: 700,
            lineHeight: { xs: '28px', md: '60px' },
            letterSpacing: { xs: '0.01em', md: 'normal' },
            color: '#262626',
            textAlign: 'left',
            mb: { xs: 3, md: 6 },
          }}
        >
          Our Projects
        </Typography>

        {/* Projects Grid - Desktop */}
        <Box
          sx={{
            display: { xs: 'none', md: 'grid' },
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 4,
            mb: 8,
          }}
        >
          {projectCategories.map((category) => (
            <ProjectCard
              key={category.id}
              category={category}
              currentIndex={currentIndices[category.id] || 0}
              onNavigate={(direction) => handleNavigate(category.id, direction)}
            />
          ))}
        </Box>
      </Container>

      {/* Projects Carousel - Mobile (Full Width) */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          gap: '8px',
          overflowX: 'auto',
          pb: 2,
          mb: 3,
          scrollSnapType: 'x mandatory',
          pl: '1rem', // Start padding to align first card
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {projectCategories.map((category, index) => (
          <Box
            key={category.id}
            sx={{
              minWidth: '280px',
              scrollSnapAlign: 'start',
              pr: index === projectCategories.length - 1 ? '1rem' : 0, // End padding for last card
            }}
          >
            <ProjectCard
              category={category}
              currentIndex={currentIndices[category.id] || 0}
              onNavigate={(direction) => handleNavigate(category.id, direction)}
            />
          </Box>
        ))}
      </Box>

      <Container maxWidth="xl" sx={{ px: { xs: '1rem', md: '2.5rem' } }}>

        {/* Call to Action Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: { xs: 4, md: 6 },
          }}
        >
          {/* CTA Text */}
          <Typography
            sx={{
              fontSize: { xs: '12px', md: '34px' },
              fontWeight: 400,
              lineHeight: { xs: '16px', md: '42px' },
              letterSpacing: { xs: '0.04em', md: '-0.025em' },
              color: '#262626',
              maxWidth: { xs: '100%', md: '800px', lg: '1000px' },
            }}
          >
            <Box component="span">Take the first step towards </Box>
            <Box component="span" sx={{ fontWeight: 700 }}>exhibition success</Box>
            <Box component="span">.</Box>
            <Box component="br" />
            <Box component="span">Let&apos;s start planning your </Box>
            <Box component="span" sx={{ fontWeight: 700, color: '#656CAF' }}>standout</Box>
            <Box component="span"> exhibition </Box>
            <Box component="span" sx={{ fontWeight: 700, color: '#656CAF' }}>experience</Box>
          </Typography>

          {/* CTA Button */}
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              trackModalOpen(
                isDesktop ? 'projects_page_desktop' : 'projects_page_mobile'
              );
              setModalOpen(true);
            }}
            sx={{
              width: { xs: '100%', md: '316px' },
              minWidth: { xs: '200px', md: '316px' },
              height: { xs: '36px', md: '48px' },
              px: { xs: 2, md: '22px' },
              py: { xs: '6px', md: '8px' },
              backgroundColor: { xs: '#A64B66', md: '#656CAF' },
              borderRadius: '8px',
              boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.20), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
              fontSize: { xs: '16px', md: '24px' },
              fontWeight: 400,
              lineHeight: { xs: '24px', md: '28px' },
              letterSpacing: { xs: '0.02em', md: '-0.025em' },
              textTransform: 'none',
              color: '#FFFFFF',
              
              '&:hover': {
                backgroundColor: { xs: '#8F3F56', md: '#4C53A2' },
                transform: 'translateY(-2px)',
                boxShadow: '0px 6px 12px rgba(0,0,0,0.25)',
              },
            }}
          >
            Plan your perfect stand
          </Button>
        </Box>
      </Container>
      
      {/* Contact Form Modal */}
      <ContactFormModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Box>
  );
};

export default ProjectsSectionClient;
