"use client";

import {
  Box,
  Container,
  Stack,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Facebook from "@mui/icons-material/Facebook";
import Instagram from "@mui/icons-material/Instagram";
import LinkedIn from "@mui/icons-material/LinkedIn";
import WhatsApp from "@mui/icons-material/WhatsApp";
import Email from "@mui/icons-material/Email";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useMobileMenu } from "@/contexts/MobileMenuContext";

const ContactFormModal = dynamic(() => import("@/components/ContactFormModal").then(mod => ({ default: mod.ContactFormModal })));

// Custom Menu Item component with proper states
const CustomMenuItem = ({
  children,
  selected = false,
  size = "medium",
  href = "#",
}: {
  children: React.ReactNode;
  selected?: boolean;
  size?: "medium" | "small";
  href?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          height: size === "medium" ? 32 : "auto",
          py: size === "medium" ? 0.5 : 0,
          position: "relative",
          display: size === "medium" ? "flex" : "inline-flex",
          flexDirection: size === "medium" ? "row" : "column",
          justifyContent: size === "medium" ? "flex-start" : "center",
          alignItems: size === "medium" ? "center" : "flex-start",
          gap: size === "medium" ? 1.25 : 1.25,
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        <Typography
          sx={{
            fontSize: size === "medium" ? { md: 18, lg: 24 } : 16,
            fontWeight: 700,
            lineHeight: size === "medium" ? "28px" : "24px",
            letterSpacing: size === "medium" ? "0.01em" : "0.02em",
            color: "#4C53A2", // Direct color from Figma
            transition: "color 0.2s ease",

            "&:hover": {
              color: "#656CAF",
            },
          }}
        >
          {children}
        </Typography>

        {/* Underline indicator - animated from left to right */}
        <Box
          sx={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: 36, // w-9 = 36px
            height: 3, // h-[3px] = 3px
            backgroundColor: "#C7CAE3", // bg-Primary-purple-100
            transform: selected || isHovered ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left center",
            transition: "transform 0.3s ease",
          }}
        />
      </Box>
    </Link>
  );
};

// Social Icons Component
const SocialIcons = () => {
  const iconStyle = {
    color: "#424242", // Direct grey.800 color
    p: 0,
    width: 24,
    height: 24,
    "&:hover": {
      color: "#4C53A2", // Direct primary color
      transform: "scale(1.1)",
    },
    transition: "all 0.2s ease",
  };

  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <IconButton
        component="a"
        href="https://www.instagram.com/messe.ae/"
        target="_blank"
        rel="noopener noreferrer"
        size="small"
        sx={iconStyle}
      >
        <Instagram sx={{ fontSize: 20 }} />
      </IconButton>
      <IconButton
        component="a"
        href="https://www.facebook.com/ExpoGlobalGroup"
        target="_blank"
        rel="noopener noreferrer"
        size="small"
        sx={iconStyle}
      >
        <Facebook sx={{ fontSize: 20 }} />
      </IconButton>
      <IconButton
        component="a"
        href="https://www.linkedin.com/company/messe-ae"
        target="_blank"
        rel="noopener noreferrer"
        size="small"
        sx={iconStyle}
      >
        <LinkedIn sx={{ fontSize: 20 }} />
      </IconButton>
      <IconButton
        component="a"
        href="https://wa.me/971505588060"
        target="_blank"
        rel="noopener noreferrer"
        size="small"
        sx={iconStyle}
      >
        <WhatsApp sx={{ fontSize: 20 }} />
      </IconButton>
      <IconButton
        component="a"
        href="mailto:hello@messe.ae"
        size="small"
        sx={iconStyle}
      >
        <Email sx={{ fontSize: 20 }} />
      </IconButton>
    </Stack>
  );
};

// Top Info Bar Component
const TopInfoBar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 36,
        backgroundColor: "#E9EAF4", // Direct color from Figma
        overflow: "hidden",
        display: { xs: "none", md: "flex" }, // Hide on mobile
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ px: { xs: "1rem", md: "2.5rem" }, height: "100%" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: { md: "100%", lg: 664 },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: { xs: 2, md: 0 },
              height: "100%",
            }}
          >
            {/* Company Info */}
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: "0.04em",
                color: "grey.900",
                display: "flex",
                alignItems: "center",
              }}
            >
              the part of{" "}
              <Box
                component="a"
                href="https://expoglobal.group"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontWeight: 700,
                  ml: 0.5,
                  color: "inherit",
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover": {
                    color: "#4C53A2",
                  },
                  transition: "color 0.2s ease",
                }}
              >
                Expoglobal Group
              </Box>
            </Typography>

            {/* Social Icons */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                height: "100%",
              }}
            >
              <SocialIcons />
            </Box>

            {/* Phone Number */}
            <Typography
              component="a"
              href="tel:+97145485887"
              sx={{
                fontSize: 12,
                fontWeight: 700,
                lineHeight: 1,
                letterSpacing: "0.04em",
                color: "grey.900",
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                cursor: "pointer",
                "&:hover": {
                  color: "#4C53A2",
                },
                transition: "color 0.2s ease",
              }}
            >
              +971 4 548 5887
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

// Main Header Component
const Header = () => {
  const theme = useTheme();
  const isMobileQuery = useMediaQuery(theme.breakpoints.down("md"));
  const [isMobile, setIsMobile] = useState(isMobileQuery);
  const { isDrawerOpen, setDrawerOpen } = useMobileMenu();
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);

  const menuItems = [
    { label: "Projects", href: "/projects" },
    { label: "About Us", href: "/about" },
    { label: "Articles", href: "/articles" },
    { label: "Manifestos", href: "/manifestos" },
  ];

  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: { md: 128 }, // Mobile header height: 4rem (64px)
          position: "relative",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          overflow: "hidden",
        }}
      >
        {/* Top Info Bar - Desktop only */}
        <TopInfoBar />

        <Container maxWidth="xl" sx={{ px: { xs: "1rem", md: "2.5rem" } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: { xs: "4rem", md: 92 }, // Mobile: 4rem (64px), Desktop: 92px
              position: "relative",
              width: "100%",
            }}
          >
            {/* Logo Section */}
            <Link href="/" style={{ textDecoration: "none" }}>
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: { xs: "61px", md: "7.625rem" }, // Mobile: 61px, Desktop: 122px
                  height: { xs: "30px", md: "5.25rem" }, // Mobile: 30px, Desktop: 84px
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  cursor: "pointer",
                }}
              >
                {/* Logo Image Container */}
                <Box
                  sx={{
                    width: { xs: "61px", md: "7.625rem" }, // Mobile: 61px, Desktop: 122px
                    height: { xs: "30px", md: "3.75rem" }, // Mobile: 30px, Desktop: 60px
                    flexShrink: 0,
                    position: "absolute",
                    left: 0,
                    top: 0,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src="/messe-logo.png"
                    alt="Messe.ae"
                    width={244} // 122px * 2 для компенсации внутренних отступов
                    height={120} // 60px * 2 для компенсации внутренних отступов
                    style={{
                      color: "transparent",
                      position: "absolute",
                      left: isMobile ? -93 : -62,
                      top: isMobile ? -47 : -30,
                      objectFit: "contain",
                      transform: isMobile ? "scale(0.5)" : "scale(1.15)",
                    }}
                    priority
                  />
                </Box>

                {/* Company Tagline - Mobile version */}
                <Box
                  sx={{
                    position: "absolute",
                    left: { xs: 0, md: 0 },
                    top: { xs: 36, md: 72 }, // Mobile: 44px, Desktop: 72px
                    justifyContent: "flex-start",
                    display: { xs: "flex", md: "none" },
                    flexWrap: "wrap",
                    width: { xs: "80px", md: "7.625rem" },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "4px",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "6px", // 150%
                      color: "#656CAF",
                    }}
                    component="span"
                  >
                    M
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "4px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "6px",
                      color: "#000",
                    }}
                    component="span"
                  >
                    arketing&nbsp;and&nbsp;
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "4px",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "6px",
                      color: "#656CAF",
                    }}
                    component="span"
                  >
                    E
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "4px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "6px",
                      color: "#000",
                    }}
                    component="span"
                  >
                    xhibition&nbsp;
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "4px",
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "6px",
                      color: "#656CAF",
                    }}
                    component="span"
                  >
                    S
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "4px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "6px",
                      color: "#000",
                    }}
                    component="span"
                  >
                    ervices
                  </Typography>
                </Box>

                {/* Company Tagline - Desktop version */}
                <Box
                  sx={{
                    width: "7.625rem", // 122px
                    position: "absolute",
                    left: 0,
                    top: 72, // top-[72px] from Tailwind
                    justifyContent: "flex-start",
                    display: { xs: "none", md: "flex" },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.5rem", // 8px
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "0.75rem", // 12px - 150%
                      color: "#656CAF", // Primary-purple-400
                    }}
                    component="span"
                  >
                    M
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.5rem", // 8px
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "0.75rem", // 12px
                      color: "#000", // Basic-grey-900
                    }}
                    component="span"
                  >
                    arketing&nbsp;and&nbsp;
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.5rem", // 8px
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "0.75rem", // 12px
                      color: "#656CAF",
                    }}
                    component="span"
                  >
                    E
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.5rem", // 8px
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "0.75rem", // 12px
                      color: "#000",
                    }}
                    component="span"
                  >
                    xhibition&nbsp;
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.5rem", // 8px
                      fontStyle: "normal",
                      fontWeight: 700,
                      lineHeight: "0.75rem", // 12px
                      color: "#656CAF",
                    }}
                    component="span"
                  >
                    S
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.5rem", // 8px
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "0.75rem", // 12px
                      color: "#000",
                    }}
                    component="span"
                  >
                    ervices
                  </Typography>
                </Box>
              </Box>
            </Link>

            {/* "the part of Expoglobal Group" - Mobile only */}
            <Typography
              sx={{
                position: "absolute",
                left: "105px",
                top: "27px",
                fontSize: "12px",
                fontWeight: 400,
                lineHeight: "16px",
                letterSpacing: "0.04em",
                color: "#000",
                display: { xs: "block", md: "none" },
              }}
            >
              the part of{" "}
              <Box
                component="a"
                href="https://expoglobal.group"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                  cursor: "pointer",
                  "&:hover": {
                    color: "#4C53A2",
                  },
                  transition: "color 0.2s ease",
                }}
              >
                Expoglobal Group
              </Box>
            </Typography>

            {/* Navigation Menu - Center on desktop, hidden on mobile */}
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: { md: "100%", lg: 664 },
                maxWidth: { md: "calc(100% - 23.75rem)", lg: 664 }, // Account for logo and button on tablets
                display: { xs: "none", md: "flex" },
                justifyContent: "space-between",
                alignItems: "center",
                px: { md: 2, lg: 0 },
              }}
            >
              {menuItems.map((item) => (
                <CustomMenuItem
                  key={item.href}
                  size="medium"
                  href={item.href}
                  selected={
                    item.href === "/articles"
                      ? pathname.startsWith("/articles")
                      : item.href === "/projects"
                      ? pathname.startsWith("/projects")
                      : pathname === item.href
                  }
                >
                  {item.label}
                </CustomMenuItem>
              ))}
            </Box>

            {/* CTA Button - Desktop only */}
            <Box
              onClick={() => setContactModalOpen(true)}
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: { md: 160, lg: 200 },
                height: 36,
                backgroundColor: "#656CAF",
                borderRadius: 1,
                boxShadow:
                  "0px 3px 1px -2px rgba(0,0,0,0.20), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",

                "&:hover": {
                  backgroundColor: "#4C53A2",
                  transform: "translateY(-50%) scale(1.02)",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: { md: 14, lg: 16 },
                  fontWeight: 400,
                  lineHeight: "24px",
                  letterSpacing: "0.02em",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Discuss your project
              </Typography>
            </Box>

            {/* Hamburger Menu - Mobile only */}
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: 48,
                height: 48,
                p: 0,
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                justifyContent: "center",
                color: "#262626",
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="36"
                  y="12"
                  width="12"
                  height="5"
                  rx="1"
                  fill="#262626"
                />
                <rect
                  x="22"
                  y="22"
                  width="26"
                  height="5"
                  rx="1"
                  fill="#262626"
                />
                <rect
                  x="28"
                  y="32"
                  width="20"
                  height="5"
                  rx="1"
                  fill="#262626"
                />
              </svg>
            </IconButton>
          </Box>
        </Container>
      </Box>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%",
            backgroundColor: "#ffffff",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Drawer Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: "1rem",
              borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
            }}
          >
            <Link
              href="/"
              style={{ textDecoration: "none" }}
              onClick={() => setDrawerOpen(false)}
            >
              <Box sx={{ width: "61px", height: "30px", position: "relative" }}>
                <Image
                  src="/messe-logo.png"
                  alt="Messe.ae"
                  width={244}
                  height={120}
                  style={{
                    position: "absolute",
                    left: -93,
                    top: -47,
                    objectFit: "contain",
                    transform: "scale(0.5)",
                  }}
                  priority
                />
              </Box>
            </Link>

            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Navigation Links */}
          <List sx={{ flex: 1, py: 2 }}>
            {menuItems.map((item) => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  selected={
                    item.href === "/articles"
                      ? pathname.startsWith("/articles")
                      : item.href === "/projects"
                      ? pathname.startsWith("/projects")
                      : pathname === item.href
                  }
                  sx={{
                    py: 2,
                    px: 3,
                    "&.Mui-selected": {
                      backgroundColor: "rgba(101, 108, 175, 0.08)",
                      "& .MuiListItemText-primary": {
                        color: "#656CAF",
                        fontWeight: 700,
                      },
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "#4C53A2",
                      letterSpacing: "0.01em",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ my: 2, mx: 3 }} />

            {/* Footer Links */}
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/careers"
                onClick={() => setDrawerOpen(false)}
                sx={{ py: 1.5, px: 3 }}
              >
                <ListItemText
                  primary="Career"
                  primaryTypographyProps={{
                    fontSize: "1.125rem",
                    fontWeight: 500,
                    color: "#424242",
                    letterSpacing: "0.01em",
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/privacy-policy"
                onClick={() => setDrawerOpen(false)}
                sx={{ py: 1.5, px: 3 }}
              >
                <ListItemText
                  primary="Privacy policy"
                  primaryTypographyProps={{
                    fontSize: "1.125rem",
                    fontWeight: 500,
                    color: "#424242",
                    letterSpacing: "0.01em",
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                href="/cookie-policy"
                onClick={() => setDrawerOpen(false)}
                sx={{ py: 1.5, px: 3 }}
              >
                <ListItemText
                  primary="Cookie policy"
                  primaryTypographyProps={{
                    fontSize: "1.125rem",
                    fontWeight: 500,
                    color: "#424242",
                    letterSpacing: "0.01em",
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>

          <Divider />

          {/* Contact Information */}
          <Box sx={{ p: 3 }}>
            <Typography
              sx={{
                fontSize: "0.875rem",
                fontWeight: 400,
                color: "grey.700",
                mb: 1,
              }}
            >
              the part of{" "}
              <Box component="span" sx={{ fontWeight: 700 }}>
                Expoglobal Group
              </Box>
            </Typography>

            <Typography
              sx={{
                fontSize: "1.125rem",
                fontWeight: 700,
                color: "grey.900",
                mb: 2,
              }}
            >
              +971 4 548 5887
            </Typography>

            {/* Social Icons */}
            <SocialIcons />
          </Box>
        </Box>
      </Drawer>

      {/* Contact Form Modal */}
      <ContactFormModal
        open={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </Box>
  );
};

export default Header;
