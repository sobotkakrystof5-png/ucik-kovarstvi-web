/**
 * Drobečková navigace na podstránkách: viditelná + JSON-LD BreadcrumbList (brief §8).
 * Poslední položka je aktuální stránka (bez odkazu).
 */
import Link from 'next/link';
import { breadcrumbLd, type Drobek } from '@/lib/seo';
import { JsonLd } from './JsonLd';
import styles from './Drobecky.module.css';

export function Drobecky({ drobky }: { drobky: Drobek[] }) {
  const vse = [{ nazev: 'Úvod', href: '/' }, ...drobky];
  return (
    <>
      <nav aria-label="Drobečková navigace" className={styles.nav}>
        <ol>
          {vse.map((d, i) => {
            const posledni = i === vse.length - 1;
            return (
              <li key={d.href}>
                {posledni ? (
                  <span aria-current="page">{d.nazev}</span>
                ) : (
                  <Link href={d.href}>{d.nazev}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(vse)} />
    </>
  );
}
