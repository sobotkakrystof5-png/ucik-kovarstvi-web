/**
 * sitemap.xml (brief §8): všechny indexovatelné stránky, bez vzorníku a 404.
 * Generuje se z obsahových dat, takže nová kategorie se objeví sama.
 */
import type { MetadataRoute } from 'next';
import { kontakt } from '@/content/kontakt';
import { castHref, casti } from '@/content/realizace';
import { kategorieHref, skupinaHref, skupiny } from '@/content/vyrobky';

export default function sitemap(): MetadataRoute.Sitemap {
  const cesty = [
    '/',
    '/vyrobky',
    ...skupiny.map(skupinaHref),
    ...skupiny.flatMap((s) => s.kategorie.map((k) => kategorieHref(s, k))),
    '/realizace',
    ...casti.map((c) => castHref(c.slug)),
    '/jak-pracuji',
    '/o-mne',
    '/kontakt',
  ];
  return cesty.map((c) => ({ url: `${kontakt.web}${c === '/' ? '' : c}` }));
}
