/**
 * Písma přes next/font: stáhnou se při buildu a servírují z vlastní domény.
 * Žádné Google CDN za běhu (GDPR, CSP `font-src 'self'`, DECISIONS.md 003).
 * Podmnožina latin-ext kvůli češtině.
 */
import { Cinzel, Fraunces, Source_Sans_3 } from 'next/font/google';

/** Nadpisy. Osa opsz kvůli velkým display velikostem, SOFT pro měkčí patky. */
export const fraunces = Fraunces({
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT'],
  variable: '--font-fraunces',
  display: 'swap',
});

/** Text, základ 18 px. */
export const sourceSans = Source_Sans_3({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-source-sans',
  display: 'swap',
});

/** Jen logo a dočasný wordmark. */
export const cinzel = Cinzel({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600'],
  variable: '--font-cinzel',
  display: 'swap',
});
