/**
 * Kontakt (brief §4): telefon a e-mail jako velké odkazy, adresa, provozní doba,
 * IČO, datová schránka, mapa a fotka dílny. Bez formuláře (rozhodnutí klienta).
 */
import { Mapa } from '@/components/kontakt/Mapa';
import { PhotoSlot } from '@/components/photo-slot/PhotoSlot';
import { HlavickaStranky } from '@/components/stranka/HlavickaStranky';
import { kontakt, mailtoHref } from '@/content/kontakt';
import { metadataStranky } from '@/lib/seo';
import styles from './kontakt.module.css';

// PRACOVNÍ SEO (fáze 0 před spuštěním)
export const metadata = metadataStranky({
  title: 'Kontakt: kovářská dílna v Žitenicích',
  description:
    'Zavolejte 603 582 254 nebo napište na kovarstvi.ucik@seznam.cz. Kovářství Jiří Učík, Litoměřická 3, Žitenice u Litoměřic. Provozní doba dle domluvy.',
  cesta: '/kontakt',
});

export default function KontaktPage() {
  const { adresa } = kontakt;
  return (
    <>
      <HlavickaStranky
        stitek="Kontakt"
        nadpis="Zavolejte, nebo napište"
        uvod={<p>Pošlete mi fotku místa nebo nákres a domluvíme se. Formulář tu schválně není. Radši si rovnou zavoláme.</p>}
        drobky={[{ nazev: 'Kontakt', href: '/kontakt' }]}
      />

      <section className={`wrap ${styles.main}`} aria-label="Kontaktní údaje">
        <div className={styles.primary}>
          <a href={kontakt.telefon.href} className={styles.phone}>
            {kontakt.telefon.zobrazeni}
          </a>
          <a href={mailtoHref} className={styles.mail}>
            {kontakt.email}
          </a>
        </div>

        <dl className={styles.facts}>
          <div>
            <dt>Dílna</dt>
            <dd>
              <address>
                {kontakt.firma}
                <br />
                {adresa.ulice}
                <br />
                {adresa.psc} {adresa.obec}
              </address>
            </dd>
          </div>
          <div>
            <dt>Provozní doba</dt>
            <dd>{kontakt.provozniDoba[0]!.toUpperCase() + kontakt.provozniDoba.slice(1)}</dd>
          </div>
          <div>
            <dt>IČO</dt>
            <dd>{kontakt.ico}</dd>
          </div>
          <div>
            <dt>Datová schránka</dt>
            <dd>{kontakt.datovaSchranka}</dd>
          </div>
        </dl>
      </section>

      <section className={`wrap ${styles.place}`} aria-label="Kde dílnu najdete">
        <div className={styles.map}>
          <Mapa />
        </div>
        <div className={styles.photo}>
          <PhotoSlot
            id="kontakt-dilna-01"
            popis="dílna v Žitenicích zvenku"
            alt="Kovářská dílna Jiřího Učíka v Žitenicích zvenku"
            src={null}
            pomer="3:2"
            sizes="(min-width: 64rem) 40vw, 100vw"
          />
        </div>
      </section>
    </>
  );
}
