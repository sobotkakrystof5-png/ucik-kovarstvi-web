/**
 * Zdroj výchozího OG obrázku (public/og/og-vychozi.png), 1200×630.
 * Jen pro vývoj: stránka se vyfotí headless Chromem a PNG se uloží do public/og/.
 * Typografický, bez fotky. Po dodání fotek a loga ho nahradí skutečný obrázek.
 */
import { notFound } from 'next/navigation';
import { VolutaZnak } from '@/components/voluta/Voluta';
import styles from './og.module.css';

export const metadata = { robots: { index: false, follow: false } };

export default function OgZdroj() {
  if (process.env.NODE_ENV === 'production') notFound();
  return (
    <div className={`surface-coal ${styles.card}`} id="og-karta">
      <VolutaZnak className={styles.mark} tloustka={2.6} />
      <div className={styles.text}>
        <p className={styles.first}>Jiří</p>
        <p className={styles.last}>Učík</p>
        <p className={styles.trade}>Umělecké kovářství</p>
        <p className={styles.place}>Žitenice u Litoměřic · 603 582 254</p>
      </div>
    </div>
  );
}
