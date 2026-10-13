/**
 * Dočasný textový wordmark (Cinzel), dokud nepřijde finální logo.
 * Skladba podle konceptu loga v briefu: menší JIŘÍ, velké UČÍK,
 * pod tenkou čarou UMĚLECKÉ KOVÁŘSTVÍ. Znak (U s volutami) se nekreslí.
 */
import Image from 'next/image';
import Link from 'next/link';
import { brand } from '@/content/brand';
import styles from './Wordmark.module.css';

export function Wordmark({ ton = 'papir' }: { ton?: 'papir' | 'uhel' }) {
  return (
    <Link href="/" className={[styles.mark, ton === 'uhel' && styles.dark].filter(Boolean).join(' ')}>
      {brand.logoSrc ? (
        <Image
          src={brand.logoSrc}
          alt="Kovářství Jiří Učík, úvodní stránka"
          width={brand.logoSirka}
          height={brand.logoVyska}
          priority
        />
      ) : (
        <>
          <span className="visually-hidden">Kovářství Jiří Učík, úvodní stránka</span>
          <span className={styles.text} aria-hidden="true">
            <span className={styles.first}>Jiří</span>
            <span className={styles.last}>Učík</span>
            <span className={styles.trade}>Umělecké kovářství</span>
          </span>
        </>
      )}
    </Link>
  );
}
