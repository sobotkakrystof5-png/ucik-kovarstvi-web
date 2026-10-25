/**
 * Texty Úvodu (web-project-brief.md §4). Hlas kováře v první osobě,
 * zákazníka oslovuje „Vy“. Bez roku založení, dokud ho klient nepotvrdí.
 * SEO údaje PRACOVNÍ (fáze 0 před spuštěním).
 */
import type { Foto } from './typy';

type Dlazdice = {
  skupina: string;
  nazev: string;
  veta: string;
  /** Druhá skupina v jedné dlaždici (Mříže a zábradlí). */
  odkaz?: { text: string; skupina: string };
  foto: Foto;
};

const f = (id: string, popis: string, alt: string): Foto => ({ id, popis, alt, src: null });

export const uvod = {
  seo: {
    title: 'Kovářství Jiří Učík | Umělecký kovář, Žitenice u Litoměřic',
    description:
      'Kované brány, ploty, zábradlí, mříže, nábytek a zakázky na přání. Umělecký kovář Jiří Učík, dílna v Žitenicích u Litoměřic. Výroba i montáž. Tel. 603 582 254.',
  },
  hero: {
    // Tónová ukázka z briefu §1, schválená klientem jako hlas webu
    nadpis: 'Vykovu Vám bránu, která vydrží generace.',
    podpis: 'Jiří Učík, umělecký kovář, Žitenice',
    foto: f(
      'uvod-hero-01',
      'výheň nebo rozžhavené železo na kovadlině, tmavé teplé světlo',
      'Rozžhavené železo na kovadlině v kovářské dílně v Žitenicích',
    ),
  },
  coVykovam: {
    nadpis: 'Co vykovu',
    dlazdice: <Dlazdice[]>[
      {
        skupina: 'brany-a-ploty',
        nazev: 'Brány a ploty',
        veta: 'Vyrábím vrata, brány, branky i ploty, a to podle Vašeho návrhu nebo podle mých vzorů.',
        foto: f('uvod-vyrobky-01', 'kovaná brána a plot za denního světla', 'Kovaná brána s plotem'),
      },
      {
        skupina: 'mrize-dvere-kovani',
        nazev: 'Mříže a zábradlí',
        veta: 'Kovám okenní mříže pro nové i historické domy a také',
        odkaz: { text: 'zábradlí na schody a balkony', skupina: 'zabradli-a-balkony' },
        foto: f('uvod-vyrobky-02', 'kovaná mříž nebo schodišťové zábradlí, detail', 'Kované zábradlí a mříž'),
      },
      {
        skupina: 'nabytek-a-interier',
        nazev: 'Nábytek a interiér',
        veta: 'Do domu kovám postele, stoly, police i svícny, vždy na míru Vaší místnosti.',
        foto: f('uvod-vyrobky-03', 'kovaný stůl, postel nebo svícen v interiéru', 'Kovaný nábytek v interiéru'),
      },
    ],
  },
  realizace: {
    nadpis: 'Vybrané realizace',
  },
  postup: {
    nadpis: 'Jak pracuji',
    uvod: 'Práce probíhá v pěti krocích, od prvního telefonátu až po montáž.',
  },
  kovar: {
    nadpis: 'Kovář',
    text: [
      'Jsem Jiří Učík a kovám v dílně v Žitenicích u Litoměřic. Navazuji na klasickou kovařinu, ale když práci pomůže nový postup, použiji ho.',
      'Kovám věci, které mají vydržet a které se Vám budou líbit, ať už jde o bránu před domem, nebo o svícen na stole.',
    ],
    podpis: 'Jiří Učík',
    portret: f('uvod-kovar-01', 'portrét Jiřího Učíka u výhně', 'Kovář Jiří Učík u výhně'),
    detail: f('uvod-kovar-02', 'detail rukou s kladivem nad kovadlinou', 'Ruce kováře s kladivem'),
  },
  oblast: {
    nadpis: 'Kde pracuji',
    text: 'Dílnu mám v Žitenicích u Litoměřic a výrobky vozím a montuji po celém okolí, od Ústí nad Labem a Teplic až po Mělník a Prahu.',
  },
  ozvete: {
    nadpis: 'Ozvěte se',
    veta: 'Pošlete mi fotku místa nebo nákres a domluvíme se.',
  },
};
