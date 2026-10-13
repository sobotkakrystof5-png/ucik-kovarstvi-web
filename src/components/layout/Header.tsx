/**
 * Hlavička (web-project-brief.md §3, §4).
 * Desktop: wordmark, menu s rozbalovacími Výrobky, vpravo zvýrazněné Zavolat.
 * Mobil: wordmark a tlačítko Menu, které otevře celostránkový panel.
 * Zavolat je na mobilu ve spodní liště (MobilniLista).
 */
import { Akce } from '@/components/akce/Akce';
import { kontakt } from '@/content/kontakt';
import { HlavniNavigace } from './HlavniNavigace';
import { MobilniMenu } from './MobilniMenu';
import { Wordmark } from './Wordmark';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.bar}`}>
        <Wordmark />
        <HlavniNavigace />
        <div className={styles.call}>
          <Akce href={kontakt.telefon.href} velikost="mala" aria-label={`Zavolat ${kontakt.telefon.zobrazeni}`}>
            Zavolat <span className={styles.phone}>{kontakt.telefon.zobrazeni}</span>
          </Akce>
        </div>
        <MobilniMenu />
      </div>
    </header>
  );
}
