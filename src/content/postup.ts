/**
 * Jak pracuji: pět kroků (web-project-brief.md §4).
 * Ke každému kroku ruční nákres a fotka z dílny (zatím placeholdery).
 * Konkrétní postupy, které brief neuvádí, jsou [DOPLNÍ KLIENT].
 */
import type { Foto } from './typy';

export type Krok = {
  cislo: number;
  nazev: string;
  /** Krátká verze pro Úvod. */
  kratce: string;
  /** Delší verze pro stránku Jak pracuji. */
  text: string[];
  /** Chybějící údaj od klienta, zobrazí se jako [DOPLNÍ KLIENT: …]. */
  doplni?: string;
  nakres: Foto;
  dilna: Foto;
};

const foto = (cislo: number, druh: 'nakres' | 'dilna', popis: string, alt: string): Foto => ({
  id: `postup-${druh}-0${cislo}`,
  popis,
  alt,
  src: null,
});

export const kroky: Krok[] = [
  {
    cislo: 1,
    nazev: 'Nápad',
    kratce: 'Zavoláte mi nebo pošlete fotku místa a řeknete, co si představujete.',
    text: [
      'Všechno začíná tím, co potřebujete. Zavoláte mi, nebo pošlete fotku místa, kam má výrobek přijít, a řeknete, co si představujete.',
      'Klidně jen přibližně. Zbytek spolu dořešíme.',
    ],
    nakres: foto(1, 'nakres', 'první skica nápadu, pár čar tužkou', 'První ruční skica návrhu'),
    dilna: foto(1, 'dilna', 'fotka místa od zákazníka nebo rozhovor nad nákresem', 'Rozhovor nad návrhem v dílně'),
  },
  {
    cislo: 2,
    nazev: 'Návrh a nákres',
    kratce: 'Vyjdu z Vašeho návrhu, nebo Vám ho nakreslím sám.',
    text: [
      'Když máte vlastní návrh, vyjdu z něj. Když ne, nakreslím Vám ho já.',
      'Ruční nákres ukáže, jak bude výrobek vypadat, ještě než rozpálím výheň. Úpravy se dělají na papíře, ne na hotovém železe.',
    ],
    nakres: foto(2, 'nakres', 'hotový ruční nákres výrobku s rozměry', 'Ruční nákres výrobku s rozměry'),
    dilna: foto(2, 'dilna', 'kreslení návrhu na ponku v dílně', 'Kreslení návrhu v dílně'),
  },
  {
    cislo: 3,
    nazev: 'Kování',
    kratce: 'Ve výhni a na kovadlině, jak se to dělalo vždycky.',
    text: [
      'Kovám tradičně, ve výhni a na kovadlině. Navazuji na klasickou kovařinu, a kde to práci pomůže, použiji i nové technologie a postupy.',
    ],
    nakres: foto(3, 'nakres', 'detail nákresu, například voluty nebo ornamentu', 'Detail ručního nákresu ornamentu'),
    dilna: foto(3, 'dilna', 'rozžhavené železo na kovadlině pod kladivem', 'Kování rozžhaveného železa na kovadlině'),
  },
  {
    cislo: 4,
    nazev: 'Povrchová úprava',
    kratce: 'Podle toho, jestli výrobek bude venku, nebo v domě.',
    text: [
      'Hotový kus dostane povrchovou úpravu podle místa, kam půjde. Venku musí odolat počasí, v interiéru rozhoduje spíš vzhled.',
    ],
    doplni: 'jaké povrchové úpravy používá (nátěr, zinkování, vosk…)',
    nakres: foto(4, 'nakres', 'nákres s poznámkou o povrchové úpravě', 'Nákres s poznámkou o povrchové úpravě'),
    dilna: foto(4, 'dilna', 'výrobek během povrchové úpravy', 'Povrchová úprava kovaného výrobku'),
  },
  {
    cislo: 5,
    nazev: 'Doprava a montáž',
    kratce: 'Výrobek přivezu a namontuji.',
    text: [
      'Výrobek Vám přivezu a namontuji. Nemusíte shánět dopravu ani nikoho dalšího na montáž.',
    ],
    nakres: foto(5, 'nakres', 'montážní nákres nebo osazení na místě', 'Montážní nákres'),
    dilna: foto(5, 'dilna', 'montáž hotové brány nebo zábradlí u zákazníka', 'Montáž kovaného výrobku u zákazníka'),
  },
];
