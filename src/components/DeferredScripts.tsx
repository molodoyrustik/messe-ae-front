"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Определяем режим Google Analytics на уровне модуля (SSR-safe)
const GA_MODE = (process.env.NEXT_PUBLIC_GA_MODE || 'partytown') as 'partytown' | 'native';

// Динамически импортируем нужный компонент Google Analytics
const GoogleAnalytics = dynamic(
  () => GA_MODE === 'native' 
    ? import('./GoogleAnalyticsNative').then(mod => ({ default: mod.default }))
    : import('./GoogleAnalyticsPartytown').then(mod => ({ default: mod.default })),
  { ssr: false }
);

export const DeferredScripts = () => {
  const [shouldLoadScripts, setShouldLoadScripts] = useState(false);

  useEffect(() => {
    // В development режиме показываем текущий режим GA
    if (process.env.NODE_ENV === 'development') {
      console.log(`🔧 GA Mode: ${GA_MODE}`);
    }

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
      <GoogleAnalytics />
    </>
  );
};