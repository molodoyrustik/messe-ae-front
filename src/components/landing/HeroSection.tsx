"use client";

import {
  Box,
  Typography,
  Button,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { ClientOnly } from "@/components/ClientOnly";
import { SafeVideoPlayer } from "@/components/SafeVideoPlayer";

const ContactFormModal = dynamic(() => import("@/components/ContactFormModal").then(mod => ({ default: mod.ContactFormModal })), {
  loading: () => null // No loading indicator to prevent flash
});

const HeroSection = () => {
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [showButtonDueToContactForm, setShowButtonDueToContactForm] =
    useState(true);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const heroRef = useRef<HTMLDivElement>(null);
  const heroButtonRef = useRef<HTMLButtonElement>(null);

  // Preload critical images - use WebP for better compression
  const heroImage = isMobile ? "/images/hero-poster-mobile-cropped.webp" : "/images/hero-poster.webp";

  useEffect(() => {
    if (!isMobile) return;

    const heroButtonObserverForFloating = new IntersectionObserver(
      () => {
        if (heroButtonRef.current) {
          const buttonRect = heroButtonRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const offset = 64; // 4rem = 64px
          const scrollY = window.scrollY || window.pageYOffset;

          // ВАЖНО: показываем только если прокрутили больше 200px
          const shouldShowFloating =
            scrollY > 200 &&
            (buttonRect.top > viewportHeight - offset ||
              buttonRect.bottom < offset);
          setShowFloatingButton(shouldShowFloating);
        }
      },
      {
        threshold: 0,
        rootMargin: "0px",
      }
    );

    const currentButtonRef = heroButtonRef.current;

    if (currentButtonRef) {
      heroButtonObserverForFloating.observe(currentButtonRef);
    }

    const handleScroll = () => {
      // Check for footer form container - more precise targeting
      const footerForm = document.getElementById("footer-form-container");
      if (footerForm) {
        const formRect = footerForm.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Hide button when footer form container starts becoming visible
        // Adding 100px margin so button disappears slightly before form becomes visible
        const shouldHideButton = formRect.top < windowHeight + 100;
        setShowButtonDueToContactForm(!shouldHideButton);
      } else {
        // Fallback: check for footer section
        const footerSection = document.getElementById("footer-section");
        if (footerSection) {
          const footerTop = footerSection.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          // Hide button when footer is getting close to viewport
          const shouldHideButton = footerTop < windowHeight + 150;
          setShowButtonDueToContactForm(!shouldHideButton);
        }
      }

      // Additional checks on scroll
      if (heroButtonRef.current) {
        const buttonRect = heroButtonRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const offset = 64; // 4rem = 64px
        const scrollY = window.scrollY || window.pageYOffset;

        // Check for floating button visibility (viewport - 4rem offset)
        const shouldShowFloating =
          scrollY > 200 &&
          (buttonRect.top > viewportHeight - offset ||
            buttonRect.bottom < offset);
        setShowFloatingButton(shouldShowFloating);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (currentButtonRef) {
        heroButtonObserverForFloating.unobserve(currentButtonRef);
      }
    };
  }, [isMobile]);

  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          href={`/_next/image?url=${encodeURIComponent(heroImage)}&w=1920&q=75`}
          fetchPriority="high"
        />
      </Head>
      <Box
        ref={heroRef}
        sx={{
          width: "100vw",
          height: { xs: "calc(100vh - 3.375rem)", md: "calc(100vh - 128px)" },
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
      {/* Video Background */}
      <SafeVideoPlayer
        src="/videos/hero-video-optimized.mp4"
        mobileSrc="/videos/hero-video-mobile.mp4"
        poster="/images/hero-poster.webp"
        mobilePoster="/images/hero-poster-mobile-cropped.webp"
      />

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 1) 84.13%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <Container
        maxWidth="xl"
        sx={{
          height: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Desktop Layout - Bottom Container */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            position: "absolute",
            bottom: "2.5rem",
            left: "2.5rem",
            right: "2.5rem",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* Main Title */}
          <h1
            style={{
              maxWidth: "1084px",
              fontSize: "54px",
              fontWeight: 700,
              lineHeight: "60px",
              letterSpacing: "normal",
              color: "#FFFFFF",
              fontFamily: "Roboto, Arial, sans-serif",
              margin: 0,
            }}
          >
            Exhibition Stand Builder & Designer in UAE and around the world
          </h1>

          {/* Subtitle with mixed styling */}
          <Typography
            component="div"
            sx={{
              fontSize: "34px",
              fontWeight: 400,
              lineHeight: "42px",
              letterSpacing: "-0.025em",
              color: "#FFFFFF",
              maxWidth: "900px",
            }}
          >
            <Box component="span">Your great </Box>
            <Box component="span" sx={{ fontWeight: 700 }}>
              exhibition stand design
            </Box>
            <Box component="span"> starts here.</Box>
            <Box component="span" sx={{ display: "block" }}>
              {" "}
            </Box>
            <Box component="span" sx={{ fontWeight: 700, color: "#656CAF" }}>
              Fill in
            </Box>
            <Box component="span"> the </Box>
            <Box component="span" sx={{ fontWeight: 700, color: "#656CAF" }}>
              form
            </Box>
            <Box component="span">, and we will handle the rest.</Box>
          </Typography>

          {/* "20 years" text */}
          <Box
            sx={{
              display: "flex",
              alignItems: "baseline",
              gap: "1rem",
              mt: "1rem",
            }}
          >
            <Typography
              sx={{
                fontSize: "120px",
                fontWeight: 700,
                lineHeight: "140px",
                color: "#FFFFFF",
              }}
            >
              20
            </Typography>
            <Typography
              sx={{
                fontSize: "34px",
                fontWeight: 400,
                lineHeight: "42px",
                letterSpacing: "-0.025em",
                color: "#FFFFFF",
                alignSelf: "center",
              }}
            >
              years of award winning expertise
            </Typography>
          </Box>
        </Box>

        {/* Discuss Your Project Button - Desktop Only */}
        <Button
          variant="contained"
          onClick={() => setContactModalOpen(true)}
          sx={{
            position: "absolute",
            right: "2.5rem",
            bottom: "24dvh",
            width: "320px",
            height: "48px",
            backgroundColor: "primary.main",
            borderRadius: "8px",
            boxShadow:
              "0px 3px 1px -2px rgba(0,0,0,0.20), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
            textTransform: "none",
            fontSize: "24px",
            fontWeight: 400,
            lineHeight: "28px",
            letterSpacing: "normal",
            color: "#FFFFFF",
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            alignItems: "center",
            px: "20px",
            py: "8px",

            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Discuss Your Project
        </Button>

        {/* Mobile Layout - Combined bottom block */}
        <Box
          sx={{
            position: "absolute",
            bottom: "0.5rem",
            left: "1rem",
            right: "1rem",
            display: { xs: "flex", md: "none" },
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          {/* Main Title - Mobile */}
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 700,
              lineHeight: "28px",
              letterSpacing: "0.01em",
              color: "#FFFFFF",
              fontFamily: "Roboto, Arial, sans-serif",
              margin: "0 0 12px 0",
            }}
          >
            Exhibition Stand Builder & Designer in UAE and around the world
          </h1>

          {/* Subtitle with mixed styling - Mobile */}
          <Typography
            component="div"
            sx={{
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: "16px",
              letterSpacing: "0.04em",
              color: "#FFFFFF",
            }}
          >
            <Box component="span">Your great </Box>
            <Box component="span" sx={{ fontWeight: 700 }}>
              exhibition stand design
            </Box>
            <Box component="span"> starts here.</Box>
            <Box component="span"> </Box>
            <br />
            <Box component="span" sx={{ fontWeight: 700, color: "#656CAF" }}>
              Fill in
            </Box>
            <Box component="span"> the </Box>
            <Box component="span" sx={{ fontWeight: 700, color: "#656CAF" }}>
              form
            </Box>
            <Box component="span">, and we will handle the rest.</Box>
          </Typography>

          {/* Static Connect Button - Mobile */}
          <Button
            ref={heroButtonRef}
            variant="contained"
            fullWidth
            onClick={() => setContactModalOpen(true)}
            sx={{
              width: "100%",
              height: "48px",
              backgroundColor: "#656CAF",
              borderRadius: "8px",
              boxShadow:
                "0px 3px 1px -2px rgba(0,0,0,0.20), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "24px",
              letterSpacing: "0.02em",
              mt: "2rem",
              mb: "1.5rem",

              "&:hover": {
                backgroundColor: "#4C53A2",
              },
            }}
          >
            Connect with us
          </Button>

          {/* "20 years" text for mobile */}
          <Box sx={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <Typography
              sx={{
                fontSize: "60px",
                fontWeight: 700,
                lineHeight: "72px",
                color: "#FFFFFF",
              }}
            >
              20
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "16px",
                letterSpacing: "0.04em",
                color: "#FFFFFF",
                alignSelf: "center",
              }}
            >
              years of award winning expertise
            </Typography>
          </Box>
        </Box>
      </Container>

      {/* Floating CTA Button - Mobile */}
      <ClientOnly>
        {isMobile && (
          <Button
            variant="contained"
            fullWidth
            onClick={() => setContactModalOpen(true)}
            data-id="floating-button"
            sx={{
              position: "fixed",
              bottom: "calc(0dvh + 20px)",
              left: "50%",
              transform: "translateX(-50%)",
              width: "calc(100% - 2rem)",
              maxWidth: "400px",
              height: "48px",
              backgroundColor: "#656CAF",
              borderRadius: "8px",
              boxShadow:
                "0px 3px 1px -2px rgba(0,0,0,0.20), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: "24px",
              letterSpacing: "0.02em",
              zIndex: 9999,
              opacity:
                showFloatingButton &&
                showButtonDueToContactForm &&
                !contactModalOpen
                  ? 1
                  : 0,
              visibility:
                showFloatingButton &&
                showButtonDueToContactForm &&
                !contactModalOpen
                  ? "visible"
                  : "hidden",
              transition:
                "opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease",

              "&:hover": {
                backgroundColor: "#4C53A2",
              },
            }}
          >
            Connect with us
          </Button>
        )}
      </ClientOnly>

      {/* Contact Form Modal */}
      <ContactFormModal
        open={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
      </Box>
    </>
  );
};

export default HeroSection;
