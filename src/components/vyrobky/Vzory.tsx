/**
 * Pojmenované vzory (brief §4): brány a branky ze stávající galerie klienta.
 * Fotky 4:5, pod nimi jen název vzoru.
 */
import { PhotoSlot } from '@/components/photo-slot/PhotoSlot';
import type { Vzor } from '@/content/vyrobky';
import styles from './Vzory.module.css';

export function Vzory({ vzory }: { vzory: Vzor[] }) {
  const druhy = [
    { druh: 'brána' as const, nadpis: 'Brány' },
    { druh: 'branka' as const, nadpis: 'Branky' },
  ].filter((d) => vzory.some((v) => v.druh === d.druh));

  return (
    <section className={`wrap ${styles.section}`} aria-labelledby="vzory-nadpis">
      <div className={styles.head}>
        <h2 id="vzory-nadpis">Vzory</h2>
        <p className="muted">
          Každý vzor se dá upravit na Váš rozměr, a když Vám žádný nesedí, nakreslím nový.
        </p>
      </div>
      {druhy.map((d) => (
        <div key={d.druh} className={styles.group}>
          <h3 className={styles.sub}>{d.nadpis}</h3>
          <ul className={styles.grid}>
            {vzory
              .filter((v) => v.druh === d.druh)
              .map((v) => (
                <li key={v.nazev}>
                  <PhotoSlot
                    id={v.foto.id}
                    popis={v.foto.popis}
                    alt={v.foto.alt}
                    src={v.foto.src}
                    pomer="4:5"
                    sizes="(min-width: 64rem) 22vw, (min-width: 40rem) 30vw, 50vw"
                  />
                  <p className={styles.name}>{v.nazev}</p>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
