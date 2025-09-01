"use client";

import {
  Dialog,
  DialogContent,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  Typography,
  Skeleton,
  Stack,
  CircularProgress,
} from "@mui/material";
import { ContractFormPartytown } from "./ContractFormPartytown";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";

interface ContactFormModalProps {
  open: boolean;
  onClose: () => void;
}

// Modal form skeleton component
const ModalFormSkeleton = () => (
  <Box
    sx={{
      width: "100%",
      maxWidth: "664px",
      mx: "auto",
      p: { xs: "12px", md: 2.5 },
      backgroundColor: "#FFFFFF",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <CircularProgress 
      size={40} 
      sx={{ 
        color: 'primary.main',
        mb: 3
      }} 
    />
    <Typography
      sx={{
        fontWeight: 700,
        color: "grey.800",
        fontSize: { xs: "0.875rem", md: "1rem" },
        lineHeight: { xs: "1rem", md: "1.5rem" },
        letterSpacing: "tight",
        mb: 2,
        textAlign: "center",
        width: "100%",
      }}
    >
      Fill the form below and our experts will contact you within 24 hours.
    </Typography>
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Skeleton variant="rectangular" height={56} animation="wave" />
      <Skeleton variant="rectangular" height={56} animation="wave" />
      <Skeleton variant="rectangular" height={56} animation="wave" />
      <Skeleton variant="rectangular" height={120} animation="wave" />
      <Skeleton variant="rectangular" height={48} animation="wave" />
    </Stack>
  </Box>
);

export const ContactFormModal = ({ open, onClose }: ContactFormModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [shouldLoadForm, setShouldLoadForm] = useState(false);

  // Load form when modal opens, reset when it closes
  useEffect(() => {
    if (open) {
      setShouldLoadForm(true);
    } else {
      // Reset form state when modal closes to prepare for next open
      setShouldLoadForm(false);
    }
  }, [open]);

  // Mobile Bottom Sheet
  if (isMobile) {
    return (
      <Drawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        sx={{
          "& .MuiDrawer-paper": {
            borderTopLeftRadius: "1.25rem",
            borderTopRightRadius: "1.25rem",
            maxHeight: "90dvh",
            minWidth: "382px",
            minHeight: "782px",
            height: "auto",
            px: "1rem",
            py: "0.75rem",
            pb: "max(env(safe-area-inset-bottom), 0.75rem)",
            backgroundColor: "white",
          },
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Drag Handle */}
          <Box
            sx={{
              width: "5rem",
              height: "0.25rem",
              backgroundColor: "grey.200",
              borderRadius: "0.125rem",
              margin: "0.25rem auto 0.75rem",
              flexShrink: 0,
            }}
          />

          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {shouldLoadForm ? (
              <ContractFormPartytown 
                type="modal" 
              />
            ) : (
              <ModalFormSkeleton />
            )}
          </Box>
        </Box>
      </Drawer>
    );
  }

  // Desktop Dialog
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          overflow: "visible",
          minWidth: "624px",
          minHeight: "564px",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 0,
            top: "-40px",
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
        {shouldLoadForm ? (
          <ContractFormPartytown 
            type="modal" 
          />
        ) : (
          <ModalFormSkeleton />
        )}
      </DialogContent>
    </Dialog>
  );
};
