export const ResourceHints = () => {
  return (
    <>
      {/* High priority preload for hero poster images */}
      <link
        rel="preload"
        as="image"
        fetchPriority="high"
        href="/images/hero-poster.jpg"
      />
      <link
        rel="preload" 
        as="image"
        fetchPriority="high"
        href="/images/hero-poster-mobile-cropped.jpg"
        media="(max-width: 899px)"
      />
      
      {/* Preconnect to Strapi API for faster API calls */}
      <link rel="preconnect" href="https://lovely-idea-e9a72cf425.strapiapp.com" />
      <link rel="preconnect" href="https://lovely-idea-e9a72cf425.media.strapiapp.com" />
      <link rel="dns-prefetch" href="https://lovely-idea-e9a72cf425.strapiapp.com" />
      <link rel="dns-prefetch" href="https://lovely-idea-e9a72cf425.media.strapiapp.com" />
      
      
      {/* Prefetch most likely client logo images for performance */}
      <link rel="prefetch" as="image" href="/client-logos/siemens.webp" />
      <link rel="prefetch" as="image" href="/client-logos/porsche.webp" />
      <link rel="prefetch" as="image" href="/client-logos/canon.webp" />
    </>
  );
};