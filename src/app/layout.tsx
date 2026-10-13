import type { Metadata, Viewport } from 'next';
import { connection } from 'next/server';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { MobilniLista } from '@/components/layout/MobilniLista';
import { JsonLd } from '@/components/stranka/JsonLd';
import { kontakt } from '@/content/kontakt';
import { localBusinessLd, OG_OBRAZEK } from '@/lib/seo';
import { cinzel, fraunces, sourceSans } from './fonts';
import './globals.css';

// Výchozí metadata. Každá stránka má vlastní title, description, canonical a OG
// (src/lib/seo.ts → metadataStranky). Hodnoty jsou PRACOVNÍ do keyword researchu.
export const metadata: Metadata = {
  metadataBase: new URL(kontakt.web),
  title: {
    default: kontakt.firma,
    template: `%s | ${kontakt.firma}`,
  },
  applicationName: kontakt.firma,
  authors: [{ name: kontakt.jmeno }],
  formatDetection: { telephone: false },
  openGraph: { locale: 'cs_CZ', siteName: kontakt.firma, images: [OG_OBRAZEK] },
};

export const viewport: Viewport = {
  themeColor: '#f4efe6',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // CSP s nonce vyžaduje renderování na request (DECISIONS.md 005).
  await connection();

  return (
    <html lang="cs" className={`${fraunces.variable} ${sourceSans.variable} ${cinzel.variable}`}>
      <body>
        <a href="#obsah" className="skip-link">
          Přeskočit na obsah
        </a>
        <Header />
        <main id="obsah" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <MobilniLista />
        <JsonLd data={localBusinessLd()} />
      </body>
    </html>
  );
}
