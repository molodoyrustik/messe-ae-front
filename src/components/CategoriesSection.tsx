import React from 'react';
import { Box, Typography, Link, Stack } from '@mui/material';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import NextLink from 'next/link';
import { categoriesApi } from '@/lib/api/categories';

export default async function CategoriesSection() {
  let categories: Array<{ id: string; name: string; href: string; }> = [];
  
  try {
    const data = await categoriesApi.getCategories({ pageSize: 10 });
    categories = data.data.map(cat => ({
      id: cat.slug,
      name: cat.title,
      href: `/articles/categories/${cat.slug}`,
    }));
  } catch (error) {
    console.error('Error loading categories:', error);
  }
  
  return (
    <Box
      data-id="categories-section"
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 'auto', md: '24rem' }, // 384px
        backgroundColor: '#F5F5F5',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        p: { xs: 2, md: 0 },
      }}
    >
      {/* Title */}
      <Typography
        data-id="categories-title"
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          left: { xs: 0, md: '2rem' }, // 32px
          top: { xs: 0, md: '1.5rem' }, // 24px
          fontFamily: 'Roboto',
          fontSize: '1.5rem', // 24px
          fontWeight: 700,
          lineHeight: '1.75rem', // 28px
          letterSpacing: '0.015rem',
          color: '#262626',
          mb: { xs: 2, md: 0 },
        }}
      >
        Categories
      </Typography>

      {/* Categories List */}
      <Stack
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          left: { xs: 0, md: '2rem' }, // 32px
          top: { xs: 'auto', md: '4.75rem' }, // 76px
          width: { xs: '100%', md: 'calc(100% - 4rem)' }, // Full width minus padding
          gap: '0.5rem',
        }}
      >
        {categories.map((category, index) => (
          <Link
            key={category.id}
            component={NextLink}
            href={category.href}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pt: '0.25rem', // 4px
              pb: '0.5rem', // 8px
              borderBottom: index < categories.length - 1 ? '1px solid #E0E0E0' : 'none',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderBottomColor: '#656CAF',
                '& .category-name': {
                  color: '#656CAF',
                },
                '& .category-arrow': {
                  transform: 'translateX(0.25rem)',
                  color: '#656CAF',
                },
              },
            }}
          >
            <Typography
              className="category-name"
              sx={{
                fontFamily: 'Roboto',
                fontSize: '1rem', // 16px
                fontWeight: 400,
                lineHeight: '1.5rem', // 24px
                letterSpacing: '0.01em',
                color: '#262626',
                transition: 'color 0.3s ease',
              }}
            >
              {category.name}
            </Typography>
            <ChevronRightIcon 
              className="category-arrow"
              sx={{ 
                fontSize: '1.125rem', 
                color: '#7B7B7B',
                transition: 'all 0.3s ease',
              }} 
            />
          </Link>
        ))}
      </Stack>
    </Box>
  );
}