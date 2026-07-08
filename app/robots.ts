import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://portfolio-abinu2s-projects.vercel.app/sitemap.xml',
  };
}
