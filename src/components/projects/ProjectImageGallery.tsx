"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { SyntheticEvent } from "react";
import Image from "next/image";
import {
  Box,
  Dialog,
  IconButton,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ProjectImage } from "@/types/api";
import { STRAPI_BASE_URL } from "@/lib/api/config";

interface ProjectImageGalleryProps {
  images: ProjectImage[];
  projectTitle: string;
}

interface NormalizedImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  optimized: boolean;
}

export default function ProjectImageGallery({
  images,
  projectTitle,
}: ProjectImageGalleryProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const normalizedImages = useMemo<NormalizedImage[]>(
    () =>
      images
        .filter((image) => Boolean(image?.url))
        .map((image, index) => {
          const preferredFormat =
            image.formats?.large ||
            image.formats?.medium ||
            image.formats?.small ||
            image.formats?.thumbnail;

          const sourceUrl = preferredFormat?.url || image.url;
          const sourceWidth = preferredFormat?.width || image.width || 1600;
          const sourceHeight = preferredFormat?.height || image.height || 900;
          const shouldOptimize = Boolean(preferredFormat);

          const absoluteUrl = sourceUrl.startsWith("http")
            ? sourceUrl
            : STRAPI_BASE_URL
              ? `${STRAPI_BASE_URL}${sourceUrl}`
              : sourceUrl;

          return {
            url: absoluteUrl,
            alt:
              image.alternativeText || `${projectTitle} - Image ${index + 1}`,
            width: sourceWidth,
            height: sourceHeight,
            optimized: shouldOptimize,
          };
        }),
    [images, projectTitle],
  );

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [thumbnailLoaded, setThumbnailLoaded] = useState<
    Record<number, boolean>
  >({});
  const [modalImageLoaded, setModalImageLoaded] = useState(false);
  const [thumbnailError, setThumbnailError] = useState<Record<number, boolean>>(
    {},
  );
  const [modalError, setModalError] = useState<Record<number, boolean>>({});

  const handleOpen = useCallback((index: number) => setActiveIndex(index), []);
  const handleClose = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return prev;
      return prev === 0 ? normalizedImages.length - 1 : prev - 1;
    });
  }, [normalizedImages.length]);

  const showNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return prev;
      return prev === normalizedImages.length - 1 ? 0 : prev + 1;
    });
  }, [normalizedImages.length]);

  useEffect(() => {
    setModalImageLoaded(false);
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      } else if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, showPrev, showNext, handleClose]);

  const modalImageSizes = isMobile
    ? "(max-width: 600px) 100vw, 70vw"
    : "(max-width: 1024px) 80vw, 90vw";

  const handleThumbnailLoad =
    (index: number) => (event: SyntheticEvent<HTMLImageElement>) => {
      if ((event.currentTarget as HTMLImageElement)?.complete) {
        setThumbnailLoaded((prev) => ({
          ...prev,
          [index]: true,
        }));
      }
    };

  const handleThumbnailError = (index: number) => () => {
    setThumbnailLoaded((prev) => ({
      ...prev,
      [index]: true,
    }));
    setThumbnailError((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  const handleModalLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    if ((event.currentTarget as HTMLImageElement)?.complete) {
      setModalImageLoaded(true);
    }
  };

  const handleModalError = () => {
    setModalImageLoaded(true);
    if (activeIndex !== null) {
      setModalError((prev) => ({
        ...prev,
        [activeIndex]: true,
      }));
    }
  };

  const activeImage =
    activeIndex !== null ? normalizedImages[activeIndex] : null;
  const activeImageErrored =
    activeIndex !== null ? Boolean(modalError[activeIndex]) : false;

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: { xs: 1, sm: 1.5, md: 2 },
          width: "100%",
        }}
      >
        {normalizedImages.map((image, index) => (
          <Box
            key={`${image.url}-${index}`}
            sx={{
              position: "relative",
              borderRadius: "0.5rem",
              overflow: "hidden",
              cursor: "zoom-in",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              outline: "none",
              "&:hover": {
                transform: "translateY(-4px) scale(1.02)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
              },
              "&:focus": {
                outline: "none",
              },
            }}
            onClick={() => handleOpen(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleOpen(index);
              }
            }}
          >
            {!thumbnailLoaded[index] && (
              <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              />
            )}
            {thumbnailError[index] ? (
              <Box
                component="img"
                src={image.url}
                alt={image.alt}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: 0,
                  paddingBottom: `${(image.height / image.width) * 100}%`,
                }}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                  onLoad={handleThumbnailLoad(index)}
                  onError={handleThumbnailError(index)}
                  unoptimized={!image.optimized}
                  priority={index < 3}
                />
              </Box>
            )}
          </Box>
        ))}
      </Box>

      <Dialog
        open={activeIndex !== null}
        onClose={handleClose}
        fullScreen={isMobile}
        maxWidth="xl"
        PaperProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            boxShadow: "none",
            borderRadius: isMobile ? 0 : "0.75rem",
          },
        }}
        BackdropProps={{ sx: { backgroundColor: "rgba(0, 0, 0, 0.85)" } }}
      >
        {activeImage && (
          <Box
            sx={{
              position: "relative",
              width: "100%",
              minHeight: isMobile ? "100vh" : "70vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: { xs: 16, md: 24 },
                right: { xs: 16, md: 24 },
                color: "#FFFFFF",
                zIndex: 2,
                backgroundColor: "rgba(0,0,0,0.4)",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
              }}
              aria-label="Close gallery"
            >
              <CloseIcon />
            </IconButton>

            {normalizedImages.length > 1 && (
              <>
                <IconButton
                  onClick={showPrev}
                  sx={{
                    position: "absolute",
                    left: { xs: 16, md: 24 },
                    color: "#FFFFFF",
                    zIndex: 2,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
                  }}
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon />
                </IconButton>
                <IconButton
                  onClick={showNext}
                  sx={{
                    position: "absolute",
                    right: { xs: 16, md: 24 },
                    color: "#FFFFFF",
                    zIndex: 2,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
                  }}
                  aria-label="Next image"
                >
                  <ChevronRightIcon />
                </IconButton>
              </>
            )}

            {!modalImageLoaded && !activeImageErrored && (
              <Skeleton
                variant="rectangular"
                animation="wave"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: isMobile ? "100vw" : "90vw",
                  height: isMobile ? "calc(100vh - 120px)" : "90vh",
                  borderRadius: "0.75rem",
                  pointerEvents: "none",
                }}
              />
            )}

            <Box
              sx={{
                position: "relative",
                width: isMobile ? "100vw" : "90vw",
                height: isMobile ? "calc(100vh - 120px)" : "90vh",
              }}
            >
              {activeImageErrored ? (
                <Box
                  component="img"
                  src={activeImage.url}
                  alt={activeImage.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <Image
                  src={activeImage.url}
                  alt={activeImage.alt}
                  width={1200}
                  height={900}
                  sizes={modalImageSizes}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  onLoad={handleModalLoad}
                  onError={handleModalError}
                  priority
                  unoptimized={!activeImage.optimized}
                />
              )}
            </Box>
          </Box>
        )}
      </Dialog>
    </>
  );
}
