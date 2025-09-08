"use client";

import React, { useState } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const ContactFormModal = dynamic(() => import("@/components/ContactFormModal").then(mod => ({ default: mod.ContactFormModal })), {
  loading: () => null // No loading indicator to prevent flash
});

// Project categories configuration
const projectCategoriesConfig = [
  {
    id: "small",
    title: "< 100 m",
    subtitle: "²",
    slug: "under-100",
    filterUrl: "/projects?sizes=< 50 m²,50 - 100 m²",
  },
  {
    id: "medium",
    title: "100 m - 300 m",
    subtitle: "²",
    slug: "100-300",
    filterUrl: "/projects?sizes=101 - 300 m²",
  },
  {
    id: "large",
    title: "> 300 m",
    subtitle: "²",
    slug: "over-300",
    filterUrl: "/projects?sizes=> 300 m²",
  },
  {
    id: "double",
    title: "Double-deckers",
    subtitle: "",
    slug: "double-deckers",
    filterUrl: "/projects?types=double-decker",
  },
];

// Category type definition
interface ProjectCategory {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  filterUrl: string;
}

// Static image mapping for categories
const categoryImageMap: Record<string, string> = {
  small: "/projects/projects_01.jpg",
  medium: "/projects/projects_02.jpg",
  large: "/projects/projects_03.jpg",
  double: "/projects/projects_04.jpg",
};

// Project Card Component
const ProjectCard = ({ category }: { category: ProjectCategory }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={category.filterUrl} style={{ display: "block", width: "100%" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "280px", sm: "340px", md: "480px" },
          overflow: "hidden",
          cursor: "pointer",
          transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
          filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
          transform: isHovered ? "scale(1.05)" : "scale(1)",
          transformOrigin: "center center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 100%)",
            zIndex: 1,
          },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Static Background Image */}
        <Image
          src={categoryImageMap[category.id] || "/projects/placeholder.svg"}
          alt={`${category.title} projects`}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 280px, (max-width: 1024px) 300px, 400px"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        {/* Title */}
        <Box
          sx={{
            position: "absolute",
            top: { xs: "12px", md: "20px" },
            left: { xs: "12px", md: "20px" },
            zIndex: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "16px", md: "36px" },
              fontWeight: 700,
              lineHeight: { xs: "24px", md: "40px" },
              letterSpacing: { xs: "0.02em", md: "-0.02em" },
              color: "#FFFFFF",
            }}
          >
            {category.title}
            {category.subtitle && (
              <Typography
                component="sup"
                sx={{
                  fontSize: { xs: "10px", md: "20px" },
                  verticalAlign: "super",
                }}
              >
                {category.subtitle}
              </Typography>
            )}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

const ProjectsSection = () => {
  // Modal state from context
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <Box
      component="section"
      sx={{
        pt: { xs: 4, md: 0 },
        pb: { xs: 4, md: "6.25rem" },
        backgroundColor: { xs: "#F5F5F5", md: "#FFFFFF" },
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: "1rem", md: "2.5rem" } }}>
        {/* Section Title */}
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "24px", md: "48px" },
            fontWeight: 700,
            lineHeight: { xs: "28px", md: "60px" },
            letterSpacing: { xs: "0.01em", md: "normal" },
            color: "#262626",
            textAlign: "left",
            mb: { xs: 3, md: 6 },
          }}
        >
          Our Projects
        </Typography>

        {/* Projects Grid - Desktop and Tablet */}
        <Box
          sx={{
            display: { xs: "none", sm: "grid" },
            gridTemplateColumns: { sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: { sm: 2, md: 4 },
            mb: { sm: 6, md: 8 },
          }}
        >
          {projectCategoriesConfig.map((category) => (
            <ProjectCard key={category.id} category={category} />
          ))}
        </Box>
      </Container>

      {/* Projects Carousel - Mobile (Full Width) */}
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          gap: "8px",
          overflowX: "auto",
          pb: 2,
          mb: 3,
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {projectCategoriesConfig.map((category, index) => (
          <Box
            key={category.id}
            sx={{
              minWidth: "280px",
              scrollSnapAlign: "start",
              pl: index === 0 ? "1rem" : 0, // Padding for first card
              pr: index === projectCategoriesConfig.length - 1 ? "1rem" : 0, // End padding for last card
            }}
          >
            <ProjectCard category={category} />
          </Box>
        ))}
      </Box>

      <Container maxWidth="xl" sx={{ px: { xs: "1rem", md: "2.5rem" } }}>
        {/* Call to Action Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            justifyContent: "space-between",
            gap: { xs: 4, md: 6 },
          }}
        >
          {/* CTA Text */}
          <Typography
            sx={{
              fontSize: { xs: "12px", md: "34px" },
              fontWeight: 400,
              lineHeight: { xs: "16px", md: "42px" },
              letterSpacing: { xs: "0.04em", md: "-0.025em" },
              color: "#262626",
              maxWidth: { xs: "100%", md: "800px", lg: "1000px" },
            }}
          >
            <Box component="span">Take the first step towards </Box>
            <Box component="span" sx={{ fontWeight: 700 }}>
              exhibition success
            </Box>
            <Box component="span">.</Box>
            <Box component="br" />
            <Box component="span">Let&apos;s start planning your </Box>
            <Box component="span" sx={{ fontWeight: 700, color: "#656CAF" }}>
              standout
            </Box>
            <Box component="span"> exhibition </Box>
            <Box component="span" sx={{ fontWeight: 700, color: "#656CAF" }}>
              experience
            </Box>
            <Box component="span">.</Box>
          </Typography>

          {/* CTA Button */}
          <Button
            variant="contained"
            size="large"
            onClick={() => setContactModalOpen(true)}
            sx={{
              width: { xs: "100%", md: "316px" },
              minWidth: { xs: "200px", md: "316px" },
              height: { xs: "36px", md: "48px" },
              px: { xs: 2, md: "22px" },
              py: { xs: "6px", md: "8px" },
              backgroundColor: { xs: "#A64B66", md: "#656CAF" },
              borderRadius: "8px",
              boxShadow:
                "0px 3px 1px -2px rgba(0,0,0,0.20), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
              fontSize: { xs: "16px", md: "24px" },
              fontWeight: 400,
              lineHeight: { xs: "24px", md: "28px" },
              letterSpacing: { xs: "0.02em", md: "-0.025em" },
              textTransform: "none",
              color: "#FFFFFF",

              "&:hover": {
                backgroundColor: { xs: "#8F3F56", md: "#4C53A2" },
                transform: "translateY(-2px)",
                boxShadow: "0px 6px 12px rgba(0,0,0,0.25)",
              },
            }}
          >
            Plan your perfect stand
          </Button>
        </Box>
      </Container>

      {/* Contact Form Modal */}
      <ContactFormModal
        open={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </Box>
  );
};

export default ProjectsSection;
