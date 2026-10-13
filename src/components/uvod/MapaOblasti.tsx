/**
 * Kde pracuji: mapa ČR po krajích (SVG, ne fotka, brief §4).
 * Zvýrazněné jsou kraje, kam patří města z oblasti působnosti, tečky jsou
 * ta města, dílna v Žitenicích má měděný kruh. Kraj se rozsvítí mědí,
 * když je v seznamu vedle mapy rozbalený nebo pod kurzorem (CSS :has,
 * pravidla v src/app/uvod.module.css).
 */
import { dilna, oblast, skupinyKraju } from '@/content/oblast';
import { krajeCR, px, SIRKA, VYSKA } from './kraje-cr';
import styles from './MapaOblasti.module.css';

/** Kraj → skupina v seznamu. Kraje mimo oblast skupinu nemají. */
const skupinaKraje = new Map(skupinyKraju.flatMap((s) => s.kraje.map((k) => [k as string, s.id])));

/** Ruční umístění názvů krajů, aby nekolidovaly s tečkami měst. */
const POPISKY: Record<string, [number, number]> = {
  ustecky: [13.43, 50.29],
  liberecky: [15.0, 50.74],
  stredocesky: [14.62, 49.86],
};

export function MapaOblasti() {
  const [dx, dy] = px(dilna.lon, dilna.lat);

  return (
    <svg
      viewBox={`0 0 ${SIRKA} ${VYSKA}`}
      className={styles.map}
      role="img"
      aria-labelledby="mapa-titulek mapa-popis"
    >
      <title id="mapa-titulek">Kraje, kde pracuji</title>
      <desc id="mapa-popis">
        {`Mapa Česka po krajích. Zvýrazněné: ${skupinyKraju.map((s) => s.nazev).join(', ')}. Dílna v Žitenicích u Litoměřic.`}
      </desc>

      {krajeCR.map((k) => {
        const skupina = skupinaKraje.get(k.id);
        return (
          <path
            key={k.id}
            d={k.d}
            fillRule="evenodd"
            data-skupina={skupina}
            className={skupina ? styles.krajAktivni : styles.kraj}
          />
        );
      })}

      {skupinyKraju.map((s) => {
        const pos = POPISKY[s.id];
        if (!pos) return null;
        const [x, y] = px(...pos);
        return (
          <text key={s.id} x={x} y={y} textAnchor="middle" className={styles.krajNazev}>
            {s.mapa}
          </text>
        );
      })}

      {oblast.map((m) => {
        const [x, y] = px(m.lon, m.lat);
        return <circle key={m.nazev} cx={x} cy={y} r={2.6} className={styles.city} />;
      })}

      {/* Dílna: měděný kruh, ne oheň (oheň jen ve čtyřech prvcích, brief §2) */}
      <g>
        <circle cx={dx} cy={dy} r={8} className={styles.homeRing} />
        <circle cx={dx} cy={dy} r={4} className={styles.homeDot} />
        {/* Popisek nad hranicí, na papíře, s vodicí čárou k dílně */}
        <path d={`M${dx - 7} ${dy - 7}L${dx - 70} ${dy - 70}H${dx - 96}`} className={styles.homeLine} />
        <text x={dx - 102} y={dy - 64} textAnchor="end" className={styles.homeLabel}>
          Dílna, Žitenice
        </text>
      </g>
    </svg>
  );
}
