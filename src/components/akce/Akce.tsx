/**
 * Akce: tlačítko nebo odkaz s „rozžhavením“ (web-project-brief.md §2, prvek ohně 2).
 *
 * Při najetí projde plocha škálou žáru oceli, od uhlu přes třešňovou
 * do žhavé oranžové, a rozsvítí se jemná záře. Bez scale-105.
 * Interní odkazy jdou přes next/link, `tel:` a `mailto:` jako obyčejné <a>.
 */
import Link from 'next/link';
import styles from './Akce.module.css';

type Props = {
  href: string;
  children: React.ReactNode;
  /** `plna` = hlavní akce (Zavolat), `linka` = vedlejší textová akce. */
  varianta?: 'plna' | 'linka';
  velikost?: 'velka' | 'bezna' | 'mala';
  className?: string;
  'aria-label'?: string;
};

export function Akce({
  href,
  children,
  varianta = 'plna',
  velikost = 'bezna',
  className,
  ...rest
}: Props) {
  const cls = [styles.akce, styles[varianta], styles[velikost], className].filter(Boolean).join(' ');
  const internal = href.startsWith('/');

  if (internal) {
    return (
      <Link href={href} className={cls} {...rest}>
        <span className={styles.label}>{children}</span>
      </Link>
    );
  }
  return (
    <a href={href} className={cls} {...rest}>
      <span className={styles.label}>{children}</span>
    </a>
  );
}
