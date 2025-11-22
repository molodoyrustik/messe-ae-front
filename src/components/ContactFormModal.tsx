"use client";

import {
  Dialog,
  DialogContent,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ContactFormNew } from "./ContactFormNew";

interface ContactFormModalProps {
  open: boolean;
  onClose: () => void;
}

export const ContactFormModal = ({ open, onClose }: ContactFormModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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
            <ContactFormNew />
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
        <ContactFormNew />
      </DialogContent>
    </Dialog>
  );
};
