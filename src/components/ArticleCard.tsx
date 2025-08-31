import { 
  Box, 
  Typography, 
  Link,
  Stack 
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import NextLink from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface Article {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  publishDate: string;
  readTime: string;
  category: string;
  image: string;
}

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      component={NextLink}
      href={`/articles/${article.slug}`}
      sx={{ textDecoration: 'none' }}
    >
      <Box
        data-id="article-card"
        sx={{
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '0.75rem', // 12px
          flexShrink: 0,
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-0.25rem)',
            '& .article-image': {
              transform: 'scale(1.05)',
            },
            '& .read-article': {
              color: '#4C53A2',
              '& .article-arrow': {
                transform: 'translateX(0.25rem)',
              },
            },
          },
        }}
      >
        {/* Image */}
        <Box
          data-id="article-card-image-container"
          sx={{
            width: '100%',
            height: { xs: '15rem', md: '15rem' }, // 240px on both mobile and desktop
            position: 'relative',
            borderRadius: '0.5rem',
            overflow: 'hidden',
            backgroundColor: '#F5F5F5',
          }}
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            style={{
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
            }}
            className="article-image"
            priority={false}
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Box>

        {/* Title */}
        <Box
          data-id="article-card-title"
          sx={{
            alignSelf: 'stretch',
            height: { xs: 'auto', md: '3.5rem' }, // Изменено с 4rem на 3.5rem (2 строки * 1.75rem)
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            '& p': {
              fontFamily: 'Roboto',
              fontSize: { xs: '1.25rem', md: '1.5rem' }, // 24px
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: { xs: '1.5rem', md: '1.75rem' }, // 28px
              letterSpacing: '0.015rem',
              color: '#262626',
              margin: 0,
            },
            '& strong, & b': {
              fontWeight: 700,
            },
            '& em, & i': {
              fontStyle: 'italic',
            },
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.title}
          </ReactMarkdown>
        </Box>

        {/* Bottom Info */}
        <Stack
          direction="row"
          sx={{
            alignSelf: 'stretch',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            data-id="article-card-date"
            sx={{
              fontFamily: 'Roboto',
              fontSize: '0.875rem', // 14px
              fontWeight: 400,
              lineHeight: '1.25rem', // 20px
              letterSpacing: '0.01em',
              color: '#262626',
            }}
          >
            {article.publishDate}
          </Typography>

          <Box
            data-id="article-card-read-button"
            className="read-article"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              px: '0.3125rem', // 5px
              py: '0.25rem', // 4px
              borderRadius: '0.5rem',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(101, 108, 175, 0.08)',
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Roboto',
                fontSize: '1rem', // 16px
                fontWeight: 400,
                lineHeight: '1.5rem', // 24px
                letterSpacing: '0.01em',
                color: '#656CAF',
                transition: 'color 0.3s ease',
              }}
            >
              Read article
            </Typography>
            <ArrowForward 
              className="article-arrow"
              sx={{ 
                fontSize: '1rem', 
                color: '#656CAF',
                transition: 'all 0.3s ease',
              }} 
            />
          </Box>
        </Stack>
      </Box>
    </Link>
  );
}