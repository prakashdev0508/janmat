import { getSiteUrl } from "@/lib/site-url";
import type { LeaderProfileMeta } from "../leader-profile/types";

type LeaderJsonLdProps = {
  meta: LeaderProfileMeta;
};

function toSameAsUrl(website: string, twitter: string): string[] {
  const out: string[] = [];
  if (website) {
    out.push(website.startsWith("http") ? website : `https://${website}`);
  }
  if (twitter) {
    if (twitter.startsWith("http")) {
      out.push(twitter);
    } else if (twitter.startsWith("@")) {
      out.push(`https://twitter.com/${twitter.slice(1)}`);
    }
  }
  return out;
}

export function LeaderJsonLd({ meta }: LeaderJsonLdProps) {
  const url = `${getSiteUrl()}/leaders/${meta.id}`;
  const sameAs = toSameAsUrl(meta.website, meta.twitter);
  const payload = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: meta.name,
    url,
    image: meta.avatarUrl,
    ...(meta.party
      ? {
          memberOf: {
            "@type": "Organization",
            name: meta.party,
          },
        }
      : {}),
    ...(meta.location
      ? {
          homeLocation: {
            "@type": "Place",
            name: meta.location,
          },
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }} />
  );
}
