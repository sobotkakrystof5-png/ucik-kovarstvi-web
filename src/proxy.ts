/**
 * Proxy (dříve middleware): pro každý request vygeneruje nonce a nastaví CSP.
 *
 * Next.js si nonce přečte z CSP hlavičky requestu a sám ho doplní na své skripty.
 * Důsledek: stránky se renderují dynamicky (DECISIONS.md 005).
 */
import { NextResponse, type NextRequest } from 'next/server';
import { buildCsp } from '@/lib/security';

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const csp = buildCsp(nonce, process.env.NODE_ENV === 'development');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('Content-Security-Policy', csp);
  return response;
}

export const config = {
  matcher: [
    {
      // Statické soubory CSP nepotřebují, prefetch requesty taky ne.
      source: '/((?!_next/static|_next/image|favicon.ico|brand/|\\.well-known/).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
