export const ResourceHints = () => {
  return (
    <>
      {/* Hero poster preloading - Both images for better mobile performance */}
      <link
        rel="preload"
        as="image"
        fetchPriority="high"
        href="/images/hero-poster-mobile-cropped.webp"
      />

      {/* Preconnect to Strapi API for faster API calls */}
      <link
        rel="preconnect"
        href="https://lovely-idea-e9a72cf425.strapiapp.com"
      />
      <link
        rel="preconnect"
        href="https://lovely-idea-e9a72cf425.media.strapiapp.com"
      />
      <link
        rel="dns-prefetch"
        href="https://lovely-idea-e9a72cf425.strapiapp.com"
      />
      <link
        rel="dns-prefetch"
        href="https://lovely-idea-e9a72cf425.media.strapiapp.com"
      />

      {/* Prefetch most likely client logo images for performance */}
      <link rel="prefetch" as="image" href="/client-logos/siemens.webp" />
      <link rel="prefetch" as="image" href="/client-logos/porsche.webp" />
      <link rel="prefetch" as="image" href="/client-logos/canon.webp" />
    </>
  );
};
