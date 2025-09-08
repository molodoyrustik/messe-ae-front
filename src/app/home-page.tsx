"use client";

import { Box } from "@mui/material";
import Header from "@/components/Header";
import HeroSection from "@/components/landing/HeroSection";
import ClientsSection from "@/components/landing/ClientsSection";
import AdvantagesSection from "@/components/landing/AdvantagesSection";
import AwardsSection from "@/components/landing/AwardsSection";
import ExpoglobalSection from "@/components/landing/ExpoglobalSection";
import ProjectsSection from "@/components/landing/ProjectsSection";
import ParallaxSection from "@/components/landing/ParallaxSection";
import FooterSection from "@/components/landing/FooterSection";
import JsonLd from "@/components/JsonLd";
import {
  organizationSchema,
  websiteSchema,
  serviceSchema,
} from "@/lib/structured-data";

export default function HomePage() {
  return (
    <>
      {/* Structured Data */}
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={serviceSchema} />

      <Box sx={{ minHeight: "100vh" }}>
        {/* Header */}
        <Header />

        {/* Main Landing Sections */}
        <Box component="main">
          <HeroSection />
          <ClientsSection />
          <ProjectsSection />
          <ParallaxSection />
          <AdvantagesSection />
          <AwardsSection />
          <ExpoglobalSection />
          <FooterSection />
        </Box>
      </Box>
    </>
  );
}
