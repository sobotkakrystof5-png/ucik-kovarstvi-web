'use client';

/**
 * Hlavní navigace pro desktop. Výrobky se rozbalují do panelu se 6 skupinami.
 *
 * Ovládání (brief §9): klik nebo Enter/mezerník na „Výrobky“ panel otevře,
 * Esc ho zavře a vrátí focus na tlačítko, odchod focusu nebo klik mimo ho zavře.
 * Myší se panel otevírá i najetím, s krátkou prodlevou proti nechtěnému zavření.
 * Aktuální stránka má `aria-current="page"`, aktivní sekce `data-active` (zvýraznění).
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { hlavniMenu, vyrobkyHref } from '@/content/navigace';
import { kategorieHref, skupinaHref, skupiny } from '@/content/vyrobky';
import styles from './HlavniNavigace.module.css';

const jeAktivni = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export function HlavniNavigace() {
  const pathname = usePathname();
  // Panel je otevřený jen na cestě, kde se otevřel: po navigaci se zavře sám, bez efektu.
  const [otevrenoNa, setOtevrenoNa] = useState<string | null>(null);
  const otevreno = otevrenoNa === pathname;
  const setOtevreno = useCallback(
    (v: boolean) => setOtevrenoNa(v ? pathname : null),
    [pathname],
  );
  const panelId = useId();
  const rootRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const zavritTimer = useRef<number | undefined>(undefined);

  const zavrit = useCallback(
    (vratitFocus = false) => {
      setOtevreno(false);
      if (vratitFocus) buttonRef.current?.focus();
    },
    [setOtevreno],
  );

  // Esc a klik mimo
  useEffect(() => {
    if (!otevreno) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') zavrit(true);
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) zavrit();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [otevreno, zavrit]);

  useEffect(() => () => window.clearTimeout(zavritTimer.current), []);

  const onPointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    window.clearTimeout(zavritTimer.current);
    setOtevreno(true);
  };
  const onPointerLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    zavritTimer.current = window.setTimeout(() => setOtevreno(false), 220);
  };
  const onBlur = (e: React.FocusEvent) => {
    if (!rootRef.current?.contains(e.relatedTarget as Node)) setOtevreno(false);
  };

  const vyrobkyAktivni = jeAktivni(pathname, vyrobkyHref);

  return (
    <nav className={styles.nav} aria-label="Hlavní menu">
      <ul className={styles.list}>
        <li
          ref={rootRef}
          className={styles.item}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onBlur={onBlur}
        >
          <button
            ref={buttonRef}
            type="button"
            className={styles.link}
            aria-expanded={otevreno}
            aria-controls={panelId}
            data-active={vyrobkyAktivni || undefined}
            onClick={() => setOtevreno(!otevreno)}
          >
            Výrobky
            <svg className={styles.chevron} viewBox="0 0 12 8" aria-hidden="true">
              <path d="M1 1.5 6 6.5 11 1.5" />
            </svg>
          </button>

          <div id={panelId} className={styles.panel} hidden={!otevreno}>
            <div className={styles.panelIntro}>
              <Link
                href={vyrobkyHref}
                className={styles.panelAll}
                aria-current={pathname === vyrobkyHref ? 'page' : undefined}
              >
                Všechny výrobky
              </Link>
              <p className={styles.panelNote}>
                Rozdělil jsem je do šesti skupin podle toho, kam patří.
              </p>
            </div>
            <ul className={styles.groups}>
              {skupiny.map((s) => {
                const href = skupinaHref(s);
                return (
                  <li key={s.slug} className={styles.group}>
                    <Link
                      href={href}
                      className={styles.groupLink}
                      aria-current={pathname === href ? 'page' : undefined}
                    >
                      {s.nazev}
                    </Link>
                    {s.kategorie.length > 0 && (
                      <ul className={styles.cats}>
                        {s.kategorie.map((k) => {
                          const kHref = kategorieHref(s, k);
                          return (
                            <li key={k.slug}>
                              <Link
                                href={kHref}
                                className={styles.catLink}
                                aria-current={pathname === kHref ? 'page' : undefined}
                              >
                                {k.nazev}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </li>

        {hlavniMenu.map((p) => (
          <li key={p.href} className={styles.item}>
            <Link
              href={p.href}
              className={styles.link}
              aria-current={pathname === p.href ? 'page' : undefined}
              data-active={jeAktivni(pathname, p.href) || undefined}
            >
              {p.nazev}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
