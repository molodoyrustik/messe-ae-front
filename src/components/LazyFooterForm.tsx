"use client";

import { useState, useEffect, useRef } from "react";
import { Box, Typography, Skeleton, Stack } from "@mui/material";
import { ContractForm } from "./ContractForm";

export const LazyFooterForm = () => {
  const [shouldLoadForm, setShouldLoadForm] = useState(false);
  const [isObserving, setIsObserving] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('Footer form intersection:', {
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
            boundingClientRect: entry.boundingClientRect,
            rootBounds: entry.rootBounds
          });
          
          if (entry.isIntersecting && !shouldLoadForm) {
            console.log('Loading footer form...');
            setShouldLoadForm(true);
            setIsObserving(false);
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        rootMargin: '300px 0px', // Load form 300px before it becomes visible
        threshold: 0.1 // Trigger when at least 10% is visible
      }
    );

    const currentElement = containerRef.current;
    observer.observe(currentElement);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoadForm]);

  return (
    <Box 
      ref={containerRef}
      id="footer-form-container"
      sx={{
        minHeight: shouldLoadForm ? "auto" : "500px", // Ensure enough height to trigger observer
        width: "100%"
      }}
    >
      {shouldLoadForm ? (
        <ContractForm 
          type="footer" 
          onFormLoad={() => console.log('Footer form loaded successfully')}
        />
      ) : (
        // Placeholder to maintain layout while form loads
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "664px",
            mx: "auto",
            p: { xs: "12px", md: 2.5 },
          }}
        >
          {/* Form header */}
          <Typography
            sx={{
              fontWeight: 700,
              color: "grey.800",
              fontSize: { xs: "0.875rem", md: "1rem" },
              lineHeight: { xs: "1rem", md: "1.5rem" },
              letterSpacing: "tight",
              mb: 2,
            }}
          >
            {isObserving ? "Fill the form below and our experts will contact you within 24 hours." : "Loading form..."}
          </Typography>

          {/* Loading skeletons */}
          <Stack spacing={2}>
            <Skeleton variant="rectangular" height={56} animation="wave" />
            <Skeleton variant="rectangular" height={56} animation="wave" />
            <Skeleton variant="rectangular" height={56} animation="wave" />
            <Skeleton variant="rectangular" height={120} animation="wave" />
            <Skeleton variant="rectangular" height={48} animation="wave" />
          </Stack>
        </Box>
      )}
    </Box>
  );
};