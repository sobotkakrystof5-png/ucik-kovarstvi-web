import type { MetadataRoute } from 'next';
import { kontakt } from '@/content/kontakt';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ["/vzornik"] }],
    sitemap: `${kontakt.web}/sitemap.xml`,
  };
}
