"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Partytown components only after user interaction
const GoogleAnalyticsPartytown = dynamic(
  () => import('./GoogleAnalyticsPartytown').then(mod => ({ default: mod.default })),
  { ssr: false }
);

export const DeferredScripts = () => {
  const [shouldLoadScripts, setShouldLoadScripts] = useState(false);

  useEffect(() => {
    // Load scripts after user interaction (scroll, click, keydown) or after 3 seconds
    const loadScripts = () => {
      setShouldLoadScripts(true);
    };

    // Listen for user interactions
    const events = ['scroll', 'mousedown', 'touchstart', 'keydown'];
    
    const handleUserInteraction = () => {
      loadScripts();
      // Remove event listeners after first interaction
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { passive: true });
    });

    // Fallback: load after 3 seconds even without interaction
    const timeout = setTimeout(() => {
      loadScripts();
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    }, 3000);

    return () => {
      clearTimeout(timeout);
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  if (!shouldLoadScripts) {
    return null;
  }

  return (
    <>
      <GoogleAnalyticsPartytown />
    </>
  );
};