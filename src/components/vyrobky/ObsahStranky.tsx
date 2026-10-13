/**
 * Společné tělo stránek skupin a kategorií (brief §4): úvodní fotka 21:9,
 * text, případně rozcestník a vzory, výběr realizací a výzva k zavolání.
 */
import Link from 'next/link';
import { Galerie } from '@/components/galerie/Galerie';
import { PhotoSlot } from '@/components/photo-slot/PhotoSlot';
import { ZavolejteMi } from '@/components/stranka/ZavolejteMi';
import { castHref, doGalerie, najdiCast, type CastGalerie, type Realizace } from '@/content/realizace';
import type { Foto } from '@/content/typy';
import type { Skupina, Vzor } from '@/content/vyrobky';
import { Rozcestnik } from './Rozcestnik';
import { Vzory } from './Vzory';
import styles from './ObsahStranky.module.css';

type Props = {
  nazev: string;
  hero: Foto;
  text: string[];
  cast: CastGalerie;
  realizace: Realizace[];
  /** Skupina s kategoriemi: zobrazí rozcestník. */
  rozcestnik?: Skupina;
  vzory?: Vzor[];
};

export function ObsahStranky({ nazev, hero, text, cast, realizace, rozcestnik, vzory }: Props) {
  return (
    <>
      <div className={`wrap ${styles.hero}`}>
        <PhotoSlot
          id={hero.id}
          popis={hero.popis}
          alt={hero.alt}
          src={hero.src}
          pomer="21:9"
          pomerMobil="4:5"
          sizes="(min-width: 84rem) 84rem, 100vw"
          priority
        />
      </div>

      <div className={`wrap ${styles.text}`}>
        {text.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      {rozcestnik && rozcestnik.kategorie.length > 0 && <Rozcestnik skupina={rozcestnik} />}
      {vzory && vzory.length > 0 && <Vzory vzory={vzory} />}

      {realizace.length > 0 && (
        <section className={`wrap ${styles.realizace}`} aria-labelledby="realizace-nadpis">
          <div className={styles.realizaceHead}>
            <h2 id="realizace-nadpis">Z realizací</h2>
            <Link href={castHref(cast)} className={styles.all}>
              Všechny realizace: {najdiCast(cast)?.nazev}
            </Link>
          </div>
          <Galerie
            fotky={realizace.slice(0, 6).map(doGalerie)}
            rozvrzeni="rada"
            nazev={`Realizace: ${nazev}`}
          />
        </section>
      )}

      <ZavolejteMi />
    </>
  );
}
