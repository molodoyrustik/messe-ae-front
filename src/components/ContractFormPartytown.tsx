"use client";

import { Typography, Box, useTheme, useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const portalId = "27038193";
const formId = "65e0f947-3802-42ba-8cf7-3462817e140c";
const region = "eu1";

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (opts: {
          portalId: string;
          formId: string;
          region?: "na1" | "eu1" | string;
          target?: string;
        }) => void;
      };
    };
  }
}

export const ContractFormPartytown = ({ 
  type, 
  onFormLoad 
}: { 
  type: "modal" | "footer";
  onFormLoad?: () => void;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const formId_unique = `hubspot-form-${type}-${Date.now()}`;

  const loadHubSpotScript = () => {
    return new Promise<void>((resolve, reject) => {
      // Check if script already exists and HubSpot is available
      if (window.hbspt?.forms) {
        resolve();
        return;
      }

      // Remove any existing script
      if (scriptRef.current) {
        scriptRef.current.remove();
      }

      // Create new script element
      const script = document.createElement('script');
      script.src = '//js-eu1.hsforms.net/forms/embed/v2.js';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        console.log('HubSpot script loaded successfully');
        resolve();
      };
      
      script.onerror = () => {
        console.error('Failed to load HubSpot script');
        reject(new Error('Failed to load HubSpot script'));
      };

      scriptRef.current = script;
      document.head.appendChild(script);
    });
  };

  const createForm = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Load HubSpot script
      await loadHubSpotScript();

      // Wait a bit for HubSpot to be fully initialized 
      // Mobile devices need more time for script initialization
      const initDelay = isMobile ? 300 : 100;
      await new Promise(resolve => setTimeout(resolve, initDelay));

      if (!window.hbspt?.forms) {
        throw new Error('HubSpot forms API not available');
      }

      if (!containerRef.current) {
        throw new Error('Container not available');
      }

      // Clear container
      containerRef.current.innerHTML = "";

      // Create form
      window.hbspt.forms.create({
        portalId,
        formId,
        region,
        target: `#${formId_unique}`,
      });

      console.log(`HubSpot form created for ${type}`);
      setIsLoading(false);
      onFormLoad?.();

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.error(`Error creating HubSpot form for ${type}:`, errorMessage);
      setError(errorMessage);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    createForm();

    // Cleanup function
    return () => {
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }
      // Save ref to variable for cleanup
      const container = containerRef.current;
      if (container) {
        container.innerHTML = "";
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]); // createForm is not included to prevent unnecessary re-runs

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: "0.75rem", md: "0.75rem" },
        width: { xs: "100%", lg: "664px" },
        p: { xs: "12px", md: 2.5 },
        backgroundColor: "#FFFFFF",
        borderRadius: "8px",
        mx: "auto",
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          color: "grey.800",
          fontSize: { xs: "0.875rem", md: "1rem" },
          lineHeight: { xs: "1rem", md: "1.5rem" },
          letterSpacing: "tight",
        }}
      >
        Fill the form below and our experts will contact you within 24 hours.
      </Typography>

      <Box 
        id={formId_unique} 
        ref={containerRef}
        sx={{
          minHeight: isLoading ? "200px" : "auto",
          display: "flex",
          alignItems: isLoading ? "center" : "stretch",
          justifyContent: isLoading ? "center" : "stretch",
        }}
      >
        {isLoading && (
          <Typography
            sx={{
              color: "grey.500",
              fontSize: "0.875rem",
            }}
          >
            Loading form...
          </Typography>
        )}
        {error && (
          <Typography
            sx={{
              color: "error.main",
              fontSize: "0.875rem",
            }}
          >
            Error loading form: {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
};