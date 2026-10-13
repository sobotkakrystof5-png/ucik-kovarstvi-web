/**
 * PhotoSlot: místo pro fotku (web-project-brief.md §6).
 *
 * Dokud klient fotku nedodá (`src: null`), ukazuje prázdný rámeček s volutou
 * a popiskem, co na místo patří. Žádné fotobanky ani AI obrázky.
 * Výměna fotky = doplnění `src` v src/content/, komponenta se nemění.
 * Poměr stran je pevný, aby se po doplnění fotek nic neposunulo.
 */
import Image from 'next/image';
import { VolutaZnak } from '@/components/voluta/Voluta';
import styles from './PhotoSlot.module.css';

export type Pomer = '3:2' | '4:5' | '1:1' | '16:9' | '21:9';

export type PhotoSlotProps = {
  /** ID podle vzoru `stranka-sekce-01`, např. `uvod-hero-01`. */
  id: string;
  /** Co má fotka ukazovat, zobrazí se v placeholderu („brána Fort za denního světla“). */
  popis: string;
  /** Popisný alt pro finální fotku (SEO). */
  alt: string;
  pomer: Pomer;
  /** Jiný poměr na mobilu (např. hero 16:9 → 4:5). */
  pomerMobil?: Pomer;
  src?: string | null;
  /** Atribut `sizes` pro next/image, podle šířky slotu v layoutu. */
  sizes?: string;
  /** Jen pro fotku v první obrazovce (hero). */
  priority?: boolean;
  /** Tón placeholderu: na papíře, nebo na tmavé ploše. */
  ton?: 'papir' | 'uhel';
  className?: string;
};

const ratio = (p: Pomer) => p.replace(':', ' / ');

export function PhotoSlot({
  id,
  popis,
  alt,
  pomer,
  pomerMobil,
  src = null,
  sizes = '100vw',
  priority = false,
  ton = 'papir',
  className,
}: PhotoSlotProps) {
  const style = {
    '--slot-ratio': ratio(pomer),
    '--slot-ratio-mobile': ratio(pomerMobil ?? pomer),
  } as React.CSSProperties;

  const cls = [styles.slot, ton === 'uhel' && styles.dark, className].filter(Boolean).join(' ');

  if (src) {
    return (
      <div className={cls} style={style} data-slot={id}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={styles.img}
        />
      </div>
    );
  }

  return (
    <div className={cls} style={style} data-slot={id} data-placeholder="" role="img" aria-label={alt}>
      <div className={styles.inner} aria-hidden="true">
        <VolutaZnak zhava={false} className={styles.mark} tloustka={2.4} />
        <span className={styles.label}>
          <span className={styles.kind}>Foto</span> {popis}
        </span>
        <span className={styles.id}>{id}</span>
      </div>
    </div>
  );
}
