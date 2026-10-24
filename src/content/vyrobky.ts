/**
 * Výrobky: 6 skupin, 16 kategorií (web-project-brief.md §3).
 *
 * POZOR: slugy, názvy a SEO údaje jsou PRACOVNÍ. Finální vzniknou při keyword
 * researchu (fáze 0, před spuštěním) a zapíšou se do memory/keywords.md.
 * Struktura se nemění. Texty jen z faktů v brief §1, nic nedoplňovat.
 * Skupina bez kategorií je zároveň jedinou kategorií (brief §4).
 */
import type { Foto, Seo } from './typy';

export type Vzor = {
  nazev: string;
  druh: 'brána' | 'branka';
  foto: Foto;
};

export type Kategorie = {
  slug: string;
  nazev: string;
  /** Jedna věta pro rozcestník skupiny. */
  kratce: string;
  /** Odstavce úvodního textu. */
  text: string[];
  hero: Foto;
  seo: Seo;
  vzory?: Vzor[];
};

export type Skupina = {
  slug: string;
  nazev: string;
  /** Jedna věta pro přehled výrobků a Úvod. */
  kratce: string;
  text: string[];
  hero: Foto;
  seo: Seo;
  /** Velikost dlaždice v přehledu podle významu (brief §4). */
  dlazdice: 'velka' | 'stredni' | 'mala';
  /** Prázdné pole = skupina je zároveň kategorií. */
  kategorie: Kategorie[];
  /** Pojmenované vzory u skupiny bez kategorií. */
  vzory?: Vzor[];
};

const hero = (id: string, popis: string, alt: string): Foto => ({ id, popis, alt, src: null });

const vzor = (nazev: string, druh: Vzor['druh'], n: number): Vzor => ({
  nazev,
  druh,
  foto: {
    id: `brany-vzory-${String(n).padStart(2, '0')}`,
    popis: `${druh} ${nazev}`,
    alt: `Kovaná ${druh} ${nazev} od Kovářství Jiří Učík`,
    src: null,
  },
});

// Vzory podle brief §4: brány a branky ze stávající galerie
const vzoryBran: Vzor[] = [
  'Civitas',
  'Fort',
  'Decent',
  'Villa',
  'Ornament',
  'Stébla',
  'Renesance',
  'Luční zvonce',
  'Ancient',
].map((n, i) => vzor(n, 'brána', i + 1));
const vzoryBranek: Vzor[] = ['Bodce', 'Český lev'].map((n, i) => vzor(n, 'branka', i + 10));

export const skupiny: Skupina[] = [
  {
    slug: 'brany-a-ploty',
    nazev: 'Brány a ploty',
    kratce: 'Vrata, brány, branky i ploty, které dlouho vydrží a nevyžadují mnoho údržby.',
    text: [
      'Kovanou bránu, branku nebo plot Vám vykuji podle Vašeho návrhu nebo podle některého z mých vzorů. Kované železo dlouho vydrží, dobře snáší počasí a nevyžaduje mnoho údržby.',
      'Mohu udělat vjezdová vrata i branku k nim, a pokud chcete, tak i celý plot kolem pozemku ve stejném stylu. Hotové dílo Vám přivezu a namontuji.',
    ],
    hero: hero('brany-hero-01', 'kovaná brána u domu za denního světla, celkový pohled', 'Kovaná brána a plot u rodinného domu'),
    seo: {
      title: 'Kované brány, branky a ploty na zakázku',
      description:
        'Kované brány, vrata, branky a ploty z dílny v Žitenicích u Litoměřic. Vzory Fort, Civitas, Villa a další, výroba i montáž. Zavolejte 603 582 254.',
    },
    dlazdice: 'velka',
    kategorie: [],
    vzory: [...vzoryBran, ...vzoryBranek],
  },
  {
    slug: 'mrize-dvere-kovani',
    nazev: 'Mříže, dveře a kování',
    kratce: 'Okenní a vstupní mříže, kované dveře a také kování, jako jsou kliky, klepadla a panty.',
    text: [
      'Mříže kovám pro novostavby i pro historické domy. Mohu k nim vyrobit také dveře, dvířka a okenní prvky a nakonec i kování, které budete mít každý den v ruce.',
    ],
    hero: hero('mrize-hero-01', 'okenní mříž na fasádě, detail kovaných prutů', 'Kovaná okenní mříž na fasádě domu'),
    seo: {
      title: 'Kované mříže, dveře a kování',
      description:
        'Kované okenní a vstupní mříže, dveře, dvířka, kliky, klepadla a panty na zakázku. Pro novostavby i historické domy. Kovářství Jiří Učík, Žitenice.',
    },
    dlazdice: 'stredni',
    kategorie: [
      {
        slug: 'mrize',
        nazev: 'Mříže',
        kratce: 'Okenní i vstupní mříže pro novostavby i pro staré domy.',
        text: [
          'Okenní a vstupní mříže dělám pro novostavby i pro historické domy. Na starší fasádě může mříž navázat na styl domu, zatímco na novém domě bývá jednodušší.',
          'Tvar mříže navrhnu sám, nebo vyjdu z Vašeho nákresu. Hotovou mříž pak přivezu a namontuji.',
        ],
        hero: hero('mrize-mrize-hero-01', 'kovaná okenní mříž na historickém domě', 'Kovaná okenní mříž na historickém domě'),
        seo: {
          title: 'Kované mříže na okna a dveře',
          description:
            'Kované okenní a vstupní mříže na zakázku pro novostavby i historické domy. Návrh, výroba a montáž z dílny u Litoměřic. Zavolejte 603 582 254.',
        },
      },
      {
        slug: 'dvere-dvirka-okna',
        nazev: 'Dveře, dvířka, okna',
        kratce: 'Kované dveře a dvířka vyrobené na míru Vašemu otvoru.',
        text: [
          'Kované dveře, dvířka a okenní prvky vyrobím na míru otvoru, který máte. Mohu vyjít z Vašeho návrhu nebo z mého a použít stejné kování, jaké je na zbytku domu.',
        ],
        hero: hero('mrize-dvere-hero-01', 'kované vstupní dveře, celkový pohled', 'Kované vstupní dveře'),
        seo: {
          title: 'Kované dveře, dvířka a okna',
          description:
            'Kované dveře, dvířka a okenní prvky na míru, podle Vašeho návrhu nebo podle mého. Výroba i montáž, Kovářství Jiří Učík ze Žitenic u Litoměřic.',
        },
      },
      {
        slug: 'kliky-madla-klepadla-panty',
        nazev: 'Kliky, madla, klepadla, panty',
        kratce: 'Kování jako jednotlivý kus nebo jako celá sada ke dveřím.',
        text: [
          'Kliku, madlo, klepadlo nebo pant vykuji jako jeden kus, nebo jako celou sadu ke dveřím či bráně. Kování držíte v ruce každý den, takže na jeho tvaru záleží víc, než se zdá.',
        ],
        hero: hero('mrize-kovani-hero-01', 'kované klepadlo na dřevěných dveřích, detail', 'Kované klepadlo na dveřích'),
        seo: {
          title: 'Kované kliky, madla, klepadla a panty',
          description:
            'Ručně kované kliky, madla, klepadla a panty ke dveřím i bránám, jednotlivě i v sadě. Kovářství Jiří Učík, Žitenice u Litoměřic. Tel. 603 582 254.',
        },
      },
    ],
  },
  {
    slug: 'zabradli-a-balkony',
    nazev: 'Zábradlí a balkony',
    kratce: 'Zábradlí na schody a také balkony a balkónky.',
    text: [
      'Zábradlí dělám na míru konkrétnímu schodišti, balkonu nebo balkónku, a to uvnitř domu i venku. Navrhnu ho sám, nebo podle Vašeho nákresu.',
      'Hotové zábradlí Vám přivezu a na místě namontuji.',
    ],
    hero: hero('zabradli-hero-01', 'kované schodišťové zábradlí v interiéru', 'Kované schodišťové zábradlí v interiéru'),
    seo: {
      title: 'Kované zábradlí a balkony na zakázku',
      description:
        'Kované schodišťové zábradlí, balkony a balkónky do interiéru i exteriéru. Návrh, výroba a montáž, Kovářství Jiří Učík u Litoměřic. Tel. 603 582 254.',
    },
    dlazdice: 'stredni',
    kategorie: [],
  },
  {
    slug: 'krby',
    nazev: 'Krby',
    kratce: 'Vyrábím dýmníky, rošty i krbové nářadí.',
    text: [
      'Ke krbu vykuji dýmník, rošt i soupravu nářadí. Když je všechno z jedné dílny, jednotlivé kusy k sobě dobře pasují.',
    ],
    hero: hero('krby-hero-01', 'krb s kovaným roštem a soupravou nářadí', 'Krb s kovaným roštem a krbovým nářadím'),
    seo: {
      title: 'Kované dýmníky, rošty a krbové nářadí',
      description:
        'Kované dýmníky, krbové rošty a soupravy krbového nářadí na zakázku z dílny v Žitenicích u Litoměřic. Zavolejte 603 582 254 a domluvíme se.',
    },
    dlazdice: 'mala',
    kategorie: [
      {
        slug: 'dymniky-a-rosty',
        nazev: 'Dýmníky a rošty',
        kratce: 'Vyrobené na rozměr Vašeho krbu.',
        text: [
          'Dýmník i rošt vykuji na rozměr Vašeho krbu. Tvar domluvíme podle toho, jak krb vypadá a jak se v něm topí.',
        ],
        hero: hero('krby-dymniky-hero-01', 'kovaný dýmník nad otevřeným krbem', 'Kovaný dýmník nad krbem'),
        seo: {
          title: 'Kované dýmníky a krbové rošty',
          description:
            'Kované dýmníky a krbové rošty na rozměr Vašeho krbu. Výroba na zakázku, Kovářství Jiří Učík, Žitenice u Litoměřic. Zavolejte 603 582 254.',
        },
      },
      {
        slug: 'krbove-naradi',
        nazev: 'Krbové nářadí',
        kratce: 'Krbové soupravy včetně stojanu.',
        text: [
          'Krbovou soupravu vykuji jako celek i se stojanem. Tvar a zdobení přizpůsobím krbu a místnosti, ve které bude stát.',
        ],
        hero: hero('krby-naradi-hero-01', 'kovaná krbová souprava na stojanu vedle krbu', 'Kovaná krbová souprava se stojanem'),
        seo: {
          title: 'Kované krbové nářadí a soupravy',
          description:
            'Ručně kované krbové soupravy se stojanem, tvarem laděné ke krbu a místnosti. Kovářství Jiří Učík, Žitenice u Litoměřic. Tel. 603 582 254.',
        },
      },
    ],
  },
  {
    slug: 'nabytek-a-interier',
    nazev: 'Nábytek a interiér',
    kratce: 'Kovaný nábytek a doplňky do domu, třeba postele, stoly, židle, police, svícny nebo zrcadla.',
    text: [
      'Kovaný nábytek a doplňky do interiéru dělám na zakázku. Postel, stůl nebo police tak mají přesně ten rozměr a tvar, který potřebujete.',
    ],
    hero: hero('nabytek-hero-01', 'kovaná postel nebo stůl v obytném interiéru', 'Kovaný nábytek v interiéru'),
    seo: {
      title: 'Kovaný nábytek a doplňky do interiéru',
      description:
        'Kované postele, stoly, židle, regály, svícny, zrcadla, lampičky a stojany na víno na zakázku. Kovářství Jiří Učík, Žitenice u Litoměřic.',
    },
    dlazdice: 'stredni',
    kategorie: [
      {
        slug: 'zidle-stoly-postele',
        nazev: 'Židle, stoly, postele',
        kratce: 'Kovaný nábytek, který se vejde do Vaší místnosti.',
        text: [
          'Kovanou postel, stůl nebo židle udělám v takovém rozměru, aby se Vám vešly do místnosti. Návrh může být Váš, nebo ho nakreslím já.',
        ],
        hero: hero('nabytek-nabytek-hero-01', 'kovaná postel v ložnici', 'Kovaná postel v ložnici'),
        seo: {
          title: 'Kované židle, stoly a postele',
          description:
            'Kované postele, stoly a židle na míru Vaší místnosti, podle Vašeho návrhu nebo mého. Kovářství Jiří Učík, Žitenice u Litoměřic. Tel. 603 582 254.',
        },
      },
      {
        slug: 'regaly-police-drzaky',
        nazev: 'Regály, police, držáky',
        kratce: 'Vyrobené na míru místu, kam mají přijít.',
        text: [
          'Kovaný regál, polici nebo držák udělám na míru místu, kam má přijít. Pošlete mi rozměr a fotku místa a domluvíme se.',
        ],
        hero: hero('nabytek-police-hero-01', 'kovaná police na zdi s knihami', 'Kovaná nástěnná police'),
        seo: {
          title: 'Kované regály, police a držáky',
          description:
            'Kované regály, police a držáky na míru místu, kam mají přijít. Výroba na zakázku z dílny v Žitenicích u Litoměřic. Zavolejte 603 582 254.',
        },
      },
      {
        slug: 'svicny',
        nazev: 'Svícny',
        kratce: 'Svícny na stůl i na zeď.',
        text: [
          'Svícen na stůl nebo na zeď vykuji tak, aby ladil s ostatním kováním v domě. Hodí se i jako dárek.',
        ],
        hero: hero('nabytek-svicny-hero-01', 'kovaný svícen se zapálenou svíčkou', 'Kovaný svícen'),
        seo: {
          title: 'Kované svícny',
          description:
            'Ručně kované svícny na stůl i na zeď, laděné k ostatnímu kování v domě. Kovářství Jiří Učík, Žitenice u Litoměřic. Zavolejte 603 582 254.',
        },
      },
      {
        slug: 'zrcadla-a-ramy',
        nazev: 'Zrcadla a rámy',
        kratce: 'Kovaný rám v takovém rozměru a tvaru, jaký chcete.',
        text: [
          'Kovaný rám k zrcadlu nebo obrazu udělám v rozměru i tvaru podle Vás, jednoduchý nebo zdobený.',
        ],
        hero: hero('nabytek-zrcadla-hero-01', 'zrcadlo v kovaném rámu na zdi', 'Zrcadlo v kovaném rámu'),
        seo: {
          title: 'Kovaná zrcadla a rámy',
          description:
            'Kované rámy k zrcadlům a obrazům v rozměru i tvaru podle Vás. Výroba na zakázku, Kovářství Jiří Učík, Žitenice u Litoměřic. Tel. 603 582 254.',
        },
      },
      {
        slug: 'lampicky-plastiky-stojany-na-vino',
        nazev: 'Lampičky, plastiky, stojany na víno',
        kratce: 'Menší kusy do interiéru.',
        text: [
          'Sem patří menší kusy do interiéru, například lampičky, kované plastiky a stojany na víno. Jednou z plastik je třeba strom, který najdete v realizacích.',
        ],
        hero: hero('nabytek-plastiky-hero-01', 'kovaná plastika stromu', 'Kovaná plastika stromu'),
        seo: {
          title: 'Kované lampičky, plastiky a stojany na víno',
          description:
            'Kované lampičky, plastiky a stojany na víno do interiéru, vyrobené na zakázku. Kovářství Jiří Učík, Žitenice u Litoměřic. Tel. 603 582 254.',
        },
      },
    ],
  },
  {
    slug: 'zakazky-na-prani',
    nazev: 'Zakázky na přání',
    kratce: 'Vývěsní štíty, kostelní kříže, meče i další kusy, které nepatří do ostatních skupin.',
    text: [
      'Dělám i zakázky, které nepatří k branám ani k nábytku. Jsou to třeba vývěsní štíty, kostelní kříže a jejich renovace, kované meče nebo zahradní stolky a židle. Vyrobím také historické předměty, například číše, poháry, mísy nebo makety.',
      'Když máte nápad a nevíte, jestli se dá vykovat, zavolejte mi a spolu to probereme.',
    ],
    hero: hero('zakazky-hero-01', 'kovaný vývěsní štít nad vchodem', 'Kovaný vývěsní štít'),
    seo: {
      title: 'Kovářské zakázky na přání',
      description:
        'Vývěsní štíty, kostelní kříže a jejich renovace, kované meče, zahradní nábytek i historické předměty. Kovářství Jiří Učík u Litoměřic.',
    },
    dlazdice: 'mala',
    kategorie: [
      {
        slug: 'vyvesni-stity-krize-mece',
        nazev: 'Vývěsní štíty, kříže, meče',
        kratce: 'Vývěsní štíty, kostelní kříže včetně renovací a kované meče.',
        text: [
          'Vykuji vývěsní štít k Vaší provozovně, kostelní kříž nebo kovaný meč. Kostelní kříže a další kované kostelní prvky umím vyrobit nově i renovovat.',
        ],
        hero: hero('zakazky-stity-hero-01', 'kostelní kříž nebo vývěsní štít, celkový pohled', 'Kovaný kostelní kříž'),
        seo: {
          title: 'Kované vývěsní štíty, kostelní kříže a meče',
          description:
            'Kované vývěsní štíty, výroba a renovace kostelních křížů a kostelních prvků, kované meče. Kovářství Jiří Učík, Žitenice. Tel. 603 582 254.',
        },
      },
      {
        slug: 'zahrada',
        nazev: 'Zahrada',
        kratce: 'Zahradní stolky, židle a další kované prvky do zahrady.',
        text: [
          'Na zahradu vykuji stolky a židle, které vydrží venku, a dá se domluvit i na dalších kovaných prvcích.',
        ],
        hero: hero('zakazky-zahrada-hero-01', 'kovaný zahradní stolek se židlemi v zahradě', 'Kovaný zahradní stolek a židle'),
        seo: {
          title: 'Kovaný zahradní nábytek',
          description:
            'Kované zahradní stolky, židle a další prvky na zahradu, vyrobené na zakázku. Kovářství Jiří Učík, Žitenice u Litoměřic. Zavolejte 603 582 254.',
        },
      },
      {
        slug: 'ostatni',
        nazev: 'Ostatní',
        kratce: 'Zvonečky, poštovní schránky a historické předměty.',
        text: [
          'Sem patří všechno, co se nevešlo jinam, třeba domovní zvonečky, poštovní schránky, historické číše, poháry, mísy nebo makety. Jedním z nich je zvoneček Drak.',
        ],
        hero: hero('zakazky-ostatni-hero-01', 'kovaný domovní zvoneček Drak', 'Kovaný domovní zvoneček Drak'),
        seo: {
          title: 'Kované zvonečky a historické předměty',
          description:
            'Kované domovní zvonečky, poštovní schránky, číše, poháry, mísy a makety na zakázku. Kovářství Jiří Učík, Žitenice u Litoměřic. Tel. 603 582 254.',
        },
      },
      {
        slug: 'nakresy-a-vzorky',
        nazev: 'Nákresy a vzorky',
        kratce: 'Ruční nákresy a vzorky, podle kterých výrobky vznikají.',
        text: [
          'Než začnu kovat, nejdřív kreslím. Tady najdete moje ruční nákresy a vzorky, například klepadlo spolu s nákresem, podle kterého vzniklo.',
        ],
        hero: hero('zakazky-nakresy-hero-01', 'ruční perokresba výrobku vedle hotového kusu', 'Ruční nákres kovaného výrobku'),
        seo: {
          title: 'Nákresy a vzorky kovářských výrobků',
          description:
            'Ruční nákresy a vzorky, podle kterých vznikají kované výrobky Jiřího Učíka. Pošlete mi i svůj nákres a domluvíme se. Tel. 603 582 254.',
        },
      },
    ],
  },
];

export const skupinaHref = (s: Skupina) => `/vyrobky/${s.slug}`;
export const kategorieHref = (s: Skupina, k: Kategorie) => `/vyrobky/${s.slug}/${k.slug}`;

export const najdiSkupinu = (slug: string) => skupiny.find((s) => s.slug === slug);
export const najdiKategorii = (s: Skupina, slug: string) => s.kategorie.find((k) => k.slug === slug);
