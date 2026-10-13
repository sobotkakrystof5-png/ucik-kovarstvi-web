import type { NextConfig } from 'next';
import { staticSecurityHeaders } from './src/lib/security';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Neprozrazovat framework ani verzi (brief §7).
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  // V domovské složce leží cizí package-lock.json, kořen projektu je tady.
  turbopack: { root: __dirname },

  images: {
    formats: ['image/avif', 'image/webp'],
    // Fotky budou jen lokální v public/. Vzdálené domény se nepovolují.
    remotePatterns: [],
  },

  async headers() {
    return [{ source: '/:path*', headers: staticSecurityHeaders }];
  },

  /**
   * Přesměrování 301 ze starého WordPress webu (brief §8).
   * Cíle používají PRACOVNÍ slugy, po keyword researchu je zkontrolovat.
   * Next.js nejdřív odstraní koncové lomítko (308), pak platí tato pravidla.
   */
  async redirects() {
    const r = (source: string, destination: string) => ({ source, destination, statusCode: 301 as const });
    return [
      r('/fotogalerie', '/realizace'),
      r('/fotogalerie/vrata-brany-a-branky-ploty', '/realizace/brany-a-ploty'),
      r('/fotogalerie/kovane-mrize', '/realizace/mrize-dvere-kovani'),
      r('/fotogalerie/kovane-vyvesni-stity-krize-mece', '/realizace/zakazky-na-prani'),
      r('/komentare-a-diskuze-kovarstvi', '/'),
      // /kontakt/ → /kontakt řeší Next.js sám (koncové lomítko).
      // [DOPLNÍ UŽIVATEL] zbylé kategorie fotogalerie a stránka „Naše služby“
      // (úplný seznam starých URL zatím nemáme, memory/memory.md → Otevřené otázky).
    ];
  },
};

export default nextConfig;
