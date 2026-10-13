/**
 * Spodní lišta na mobilu: Zavolat | Napsat, stále viditelná (brief §4).
 * Od 64rem (desktop) skrytá, tam je Zavolat v hlavičce.
 */
import { kontakt, mailtoHref } from '@/content/kontakt';
import styles from './MobilniLista.module.css';

export function MobilniLista() {
  return (
    <nav className={`${styles.bar} surface-coal`} aria-label="Rychlý kontakt">
      <a href={kontakt.telefon.href} className={styles.action}>
        Zavolat
      </a>
      <a href={mailtoHref} className={styles.action}>
        Napsat
      </a>
    </nav>
  );
}
