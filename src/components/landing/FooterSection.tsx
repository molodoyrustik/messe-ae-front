"use client";

import {
  Box,
  Container,
  Typography,
  Stack,
  IconButton,
  Link,
} from "@mui/material";
import Instagram from "@mui/icons-material/Instagram";
import Facebook from "@mui/icons-material/Facebook";
import LinkedIn from "@mui/icons-material/LinkedIn";
import WhatsApp from "@mui/icons-material/WhatsApp";
import Phone from "@mui/icons-material/Phone";
import Email from "@mui/icons-material/Email";
import LocationOn from "@mui/icons-material/LocationOn";
import Image from "next/image";
import dynamic from "next/dynamic";

const ContractFormPartytown = dynamic(() => import("../ContractFormPartytown").then(mod => ({ default: mod.ContractFormPartytown })), {
  ssr: false,
});

// Custom SVG Icons for mobile footer
const InstagramSolid = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 8.667a3.333 3.333 0 1 0 0 6.666 3.333 3.333 0 0 0 0-6.666"
      fill="#656CAF"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 2a6 6 0 0 0-6 6v8a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6V8a6 6 0 0 0-6-6zm-.667 10a4.667 4.667 0 1 1 9.334 0 4.667 4.667 0 0 1-9.334 0m9.334-4.667A.943.943 0 1 0 18 6a.943.943 0 0 0-1.333 1.333"
      fill="#656CAF"
    />
  </svg>
);

const FacebookSolid = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M19.78 2H4.21998C3 2 2 3 2 4.22V19.78C2 21 3 22 4.22 22H19.78C21 22 22 21 22 19.79V4.22C22 3 21 2 19.78 2ZM18.89 7.8375H17.2925C16.04 7.8375 15.7975 8.4325 15.7975 9.3075V11.235H18.7875L18.3975 14.2525H15.7975V22H12.68V14.255H10.0725V11.235H12.68V9.01C12.68 6.4275 14.2575 5.02 16.5625 5.02C17.6675 5.02 18.615 5.1025 18.8925 5.14V7.8375H18.89Z"
      fill="#656CAF"
    />
  </svg>
);

const LinkedInSolid = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M19.7778 2C20.9881 2 22 3.01185 22 4.22222V19.7778C22 20.9881 20.9881 22 19.7778 22H4.22222C3.01185 22 2 20.9881 2 19.7778V4.22222C2 3.01185 3.01185 2 4.22222 2H19.7778ZM19.2222 19.2222V13.3333C19.2222 12.3727 18.8406 11.4513 18.1613 10.772C17.482 10.0927 16.5607 9.71111 15.6 9.71111C14.6556 9.71111 13.5556 10.2889 13.0222 11.1556V9.92222H9.92222V19.2222H13.0222V13.7444C13.0222 12.8889 13.7111 12.1889 14.5667 12.1889C14.9792 12.1889 15.3749 12.3528 15.6666 12.6445C15.9583 12.9362 16.1222 13.3319 16.1222 13.7444V19.2222H19.2222ZM6.31111 8.17778C6.80618 8.17778 7.28098 7.98111 7.63104 7.63104C7.98111 7.28098 8.17778 6.80618 8.17778 6.31111C8.17778 5.27778 7.34444 4.43333 6.31111 4.43333C5.81309 4.43333 5.33547 4.63117 4.98332 4.98332C4.63117 5.33547 4.43333 5.81309 4.43333 6.31111C4.43333 7.34444 5.27778 8.17778 6.31111 8.17778ZM7.85556 19.2222V9.92222H4.77778V19.2222H7.85556Z"
      fill="#656CAF"
    />
  </svg>
);

const WhatsAppSolid = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M6.11161 11.9375C6.11161 13.0491 6.42411 14.1339 7.01339 15.067L7.15179 15.2902L6.55804 17.4598L8.78571 16.875L9 17.0045C9.90179 17.5402 10.9375 17.8259 11.9955 17.8259H12C15.2411 17.8259 17.9509 15.1875 17.9509 11.942C17.9509 10.3705 17.2723 8.89286 16.1607 7.78125C15.0446 6.66518 13.5714 6.05357 12 6.05357C8.75446 6.05357 6.11607 8.69197 6.11161 11.9375ZM14.2679 15.3036C13.7054 15.3884 13.2679 15.3438 12.1473 14.8616C10.5045 14.1518 9.38839 12.5625 9.16071 12.2411C9.14286 12.2143 9.12946 12.2009 9.125 12.192C9.03571 12.0759 8.40179 11.2321 8.40179 10.3616C8.40179 9.54018 8.80357 9.11607 8.99107 8.91964C9.00446 8.90625 9.01339 8.89732 9.02232 8.88393C9.18304 8.70536 9.375 8.66071 9.49554 8.66071C9.61161 8.66071 9.73214 8.66071 9.83482 8.66518H9.87054C9.97321 8.66518 10.1027 8.66518 10.2321 8.96875C10.2857 9.09821 10.3661 9.29464 10.4509 9.49554C10.5982 9.85268 10.75 10.2232 10.7768 10.2812C10.8214 10.3705 10.8527 10.4732 10.7902 10.5893C10.6384 10.8929 10.4821 11.0536 10.375 11.1696C10.2366 11.3125 10.1741 11.3795 10.2723 11.5536C10.9554 12.7277 11.6384 13.1339 12.6786 13.6563C12.8571 13.7455 12.9598 13.7321 13.0625 13.6116C13.1652 13.4955 13.5045 13.0938 13.6205 12.9196C13.7366 12.7411 13.8571 12.7723 14.0179 12.8304C14.1786 12.8884 15.0491 13.317 15.2277 13.4062C15.2634 13.4241 15.2946 13.4375 15.3214 13.4509C15.4464 13.5134 15.5312 13.5536 15.567 13.6116C15.6071 13.6964 15.6071 14.0536 15.4598 14.4643C15.3125 14.8795 14.6071 15.2545 14.2679 15.3036ZM22 4.22C22 3 21 2 19.78 2H4.22C3 2 2 3 2 4.22C2 5.44 2 19.783 2 19.783C2 21 3 22 4.22 22H19.78C21 22 22 21 22 19.78V4.22ZM8.61161 18.1562L4.85714 19.1429L5.86161 15.4732C5.24107 14.4018 4.91518 13.183 4.91518 11.933C4.91964 8.03125 8.09375 4.85714 11.9955 4.85714C13.8884 4.85714 15.6652 5.59375 17.0045 6.93304C18.3393 8.27232 19.1429 10.0491 19.1429 11.942C19.1429 15.8438 15.8973 19.0179 11.9955 19.0179C10.808 19.0179 9.64286 18.7188 8.61161 18.1562Z"
      fill="#656CAF"
    />
  </svg>
);

const EmailSolid = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M19.7998 2C21.0148 2 22 2.98517 22 4.2002V19.7998C22 21.0148 21.0148 22 19.7998 22H4.2002C2.98517 22 2 21.0148 2 19.7998V4.2002C2 2.98517 2.98517 2 4.2002 2H19.7998ZM12.5029 5.01855C11.5014 4.94553 10.4958 5.08918 9.55469 5.43945C8.61352 5.78975 7.75893 6.33872 7.04883 7.04883C6.33872 7.75893 5.78975 8.61352 5.43945 9.55469C5.08918 10.4958 4.94553 11.5014 5.01855 12.5029C5.27064 16.2065 8.50519 19 12.2158 19H14.7988C15.1839 19 15.499 18.6849 15.499 18.2998C15.499 17.9148 15.1839 17.5996 14.7988 17.5996H12.2295C9.61816 17.5995 7.22435 15.9053 6.57324 13.3779C5.53006 9.31721 9.31037 5.52989 13.3711 6.58008C15.9054 7.22423 17.5995 9.6182 17.5996 12.2295V13C17.5996 13.553 17.1028 14.0995 16.5498 14.0996C15.9967 14.0996 15.4991 13.5531 15.499 13V12.125C15.499 10.3677 14.2529 8.78508 12.5166 8.54004C11.9644 8.45798 11.4006 8.50873 10.8721 8.68848C10.3435 8.86834 9.86514 9.17235 9.47754 9.57422C9.08993 9.97621 8.80314 10.4652 8.64258 11C8.48208 11.5348 8.45162 12.1005 8.55371 12.6494C8.67681 13.3108 8.98843 13.9229 9.4502 14.4121C9.912 14.9012 10.5051 15.2473 11.1582 15.4082C12.4464 15.7093 13.6724 15.2967 14.4775 14.4775C15.1007 15.3314 16.3464 15.779 17.4873 15.3242C18.4253 14.9532 18.9998 13.9944 19 12.9863V12.2227C18.9999 8.50508 16.2065 5.27064 12.5029 5.01855ZM11.999 9.89844C13.1611 9.89858 14.0996 10.8369 14.0996 11.999C14.0995 13.161 13.161 14.0995 11.999 14.0996C10.8369 14.0996 9.89858 13.1611 9.89844 11.999C9.89844 10.8368 10.8368 9.89844 11.999 9.89844Z"
      fill="#656CAF"
    />
  </svg>
);

const LocationSolid = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M19.7998 2C21.0148 2 22 2.98517 22 4.2002V19.7998C22 21.0148 21.0148 22 19.7998 22H4.2002C2.98517 22 2 21.0148 2 19.7998V4.2002C2 2.98517 2.98517 2 4.2002 2H19.7998ZM12.0137 5C10.4789 5 9.17612 5.53448 8.10547 6.60254C7.0354 7.67007 6.5 9.02547 6.5 10.6689C6.50007 11.8146 6.96276 13.0856 7.8877 14.4824C8.81227 15.8794 10.1878 17.3855 12.0137 19C13.8394 17.3856 15.2146 15.8793 16.1396 14.4824C17.0641 13.0856 17.5263 11.8146 17.5264 10.6689C17.5264 9.02566 16.9917 7.67001 15.9219 6.60254C14.8513 5.53457 13.5483 5.00009 12.0137 5ZM12.0107 9.27344C12.3567 9.27344 12.6534 9.39517 12.8994 9.63965C13.1454 9.88405 13.268 10.1795 13.2686 10.5254C13.2691 10.8714 13.1473 11.168 12.9023 11.4141C12.688 11.6293 12.4349 11.7504 12.1436 11.7773L12.0166 11.7832C11.6702 11.7837 11.3739 11.6618 11.1279 11.417C10.8819 11.172 10.7588 10.8767 10.7588 10.5312C10.7588 10.1859 10.8807 9.89004 11.125 9.64355C11.3694 9.39705 11.6648 9.27349 12.0107 9.27344Z"
      fill="#656CAF"
    />
  </svg>
);

const PhoneSolid = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M19.7998 2C21.0148 2 22 2.98517 22 4.2002V19.7998C22 21.0148 21.0148 22 19.7998 22H4.2002C2.98517 22 2 21.0148 2 19.7998V4.2002C2 2.98517 2.98517 2 4.2002 2H19.7998ZM6.56152 5C5.68088 5.00002 4.94838 5.73263 5.00293 6.61328C5.416 13.2689 10.7389 18.584 17.3867 18.9971C18.2674 19.0516 19 18.3191 19 17.4385V16.0898C19.0076 15.3028 18.415 14.6404 17.6279 14.5469L15.6484 14.3213C15.4159 14.294 15.1802 14.3196 14.959 14.3965C14.7376 14.4734 14.5367 14.5999 14.3711 14.7656L12.9365 16.1992C10.7243 15.0738 8.9262 13.2757 7.80078 11.0635L9.24219 9.62109C9.57719 9.28605 9.74097 8.81902 9.68652 8.34375L9.46094 6.37988C9.41692 5.99963 9.23426 5.64796 8.94824 5.39355C8.66234 5.13937 8.29271 4.99946 7.91016 5H6.56152Z"
      fill="#656CAF"
    />
  </svg>
);

const FooterSection = () => {
  const menuItems = [
    { label: "Projects", href: "/projects" },
    { label: "About Us", href: "/about" },
    { label: "Articles", href: "/articles" },
    { label: "Manifestos", href: "/manifestos" },
    { label: "Career", href: "/careers" },
    { label: "Privacy policy", href: "/privacy-policy" },
    { label: "Cookie policy", href: "/cookie-policy" },
  ];

  return (
    <Box
      component="footer"
      id="footer-section"
      sx={{
        backgroundColor: "#F5F5F5",
        overflow: "hidden",
        py: { xs: 2, md: 3.25 },
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: "1rem", md: "2.5rem" } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
              lg: "auto auto 1fr",
            },
            gap: { xs: 0, md: 4, lg: 0 },
            position: "relative",
          }}
        >
          {/* Left Column - Logo and Contact Info */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "space-between",
              mt: { xs: 0, md: 2.5, lg: 2.5 },
              flexDirection: "column",
              gap: { xs: 3, md: 6 },
              maxWidth: "320px",
              gridColumn: { xs: "1", md: "1", lg: "1" },
            }}
          >
            {/* Logo */}
            <Box>
              <Box
                sx={{
                  width: { xs: "60px", md: "162px" },
                  height: { xs: "29px", md: "80px" },
                  position: "relative",
                  mb: 1,
                }}
              >
                <Image
                  src="/messe-logo.png"
                  alt="Messe.ae"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 60px, 162px"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    transform: "scale(1.75)",
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 1, mt: { md: 3 } }}>
                <Typography
                  sx={{
                    fontSize: { xs: "3.87px", md: "10.5px" },
                    lineHeight: { xs: "4.43px", md: "12px" },
                    color: "#000000",
                  }}
                >
                  <Box
                    component="span"
                    sx={{ color: "#656CAF", fontWeight: 700 }}
                  >
                    M
                  </Box>
                  <Box component="span" sx={{ fontWeight: 500 }}>
                    arketing and{" "}
                  </Box>
                  <Box
                    component="span"
                    sx={{ color: "#656CAF", fontWeight: 700 }}
                  >
                    E
                  </Box>
                  <Box component="span" sx={{ fontWeight: 500 }}>
                    xhibition{" "}
                  </Box>
                  <Box
                    component="span"
                    sx={{ color: "#656CAF", fontWeight: 700 }}
                  >
                    S
                  </Box>
                  <Box component="span" sx={{ fontWeight: 500 }}>
                    ervices
                  </Box>
                </Typography>
              </Box>
            </Box>

            {/* Company Info */}
            <Stack spacing={3}>
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "10px", md: "14px" },
                    lineHeight: { xs: "13px", md: "18px" },
                    letterSpacing: { xs: "0.2px", md: "0.28px" },
                    color: "#262626",
                  }}
                >
                  the part of{" "}
                  <Box
                    component="span"
                    sx={{ fontWeight: 700, color: "#000000" }}
                  >
                    Expoglobal Group
                  </Box>
                </Typography>
              </Box>
              {/* Social Icons */}
              <Stack direction="row" spacing={1.5}>
                <IconButton
                  component="a"
                  href="https://www.instagram.com/messe.ae/"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{ p: 0.5, color: "#262626" }}
                >
                  <Instagram sx={{ fontSize: { xs: 14, md: 20 } }} />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.facebook.com/ExpoGlobalGroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{ p: 0.5, color: "#262626" }}
                >
                  <Facebook sx={{ fontSize: { xs: 14, md: 20 } }} />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://www.linkedin.com/company/messe-ae"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{ p: 0.5, color: "#262626" }}
                >
                  <LinkedIn sx={{ fontSize: { xs: 14, md: 20 } }} />
                </IconButton>
                <IconButton
                  component="a"
                  href="https://wa.me/971505588060"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{ p: 0.5, color: "#262626" }}
                >
                  <WhatsApp sx={{ fontSize: { xs: 14, md: 20 } }} />
                </IconButton>
              </Stack>

              <Stack
                direction="row"
                spacing={{ xs: 0.5, md: "0.5rem" }}
                alignItems="center"
              >
                <Phone
                  sx={{ fontSize: { xs: 14, md: 20 }, color: "#262626" }}
                />
                <Link
                  href="tel:+97145485887"
                  sx={{
                    fontSize: { xs: "10px", md: "14px" },
                    lineHeight: { xs: "13px", md: "18px" },
                    letterSpacing: { xs: "0.2px", md: "0.28px" },
                    color: "#262626",
                    textDecoration: "none",
                    "&:hover": {
                      color: "#656CAF",
                      textDecoration: "underline",
                    },
                  }}
                >
                  +971 4 548 5887
                </Link>
              </Stack>

              <Stack
                direction="row"
                spacing={{ xs: 0.5, md: "0.5rem" }}
                alignItems="center"
              >
                <Email
                  sx={{ fontSize: { xs: 14, md: 20 }, color: "#262626" }}
                />
                <Link
                  href="mailto:hello@messe.ae"
                  sx={{
                    fontSize: { xs: "10px", md: "14px" },
                    lineHeight: { xs: "13px", md: "18px" },
                    letterSpacing: { xs: "0.2px", md: "0.28px" },
                    color: "#262626",
                    textDecoration: "none",
                    "&:hover": {
                      color: "#656CAF",
                      textDecoration: "underline",
                    },
                  }}
                >
                  hello@messe.ae
                </Link>
              </Stack>

              <Stack
                direction="row"
                spacing={{ xs: 0.5, md: "0.5rem" }}
                alignItems="flex-start"
              >
                <LocationOn
                  sx={{
                    fontSize: { xs: 14, md: 20 },
                    color: "#262626",
                    mt: 0.25,
                  }}
                />
                <Link
                  href="https://maps.google.com/?q=UAE,+Dubai,+Dubai+Industrial+City,+KJ+Autopart+complex,+Office+building,+ground+floor,+left+wing.+PO+box+118995"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    fontSize: { xs: "10px", md: "14px" },
                    lineHeight: { xs: "13px", md: "18px" },
                    letterSpacing: { xs: "0.2px", md: "0.28px" },
                    color: "#262626",
                    flex: 1,
                    textDecoration: "none",
                    "&:hover": {
                      color: "#656CAF",
                      textDecoration: "underline",
                    },
                  }}
                >
                  UAE, Dubai, Dubai Industrial City, KJ Autopart complex, Office
                  building, ground floor, left wing. PO box 118995
                </Link>
              </Stack>
            </Stack>
          </Box>

          {/* Middle Column - Navigation Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              gap: 1.5,
              gridColumn: { md: "2", lg: "2" },
              ml: { md: "auto", lg: 20 },
              mr: { md: 0, lg: 8 },
              alignSelf: { md: "start", lg: "end" },
              pb: { md: 1.5, lg: 0 },
              pt: { md: 12, lg: 0 },
            }}
          >
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                sx={{
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: "24px",
                  letterSpacing: "0.32px",
                  color: "#656CAF",
                  fontFamily: "Roboto",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "#4C53A2",
                  },
                }}
              >
                {item.label}
              </Link>
            ))}
          </Box>

          {/* Mobile Social Icons */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              maxWidth: "400px",
              mx: "auto",
              mb: 3,
              px: 2,
            }}
          >
            <IconButton
              component="a"
              href="https://www.instagram.com/messe.ae/"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{ p: 0, width: 24, height: 24 }}
            >
              <InstagramSolid />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.facebook.com/ExpoGlobalGroup"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{ p: 0, width: 24, height: 24 }}
            >
              <FacebookSolid />
            </IconButton>
            <IconButton
              component="a"
              href="https://www.linkedin.com/company/messe-ae"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{ p: 0, width: 24, height: 24 }}
            >
              <LinkedInSolid />
            </IconButton>
            <IconButton
              component="a"
              href="https://wa.me/971505588060"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{ p: 0, width: 24, height: 24 }}
            >
              <WhatsAppSolid />
            </IconButton>
            <IconButton
              component="a"
              href="mailto:hello@messe.ae"
              size="small"
              sx={{ p: 0, width: 24, height: 24 }}
            >
              <EmailSolid />
            </IconButton>
            <IconButton
              component="a"
              href="https://maps.google.com/?q=UAE,+Dubai,+Dubai+Industrial+City,+KJ+Autopart+complex,+Office+building,+ground+floor,+left+wing.+PO+box+118995"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{ p: 0, width: 24, height: 24 }}
            >
              <LocationSolid />
            </IconButton>
            <IconButton
              component="a"
              href="tel:+97145485887"
              size="small"
              sx={{ p: 0, width: 24, height: 24 }}
            >
              <PhoneSolid />
            </IconButton>
          </Box>

          {/* Right Column - Title and Form */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gridColumn: { xs: "1", md: "1 / -1", lg: "3" },
              justifySelf: { lg: "end" },
              width: { xs: "100%", md: "100%", lg: "auto" },
              mt: { md: 4, lg: 0 },
            }}
          >
            {/* Title - Hidden on mobile */}
            <Typography
              component="h2"
              variant="h4"
              sx={{
                display: { xs: "none", md: "block" },
                fontSize: "34px",
                fontWeight: 400,
                lineHeight: "42px",
                letterSpacing: "0.34px",
                color: "#262626",
                mb: 2,
              }}
            >
              We are always happy to help
            </Typography>

            {/* Contact Form */}
            <ContractFormPartytown type="footer" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default FooterSection;
