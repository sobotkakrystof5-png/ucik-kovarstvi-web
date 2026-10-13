import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { StrankaRealizaci } from '@/components/realizace/StrankaRealizaci';
import { castHref, casti, najdiCast, realizaceCasti } from '@/content/realizace';
import { metadataStranky } from '@/lib/seo';

type Params = { params: Promise<{ cast: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return casti.map((c) => ({ cast: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = najdiCast((await params).cast);
  if (!c) return {};
  return metadataStranky({ ...c.seo, cesta: castHref(c.slug) });
}

export default async function CastPage({ params }: Params) {
  const cast = najdiCast((await params).cast);
  if (!cast) notFound();
  return <StrankaRealizaci cast={cast} fotky={realizaceCasti(cast.slug)} />;
}
