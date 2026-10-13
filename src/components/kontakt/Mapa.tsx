/**
 * Mapa dílny: iframe Mapy.com bez JS SDK (brief §3).
 * Dokud uživatel nedodá kód z Mapy.com (`mapa.embedSrc` v src/content/kontakt.ts),
 * ukazuje se placeholder s odkazem na mapu. CSP `frame-src` se otevře
 * jen ve chvíli, kdy je embedSrc vyplněné (src/lib/security.ts).
 */
import { kontakt, mapa } from '@/content/kontakt';
import { VolutaZnak } from '@/components/voluta/Voluta';
import styles from './Mapa.module.css';

export function Mapa() {
  const adresa = `${kontakt.adresa.ulice}, ${kontakt.adresa.psc} ${kontakt.adresa.obec}`;

  if (mapa.embedSrc) {
    return (
      <div className={styles.frame}>
        <iframe
          src={mapa.embedSrc}
          title={`Mapa: ${kontakt.firma}, ${adresa}`}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  return (
    <div className={`${styles.frame} ${styles.placeholder}`} data-slot="kontakt-mapa-01">
      <VolutaZnak zhava={false} className={styles.mark} tloustka={2.4} />
      <p>
        <span className={styles.kind}>Mapa</span> {adresa}
      </p>
      <a href={mapa.odkaz} target="_blank" rel="noopener noreferrer">
        Otevřít na Mapy.com
      </a>
    </div>
  );
}
