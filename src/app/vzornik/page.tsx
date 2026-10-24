/**
 * Vzorník: tokeny a komponenty z fáze 1, kroky 3–5, na jednom místě.
 * Jen pro vývoj (`npm run dev`). V produkčním buildu vrací 404 a je noindex.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Akce } from '@/components/akce/Akce';
import { PhotoSlot, type Pomer } from '@/components/photo-slot/PhotoSlot';
import { ChladnouciPrechod } from '@/components/prechod/ChladnouciPrechod';
import { VolutaOddelovac, VolutaZnak } from '@/components/voluta/Voluta';
import { kontakt, mailtoHref } from '@/content/kontakt';
import styles from './vzornik.module.css';

export const metadata: Metadata = {
  title: 'Vzorník',
  robots: { index: false, follow: false },
};

const barvy = [
  { token: '--paper', hex: '#F4EFE6', pozn: 'pozadí' },
  { token: '--coal', hex: '#221F1C', pozn: 'text 14,32:1' },
  { token: '--iron', hex: '#5B5853', pozn: 'popisky 6,18:1' },
  { token: '--copper', hex: '#B5532B', pozn: '4,33:1, jen velký text' },
  { token: '--copper-ink', hex: '#AF502A', pozn: 'malý text 4,58:1' },
  { token: '--ember', hex: '#E08A52', pozn: 'na uhlu 6,19:1' },
];
const zar = ['--heat-1', '--heat-2', '--heat-3', '--heat-4', '--heat-5', '--heat-6'];
const pomery: Pomer[] = ['3:2', '4:5', '1:1', '16:9', '21:9'];

export default function Vzornik() {
  if (process.env.NODE_ENV === 'production') notFound();

  return (
    <>
      <section className={`wrap ${styles.section}`}>
        <span className="eyebrow">Vzorník, jen pro vývoj</span>
        <h1>Světlo výhně</h1>
        <p className="lead">
          Tokeny a komponenty z fáze 1. Ostatní stránky zatím neexistují, odkazy v menu proto
          vedou na 404.
        </p>
      </section>

      <section className={`wrap ${styles.section}`}>
        <h2>Barvy</h2>
        <ul className={styles.swatches}>
          {barvy.map((b) => (
            <li key={b.token}>
              <span className={styles.chip} style={{ background: `var(${b.token})` }} />
              <code>{b.token}</code> {b.hex}
              <br />
              <span className="muted">{b.pozn}</span>
            </li>
          ))}
        </ul>
        <h3 className={styles.sub}>Škála žáru oceli</h3>
        <div className={styles.heat}>
          {zar.map((t) => (
            <span key={t} style={{ background: `var(${t})` }}>
              <code>{t}</code>
            </span>
          ))}
        </div>
      </section>

      <section className={`wrap ${styles.section}`}>
        <h2>Typografie</h2>
        <div className={styles.type}>
          <p className={styles.h1demo}>Vykuji Vám bránu, která vydrží.</p>
          <h2>Nadpis druhé úrovně ve Fraunces</h2>
          <h3>Nadpis třetí úrovně</h3>
          <p className="lead">
            Úvodní odstavec ve větším stupni. Krátké věty, mluví kovář v první osobě.
          </p>
          <p>
            Základní text v Source Sans 3, 18 px, řádkování 1,6. Kovářské práce dělám podle Vašeho
            návrhu i podle svého. Výrobek přivezu a namontuji. <a href="#">Odkaz v textu</a> se při
            najetí rozžhaví.
          </p>
          <p className="muted">Doplňkový text v barvě --iron.</p>
          <p>
            Chybějící text od klienta: <em className="todo-klient">[DOPLNÍ KLIENT: rok založení]</em>
          </p>
        </div>
      </section>

      <section className={`wrap ${styles.section}`}>
        <h2>Akce s rozžhavením</h2>
        <div className={styles.row}>
          <Akce href={kontakt.telefon.href} velikost="velka">
            Zavolat {kontakt.telefon.zobrazeni}
          </Akce>
          <Akce href="/realizace" varianta="linka">
            Prohlédnout realizace
          </Akce>
          <Akce href={mailtoHref} velikost="mala">
            Napsat e-mail
          </Akce>
        </div>
      </section>

      <section className={`wrap ${styles.section}`}>
        <h2>Voluta</h2>
        <div className={styles.volutes}>
          <VolutaZnak className={styles.voluteBig} />
          <VolutaZnak className={styles.voluteMid} zhava={false} tloustka={2} />
          <VolutaZnak className={styles.voluteSmall} />
        </div>
        <VolutaOddelovac className={styles.dividerDemo} />
        <VolutaOddelovac stoceni="vlevo" className={styles.dividerDemo} />
      </section>

      <section className={`wrap ${styles.section}`}>
        <h2>PhotoSlot</h2>
        <div className={styles.slots}>
          {pomery.map((p, i) => (
            <PhotoSlot
              key={p}
              id={`vzornik-slot-0${i + 1}`}
              popis={`ukázka poměru ${p}`}
              alt={`Ukázkový placeholder v poměru ${p}`}
              pomer={p}
              sizes="(min-width: 64rem) 30vw, 100vw"
            />
          ))}
        </div>
      </section>

      <ChladnouciPrechod smer="do-uhlu" />
      <section className={`surface-coal ${styles.dark}`}>
        <div className="wrap">
          <span className="eyebrow">Tmavá plocha</span>
          <h2>Uhel se stopami po kladivu</h2>
          <p className="lead">
            Nad touto sekcí a pod ní je chladnoucí přechod. Při scrollu hrana vychladne z oranžové
            do uhlové.
          </p>
          <p className="muted">Doplňkový text na uhlu, --paper-dim.</p>
          <div className={styles.row}>
            <Akce href={kontakt.telefon.href}>Zavolat</Akce>
            <Akce href="/realizace" varianta="linka">
              Realizace
            </Akce>
          </div>
          <div className={styles.darkSlot}>
            <PhotoSlot
              id="vzornik-tma-01"
              popis="výheň v šeru, rozžhavené železo na kovadlině"
              alt="Výheň v dílně v Žitenicích"
              pomer="16:9"
              pomerMobil="4:5"
              ton="uhel"
            />
          </div>
          <VolutaOddelovac className={styles.dividerDemo} />
        </div>
      </section>
      <ChladnouciPrechod smer="z-uhlu" />

      <section className={`wrap ${styles.section}`}>
        <p className="muted">Konec vzorníku.</p>
      </section>
    </>
  );
}
