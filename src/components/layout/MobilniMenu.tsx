'use client';

/**
 * Mobilní menu: celostránkový panel s velkými položkami pro palec (brief §4).
 * Nativní <dialog> s showModal(): focus zůstává uvnitř, Esc zavírá,
 * stránka pod ním je inertní. Po navigaci se panel sám zavře.
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { kontakt, mailtoHref } from '@/content/kontakt';
import { hlavniMenu, vyrobkyHref } from '@/content/navigace';
import { skupinaHref, skupiny } from '@/content/vyrobky';
import styles from './MobilniMenu.module.css';

export function MobilniMenu() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    dialogRef.current?.close();
  }, [pathname]);

  const otevrit = () => dialogRef.current?.showModal();
  const zavrit = () => dialogRef.current?.close();

  const current = (href: string) => (pathname === href ? 'page' : undefined);

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        className={styles.opener}
        onClick={otevrit}
        aria-haspopup="dialog"
      >
        <span className={styles.burger} aria-hidden="true" />
        Menu
      </button>

      <dialog
        ref={dialogRef}
        className={`${styles.dialog} surface-coal`}
        aria-label="Menu"
        onClose={() => openerRef.current?.focus()}
      >
        <div className={styles.top}>
          <button type="button" className={styles.close} onClick={zavrit}>
            Zavřít
          </button>
        </div>

        <nav aria-label="Hlavní menu" className={styles.nav}>
          <Link href={vyrobkyHref} className={styles.big} aria-current={current(vyrobkyHref)}>
            Výrobky
          </Link>
          <ul className={styles.groups}>
            {skupiny.map((s) => (
              <li key={s.slug}>
                <Link href={skupinaHref(s)} className={styles.group} aria-current={current(skupinaHref(s))}>
                  {s.nazev}
                </Link>
              </li>
            ))}
          </ul>
          <ul className={styles.main}>
            {hlavniMenu.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className={styles.big} aria-current={current(p.href)}>
                  {p.nazev}
                </Link>
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
        </div>
      </dialog>
    </>
  );
}
