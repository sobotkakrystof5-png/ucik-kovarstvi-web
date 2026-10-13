/**
 * Bezpečnostní politika webu: jediný zdroj pravdy pro CSP a ostatní hlavičky.
 *
 * Specifikace: web-project-brief.md §7, pravidla: AGENTS.md §7.
 * Každá změna CSP jde do .claude/security/CSP-LOG.md, kompromisy do DECISIONS.md.
 * Hlavičky se mění jen jako celek a jen po ověření na Vercel preview URL.
 */

// Relativní cesta: soubor importuje i next.config.ts, kde alias @/ neplatí.
import { mapa } from '../content/kontakt';

/**
 * Mapa na Kontaktu: kód „Vložit mapu do stránek“ z Mapy.com vede na
 * frame.mapy.cz, které přesměruje na mapy.com (ověřeno 2026-10-05).
 * CSP kontroluje i cíl přesměrování, proto oba hostnamy. Žádné wildcardy.
 */
const MAPY_HOSTS = ['https://frame.mapy.cz', 'https://mapy.com'] as const;

/**
 * `frame-src` se otevře jen tehdy, když je mapa opravdu vložená
 * (`mapa.embedSrc` v src/content/kontakt.ts). Do té doby 'none'.
 * Aktivace = změna CSP, zapsat do .claude/security/CSP-LOG.md.
 */
const FRAME_HOSTS: readonly string[] = mapa.embedSrc ? MAPY_HOSTS : [];

/**
 * Sestaví Content-Security-Policy pro jeden request.
 * `script-src` nikdy nedostane 'unsafe-inline'. 'unsafe-eval' jen v `next dev`,
 * protože ho React vyžaduje pro ladicí výpisy; do produkčního buildu se nedostane
 * (DECISIONS.md 004).
 */
export function buildCsp(nonce: string, isDev: boolean): string {
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
    // Next.js vkládá styly inline a komponenty používají style atribut (aspect-ratio).
    // Vědomý kompromis, DECISIONS.md 001.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    // Fonty jsou self-hosted přes next/font, žádné Google domény (DECISIONS.md 003).
    "font-src 'self'",
    "connect-src 'self'",
    `frame-src ${FRAME_HOSTS.length ? FRAME_HOSTS.join(' ') : "'none'"}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    // Web nemá formulář (rozhodnutí klienta), DECISIONS.md 002.
    "form-action 'none'",
    "object-src 'none'",
    "manifest-src 'self'",
    "worker-src 'self'",
  ];
  // V dev běží web na http://localhost, upgrade by jen překážel.
  if (!isDev) directives.push('upgrade-insecure-requests');
  return directives.join('; ');
}

/** Ostatní hlavičky. Statické, proto je posílá next.config.ts na všechny odpovědi. */
export const staticSecurityHeaders: { key: string; value: string }[] = [
  // Bez `preload`, přidá se po měsíci bezproblémového provozu (STATE.md).
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: [
      'accelerometer=()',
      'autoplay=()',
      'bluetooth=()',
      'browsing-topics=()',
      'camera=()',
      'display-capture=()',
      'encrypted-media=()',
      'fullscreen=(self)',
      'geolocation=()',
      'gyroscope=()',
      'hid=()',
      'idle-detection=()',
      'magnetometer=()',
      'microphone=()',
      'midi=()',
      'payment=()',
      'picture-in-picture=()',
      'publickey-credentials-get=()',
      'screen-wake-lock=()',
      'serial=()',
      'usb=()',
      'xr-spatial-tracking=()',
    ].join(', '),
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  { key: 'X-XSS-Protection', value: '0' },
  { key: 'X-DNS-Prefetch-Control', value: 'off' },
];
