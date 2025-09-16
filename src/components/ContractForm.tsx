"use client";

import { Typography, Box } from "@mui/material";
import Script from "next/script";
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

export const ContractForm = ({ 
  type,
  onFormLoad 
}: { 
  type: "modal" | "footer";
  onFormLoad?: () => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    if (!window.hbspt?.forms || !containerRef.current) return;

    containerRef.current.innerHTML = "";

    window.hbspt.forms.create({
      portalId,
      formId,
      region,
      target: `#hubspot-form-${type}`,
    });
    
    // Call onFormLoad callback if provided
    if (onFormLoad) {
      onFormLoad();
    }
  }, [scriptReady, type, onFormLoad]);

  return (
    <>
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

        <Script
          id="hsforms"
          src="//js-eu1.hsforms.net/forms/embed/v2.js"
          strategy="afterInteractive"
          onLoad={() => {
            console.log("script loaded");
            setScriptReady(true);
          }}
        />
        <Box id={`hubspot-form-${type}`} ref={containerRef}></Box>
      </Box>
    </>
  );
};
