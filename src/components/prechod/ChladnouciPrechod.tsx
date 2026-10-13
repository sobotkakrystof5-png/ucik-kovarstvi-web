/**
 * Chladnoucí přechod (web-project-brief.md §2, prvek ohně 3).
 *
 * Hrana mezi tmavou a světlou sekcí. Když hrana vjede do obrazovky, je žhavě
 * oranžová a během scrollu „vychladne“ do třešňové a uhlové. Gradient jen na
 * hraně, ne přes plochu. Čisté CSS (scroll-driven animace), bez JavaScriptu.
 * Prohlížeče bez podpory a `prefers-reduced-motion` dostanou rovnou vychladlý stav.
 */
import styles from './ChladnouciPrechod.module.css';

type Props = {
  /**
   * `z-uhlu`: tmavá sekce nad, světlá pod (žhavá hrana dole).
   * `do-uhlu`: světlá nad, tmavá pod (žhavá hrana nahoře).
   */
  smer: 'z-uhlu' | 'do-uhlu';
  className?: string;
};

export function ChladnouciPrechod({ smer, className }: Props) {
  return (
    <div
      className={[styles.edge, smer === 'do-uhlu' && styles.flip, className].filter(Boolean).join(' ')}
      aria-hidden="true"
    />
  );
}
