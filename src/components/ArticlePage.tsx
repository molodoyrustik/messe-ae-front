import { Box, Container, Typography } from "@mui/material";
import Header from "@/components/Header";
import FooterSection from "@/components/landing/FooterSection";
import ContactFormButton from "@/components/ContactFormButton";
import { Article } from "@/components/ArticleCard";
import LinkedInNotification from "@/components/LinkedInNotification";
import SmallArticleCard from "@/components/SmallArticleCard";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ArticleData {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  authorRole: string;
  publishDate: string;
  readTime: string;
  category: string;
  heroImage: string;
  content: string;
}

interface ArticlePageProps {
  articleData: ArticleData;
  relatedArticles: Article[];
}

export default function ArticlePage({
  articleData,
  relatedArticles,
}: ArticlePageProps) {

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#FFFFFF" }}>
      <Header />
      <LinkedInNotification />

      {/* Hero Section */}
      <Box
        sx={{
          width: "100%",
          aspectRatio: { xs: "auto", md: "1439.80/626.00" },
          height: { xs: "25rem", md: "auto" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.80) 60%), url(${articleData.heroImage}) lightgray 50% / cover no-repeat`,
        }}
      >
        {/* Content wrapper with consistent padding */}
        <Container
          maxWidth="xl"
          sx={{
            height: "100%",
            px: { xs: "1rem", md: "2.5rem" },
            py: { xs: "1.5rem", md: "2.5rem" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Date in top right */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontWeight: 400,
                fontSize: { xs: "1rem", md: "1.5rem" }, // 24px
                lineHeight: { xs: "1.5rem", md: "1.75rem" }, // 28px
                letterSpacing: "0.02rem",
                textAlign: "right",
                color: "#FFFFFF",
                position: "relative",
                zIndex: 2,
              }}
            >
              {articleData.publishDate}
            </Typography>
          </Box>

          {/* Title and Subtitle */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem", // 24px
              position: "relative",
              zIndex: 2,
              pb: { xs: 0, md: "1.25rem" }, // Add bottom padding to match design
            }}
          >
            <Typography
              sx={{
                alignSelf: "stretch",
                fontFamily: "Roboto",
                fontWeight: 400,
                fontSize: { xs: "2rem", md: "3rem" }, // 48px
                lineHeight: { xs: "2.5rem", md: "3.75rem" }, // 60px
                color: "#FFFFFF",
                maxHeight: { xs: "none", md: "7rem" }, // 112px
              }}
            >
              {articleData.title}
            </Typography>
            <Typography
              sx={{
                alignSelf: "stretch",
                fontFamily: "Roboto",
                fontWeight: 400,
                fontSize: { xs: "1rem", md: "1.5rem" }, // 24px
                lineHeight: { xs: "1.5rem", md: "1.75rem" }, // 28px
                letterSpacing: "0.015rem",
                color: "#FFFFFF",
                maxHeight: { xs: "none", md: "6rem" }, // 96px
              }}
            >
              {articleData.subtitle}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Article Content */}
      <Container
        maxWidth="xl"
        sx={{
          pt: { xs: "3rem", md: "3.75rem" },
          pb: { xs: "3rem", md: "6rem" },
          px: { xs: "1rem", md: "2.5rem" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: { xs: 0, md: "5rem" },
            flexDirection: { xs: "column", md: "row" },
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          {/* Article Body */}
          <Box
            sx={{
              width: { xs: "100%", md: "58rem" }, // 928px
              display: "flex",
              flexDirection: "column",
              gap: "2.5rem", // 40px
            }}
          >
            {/* Article content will be rendered here */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "2.5rem",
                "& > p:first-of-type": {
                  fontFamily: "Roboto",
                  fontWeight: 400,
                  fontSize: "1rem",
                  lineHeight: "1.5rem",
                  letterSpacing: "0.02rem",
                  color: "#000",
                  margin: 0,
                },
                "& .section": {
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                },
                "& h1": {
                  fontFamily: "Roboto",
                  fontWeight: 700,
                  fontSize: "3rem",
                  lineHeight: "3.75rem",
                  letterSpacing: "0.02rem",
                  color: "#424242",
                  margin: "2rem 0 1rem 0",
                },
                "& h2": {
                  fontFamily: "Roboto",
                  fontWeight: 700,
                  fontSize: "2.25rem",
                  lineHeight: "2.5rem",
                  letterSpacing: "0.02rem",
                  color: "#424242",
                  margin: "2rem 0 1rem 0",
                },
                "& h3": {
                  fontFamily: "Roboto",
                  fontWeight: 400,
                  fontSize: "1.5rem",
                  lineHeight: "1.75rem",
                  letterSpacing: "0.02rem",
                  color: "#000",
                  margin: "1.5rem 0 0.75rem 0",
                },
                "& h4, & h5, & h6": {
                  fontFamily: "Roboto",
                  fontWeight: 700,
                  fontSize: "1.125rem",
                  lineHeight: "1.5rem",
                  letterSpacing: "0.02rem",
                  color: "#000",
                  margin: "1rem 0 0.5rem 0",
                },
                "& p": {
                  fontFamily: "Roboto",
                  fontWeight: 400,
                  fontSize: "1rem",
                  lineHeight: "1.5rem",
                  letterSpacing: "0.02rem",
                  color: "#000",
                  margin: "0 0 1rem 0",
                },
                "& strong, & b": {
                  fontWeight: 700,
                },
                "& em, & i": {
                  fontStyle: "italic",
                },
                "& ul, & ol": {
                  margin: "0 0 1rem 0",
                  paddingLeft: "2rem",
                },
                "& ul": {
                  listStyleType: "disc",
                },
                "& ol": {
                  listStyleType: "decimal",
                },
                "& li": {
                  fontFamily: "Roboto",
                  fontWeight: 400,
                  fontSize: "1rem",
                  lineHeight: "1.5rem",
                  letterSpacing: "0.02rem",
                  color: "#000",
                  marginBottom: "0.5rem",
                },
                "& blockquote": {
                  margin: "1rem 0",
                  padding: "1rem 1.5rem",
                  borderLeft: "4px solid #656CAF",
                  backgroundColor: "#F5F5F5",
                  "& p": {
                    margin: 0,
                  },
                },
                "& code": {
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                  backgroundColor: "#F5F5F5",
                  padding: "0.125rem 0.25rem",
                  borderRadius: "0.25rem",
                },
                "& pre": {
                  margin: "1rem 0",
                  padding: "1rem",
                  backgroundColor: "#F5F5F5",
                  borderRadius: "0.5rem",
                  overflow: "auto",
                  "& code": {
                    padding: 0,
                    backgroundColor: "transparent",
                  },
                },
                "& hr": {
                  margin: "2rem 0",
                  border: "none",
                  borderTop: "1px solid #E0E0E0",
                },
                "& a": {
                  color: "#656CAF",
                  textDecoration: "underline",
                  "&:hover": {
                    color: "#4C53A2",
                  },
                },
                "& img": {
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  margin: "2rem auto",
                  borderRadius: "0.5rem",
                },
                "& table": {
                  width: "100%",
                  borderCollapse: "collapse",
                  margin: "1rem 0",
                  "& th, & td": {
                    fontFamily: "Roboto",
                    fontSize: "1rem",
                    padding: "0.75rem",
                    textAlign: "left",
                    borderBottom: "1px solid #E0E0E0",
                  },
                  "& th": {
                    fontWeight: 700,
                    backgroundColor: "#F5F5F5",
                  },
                },
                "& .industry-section": {
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                },
                "& .industry-item": {
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                },
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {articleData.content}
              </ReactMarkdown>
            </Box>
          </Box>

          {/* Next Articles Section */}
          <Box
            data-id="next-articles-section"
            sx={{
              width: { xs: "100%", md: "22rem" },
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              mt: { xs: "2rem", md: "2rem" },
              overflow: "hidden",
            }}
          >
            <Typography
              data-id="next-articles-title"
              sx={{
                fontFamily: "Roboto",
                fontWeight: 700,
                fontSize: "1rem",
                lineHeight: "1.5rem",
                letterSpacing: "0.02rem",
                color: "#262626",
              }}
            >
              Next articles
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {relatedArticles.slice(0, 3).map((article) => (
                <SmallArticleCard key={article.id} article={article} />
              ))}
            </Box>
          </Box>
        </Box>

        <ContactFormButton />
      </Container>

      <FooterSection />
    </Box>
  );
}
