/**
 * Patička (web-project-brief.md §4): logo, krátký popis, rychlé odkazy,
 * telefon, e-mail, adresa, IČO a © s aktuálním rokem.
 * Nahoře chladnoucí přechod z papíru do uhlu.
 */
import Link from 'next/link';
import { ChladnouciPrechod } from '@/components/prechod/ChladnouciPrechod';
import { kontakt, mailtoHref } from '@/content/kontakt';
import { hlavniMenu, vyrobkyHref } from '@/content/navigace';
import { Wordmark } from './Wordmark';
import styles from './Footer.module.css';

export function Footer() {
  const rok = new Date().getFullYear();
  const { adresa } = kontakt;

  return (
    <footer className={styles.footer}>
      <ChladnouciPrechod smer="do-uhlu" />
      <div className="surface-coal">
        <div className={`wrap ${styles.grid}`}>
          <div className={styles.about}>
            <Wordmark ton="uhel" />
            <p className={styles.desc}>
              Kovářská dílna v Žitenicích u Litoměřic. Kovám na zakázku do domu i na zahradu,
              podle Vašeho návrhu nebo podle svého. Hotový výrobek Vám přivezu a namontuji.
            </p>
          </div>

          <nav className={styles.links} aria-label="Rychlé odkazy">
            <ul>
              <li>
                <Link href={vyrobkyHref}>Výrobky</Link>
              </li>
              {hlavniMenu.map((p) => (
                <li key={p.href}>
                  <Link href={p.href}>{p.nazev}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.contact}>
            <a href={kontakt.telefon.href} className={styles.phone}>
              {kontakt.telefon.zobrazeni}
            </a>
            <a href={mailtoHref} className={styles.mail}>
              {kontakt.email}
            </a>
            <address className={styles.address}>
              {adresa.ulice}
              <br />
              {adresa.psc} {adresa.obec}
            </address>
            <p className={`muted ${styles.hours}`}>Provozní doba {kontakt.provozniDoba}</p>
          </div>
        </div>

        <div className={`wrap ${styles.bottom}`}>
          <p>
            © {rok} {kontakt.firma}
          </p>
          <p>
            IČO {kontakt.ico} · datová schránka {kontakt.datovaSchranka}
          </p>
        </div>
      </div>
    </footer>
  );
}
