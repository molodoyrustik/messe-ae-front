"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

interface GoogleAnalyticsNativeProps {
  trackingId?: string;
}

export default function GoogleAnalyticsNative({ trackingId }: GoogleAnalyticsNativeProps) {
  // Используем environment variable или переданный trackingId
  const GA_TRACKING_ID = trackingId || process.env.NEXT_PUBLIC_GA_TRACKING_ID;

  useEffect(() => {
    if (!GA_TRACKING_ID) {
      console.warn(
        "Google Analytics tracking ID не найден. Добавьте NEXT_PUBLIC_GA_TRACKING_ID в environment variables."
      );
      return;
    }

    // В development режиме показываем что используется Native загрузка
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Google Analytics: Native mode (main thread loading)');
    }
  }, [GA_TRACKING_ID]);

  // Не загружаем Google Analytics если нет tracking ID
  if (!GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      {/* Обычная загрузка Google Analytics без Partytown */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-native"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          `,
        }}
      />
    </>
  );
}

// Вспомогательные функции для отслеживания событий (совместимые с Partytown версией)
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, unknown>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
};

export const trackPageView = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_TRACKING_ID as string, {
      page_title: document.title,
      page_location: url,
    });
  }
};