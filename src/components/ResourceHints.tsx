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
      {/* Используем preconnect только если действительно используем CDN */}
      {/* <link rel="preconnect" href="https://cdn.messe.ae" />
      <link rel="dns-prefetch" href="https://cdn.messe.ae" /> */}
    </>
  );
};