/**
 * Rozcestník kategorií na stránce skupiny: číslovaný seznam řádků,
 * ne mřížka karet (brief §0 a §4).
 */
import Link from 'next/link';
import { kategorieHref, type Skupina } from '@/content/vyrobky';
import styles from './Rozcestnik.module.css';

export function Rozcestnik({ skupina }: { skupina: Skupina }) {
  return (
    <section className={`wrap ${styles.section}`} aria-labelledby="kategorie-nadpis">
      <h2 id="kategorie-nadpis" className={styles.title}>
        Co do skupiny patří
      </h2>
      <ol className={styles.list}>
        {skupina.kategorie.map((k, i) => (
          <li key={k.slug}>
            <Link href={kategorieHref(skupina, k)} className={styles.row}>
              <span className={styles.num} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={styles.name}>{k.nazev}</span>
              <span className={styles.desc}>{k.kratce}</span>
              <span className={styles.arrow} aria-hidden="true">
                <svg viewBox="0 0 32 12">
                  <path d="M0 6h29M24 1l5 5-5 5" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
