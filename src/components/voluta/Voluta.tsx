/**
 * Voluta: jediný ornament webu (web-project-brief.md §0 a §2).
 * Spirála z kované tyče, na jejím konci žhavý bod, jako by kov právě vyšel z výhně.
 * Používá se jako podpis, ne dekorace: oddělovač sekcí, značka v PhotoSlot,
 * vodoznak, zakončení linky „Jak pracuji“.
 *
 * Cesty jsou vygenerované jako logaritmická spirála (Catmull-Rom → bezier),
 * nekreslit ručně. Není to logo, logo dodá klient.
 */
import styles from './Voluta.module.css';

/** Značka 100×100: krátký náběh zleva, 1,9 otáčky. Konec tyče v bodě TIP. */
export const VOLUTA_MARK = 'M8 84L56 84C59.06 83.51 62.38 82.37 65.19 81.03C68 79.69 70.62 77.91 72.86 75.96C75.1 74.01 77.05 71.71 78.61 69.35C80.16 66.99 81.37 64.38 82.19 61.82C83.02 59.26 83.45 56.55 83.56 53.99C83.66 51.44 83.37 48.84 82.81 46.47C82.26 44.09 81.33 41.79 80.21 39.75C79.09 37.71 77.65 35.83 76.11 34.25C74.56 32.67 72.76 31.31 70.94 30.25C69.12 29.2 67.12 28.41 65.18 27.9C63.24 27.4 61.2 27.19 59.29 27.22C57.38 27.25 55.46 27.58 53.72 28.09C51.97 28.61 50.29 29.4 48.82 30.32C47.35 31.24 46.02 32.39 44.9 33.61C43.79 34.83 42.86 36.23 42.15 37.63C41.43 39.03 40.93 40.55 40.64 42.02C40.35 43.49 40.28 45.01 40.38 46.43C40.49 47.86 40.81 49.27 41.27 50.55C41.73 51.83 42.39 53.04 43.14 54.1C43.88 55.15 44.8 56.1 45.75 56.88C46.71 57.66 47.79 58.29 48.87 58.76C49.94 59.23 51.09 59.54 52.2 59.69C53.31 59.85 54.44 59.84 55.5 59.7C56.55 59.56 57.59 59.26 58.53 58.86C59.46 58.47 60.34 57.92 61.09 57.32C61.84 56.72 62.51 56 63.05 55.25C63.59 54.51 64.02 53.68 64.32 52.86C64.62 52.04 64.8 51.16 64.87 50.33C64.94 49.5 64.88 48.65 64.74 47.88C64.59 47.1 64.32 46.33 63.98 45.66C63.65 44.98 63.21 44.35 62.73 43.81C62.25 43.28 61.68 42.81 61.1 42.44C60.53 42.07 59.89 41.79 59.26 41.6C58.64 41.41 57.98 41.31 57.36 41.29C56.74 41.28 56.11 41.36 55.54 41.5C54.96 41.64 54.4 41.88 53.91 42.15C53.42 42.43 52.97 42.79 52.59 43.17C52.22 43.55 51.89 43.99 51.64 44.44C51.39 44.88 51.21 45.37 51.09 45.84C50.98 46.32 50.93 46.81 50.95 47.27C50.96 47.74 51.05 48.2 51.18 48.62C51.31 49.04 51.51 49.45 51.73 49.8C51.96 50.16 52.25 50.48 52.55 50.74C52.85 51.01 53.37 51.29 53.53 51.4';
const MARK_TIP = { x: 53.53, y: 51.4 };

/** Zakončení oddělovače: tyč přichází zleva ve výšce y = 36. */
export const VOLUTA_END = 'M0 36L22 36C23.61 35.72 25.38 35.08 26.83 34.32C28.28 33.56 29.61 32.53 30.7 31.43C31.79 30.33 32.7 29.03 33.37 27.73C34.04 26.43 34.49 24.99 34.73 23.63C34.96 22.27 34.96 20.85 34.78 19.56C34.61 18.26 34.2 16.99 33.68 15.87C33.15 14.75 32.42 13.72 31.63 12.86C30.84 12.01 29.89 11.28 28.94 10.73C27.98 10.19 26.92 9.8 25.9 9.58C24.89 9.36 23.82 9.31 22.84 9.4C21.86 9.49 20.89 9.76 20.03 10.11C19.17 10.47 18.37 10.99 17.7 11.55C17.03 12.12 16.45 12.81 16.01 13.51C15.57 14.21 15.24 15 15.04 15.76C14.84 16.51 14.78 17.31 14.81 18.05C14.85 18.79 15.01 19.53 15.25 20.19C15.49 20.85 15.85 21.47 16.26 21.99C16.66 22.51 17.16 22.97 17.68 23.32C18.19 23.68 18.77 23.95 19.33 24.13C19.89 24.3 20.5 24.38 21.05 24.38C21.61 24.37 22.17 24.27 22.67 24.11C23.17 23.95 23.65 23.7 24.06 23.42C24.47 23.13 24.83 22.77 25.11 22.39C25.39 22.02 25.62 21.59 25.77 21.17C25.92 20.76 26 20.31 26.01 19.89C26.03 19.47 25.97 19.04 25.87 18.66C25.76 18.28 25.59 17.91 25.39 17.6C25.19 17.28 24.93 17 24.65 16.77C24.38 16.55 24.07 16.37 23.76 16.24C23.45 16.11 23.12 16.04 22.8 16.01C22.49 15.99 22.16 16.01 21.87 16.08C21.58 16.15 21.3 16.26 21.06 16.41C20.81 16.55 20.59 16.73 20.41 16.93C20.23 17.13 20.09 17.36 19.98 17.59C19.88 17.81 19.81 18.06 19.78 18.3C19.75 18.54 19.8 18.88 19.8 19';
const END_TIP = { x: 19.8, y: 19 };

/** Žhavý bod: tři soustředné kruhy z tokenů žáru, bez gradientů s ID. */
function Zhavy({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g className={styles.ember} aria-hidden="true">
      <circle cx={x} cy={y} r={r * 2.4} className={styles.emberHalo} />
      <circle cx={x} cy={y} r={r} className={styles.emberBody} />
      <circle cx={x} cy={y} r={r * 0.42} className={styles.emberCore} />
    </g>
  );
}

type MarkProps = {
  /** Žhavý bod na konci. U vodoznaku a v placeholderu vypnout. */
  zhava?: boolean;
  className?: string;
  /** Tloušťka tyče v jednotkách viewBoxu 100×100. */
  tloustka?: number;
};

/** Samostatná voluta (značka, vodoznak, ikonka při najetí na fotku). */
export function VolutaZnak({ zhava = true, className, tloustka = 3.2 }: MarkProps) {
  return (
    <svg
      viewBox="0 18 100 72"
      className={[styles.mark, className].filter(Boolean).join(' ')}
      aria-hidden="true"
      focusable="false"
    >
      <path d={VOLUTA_MARK} className={styles.bar} strokeWidth={tloustka} />
      {zhava && <Zhavy x={MARK_TIP.x} y={MARK_TIP.y} r={2.3} />}
    </svg>
  );
}

type DividerProps = {
  /** Kde se linka stočí: vpravo (výchozí), nebo vlevo (zrcadlově). */
  stoceni?: 'vpravo' | 'vlevo';
  zhava?: boolean;
  className?: string;
};

/**
 * Oddělovač sekcí: tenká linka, která se na konci stočí do voluty.
 * Linka je CSS (natahuje se na libovolnou šířku), voluta SVG.
 */
export function VolutaOddelovac({ stoceni = 'vpravo', zhava = true, className }: DividerProps) {
  return (
    <div
      className={[styles.divider, stoceni === 'vlevo' && styles.dividerFlip, className]
        .filter(Boolean)
        .join(' ')}
      role="presentation"
    >
      <span className={styles.line} />
      <svg viewBox="0 7 37 31" className={styles.end} aria-hidden="true" focusable="false">
        <path d={VOLUTA_END} className={styles.bar} strokeWidth={1.5} />
        {zhava && <Zhavy x={END_TIP.x} y={END_TIP.y} r={1.25} />}
      </svg>
    </div>
  );
}
