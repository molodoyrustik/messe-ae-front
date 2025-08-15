"use client";

import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { ContactFormModal } from "@/components/ContactFormModal";

export default function ContactFormButton() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <>
      {/* Start Your Project Button */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "flex-start",
        }}
      >
        <Button
          variant="contained"
          onClick={() => setContactModalOpen(true)}
          sx={{
            height: "3rem",
            px: "1.25rem",
            py: "0.5rem",
            backgroundColor: "#656CAF",
            borderRadius: "0.5rem",
            boxShadow:
              "0px 3px 1px -2px rgba(0,0,0,0.20), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#4C53A2",
            },
          }}
        >
          <Typography
            sx={{
              fontFamily: "Roboto",
              fontWeight: 400,
              fontSize: "1.5rem",
              lineHeight: "1.75rem",
              letterSpacing: "0.02rem",
              color: "#FFFFFF",
            }}
          >
            Start Your Project
          </Typography>
        </Button>
      </Box>

      {/* Contact Form Modal */}
      <ContactFormModal
        open={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </>
  );
}