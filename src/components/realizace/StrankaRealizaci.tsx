/**
 * Galerie podle činností (web-project-brief.md §5).
 * Filtr jsou štítky-odkazy na routy částí (sdílitelná URL). `scroll={false}`
 * drží pozici stránky, takže přepnutí neskáče nahoru.
 */
import Link from 'next/link';
import { Galerie } from '@/components/galerie/Galerie';
import { HlavickaStranky } from '@/components/stranka/HlavickaStranky';
import { ZavolejteMi } from '@/components/stranka/ZavolejteMi';
import { castHref, casti, doGalerie, type CastInfo, type Realizace } from '@/content/realizace';
import { najdiSkupinu, skupinaHref } from '@/content/vyrobky';
import type { Drobek } from '@/lib/seo';
import styles from './StrankaRealizaci.module.css';

type Props = {
  cast: CastInfo | null;
  fotky: Realizace[];
};

export function StrankaRealizaci({ cast, fotky }: Props) {
  const drobky: Drobek[] = [{ nazev: 'Realizace', href: '/realizace' }];
  if (cast) drobky.push({ nazev: cast.nazev, href: castHref(cast.slug) });

  const stitky = [{ href: '/realizace', nazev: 'Vše', aktivni: !cast }].concat(
    casti.map((c) => ({ href: castHref(c.slug), nazev: c.nazev, aktivni: cast?.slug === c.slug })),
  );

  // Zpětný odkaz na stejnojmennou skupinu Výrobků (Výrobky už sem odkazují).
  // Část „Z dílny“ skupinu nemá.
  const skupina = cast ? najdiSkupinu(cast.slug) : undefined;

  return (
    <>
      <HlavickaStranky
        stitek="Realizace"
        nadpis={cast ? cast.nazev : 'Hotová práce'}
        uvod={
          <p>
            {cast
              ? cast.obsah
              : 'Výběr z toho, co jsem vykoval. Když se Vám něco líbí, klikněte na fotku a napište mi, že chcete podobné.'}
          </p>
        }
        drobky={drobky}
      />

      <div className="wrap">
        <nav aria-label="Části galerie" className={styles.filter}>
          <ul>
            {stitky.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  scroll={false}
                  className={styles.tag}
                  aria-current={s.aktivni ? 'page' : undefined}
                >
                  {s.nazev}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div key={cast?.slug ?? 'vse'} className={styles.grid}>
          <Galerie
            fotky={fotky.map(doGalerie)}
            nazev={cast ? `Realizace: ${cast.nazev}` : 'Výběr realizací'}
          />
        </div>

        {skupina && (
          <p className={styles.vyrobky}>
            <Link href={skupinaHref(skupina)}>Co všechno vykuji: {skupina.nazev}</Link>
          </p>
        )}
      </div>

      <ZavolejteMi nadpis="Líbí se Vám něco z toho?" />
    </>
  );
}
