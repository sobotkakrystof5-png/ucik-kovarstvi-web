/**
 * SEO pomocníci: metadata stránek a JSON-LD (web-project-brief.md §8).
 * Title a description jsou zatím PRACOVNÍ (fáze 0 až před spuštěním).
 */
import type { Metadata } from 'next';
import { kontakt } from '@/content/kontakt';
import { oblast } from '@/content/oblast';

/** Výchozí OG obrázek, dokud nejsou fotky (typografický, bez fotky). */
export const OG_OBRAZEK = { url: '/og/og-vychozi.png', width: 1200, height: 630, alt: kontakt.firma };

export function metadataStranky({
  title,
  description,
  cesta,
  absolutni = false,
}: {
  title: string;
  description: string;
  /** Kanonická cesta, např. '/vyrobky/brany-a-ploty'. */
  cesta: string;
  /** Title bez šablony „| Kovářství Jiří Učík“ (Úvod). */
  absolutni?: boolean;
}): Metadata {
  return {
    title: absolutni ? { absolute: title } : title,
    description,
    alternates: { canonical: cesta },
    openGraph: {
      type: 'website',
      locale: 'cs_CZ',
      siteName: kontakt.firma,
      title: absolutni ? title : `${title} | ${kontakt.firma}`,
      description,
      url: cesta,
      images: [OG_OBRAZEK],
    },
  };
}

/** LocalBusiness (brief §8): bez openingHours, provozní doba je „dle domluvy“. */
export function localBusinessLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${kontakt.web}/#firma`,
    name: kontakt.firma,
    alternateName: 'Umělecké kovářství Jiří Učík',
    description:
      'Zakázkové a umělecké kovářství. Kované brány, ploty, zábradlí, mříže, dveře, kování, krbové nářadí, nábytek a zakázky na přání, včetně dopravy a montáže.',
    url: kontakt.web,
    telephone: '+420603582254',
    email: kontakt.email,
    founder: { '@type': 'Person', name: kontakt.jmeno },
    address: {
      '@type': 'PostalAddress',
      streetAddress: kontakt.adresa.ulice,
      postalCode: kontakt.adresa.psc.replace(' ', ''),
      addressLocality: kontakt.adresa.obec,
      addressRegion: kontakt.adresa.region,
      addressCountry: 'CZ',
    },
    areaServed: oblast.map((m) => ({ '@type': 'City', name: m.nazev })),
    identifier: { '@type': 'PropertyValue', propertyID: 'IČO', value: kontakt.ico },
    image: `${kontakt.web}${OG_OBRAZEK.url}`,
    // TODO (fáze 3): až vznikne/ověří se Google Business Profile, Firmy.cz
    // a případné sociální sítě, doplnit jejich URL do `sameAs: [...]`.
    // TODO: AggregateRating/Review jen s reálnými recenzemi (GBP, Firmy.cz),
    // nikdy nevyplňovat odhadem ani nulami (brief §8).
  };
}

export type Drobek = { nazev: string; href: string };

export function breadcrumbLd(drobky: Drobek[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: drobky.map((d, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: d.nazev,
      item: `${kontakt.web}${d.href === '/' ? '' : d.href}`,
    })),
  };
}
