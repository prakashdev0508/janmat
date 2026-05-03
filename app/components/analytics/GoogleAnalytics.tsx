"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function GaPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID) {
      return;
    }
    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;
    window.gtag?.("config", GA_ID, {
      page_path: pagePath,
    });
  }, [pathname, searchParams]);

  return null;
}

/**
 * GA4 via gtag.js. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` to your Measurement ID (e.g. G-XXXXXXXXXX).
 */
export function GoogleAnalytics() {
  if (!GA_ID) {
    return null;
  }

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-gtag-init" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
        `}
      </Script>
      <Suspense fallback={null}>
        <GaPageView />
      </Suspense>
    </>
  );
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
