import Link from 'next/link';
import { PhotoSlot, type Pomer } from '@/components/photo-slot/PhotoSlot';
import { HlavickaStranky } from '@/components/stranka/HlavickaStranky';
import { ZavolejteMi } from '@/components/stranka/ZavolejteMi';
import { kategorieHref, skupinaHref, skupiny, type Skupina } from '@/content/vyrobky';
import { metadataStranky } from '@/lib/seo';
import styles from './vyrobky.module.css';

// PRACOVNÍ SEO (fáze 0 před spuštěním)
export const metadata = metadataStranky({
  title: 'Kované výrobky na zakázku',
  description:
    'Brány a ploty, mříže a kování, zábradlí, krby, nábytek i zakázky na přání. Kovářství Jiří Učík vyrábí na zakázku v Žitenicích u Litoměřic.',
  cesta: '/vyrobky',
});

/** Poměr fotky podle velikosti dlaždice: největší je na výšku, malé čtvercové. */
const pomerDlazdice: Record<Skupina['dlazdice'], Pomer> = {
  velka: '4:5',
  stredni: '3:2',
  mala: '1:1',
};

export default function VyrobkyPage() {
  return (
    <>
      <HlavickaStranky
        stitek="Výrobky"
        nadpis="Co všechno vykovu"
        uvod={
          <p>
            Všechno vyrábím na zakázku, podle Vašeho návrhu nebo podle svého. Výrobky jsem rozdělil do
            šesti skupin podle toho, kam co patří.
          </p>
        }
        drobky={[{ nazev: 'Výrobky', href: '/vyrobky' }]}
      />

      <ul className={`wrap ${styles.tiles}`}>
        {skupiny.map((s, i) => (
          <li key={s.slug} className={`${styles.tile} ${styles[s.dlazdice]}`} data-skupina={s.slug}>
            <Link href={skupinaHref(s)} className={styles.photoLink} tabIndex={-1} aria-hidden="true">
              <PhotoSlot
                id={`vyrobky-skupiny-0${i + 1}`}
                popis={s.hero.popis}
                alt={s.hero.alt}
                src={s.hero.src}
                pomer={pomerDlazdice[s.dlazdice]}
                sizes={s.dlazdice === 'velka' ? '(min-width: 64rem) 55vw, 100vw' : '(min-width: 64rem) 35vw, 100vw'}
                priority={i === 0}
              />
            </Link>
            <div className={styles.body}>
              <h2 className={styles.name}>
                <Link href={skupinaHref(s)}>{s.nazev}</Link>
              </h2>
              <p className={styles.short}>{s.kratce}</p>
              {s.kategorie.length > 0 && (
                <ul className={styles.cats} aria-label={`Kategorie: ${s.nazev}`}>
                  {s.kategorie.map((k) => (
                    <li key={k.slug}>
                      <Link href={kategorieHref(s, k)}>{k.nazev}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ul>

      <ZavolejteMi
        nadpis="Nevidíte, co hledáte?"
        veta="Zavolejte mi a popište, co potřebujete. Dělám i zakázky na přání."
      />
    </>
  );
}
