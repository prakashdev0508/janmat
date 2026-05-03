import { getSiteUrl } from "@/lib/site-url";

const DESCRIPTION = "The real-time pulse of Indian democracy. Track live public sentiment, compare leaders, and explore democratic insights across India.";

export function SiteJsonLd() {
  const url = getSiteUrl();
  const payload = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite" as const,
      name: "JannMat",
      url,
      description: DESCRIPTION,
      inLanguage: "en-IN",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization" as const,
      name: "JannMat",
      url,
      description: DESCRIPTION,
    },
  ];

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }} />
  );
}
