/**
 * Hlavička podstránky: drobečky, krátký štítek nad H1, H1 a úvodní věta
 * (kontrolní seznam `craftsman-site-layout`). Asymetrie: nadpis vlevo,
 * úvod odsazený doprava na úroveň spodní hrany nadpisu.
 */
import type { Drobek } from '@/lib/seo';
import { Drobecky } from './Drobecky';
import styles from './HlavickaStranky.module.css';

type Props = {
  stitek: string;
  nadpis: string;
  uvod?: React.ReactNode;
  drobky?: Drobek[];
  /** `siroky`: úvod pod nadpisem přes celou šířku (krátké nadpisy). */
  rozvrzeni?: 'vedle' | 'pod';
  children?: React.ReactNode;
};

export function HlavickaStranky({ stitek, nadpis, uvod, drobky, rozvrzeni = 'vedle', children }: Props) {
  return (
    <header className={`wrap ${styles.head} ${rozvrzeni === 'pod' ? styles.pod : ''}`}>
      {drobky && <Drobecky drobky={drobky} />}
      <div className={styles.grid}>
        <div className={styles.title}>
          <span className="eyebrow">{stitek}</span>
          <h1>{nadpis}</h1>
        </div>
        {uvod && <div className={`lead ${styles.lead}`}>{uvod}</div>}
      </div>
      {children}
    </header>
  );
}
