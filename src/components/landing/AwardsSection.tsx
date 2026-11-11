"use client";

import { Box, Container, Typography, Stack } from "@mui/material";
import Link from "next/link";

interface AwardData {
  id: string;
  imageMobile: string;
  imageDesktop: string;
  category: string;
  show: string;
  client: string;
  projectHref?: string;
  article: string;
  link: string;
  order: { xs: number; md: number };
}

const internalLinkSx = {
  color: "#656CAF",
  fontWeight: 700,
  textDecoration: "underline",
  textDecorationColor: "#656CAF",
  "&:hover": {
    color: "#4C53A2",
    textDecorationColor: "#4C53A2",
  },
} as const;

interface AwardCardProps {
  award: AwardData;
}

const AWARDS_INTRO = (
  <>
    We proved our expertise by achieving significant awards for outstanding{" "}
    <Box
      component={Link}
      href="/projects"
      sx={{ ...internalLinkSx, fontWeight: 700 }}
    >
      exhibition display stands
    </Box>{" "}
    as one of the leading{" "}
    <Box component="span" sx={{ color: "#656CAF", fontWeight: 700 }}>
      exhibition stand contractor in Dubai and UAE
    </Box>
  </>
);

const AwardCard = ({ award }: AwardCardProps) => {
  const isBottomRow =
    award.category === "Double-Deck Exhibit" ||
    award.category === "International Exhibit";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: { xs: "flex-start", md: "center" },
        alignItems: { xs: "flex-start", md: "flex-start" },
        width: "100%",
        height: "auto",
        overflow: "hidden",
        order: { xs: award.order.xs, md: award.order.md },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: "0.5rem", md: "1.25rem" },
          width: { xs: "100%", md: "100%" },
          maxWidth: { md: "320px" },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: { xs: "75%", md: "100%" },
            maxWidth: { md: "200px" },
            aspectRatio: { xs: isBottomRow ? "20/37" : "2/3", md: "unset" },
            height: { xs: "auto", md: "300px" },
            backgroundColor: "transparent",
            borderRadius: "4px",
            overflow: "hidden",
            flexShrink: 0,
            "& img": {
              width: "auto !important",
            },
          }}
        >
          <Box
            component="picture"
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="source"
              media="(min-width: 900px)"
              srcSet={award.imageDesktop}
            />
            <Box
              component="img"
              src={award.imageMobile}
              alt={`${award.category} - ${award.client}`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>

        <Stack
          spacing={{ xs: "0.125rem", md: "0.25rem" }}
          sx={{ flex: 1, width: "100%" }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "0.25rem",
              alignItems: "baseline",
              flexWrap: "nowrap",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "0.625rem", md: "0.875rem" },
                fontWeight: 700,
                lineHeight: { xs: "0.75rem", md: "1.125rem" },
                letterSpacing: { xs: "normal", md: "0.28px" },
                color: "#000000",
                flexShrink: 0,
              }}
            >
              Category:
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.625rem", md: "0.875rem" },
                fontWeight: 400,
                lineHeight: { xs: "0.75rem", md: "1.125rem" },
                letterSpacing: { xs: "normal", md: "0.28px" },
                color: "#000000",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
                minWidth: 0,
              }}
            >
              {award.category}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "0.25rem",
              alignItems: "baseline",
              flexWrap: "nowrap",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "0.625rem", md: "0.875rem" },
                fontWeight: 700,
                lineHeight: { xs: "0.75rem", md: "1.125rem" },
                letterSpacing: { xs: "normal", md: "0.28px" },
                color: "#000000",
                flexShrink: 0,
              }}
            >
              Show:
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.625rem", md: "0.875rem" },
                fontWeight: 400,
                lineHeight: { xs: "0.75rem", md: "1.125rem" },
                letterSpacing: { xs: "normal", md: "0.28px" },
                color: "#000000",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
                minWidth: 0,
              }}
            >
              {award.show}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "0.25rem",
              alignItems: "baseline",
              flexWrap: "nowrap",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "0.625rem", md: "0.875rem" },
                fontWeight: 700,
                lineHeight: { xs: "0.75rem", md: "1.125rem" },
                letterSpacing: { xs: "normal", md: "0.28px" },
                color: "#000000",
                flexShrink: 0,
              }}
            >
              Client:
            </Typography>
            {award.projectHref ? (
              <Typography
                component={Link}
                href={award.projectHref}
                sx={{
                  fontSize: { xs: "0.625rem", md: "0.875rem" },
                  lineHeight: { xs: "0.75rem", md: "1.125rem" },
                  letterSpacing: { xs: "normal", md: "0.28px" },
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  flex: 1,
                  minWidth: 0,
                  ...internalLinkSx,
                  fontWeight: 400,
                }}
              >
                {award.client}
              </Typography>
            ) : (
              <Typography
                sx={{
                  fontSize: { xs: "0.625rem", md: "0.875rem" },
                  fontWeight: 400,
                  lineHeight: { xs: "0.75rem", md: "1.125rem" },
                  letterSpacing: { xs: "normal", md: "0.28px" },
                  color: "#000000",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {award.client}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: "0.25rem",
              alignItems: "baseline",
              flexWrap: "nowrap",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "0.625rem", md: "0.875rem" },
                fontWeight: 700,
                lineHeight: { xs: "0.75rem", md: "1.125rem" },
                letterSpacing: { xs: "normal", md: "0.28px" },
                color: "#000000",
                flexShrink: 0,
              }}
            >
              Article
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.625rem", md: "0.875rem" },
                fontWeight: 400,
                lineHeight: { xs: "0.75rem", md: "1.125rem" },
                letterSpacing: { xs: "normal", md: "0.28px" },
                color: { xs: "#424242", md: "#262626" },
                flexShrink: 0,
              }}
            >
              at
            </Typography>
            <Typography
              component="a"
              href={award.link}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                fontSize: { xs: "0.625rem", md: "0.875rem" },
                fontWeight: 700,
                lineHeight: { xs: "0.75rem", md: "1.125rem" },
                letterSpacing: { xs: "normal", md: "0.28px" },
                color: "#656CAF",
                textDecoration: "underline",
                textDecorationColor: "#656CAF",
                cursor: "pointer",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
                minWidth: 0,
                "&:hover": {
                  color: "#4C53A2",
                  textDecorationColor: "#4C53A2",
                },
              }}
            >
              {award.article}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

const awards: AwardData[] = [
  {
    id: "pavilion",
    imageMobile: "/awards/award-01-mob.png",
    imageDesktop: "/awards/award-01.png",
    category: "Best Pavilion",
    show: "Big 5",
    client: "Belgium Pavilion",
    projectHref:
      "/projects/belgium-pavilion-156m2-lvvd5flhq5s3232u29ortdir",
    article: "World Exhibition Stand Awards – The Winners Supplement",
    link: "https://viewer.joomag.com/world-exhibition-stand-awards-the-winners-2021/0204724001637744364/p36?short=",
    order: { xs: 1, md: 1 },
  },
  {
    id: "double-deck",
    imageMobile: "/awards/award-02-mob.png",
    imageDesktop: "/awards/award-02.png",
    category: "Double-Deck Exhibit",
    show: "Interplastica",
    client: "Sibur Holding PJSC",
    article: "Exhibitor Magazine",
    link: "https://www.exhibitoronline.com/topics/article.asp?ID=3258&catID=72",
    order: { xs: 3, md: 2 },
  },
  {
    id: "sustainable",
    imageMobile: "/awards/award-03-mob.png",
    imageDesktop: "/awards/award-03.png",
    category: "Best Sustainable Stand",
    show: "ADIPEC",
    client: "Siemens Energy",
    projectHref:
      "/projects/siemens-energy-151.5m2-pzzx4jyifyjp4fznhww2npmt",
    article: "World Exhibition Stand Awards – The Winners Supplement",
    link: "https://viewer.joomag.com/world-exhibition-stand-awards-the-winners-2022/0577511001667816570/p56",
    order: { xs: 2, md: 3 },
  },
  {
    id: "international",
    imageMobile: "/awards/award-04-mob.png",
    imageDesktop: "/awards/award-04.png",
    category: "International Exhibit",
    show: "Dubai International Boat show",
    client: "Amels",
    projectHref: "/projects/damen-100m2-sodzjz1b3k5yhwnxlf8i7f14",
    article: "Exhibitor Magazine",
    link: "https://www.exhibitoronline.com/topics/article.asp?ID=3477&catID=72",
    order: { xs: 4, md: 4 },
  },
];

const AwardsSection = () => {
  return (
    <Box
      component="section"
      sx={{
        pt: { xs: 4, md: 0 },
        backgroundColor: { xs: "#F5F5F5", md: "#FFFFFF" },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          px: { xs: "1rem", md: "2.5rem" },
          display: "flex",
          flexDirection: "column",
          gap: { xs: "1rem", md: 0 },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "0.75rem", md: "2.25rem" },
            lineHeight: { xs: "1rem", md: "2.5rem" },
            letterSpacing: { xs: "0.04em", md: "-0.025em" },
            textAlign: "justify",
            color: { xs: "#424242", md: "#262626" },
            mb: { md: "2.5rem" },
          }}
        >
          {AWARDS_INTRO}
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: { xs: "0.75rem", md: "1rem", lg: "1.25rem" },
            width: "100%",
          }}
        >
          {awards.map((award) => (
            <AwardCard key={award.id} award={award} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default AwardsSection;
