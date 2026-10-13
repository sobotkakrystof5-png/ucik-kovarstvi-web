import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HlavickaStranky } from '@/components/stranka/HlavickaStranky';
import { ObsahStranky } from '@/components/vyrobky/ObsahStranky';
import { realizaceCasti, type CastGalerie } from '@/content/realizace';
import { najdiSkupinu, skupinaHref, skupiny } from '@/content/vyrobky';
import { metadataStranky } from '@/lib/seo';

type Params = { params: Promise<{ skupina: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return skupiny.map((s) => ({ skupina: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const s = najdiSkupinu((await params).skupina);
  if (!s) return {};
  return metadataStranky({ ...s.seo, cesta: skupinaHref(s) });
}

export default async function SkupinaPage({ params }: Params) {
  const skupina = najdiSkupinu((await params).skupina);
  if (!skupina) notFound();

  // Části galerie mají stejné slugy jako skupiny (brief §5)
  const cast = skupina.slug as CastGalerie;

  return (
    <>
      <HlavickaStranky
        stitek="Výrobky"
        nadpis={skupina.nazev}
        uvod={<p>{skupina.kratce}</p>}
        drobky={[
          { nazev: 'Výrobky', href: '/vyrobky' },
          { nazev: skupina.nazev, href: skupinaHref(skupina) },
        ]}
      />
      <ObsahStranky
        nazev={skupina.nazev}
        hero={skupina.hero}
        text={skupina.text}
        cast={cast}
        realizace={realizaceCasti(cast)}
        rozcestnik={skupina}
        vzory={skupina.vzory}
      />
    </>
  );
}
