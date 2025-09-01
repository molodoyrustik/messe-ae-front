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
  const mountedRef = useRef(true);
  const formId_unique = `hubspot-form-${type}`; // Stable ID without timestamp

  const loadHubSpotScript = () => {
    return new Promise<void>((resolve, reject) => {
      // Check if HubSpot is already loaded
      if (window.hbspt?.forms) {
        resolve();
        return;
      }

      // Check if script is already loading/loaded
      const existingScript = document.querySelector('script[src*="hsforms.net"]');
      if (existingScript) {
        // Script exists, wait for HubSpot to be available
        const checkHubSpot = () => {
          if (window.hbspt?.forms) {
            resolve();
          } else {
            setTimeout(checkHubSpot, 100);
          }
        };
        checkHubSpot();
        return;
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

      document.head.appendChild(script);
    });
  };

  const createForm = async () => {
    try {
      // Check if component is still mounted
      if (!mountedRef.current) return;
      
      setIsLoading(true);
      setError(null);

      // Store container ref in variable to avoid null access during async operations
      const container = containerRef.current;
      if (!container) {
        throw new Error('Container not available');
      }

      // Load HubSpot script
      await loadHubSpotScript();

      // Check again if component is still mounted after async operation
      if (!mountedRef.current) return;

      // Wait for HubSpot to be fully initialized 
      // Mobile devices need more time for script initialization
      const initDelay = isMobile ? 300 : 100;
      await new Promise(resolve => setTimeout(resolve, initDelay));

      // Check again if component is still mounted after delay
      if (!mountedRef.current) return;

      if (!window.hbspt?.forms) {
        throw new Error('HubSpot forms API not available');
      }

      // Clear container safely
      if (container && container.parentNode) {
        container.innerHTML = "";
      }

      // Create form
      window.hbspt.forms.create({
        portalId,
        formId,
        region,
        target: `#${formId_unique}`,
      });

      console.log(`HubSpot form created for ${type}`);
      
      // Only update state if still mounted
      if (mountedRef.current) {
        setIsLoading(false);
        onFormLoad?.();
      }

    } catch (err) {
      // Only update state if still mounted
      if (mountedRef.current) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error(`Error creating HubSpot form for ${type}:`, errorMessage);
        setError(errorMessage);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    createForm();

    // Cleanup function
    return () => {
      mountedRef.current = false;
      
      // Clear container safely without removing scripts
      const container = containerRef.current;
      if (container && container.parentNode) {
        try {
          container.innerHTML = "";
        } catch (e) {
          // Ignore cleanup errors
          console.warn('Container cleanup failed:', e);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]); // Don't include createForm to prevent unnecessary re-runs

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