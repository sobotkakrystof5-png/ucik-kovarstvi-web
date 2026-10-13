/**
 * Realizace: jediný zdroj pro galerii, stránky skupin, kategorií i Úvod
 * (web-project-brief.md §5).
 *
 * ZATÍM UKÁZKOVÉ POLOŽKY (`ukazka: true`). Fotky klient ještě nedodal,
 * položky jen drží místo a typ výrobku. Po dodání fotek se nahradí skutečnými
 * realizacemi s názvem, vzorem, místem a rokem od klienta. `misto` a `rok`
 * se nikdy nedoplňují odhadem.
 */
import { kontakt } from './kontakt';
import type { Pomer } from './typy';

export type CastGalerie =
  | 'brany-a-ploty'
  | 'mrize-dvere-kovani'
  | 'zabradli-a-balkony'
  | 'krby'
  | 'nabytek-a-interier'
  | 'zakazky-na-prani'
  | 'z-dilny';

export type Realizace = {
  id: string;
  nazev: string;
  cast: CastGalerie;
  /** Slug kategorie ve skupině (u skupin s kategoriemi). */
  kategorie?: string;
  vzor?: string;
  misto?: string;
  rok?: number;
  alt: string;
  src: string | null;
  pomer: Pomer;
  /** Ukázková položka bez skutečné realizace za sebou. */
  ukazka: boolean;
  /** Patří do výběru na Úvodu. */
  vybrana?: boolean;
};

export type CastInfo = {
  slug: CastGalerie;
  nazev: string;
  /** Co v části najdete (brief §5). */
  obsah: string;
  seo: { title: string; description: string };
};

// PRACOVNÍ slugy a SEO, viz poznámka v vyrobky.ts
export const casti: CastInfo[] = [
  {
    slug: 'brany-a-ploty',
    nazev: 'Brány a ploty',
    obsah: 'Vrata, brány, branky a ploty, včetně pojmenovaných vzorů.',
    seo: {
      title: 'Realizace: kované brány a ploty',
      description:
        'Fotky kovaných bran, vrat, branek a plotů z dílny Jiřího Učíka. Vzory Fort, Civitas, Villa, Bodce a další. Chcete podobnou? Zavolejte 603 582 254.',
    },
  },
  {
    slug: 'mrize-dvere-kovani',
    nazev: 'Mříže, dveře a kování',
    obsah: 'Okenní a vstupní mříže, dveře, kliky, klepadla a panty.',
    seo: {
      title: 'Realizace: kované mříže, dveře a kování',
      description:
        'Fotky kovaných okenních a vstupních mříží, dveří, klik, klepadel a pantů. Kovářství Jiří Učík, Žitenice u Litoměřic. Tel. 603 582 254.',
    },
  },
  {
    slug: 'zabradli-a-balkony',
    nazev: 'Zábradlí a balkony',
    obsah: 'Schodišťová zábradlí, balkony a balkónky.',
    seo: {
      title: 'Realizace: kované zábradlí a balkony',
      description:
        'Fotky kovaných schodišťových zábradlí, balkonů a balkónků z dílny Jiřího Učíka u Litoměřic. Chcete podobné? Zavolejte 603 582 254.',
    },
  },
  {
    slug: 'krby',
    nazev: 'Krby',
    obsah: 'Dýmníky, rošty a krbové nářadí.',
    seo: {
      title: 'Realizace: dýmníky, rošty a krbové nářadí',
      description:
        'Fotky kovaných dýmníků, krbových roštů a souprav krbového nářadí. Kovářství Jiří Učík, Žitenice u Litoměřic. Tel. 603 582 254.',
    },
  },
  {
    slug: 'nabytek-a-interier',
    nazev: 'Nábytek a interiér',
    obsah: 'Postele, stoly, židle, police, svícny, zrcadla, plastiky a stojany na víno.',
    seo: {
      title: 'Realizace: kovaný nábytek a interiér',
      description:
        'Fotky kovaných postelí, stolů, židlí, polic, svícnů, zrcadel, plastik a stojanů na víno. Kovářství Jiří Učík u Litoměřic. Tel. 603 582 254.',
    },
  },
  {
    slug: 'zakazky-na-prani',
    nazev: 'Zakázky na přání',
    obsah: 'Vývěsní štíty, kostelní kříže a renovace, meče, zahradní prvky a zvonky.',
    seo: {
      title: 'Realizace: kovářské zakázky na přání',
      description:
        'Vývěsní štíty, kostelní kříže a jejich renovace, meče, zahradní prvky a zvonky z dílny Jiřího Učíka. Máte nápad? Zavolejte 603 582 254.',
    },
  },
  {
    slug: 'z-dilny',
    nazev: 'Z dílny',
    obsah: 'Výheň, práce u kovadliny, rozpracované kusy a nákresy.',
    seo: {
      title: 'Z kovářské dílny v Žitenicích',
      description:
        'Výheň, práce u kovadliny, rozpracované kusy a ruční nákresy. Nahlédněte do kovářské dílny Jiřího Učíka v Žitenicích u Litoměřic.',
    },
  },
];

/** Střídání poměrů v galerii: mřížka různých formátů, ne pravidelné čtverce (brief §5). */
const POMERY: Pomer[] = ['3:2', '4:5', '1:1', '3:2', '4:5', '3:2', '1:1', '4:5', '3:2'];

type Radek = [nazev: string, kategorie?: string, vzor?: string];

// Typy výrobků podle brief §1 a §5. Názvy vzorů a příklady jsou ze stávající galerie klienta.
const zdroj: Record<CastGalerie, Radek[]> = {
  'brany-a-ploty': [
    ['Kovaná brána Fort', undefined, 'Fort'],
    ['Kovaná brána Civitas', undefined, 'Civitas'],
    ['Branka Bodce', undefined, 'Bodce'],
    ['Kovaná brána Villa', undefined, 'Villa'],
    ['Kovaný plot', undefined],
    ['Branka Český lev', undefined, 'Český lev'],
    ['Vjezdová vrata', undefined],
    ['Kovaná brána Renesance', undefined, 'Renesance'],
    ['Kovaná brána Luční zvonce', undefined, 'Luční zvonce'],
  ],
  'mrize-dvere-kovani': [
    ['Okenní mříž', 'mrize'],
    ['Kované dveře', 'dvere-dvirka-okna'],
    ['Klepadlo', 'kliky-madla-klepadla-panty'],
    ['Vstupní mříž', 'mrize'],
    ['Kovaná dvířka', 'dvere-dvirka-okna'],
    ['Klika a štítek', 'kliky-madla-klepadla-panty'],
    ['Mříž na historickém domě', 'mrize'],
    ['Kované okno', 'dvere-dvirka-okna'],
    ['Kované panty', 'kliky-madla-klepadla-panty'],
  ],
  'zabradli-a-balkony': [
    ['Schodišťové zábradlí'],
    ['Kovaný balkon'],
    ['Balkónek'],
    ['Zábradlí ke schodům do patra'],
    ['Balkonové zábradlí'],
    ['Venkovní schodišťové zábradlí'],
    ['Kovaný balkónek'],
    ['Zábradlí terasy'],
    ['Detail zábradlí'],
  ],
  krby: [
    ['Kovaný dýmník', 'dymniky-a-rosty'],
    ['Krbová souprava se stojanem', 'krbove-naradi'],
    ['Krbový rošt', 'dymniky-a-rosty'],
    ['Krbové nářadí', 'krbove-naradi'],
    ['Dýmník nad otevřeným krbem', 'dymniky-a-rosty'],
    ['Pohrabáč a lopatka', 'krbove-naradi'],
    ['Rošt na míru', 'dymniky-a-rosty'],
    ['Stojan na krbové nářadí', 'krbove-naradi'],
    ['Detail krbové soupravy', 'krbove-naradi'],
  ],
  'nabytek-a-interier': [
    ['Kovaná postel', 'zidle-stoly-postele'],
    ['Svícen', 'svicny'],
    ['Zrcadlo v kovaném rámu', 'zrcadla-a-ramy'],
    ['Plastika strom', 'lampicky-plastiky-stojany-na-vino'],
    ['Kovaný stůl', 'zidle-stoly-postele'],
    ['Nástěnná police', 'regaly-police-drzaky'],
    ['Stojan na víno', 'lampicky-plastiky-stojany-na-vino'],
    ['Kované židle', 'zidle-stoly-postele'],
    ['Regál', 'regaly-police-drzaky'],
    ['Nástěnný svícen', 'svicny'],
    ['Rám obrazu', 'zrcadla-a-ramy'],
    ['Lampička', 'lampicky-plastiky-stojany-na-vino'],
    ['Držák', 'regaly-police-drzaky'],
  ],
  'zakazky-na-prani': [
    ['Kostelní kříž', 'vyvesni-stity-krize-mece'],
    ['Domovní zvoneček Drak', 'ostatni'],
    ['Vývěsní štít', 'vyvesni-stity-krize-mece'],
    ['Zahradní stolek a židle', 'zahrada'],
    ['Klepadlo s nákresem', 'nakresy-a-vzorky'],
    ['Kovaný meč', 'vyvesni-stity-krize-mece'],
    ['Poštovní schránka', 'ostatni'],
    ['Renovace kostelního kříže', 'vyvesni-stity-krize-mece'],
    ['Kovaná číše', 'ostatni'],
    ['Zahradní prvek', 'zahrada'],
    ['Ruční nákres', 'nakresy-a-vzorky'],
    ['Vzorek kování', 'nakresy-a-vzorky'],
  ],
  'z-dilny': [
    ['Výheň'],
    ['Práce u kovadliny'],
    ['Rozpracovaný kus'],
    ['Ruční nákres na ponku'],
    ['Rozžhavené železo'],
    ['Nářadí v dílně'],
    ['Kování voluty'],
    ['Dílna v Žitenicích'],
    ['Hotový kus před povrchovou úpravou'],
  ],
};

// Výběr na Úvod: 6 kusů z různých částí (brief §4)
const VYBER = new Set([
  'realizace-brany-a-ploty-01',
  'realizace-zabradli-a-balkony-01',
  'realizace-mrize-dvere-kovani-01',
  'realizace-nabytek-a-interier-01',
  'realizace-zakazky-na-prani-01',
  'realizace-krby-02',
]);

export const realizace: Realizace[] = (Object.keys(zdroj) as CastGalerie[]).flatMap((cast) =>
  zdroj[cast].map(([nazev, kategorie, vzor], i) => {
    const id = `realizace-${cast}-${String(i + 1).padStart(2, '0')}`;
    return {
      id,
      nazev,
      cast,
      kategorie,
      vzor,
      alt: `${nazev}, Kovářství Jiří Učík`,
      src: null,
      pomer: POMERY[i % POMERY.length]!,
      ukazka: true,
      vybrana: VYBER.has(id),
    };
  }),
);

export const castHref = (c: CastGalerie) => `/realizace/${c}`;
export const najdiCast = (slug: string) => casti.find((c) => c.slug === slug);
export const realizaceCasti = (c: CastGalerie) => realizace.filter((r) => r.cast === c);
export const realizaceKategorie = (c: CastGalerie, kategorie: string) =>
  realizace.filter((r) => r.cast === c && r.kategorie === kategorie);
export const vybraneRealizace = () => realizace.filter((r) => r.vybrana);

/** Popisek fotky: co to je, místo a rok jen když je klient dodal (brief §5). */
export const popisek = (r: Realizace) => [r.nazev, r.misto, r.rok].filter(Boolean).join(', ');

/** Převod pro klientskou galerii: jen serializovatelná pole a odkaz pro „Chci podobné“. */
export const doGalerie = (r: Realizace) => ({
  id: r.id,
  nazev: r.nazev,
  vzor: r.vzor,
  popisek: popisek(r),
  alt: r.alt,
  src: r.src,
  pomer: r.pomer,
  odkaz: `${kontakt.web}${castHref(r.cast)}#${r.id}`,
});
