"use client";

import { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { ContractFormPartytown } from "./ContractFormPartytown";

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
        <ContractFormPartytown 
          type="footer" 
          onFormLoad={() => console.log('Footer form loaded successfully')}
        />
      ) : (
        // Placeholder to maintain layout while form loads
        <Box
          sx={{
            height: "500px", // Increased height to ensure observer triggers
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
            border: "1px solid",
            borderColor: "grey.200",
          }}
        >
          {/* Loading placeholder */}
          <Box
            sx={{
              width: "100%",
              maxWidth: "664px",
              p: { xs: "12px", md: 2.5 },
              textAlign: "center",
              color: "grey.500",
            }}
          >
            {isObserving ? "Scroll to load form..." : "Loading form..."}
          </Box>
        </Box>
      )}
    </Box>
  );
};