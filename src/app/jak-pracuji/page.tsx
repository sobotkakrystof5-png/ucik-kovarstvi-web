/**
 * Jak pracuji (brief §4): pět kroků, u každého ruční nákres a fotka z dílny vedle sebe.
 * Kroky se střídají stranou, linka vlevo je spojuje a končí volutou.
 */
import { PhotoSlot } from '@/components/photo-slot/PhotoSlot';
import { HlavickaStranky } from '@/components/stranka/HlavickaStranky';
import { ZavolejteMi } from '@/components/stranka/ZavolejteMi';
import { VolutaZnak } from '@/components/voluta/Voluta';
import { kroky } from '@/content/postup';
import { metadataStranky } from '@/lib/seo';
import styles from './jak-pracuji.module.css';

// PRACOVNÍ SEO (fáze 0 před spuštěním)
export const metadata = metadataStranky({
  title: 'Jak pracuji: od nákresu po montáž',
  description:
    'Nápad, ruční nákres, kování ve výhni, povrchová úprava, doprava a montáž. Jak vzniká kovaný výrobek v dílně Jiřího Učíka v Žitenicích u Litoměřic.',
  cesta: '/jak-pracuji',
});

export default function JakPracujiPage() {
  return (
    <>
      <HlavickaStranky
        stitek="Jak pracuji"
        nadpis="Od nákresu po montáž"
        uvod={
          <>
            <p>
              Kovám podle Vašeho návrhu i podle svého. Hotový výrobek Vám přivezu a namontuji, takže
              dopravu ani montáž nemusíte řešit s nikým dalším.
            </p>
          </>
        }
        drobky={[{ nazev: 'Jak pracuji', href: '/jak-pracuji' }]}
      />

      <ol className={`wrap ${styles.kroky}`}>
        {kroky.map((k) => (
          <li key={k.cislo} className={styles.krok}>
            <div className={styles.text}>
              <span className={styles.num} aria-hidden="true">
                {String(k.cislo).padStart(2, '0')}
              </span>
              <h2 className={styles.name}>{k.nazev}</h2>
              {k.text.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {k.doplni && (
                <p>
                  <em className="todo-klient">[DOPLNÍ KLIENT: {k.doplni}]</em>
                </p>
              )}
            </div>
            <div className={styles.pair}>
              <figure className={styles.sketch}>
                <PhotoSlot
                  id={k.nakres.id}
                  popis={k.nakres.popis}
                  alt={k.nakres.alt}
                  src={k.nakres.src}
                  pomer="1:1"
                  sizes="(min-width: 64rem) 26vw, 50vw"
                />
                <figcaption>Nákres</figcaption>
              </figure>
              <figure className={styles.photo}>
                <PhotoSlot
                  id={k.dilna.id}
                  popis={k.dilna.popis}
                  alt={k.dilna.alt}
                  src={k.dilna.src}
                  pomer="1:1"
                  sizes="(min-width: 64rem) 26vw, 50vw"
                />
                <figcaption>Z dílny</figcaption>
              </figure>
            </div>
          </li>
        ))}
        <li className={styles.end} aria-hidden="true">
          <VolutaZnak className={styles.endMark} tloustka={2.2} />
        </li>
      </ol>

      <ZavolejteMi nadpis="Začneme prvním krokem?" />
    </>
  );
}
