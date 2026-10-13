'use client';

/**
 * Galerie realizací s lightboxem (web-project-brief.md §5).
 *
 * Klik na fotku otevře lightbox přes celou obrazovku: šipky, klávesy ←/→,
 * Esc, swipe na mobilu. Focus se po zavření vrátí na fotku, ze které se
 * lightbox otevřel. „Chci podobné“ otevře předvyplněný e-mail, vedle je telefon.
 * Data přicházejí ze src/content/realizace.ts přes serverovou stránku.
 */
import { useCallback, useRef, useState } from 'react';
import { Akce } from '@/components/akce/Akce';
import { PhotoSlot, type Pomer } from '@/components/photo-slot/PhotoSlot';
import { VolutaZnak } from '@/components/voluta/Voluta';
import { kontakt, mailtoPodobne } from '@/content/kontakt';
import styles from './Galerie.module.css';

export type GalerieFoto = {
  id: string;
  nazev: string;
  vzor?: string;
  popisek: string;
  alt: string;
  src: string | null;
  pomer: Pomer;
  /** Absolutní odkaz na fotku do těla e-mailu „Chci podobné“. */
  odkaz: string;
};

type Props = {
  fotky: GalerieFoto[];
  /** `mozaika`: různé poměry ve sloupcích. `rada`: jednotně 3:2 (stránky skupin a kategorií). */
  rozvrzeni?: 'mozaika' | 'rada';
  /** Popisek pro čtečky, např. „Realizace: Brány a ploty“. */
  nazev: string;
};

const POMER_CISLO: Record<Pomer, number> = { '3:2': 1.5, '4:5': 0.8, '1:1': 1, '16:9': 16 / 9, '21:9': 21 / 9 };

export function Galerie({ fotky, rozvrzeni = 'mozaika', nazev }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const swipeX = useRef<number | null>(null);
  const [index, setIndex] = useState(0);

  const pocet = fotky.length;
  const aktualni = fotky[index];

  const otevrit = (i: number, e: React.MouseEvent<HTMLButtonElement>) => {
    openerRef.current = e.currentTarget;
    setIndex(i);
    dialogRef.current?.showModal();
  };

  const posun = useCallback((smer: 1 | -1) => setIndex((i) => (i + smer + pocet) % pocet), [pocet]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      posun(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      posun(-1);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    swipeX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (swipeX.current === null) return;
    const dx = e.clientX - swipeX.current;
    swipeX.current = null;
    if (Math.abs(dx) > 48) posun(dx < 0 ? 1 : -1);
  };

  // Klik na pozadí (mimo obsah) zavře lightbox
  const onDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) dialogRef.current?.close();
  };

  return (
    <>
      <ul className={`${styles.grid} ${styles[rozvrzeni]}`} aria-label={nazev}>
        {fotky.map((f, i) => (
          <li key={f.id} id={f.id} className={styles.item}>
            <button
              type="button"
              className={styles.open}
              onClick={(e) => otevrit(i, e)}
              aria-haspopup="dialog"
              aria-label={`Zvětšit: ${f.popisek}`}
            >
              <PhotoSlot
                id={f.id}
                popis={f.nazev}
                alt={f.alt}
                pomer={rozvrzeni === 'rada' ? '3:2' : f.pomer}
                src={f.src}
                sizes="(min-width: 64rem) 30vw, (min-width: 40rem) 45vw, 100vw"
              />
              <span className={styles.hover} aria-hidden="true">
                <VolutaZnak className={styles.hoverMark} />
              </span>
            </button>
            <p className={styles.caption}>
              {f.nazev}
              {f.vzor && !f.nazev.includes(f.vzor) && <span className="muted">, vzor {f.vzor}</span>}
            </p>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className={`${styles.lightbox} surface-coal`}
        aria-label="Zvětšená fotka"
        onKeyDown={onKeyDown}
        onClick={onDialogClick}
        onClose={() => openerRef.current?.focus()}
      >
        {aktualni && (
          <div className={styles.lbInner}>
            <div className={styles.lbTop}>
              <p className={styles.counter} aria-live="polite">
                {index + 1} / {pocet}
              </p>
              <button type="button" className={styles.close} onClick={() => dialogRef.current?.close()}>
                Zavřít
              </button>
            </div>

            <figure
              className={styles.figure}
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              style={{ '--r': POMER_CISLO[aktualni.pomer] } as React.CSSProperties}
            >
              <div className={styles.photo}>
                <PhotoSlot
                  key={aktualni.id}
                  id={aktualni.id}
                  popis={aktualni.nazev}
                  alt={aktualni.alt}
                  pomer={aktualni.pomer}
                  src={aktualni.src}
                  sizes="100vw"
                  ton="uhel"
                />
              </div>
              <figcaption className={styles.lbCaption}>
                <span className={styles.lbTitle}>{aktualni.popisek}</span>
                {aktualni.vzor && <span className="muted">Vzor {aktualni.vzor}</span>}
              </figcaption>
            </figure>

            <div className={styles.lbBottom}>
              <div className={styles.arrows}>
                <button type="button" className={styles.arrow} onClick={() => posun(-1)} aria-label="Předchozí fotka">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M15 5 8 12l7 7" />
                  </svg>
                </button>
                <button type="button" className={styles.arrow} onClick={() => posun(1)} aria-label="Další fotka">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m9 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className={styles.actions}>
                <Akce href={mailtoPodobne(aktualni.nazev, aktualni.odkaz)} velikost="mala">
                  Chci podobné
                </Akce>
                <Akce href={kontakt.telefon.href} varianta="linka" velikost="mala">
                  {kontakt.telefon.zobrazeni}
                </Akce>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
