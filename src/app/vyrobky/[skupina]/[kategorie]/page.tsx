import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HlavickaStranky } from '@/components/stranka/HlavickaStranky';
import { ObsahStranky } from '@/components/vyrobky/ObsahStranky';
import { realizaceKategorie, type CastGalerie } from '@/content/realizace';
import { kategorieHref, najdiKategorii, najdiSkupinu, skupinaHref, skupiny } from '@/content/vyrobky';
import { metadataStranky } from '@/lib/seo';

type Params = { params: Promise<{ skupina: string; kategorie: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return skupiny.flatMap((s) => s.kategorie.map((k) => ({ skupina: s.slug, kategorie: k.slug })));
}

async function najdi(params: Params['params']) {
  const p = await params;
  const skupina = najdiSkupinu(p.skupina);
  const kategorie = skupina && najdiKategorii(skupina, p.kategorie);
  return skupina && kategorie ? { skupina, kategorie } : null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const n = await najdi(params);
  if (!n) return {};
  return metadataStranky({ ...n.kategorie.seo, cesta: kategorieHref(n.skupina, n.kategorie) });
}

export default async function KategoriePage({ params }: Params) {
  const n = await najdi(params);
  if (!n) notFound();
  const { skupina, kategorie } = n;
  const cast = skupina.slug as CastGalerie;

  return (
    <>
      <HlavickaStranky
        stitek={skupina.nazev}
        nadpis={kategorie.nazev}
        uvod={<p>{kategorie.kratce}</p>}
        drobky={[
          { nazev: 'Výrobky', href: '/vyrobky' },
          { nazev: skupina.nazev, href: skupinaHref(skupina) },
          { nazev: kategorie.nazev, href: kategorieHref(skupina, kategorie) },
        ]}
      />
      <ObsahStranky
        nazev={kategorie.nazev}
        hero={kategorie.hero}
        text={kategorie.text}
        cast={cast}
        realizace={realizaceKategorie(cast, kategorie.slug)}
        vzory={kategorie.vzory}
      />
    </>
  );
}
