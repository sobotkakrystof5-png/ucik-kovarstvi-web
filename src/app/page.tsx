/**
 * Úvod (web-project-brief.md §4): rozcestník, ne souhrn všeho obsahu.
 * Rytmus ploch: tmavá scéna → papír → tmavé „Jak pracuji“ → papír.
 * Mezi tmavou a světlou plochou vždy chladnoucí přechod.
 */
import Link from 'next/link';
import { Akce } from '@/components/akce/Akce';
import { PhotoSlot } from '@/components/photo-slot/PhotoSlot';
import { ChladnouciPrechod } from '@/components/prechod/ChladnouciPrechod';
import { ZavolejteMi } from '@/components/stranka/ZavolejteMi';
import { Jiskry } from '@/components/uvod/Jiskry';
import { MapaOblasti } from '@/components/uvod/MapaOblasti';
import { VolutaOddelovac } from '@/components/voluta/Voluta';
import { kontakt } from '@/content/kontakt';
import { mestaSkupiny, skupinyKraju } from '@/content/oblast';
import { kroky } from '@/content/postup';
import { castHref, popisek, vybraneRealizace } from '@/content/realizace';
import { uvod } from '@/content/uvod';
import { najdiSkupinu, skupinaHref } from '@/content/vyrobky';
import { metadataStranky } from '@/lib/seo';
import styles from './uvod.module.css';

export const metadata = metadataStranky({ ...uvod.seo, cesta: '/', absolutni: true });

const POMERY_DLAZDIC = ['4:5', '1:1', '3:2'] as const;

export default function UvodPage() {
  const { hero, coVykovam, kovar } = uvod;
  const vybrane = vybraneRealizace();

  return (
    <>
      {/* 1. Úvodní scéna: tmavá fotka, jiskry, nadpis vlevo dole */}
      <section className={`surface-coal ${styles.hero}`} aria-labelledby="uvod-nadpis">
        <div className={styles.heroMedia}>
          <PhotoSlot
            id={hero.foto.id}
            popis={hero.foto.popis}
            alt={hero.foto.alt}
            src={hero.foto.src}
            pomer="16:9"
            pomerMobil="4:5"
            ton="uhel"
            sizes="100vw"
            priority
            className={styles.heroPhoto}
          />
          <Jiskry />
        </div>
        <div className={`wrap ${styles.heroText}`}>
          <h1 id="uvod-nadpis" className={styles.heroTitle}>
            {hero.nadpis}
          </h1>
          <p className={styles.heroSign}>{hero.podpis}</p>
          <div className={styles.heroActions}>
            <Akce href={kontakt.telefon.href} velikost="velka">
              Zavolat {kontakt.telefon.zobrazeni}
            </Akce>
            <Akce href="/realizace" varianta="linka">
              Prohlédnout realizace
            </Akce>
          </div>
        </div>
      </section>
      <ChladnouciPrechod smer="z-uhlu" />

      {/* 2. Co vykovám: tři dlaždice různých velikostí, pod nimi textový výpis */}
      <section className={`wrap ${styles.co}`} aria-labelledby="co-nadpis">
        <h2 id="co-nadpis" className={styles.coTitle}>
          {coVykovam.nadpis}
        </h2>
        <ul className={styles.coTiles}>
          {coVykovam.dlazdice.map((d, i) => {
            const s = najdiSkupinu(d.skupina);
            const druha = d.odkaz && najdiSkupinu(d.odkaz.skupina);
            if (!s) return null;
            return (
              <li key={d.skupina} className={styles.coTile}>
                <Link href={skupinaHref(s)} className={styles.coLink}>
                  <PhotoSlot
                    id={d.foto.id}
                    popis={d.foto.popis}
                    alt={d.foto.alt}
                    src={d.foto.src}
                    pomer={POMERY_DLAZDIC[i] ?? '3:2'}
                    sizes="(min-width: 64rem) 40vw, 100vw"
                  />
                  <span className={styles.coName}>{d.nazev}</span>
                </Link>
                <p className={styles.coVeta}>
                  {d.veta}
                  {d.odkaz && druha && (
                    <>
                      {' '}
                      <Link href={skupinaHref(druha)}>{d.odkaz.text}</Link>.
                    </>
                  )}
                </p>
              </li>
            );
          })}
        </ul>
        <p className={styles.coRest}>
          Ke krbu vykovám <Link href="/vyrobky/krby">dýmník, rošt i nářadí</Link>. A dělám{' '}
          <Link href="/vyrobky/zakazky-na-prani">zakázky na přání</Link>, třeba vývěsní štíty, kostelní
          kříže, meče nebo zvoneček na dům.{' '}
          <Link href="/vyrobky" className={styles.coAll}>
            Všechny výrobky
          </Link>
        </p>
      </section>

      {/* 3. Vybrané realizace: vodorovný pás šesti fotek */}
      <section className={styles.strip} aria-labelledby="realizace-nadpis">
        <div className={`wrap ${styles.stripHead}`}>
          <h2 id="realizace-nadpis">{uvod.realizace.nadpis}</h2>
          <Link href="/realizace" className={styles.stripAll}>
            Všechny realizace
          </Link>
        </div>
        <ul className={styles.stripList}>
          {vybrane.map((r) => (
            <li key={r.id}>
              <Link href={`${castHref(r.cast)}#${r.id}`} className={styles.stripLink}>
                <PhotoSlot
                  id={`uvod-${r.id}`}
                  popis={r.nazev}
                  alt={r.alt}
                  src={r.src}
                  pomer="3:2"
                  sizes="(min-width: 64rem) 30vw, 80vw"
                />
                <span className={styles.stripCaption}>{popisek(r)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Jak pracuji: pět kroků na jedné kované lince, na konci voluta se žhavým bodem */}
      <ChladnouciPrechod smer="do-uhlu" />
      <section className={`surface-coal ${styles.postup}`} aria-labelledby="postup-nadpis">
        <div className="wrap">
          <div className={styles.postupHead}>
            <h2 id="postup-nadpis">{uvod.postup.nadpis}</h2>
            <p className="muted">{uvod.postup.uvod}</p>
          </div>
          <VolutaOddelovac className={styles.postupLine} />
          <ol className={styles.kroky}>
            {kroky.map((k) => (
              <li key={k.cislo} className={styles.krok}>
                <span className={styles.krokNum} aria-hidden="true">
                  {String(k.cislo).padStart(2, '0')}
                </span>
                <PhotoSlot
                  id={`uvod-postup-0${k.cislo}`}
                  popis={k.dilna.popis}
                  alt={k.dilna.alt}
                  src={k.dilna.src}
                  pomer="1:1"
                  ton="uhel"
                  sizes="(min-width: 64rem) 18vw, 45vw"
                />
                <h3 className={styles.krokName}>{k.nazev}</h3>
                <p className={styles.krokText}>{k.kratce}</p>
              </li>
            ))}
          </ol>
          <Akce href="/jak-pracuji" varianta="linka" className={styles.postupMore}>
            Jak pracuji podrobně
          </Akce>
        </div>
      </section>
      <ChladnouciPrechod smer="z-uhlu" />

      {/* 5. O kováři: portrét, krátký text v první osobě, podpis */}
      <section className={`wrap ${styles.kovar}`} aria-labelledby="kovar-nadpis">
        <div className={styles.kovarPortrait}>
          <PhotoSlot
            id={kovar.portret.id}
            popis={kovar.portret.popis}
            alt={kovar.portret.alt}
            src={kovar.portret.src}
            pomer="4:5"
            sizes="(min-width: 64rem) 34vw, 100vw"
          />
        </div>
        <div className={styles.kovarDetail}>
          <PhotoSlot
            id={kovar.detail.id}
            popis={kovar.detail.popis}
            alt={kovar.detail.alt}
            src={kovar.detail.src}
            pomer="3:2"
            sizes="(min-width: 64rem) 24vw, 100vw"
          />
        </div>
        <div className={styles.kovarText}>
          <h2 id="kovar-nadpis" className={styles.kovarTitle}>
            {kovar.nadpis}
          </h2>
          {kovar.text.map((p) => (
            <p key={p} className={styles.kovarP}>
              {p}
            </p>
          ))}
          {/* Dočasně textový podpis, později sken podpisu (brief §4) */}
          <p className={styles.sign}>{kovar.podpis}</p>
          <Akce href="/o-mne" varianta="linka">
            Víc o mně
          </Akce>
        </div>
      </section>

      {/* 6. Kde pracuji: mapa krajů a rozbalovací seznam měst (bez JS, <details>) */}
      <section className={`wrap ${styles.oblast}`} aria-labelledby="oblast-nadpis">
        <div className={styles.oblastText}>
          <h2 id="oblast-nadpis">{uvod.oblast.nadpis}</h2>
          <p>{uvod.oblast.text}</p>
        </div>
        <div className={styles.oblastMap}>
          <MapaOblasti />
        </div>
        <div className={styles.kraje}>
          {skupinyKraju.map((s) => {
            const mesta = mestaSkupiny(s);
            return (
              <details key={s.id} className={styles.kraj} data-skupina={s.id}>
                <summary>
                  <span className={styles.krajNazev}>{s.nazev}</span>
                  <span className={styles.krajPocet}>
                    {mesta.length} {mesta.length === 1 ? 'město' : mesta.length < 5 ? 'města' : 'měst'}
                  </span>
                </summary>
                <ul className={styles.krajMesta}>
                  {mesta.map((m) => (
                    <li key={m.nazev}>{m.nazev}</li>
                  ))}
                </ul>
              </details>
            );
          })}
        </div>
      </section>

      {/* 7. Ozvěte se */}
      <ZavolejteMi nadpis={uvod.ozvete.nadpis} veta={uvod.ozvete.veta} />
    </>
  );
}
